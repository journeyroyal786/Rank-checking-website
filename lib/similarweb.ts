// Optional Similarweb connector. Endpoint access and metrics depend on the customer's API subscription.
export async function fetchSimilarwebTraffic(domain: string) {
  const key = process.env.SIMILARWEB_API_KEY;
  if (!key) return null;
  const url = `https://api.similarweb.com/v5/website-analysis/${encodeURIComponent(domain)}/traffic-and-engagement/overview?api_key=${encodeURIComponent(key)}`;
  const res = await fetch(url,{cache:'no-store'});
  if (!res.ok) throw new Error(`Similarweb API returned HTTP ${res.status}. Check your plan and endpoint permissions.`);
  return res.json();
}
