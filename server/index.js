import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

const app = express();
const distPath = path.join(rootDir, 'app', 'dist');
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({
      message: 'Chat API is not configured. Try "best deals" or "something for a trip".',
      productIds: [],
      needsClarification: false,
    });
  }

  try {
    const { messages, catalogSummary } = req.body;

    const systemPrompt = `You help users filter their Myntra wishlist. You do NOT know why they saved items.
Catalog (id | brand | title | price | category | rating | inStock):
${catalogSummary}

Respond with JSON only:
{"message":"your reply","productIds":["id1","id2"],"needsClarification":false}
If the query is vague, set needsClarification true and ask ONE follow-up in message.
If they ask for deals/discounts, return cheapest/high-discount items.
Never mention why they added an item. Keep message under 80 words.`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      max_tokens: Number(process.env.OPENAI_MAX_TOKENS) || 512,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    });

    const content = response.choices[0]?.message?.content || '{}';
    res.json(JSON.parse(content));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong. Try asking differently.',
      productIds: [],
      needsClarification: false,
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, chat: Boolean(openai) });
});

if (isProduction) {
  app.use(express.static(distPath, { index: false }));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}${isProduction ? ' (production)' : ' (api only)'}`);
});
