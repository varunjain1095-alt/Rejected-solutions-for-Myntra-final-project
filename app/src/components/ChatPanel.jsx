import { useState } from 'react';
import { getCatalogSummary } from '../data/products';
import './ChatPanel.css';

const CACHED = {
  '': {
    message: 'What are you looking for? Try describing an occasion, style, or need.',
    productIds: [],
    needsClarification: true,
  },
  'best deals': {
    message: 'Here are the best deals in your wishlist by discount and price.',
    productIds: ['4', '40', '41', '31', '18'],
    needsClarification: false,
  },
  'something for a trip': {
    message: 'What kind of trip is it? Beach, city, or formal event?',
    productIds: [],
    needsClarification: true,
  },
};

export default function ChatPanel({ open, onClose, onHighlight, products }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Tell me what you are looking for in your wishlist…' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    const key = text.toLowerCase();
    let data = CACHED[key];

    if (!data) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.text,
            })),
            catalogSummary: getCatalogSummary(),
          }),
        });
        data = await res.json();
      } catch {
        data = {
          message: 'Could not reach the assistant. Try "best deals".',
          productIds: [],
          needsClarification: false,
        };
      }
    }

    setMessages((m) => [...m, { role: 'assistant', text: data.message }]);
    if (data.productIds?.length) onHighlight(data.productIds);
    setLoading(false);

    if (data.needsClarification && key.includes('trip')) {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { role: 'assistant', text: 'Also, what is your budget range?' },
        ]);
      }, 600);
    }
  };

  return (
    <div className="chat-overlay">
      <div className="chat-sheet">
        <div className="chat-header">
          <h2>Ask AI</h2>
          <button type="button" onClick={onClose}>✕</button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="chat-bubble assistant">Thinking…</div>}
        </div>
        <div className="chat-input-row">
          <input
            className="tour-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. best deals, something for a trip"
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button type="button" onClick={send} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatFab({ onClick }) {
  return (
    <button type="button" className="chat-fab tour-chat-fab" onClick={onClick}>
      Ask AI
    </button>
  );
}
