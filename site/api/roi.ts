import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/roi/calculate
 * Calculates ROI for a given niche based on spend/revenue data
 * Replaces SovereignTrafficV2 predictive engine
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { niche_id, spend, revenue, impressions, clicks } = req.body;

  if (!niche_id || spend === undefined || revenue === undefined) {
    return res.status(400).json({ error: 'Missing required fields: niche_id, spend, revenue' });
  }

  const roi = spend > 0 ? revenue / spend : 0;
  const conversion_rate = clicks && impressions ? clicks / impressions : 0;

  return res.status(200).json({
    niche_id,
    roi: Math.round(roi * 100) / 100,
    conversion_rate: Math.round(conversion_rate * 10000) / 10000,
    recommendation: roi >= 2.0 ? 'AGGRESSIVE_SCALE' : roi >= 1.0 ? 'MODERATE_SCALE' : roi >= 0.5 ? 'HOLD' : 'CUT',
    timestamp: Date.now()
  });
}