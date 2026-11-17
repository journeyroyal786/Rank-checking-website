import type { SeoReport } from './types';
const base = 'https://api.dataforseo.com/v3';
function auth() {
  const login = process.env.DATAFORSEO_LOGIN, password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) return null;
  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
}
async function post(path: string, body: unknown) {
  const authorization = auth();
  if (!authorization) throw new Error('DataForSEO credentials are not configured.');
  const response = await fetch(`${base}${path}`, { method:'POST', headers:{Authorization:authorization,'Content-Type':'application/json'}, body:JSON.stringify(body), cache:'no-store' });
  if (!response.ok) throw new Error(`SEO data provider returned HTTP ${response.status}.`);
  const json = await response.json();
  if (json.status_code && json.status_code >= 40000) throw new Error(json.status_message || 'SEO data provider request failed.');
  return json;
}
export async function fetchDomainReport(domain: string, locationName = 'United States'): Promise<Partial<SeoReport>> {
  const [overview, ranked] = await Promise.all([
    post('/dataforseo_labs/google/domain_rank_overview/live',[{target:domain,location_name:locationName,language_name:'English'}]),
    post('/dataforseo_labs/google/ranked_keywords/live',[{target:domain,location_name:locationName,language_name:'English',limit:100,order_by:['keyword_data.keyword_info.search_volume,desc']}])
  ]);
  const task = overview.tasks?.[0]?.result?.[0];
  const info = task?.items?.[0] ?? task?.items?.[0]?.metrics ?? task?.metrics ?? {};
  const metrics = info.metrics?.organic ?? info.organic ?? {};
  const paid = info.metrics?.paid ?? info.paid ?? {};
  const rows = ranked.tasks?.[0]?.result?.[0]?.items ?? [];
  return {
    estimatedOrganicTraffic: metrics.etv ?? null, estimatedPaidTraffic: paid.etv ?? null,
    organicKeywords: metrics.count ?? null, paidKeywords: paid.count ?? null,
    topKeywords: rows.map((r:any)=>({keyword:r.keyword_data?.keyword ?? '',position:r.ranked_serp_element?.serp_item?.rank_group ?? r.ranked_serp_element?.serp_item?.rank_absolute ?? null,volume:r.keyword_data?.keyword_info?.search_volume ?? null,cpc:r.keyword_data?.keyword_info?.cpc ?? null,url:r.ranked_serp_element?.serp_item?.url ?? ''})).filter((k:any)=>k.keyword),
    provider:'DataForSEO Labs API', mode:'live'
  };
}
