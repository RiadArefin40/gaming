import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🎮 GAME CALLBACK RECEIVED');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Empty body — callback not parsed',
    });
  }

  const {
    mobile,
    bet_amount,
    win_amount,
    game_uid,
    game_round,
    token,
    wallet_before,
    wallet_after,
    change,
    currency_code,
    timestamp,
  } = req.body;

  console.table({
    mobile,
    bet_amount,
    win_amount,
    game_uid,
    game_round,
    token,
    wallet_before,
    wallet_after,
    change,
    currency_code,
    timestamp,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Callback received',
  });
}
