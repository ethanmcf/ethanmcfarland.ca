export async function sendContactEmail(fields: Record<string, string>) {
  const res = await fetch(import.meta.env.VITE_WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error("send_failed");
}
