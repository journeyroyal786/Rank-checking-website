import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({status:'ok',dataForSeoConfigured:Boolean(process.env.DATAFORSEO_LOGIN&&process.env.DATAFORSEO_PASSWORD),similarwebConfigured:Boolean(process.env.SIMILARWEB_API_KEY),supabaseConfigured:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}); }
