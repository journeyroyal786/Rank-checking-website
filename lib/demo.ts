import type { SeoReport } from './types';
export function demoReport(domain: string): SeoReport {
  const months = ['Dec 2025','Jan 2026','Feb 2026','Mar 2026','Apr 2026','May 2026','Jun 2026','Jul 2026','Aug 2026','Sep 2026','Oct 2026','Nov 2026'];
  const organic = [18400,19100,20500,21800,22400,23900,25100,24700,26300,27800,29100,30500];
  const paid = [2100,2300,2200,2600,2400,2700,2900,2800,3100,3300,3200,3500];
  return { domain, generatedAt: new Date().toISOString(), mode: 'demo', provider: 'Illustrative demo dataset', estimatedOrganicTraffic: 30500, estimatedPaidTraffic: 3500, organicKeywords: 4280, paidKeywords: 310, backlinks: 18400, referringDomains: 1260,
    monthlyTraffic: months.map((month,i)=>({month,organic:organic[i],paid:paid[i],total:organic[i]+paid[i]})),
    topKeywords: [
      {keyword:`${domain.split('.')[0]} services`,position:2,volume:8100,cpc:1.85,url:`https://${domain}/`},
      {keyword:'best products online',position:4,volume:6600,cpc:2.1,url:`https://${domain}/products`},
      {keyword:'buy online UAE',position:7,volume:5400,cpc:1.25,url:`https://${domain}/`},
      {keyword:'affordable online store',position:9,volume:2900,cpc:0.92,url:`https://${domain}/shop`},
      {keyword:'same day delivery UAE',position:12,volume:2400,cpc:1.4,url:`https://${domain}/delivery`}
    ], competitors:[{domain:'example-competitor.com',sharedKeywords:320,estimatedTraffic:22100},{domain:'sample-marketplace.com',sharedKeywords:185,estimatedTraffic:17400}],
    trafficSources:[{name:'Organic search',value:48,estimated:true},{name:'Direct',value:25,estimated:true},{name:'Paid search',value:10,estimated:true},{name:'Referral',value:9,estimated:true},{name:'Social',value:8,estimated:true}],
    notes:['DEMO DATA ONLY: all numeric metrics and sample competitor domains are illustrative, not measurements of this website.','Connect DataForSEO to retrieve domain ranking, keyword and competitor estimates.','Connect a licensed Similarweb API plan to retrieve estimated visits, engagement and channel mix.','For exact first-party clicks, impressions and queries, connect Google Search Console for a verified property.']
  };
}
