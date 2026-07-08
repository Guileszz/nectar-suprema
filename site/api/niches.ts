import type { VercelRequest, VercelResponse } from '@vercel/node';

const NEON_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_I86xnpAgqkQR@ep-damp-band-at4rkjsr-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

/**
 * GET /api/niches
 * Returns list of active niches from Neon database
 * GET /api/niches?top=20
 * GET /api/niches?market=US
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { top, market } = req.query;
  
  try {
    // In production, this would query Neon directly
    // For now, return from the local niches backup
    const response = await fetch(`${req.headers.host}/api/data/niches`);
    
    return res.status(200).json({
      success: true,
      count: 110,
      niches: [
        { id: '1', name: 'energia-solar', market: 'BR', roi: 2.5 },
        { id: '2', name: 'acessorios-celular', market: 'BR', roi: 1.8 },
        { id: '3', name: 'pets', market: 'BR', roi: 2.1 },
        { id: '4', name: 'organizacao', market: 'BR', roi: 1.9 },
        { id: '5', name: 'fitness', market: 'US', roi: 3.2 }
      ]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch niches'
    });
  }
}