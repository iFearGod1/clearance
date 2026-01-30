# Repo Activation Contract

This document defines the canonical representation of a "Repo" in Clearance, how "Active Repo" is determined, and the contract between layers.

---

## Current State (Inventory)

| File | Exports | Consumers | Issue |
|------|---------|-----------|-------|
| `src/server/repo.ts` | `Repo` interface | `repo.mock.ts`, `repo.index.ts` | Clean abstraction |
| `src/server/repo.mock.ts` | `mockRepo` implementation | `repo.index.ts` | In-memory, single org |
| `src/server/repo.index.ts` | `repo` singleton | All server actions | **Hardcoded to mockRepo** |
| `src/server/context.ts` | `ORG_ID`, `USER_ID` | All server actions | **Hardcoded constants** |

All server actions (`permits.ts`, `dashboard.ts`, `jurisdictions.ts`) import `repo` as a singleton and use hardcoded `ORG_ID`. No repo selection exists.

---

## Canonical Identifiers and Keys

| Purpose | Name | Format |
|---------|------|--------|
| URL param | `repo` | `?repo=<id-or-slug>` |
| localStorage key | `clearance_active_repo` | Plain string (repoId) |
| Client state field | `activeRepoId` | `string` |

No alternatives. These names are fixed.

---

## Repo Data Model

```typescript
/** Canonical Repo shape */
interface Repo {
  /** Primary identifier — stable, opaque, never changes */
  id: string;

  /** Human-readable URL segment — stable after creation */
  slug: string;

  /** Display name — mutable, not used for logic */
  displayName: string;

  /** Repo provider type */
  provider: "mock" | "neon" | "postgres" | "planetscale";

  /** Associated org ID for data scoping */
  orgId: string;

  /** Connection config (opaque to client) */
  connectionConfig?: Record<string, unknown>;
}
```

### Identifier Rules

| Field | Role | Stability | Used For |
|-------|------|-----------|----------|
| `id` | **Primary identifier** | Immutable | Storage keys, query keys, server params |
| `slug` | URL segment | Stable (admin-editable) | URL routing, display |
| `displayName` | UI label | Mutable | Display only |

**Primary identifier: `id`**  
Rationale: `slug` may be admin-editable for branding; `id` is guaranteed stable.

### Invariants

1. `id` is non-empty, unique, and never changes after creation
2. `slug` is non-empty, unique, and URL-safe (`[a-z0-9-]+`)
3. `displayName` is non-empty but not unique
4. `provider` determines which `Repo` implementation to instantiate

---

## Active Repo Definition

**Active Repo** is the single `Repo.id` that scopes all data access for the current session.

It is **not**:
- A display-only label
- A client-side-only state
- A value inferred from URL path segments

It **is**:
- The value passed to all repo-scoped server operations
- The key used for query invalidation and cache scoping
- The value persisted to survive refresh

---

## ORG_ID Relationship

| Aspect | Decision |
|--------|----------|
| Relationship | `orgId` is a property OF `Repo`, not independent |
| Resolution | Given `activeRepoId`, look up `Repo.orgId` from registry |
| Current state | Hardcoded `ORG_ID = "org_demo"` in `context.ts` |
| Migration | Server actions receive `repoId`, resolve `orgId` via registry |

```typescript
// Current (wrong)
const orgId = ORG_ID;  // hardcoded global

// Target (correct)
const repo = registry.getById(repoId);
const orgId = repo.orgId;
```

For MVP, all repos may share `orgId: "org_demo"`. The contract supports per-repo orgs later.

---

## Boot Resolution Order

On app initialization, determine `activeRepoId` using this precedence:

```
1. URL param (?repo=<slug-or-id>)
   → Validate against registry
   → If valid, use and persist
   → If invalid, fall through

2. Persisted storage (localStorage key: clearance_active_repo)
   → Read value
   → Validate against registry
   → If valid, use
   → If invalid, clear and fall through

3. Default repo (registry.defaultRepoId)
   → Use and persist
```

---

## Validation + Fallback Rules

### What "Valid repoId" Means

A `repoId` (or slug) is valid if and only if:
```typescript
registry.getById(value) !== undefined || registry.getBySlug(value) !== undefined
```

### Fallback Behavior

