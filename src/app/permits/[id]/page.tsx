import Link from "next/link";
import { getPermit } from "@/app/actions/permits";

export default async function PermitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const permit = await getPermit(id);

  if (!permit) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link href="/" style={{ display: "block", marginBottom: "0.5rem" }}>
          ← Back to Dashboard
        </Link>
        <Link href="/permits" style={{ display: "block", marginBottom: "1.5rem" }}>
          ← Back to Permits
        </Link>

        <div className="glass-panel">
          <h2>Permit not found</h2>
          <p>The requested permit does not exist in the current dataset.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/" style={{ display: "block", marginBottom: "0.5rem" }}>
        ← Back to Dashboard
      </Link>
      <Link href="/permits" style={{ display: "block", marginBottom: "1.5rem" }}>
        ← Back to Permits
      </Link>

      <div className="glass-panel">
        <h1>{permit.title}</h1>

        <div style={{ marginTop: "1rem" }}>
          <strong>Status:</strong> {permit.status}
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <strong>Jurisdiction ID:</strong> {permit.jurisdictionId}
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <strong>Created:</strong>{" "}
          {new Date(permit.createdAt).toLocaleString()}
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <strong>Updated:</strong>{" "}
          {new Date(permit.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
