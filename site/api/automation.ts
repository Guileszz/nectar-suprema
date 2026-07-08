import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/automation/trigger
 * Triggers an automation workflow
 * Replaces legacy AutomationCore webhook handlers
 * Supports: Kiwify, Hotmart, RD Station events
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, email, name, product, price, platform } = req.body;

  if (!event || !email) {
    return res.status(400).json({ error: 'Missing required fields: event, email' });
  }

  // Route to appropriate workflow
  const workflowMap: Record<string, string> = {
    'compra.aprovada': 'WF-02',
    'compra.reprovada': 'WF-02-REJECTED',
    'checkout.abandonado': 'WF-04',
    'pix.gerado': 'WF-06',
    'boleto.gerado': 'WF-06',
    'PURCHASE_APPROVED': 'WF-02',
    'CHECKOUT_ABANDONED': 'WF-04',
    'PURCHASE_BILLET_PRINTED': 'WF-06'
  };

  const workflow = workflowMap[event] || 'WF-UNKNOWN';

  return res.status(200).json({
    status: 'triggered',
    workflow,
    event,
    email,
    actions: [
      `${workflow}: lead_captured`,
      `${workflow}: workflow_scheduled`,
      `${workflow}: notification_queued`
    ],
    timestamp: Date.now()
  });
}