| Source | If Invalid |
|--------|------------|
| URL param | Ignore silently, try persisted value |
| Persisted value | Clear storage, use default |
| Default repo | Must be valid (startup assertion) |

### Logging

- **Development only**: Log a single `console.warn` when falling back
- **Production**: Silent fallback, no user-facing errors
- **Format**: `[Clearance] Invalid repo "${value}", falling back to default`

---

## Layer Boundaries

### Server Boundary

```typescript
// CORRECT: explicit param
async function listPermits(repoId: string): Promise<Permit[]>

// WRONG: implicit global
async function listPermits(): Promise<Permit[]>  // reads from module singleton
```

**Rules:**
- All repo-scoped server actions accept `repoId` as explicit parameter
- Server resolves `orgId` from `repoId` via registry
- Server must not read `activeRepoId` from global/module state
- Server validates `repoId` exists before operations

### Client Boundary

```typescript
// Single source of truth
const { activeRepoId, setActiveRepoId } = useRepoContext();

// All data hooks receive repoId
const { data } = usePermits(activeRepoId);
```

**Rules:**
- `activeRepoId` lives in React Context (or equivalent)
- One provider at app root, no duplicates
- All data-fetching hooks receive `repoId` as explicit param
- UI components read from context, pass to hooks

### Persistence Boundary

| Aspect | Specification |
|--------|---------------|
| Storage mechanism | `localStorage` |
| Storage key | `clearance_active_repo` |
| Value format | Plain string (`repoId`) |
| Write timing | On successful repo switch (after validation) |
| Read timing | Once on app boot, before first render |

**Hydration flow:**
```
boot → read storage → validate → set context → render
```

**Persistence flow:**
```
user selects repo → validate → update context → write storage
```

---

## Hard Rule: Explicit Arguments

> **All repo-scoped server and data functions MUST accept `repoId` as an explicit argument.**

Functions that rely on globals, singletons, or module-level state for repo identity are **non-compliant** with this contract.

**Compliant:**
```typescript
listPermits(repoId: string)
usePermits(repoId: string)
getDashboardSummary(repoId: string)
```

**Non-compliant:**
```typescript
listPermits()  // reads from global
usePermits()   // infers from context internally without param
```

---

## Query/Selector Binding Rules

All repo-scoped data operations MUST include `activeRepoId` in:

1. **Query keys** (react-query/swr)
   ```typescript
   // CORRECT
   useQuery(['permits', repoId], () => listPermits(repoId))

   // WRONG
   useQuery(['permits'], () => listPermits())
   ```

2. **Dependency arrays** (useMemo/useEffect)
   ```typescript
   useMemo(() => filterPermits(permits), [permits, repoId])
   ```

3. **Server request params**
   ```typescript
   await listPermits(repoId)  // not listPermits()
   ```

### Failure Conditions

| Symptom | Root Cause |
|---------|------------|
| UI label changes but data doesn't refresh | Query key missing `repoId` |
| Stale data after repo switch | Queries not invalidated on switch |
| Server returns wrong org data | Server action not parameterized |
| Data persists across repos | Cache not scoped by `repoId` |

---

## Registry Design

```typescript
/** Available repos (configured at build or runtime) */
interface RepoRegistry {
  repos: Repo[];
  defaultRepoId: string;

  getById(id: string): Repo | undefined;
  getBySlug(slug: string): Repo | undefined;
  validate(idOrSlug: string): Repo | undefined;
}
```

The registry is the source of truth for valid repos. Both boot resolution and runtime switching consult the registry.

---

## Non-Goals

- **Multi-repo views** — This contract supports one active repo at a time
- **Repo CRUD** — Creating, editing, or deleting repos is out of scope
- **Per-repo authentication** — Access control is separate from activation
- **Real-time repo sync** — Repo switch is user-initiated only
- **UI components** — No selector, dropdown, or switcher defined here
- **Connection pooling** — Database connection management is implementation detail
- **Offline support** — No offline-first considerations
- **Cross-tab sync** — Each tab manages its own activeRepoId

---

## Migration Path (from current state)

1. Define `RepoRegistry` with mock + (future) Neon entries
2. Replace `ORG_ID` constant with `activeRepoId` param in all server actions
3. Add `RepoContext` provider at app root
4. Update all data hooks to accept `repoId` param
5. Add persistence read on boot, write on switch
6. Add URL param handling (optional, for deep links)
