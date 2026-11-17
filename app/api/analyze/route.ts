import { NextResponse } from 'next/server';
import { z } from 'zod';
import { normalizeDomain } from '@/lib/domain';
import { demoReport } from '@/lib/demo';
import { fetchDomainReport } from '@/lib/dataforseo';
import type { SeoReport } from '@/lib/types';
const schema = z.object({ website:z.string().min(3), mode:z.enum(['auto','demo']).default('auto'), region:z.enum(['United States','United Arab Emirates','United Kingdom','India','Worldwide']).default('United States') });
export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const domain = normalizeDomain(body.website);
    if (body.mode === 'demo') return NextResponse.json(demoReport(domain));
    if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) return NextResponse.json(demoReport(domain));
    const report = demoReport(domain) as SeoReport;
    const live = await fetchDomainReport(domain, body.region === 'Worldwide' ? 'United States' : body.region);
    Object.assign(report, live, {domain, generatedAt:new Date().toISOString(), mode:'live', notes:[
      'Organic and paid traffic values are third-party estimates, not analytics access to the target website.',
      'Ranking and search-volume coverage depends on the selected country, language, provider database and subscription.',
      'Traffic-source distribution requires a licensed Similarweb API integration; demo channel percentages are not used in live mode.'
    ],trafficSources:[]});
    return NextResponse.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to analyze this website.';
    return NextResponse.json({error:message},{status:400});
  }
}
