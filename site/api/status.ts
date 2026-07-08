import type { VercelRequest, VercelResponse } from '@vercel/node';

// Neon connection config
const NEON_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_I86xnpAgqkQR@ep-damp-band-at4rkjsr-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

/**
 * GET /api/status
 * Health check and system status endpoint
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const uptime = process.uptime();
  
  return res.status(200).json({
    status: 'operational',
    version: '5.0.0',
    phase: 'Global Conquest',
    services: {
      neon: 'configured',
      supabase: 'pending',
      vercel: 'active'
    },
    metrics: {
      uptime_seconds: Math.floor(uptime),
      active_niches: 110,
      markets: ['BR', 'US', 'LATAM']
    },
    timestamp: Date.now()
  });
}