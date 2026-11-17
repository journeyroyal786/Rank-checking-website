export function normalizeDomain(input: string): string {
  const raw = input.trim();
  if (!raw) throw new Error('Enter a website domain.');
  let url: URL;
  try { url = new URL(raw.includes('://') ? raw : `https://${raw}`); }
  catch { throw new Error('Enter a valid website URL, for example example.com.'); }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP and HTTPS websites are supported.');
  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (!host.includes('.') || host.includes('localhost')) throw new Error('Enter a public domain name.');
  return host;
}
