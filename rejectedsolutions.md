# Rejected Solutions

Demos of 5 rejected approaches for the Myntra wishlist problem. Each demo is built on a shared wishlist shell (42 products from `screenshots/`) so reviewers can **use** the approach and **feel its friction**.

**Core problem:** Retroactive interference — users forget *why* they added an item. Conversion suffers because wishlist items lack recontextualization, not because users can't find them.

**Actual solution (main project):** Help users remember why they added each item.

**Rejected solutions:** Workarounds that improve discoverability or nudges without restoring intent/memory.

**Build standard:** ~2–3 hours per solution (first includes shared shell). Interactive, recognisable, friction-first — not pixel-perfect or production-grade.

---

## Solution 1 — Advanced Filtering

### What it is

An **advanced filter panel** on the Myntra wishlist that lets users narrow 42 saved items by stock, delivery, ratings, price, brand, category, size, color, and composite "ready to buy" rules — plus sort options.

### Essence

Treats the wishlist as a **catalog search problem**. Filters surface items by objective attributes (price, speed, ratings, availability) but do **nothing to restore why the user saved something**. Users may get a "better" shortlist and still not remember their original intent — or filter toward the wrong items entirely.

### Friction cases (reviewer must experience all 4)

| # | Friction | Demo behavior |
|---|----------|---------------|
| 1 | **Attributes, not memory** | Filtered shortlist looks strong on paper (high ratings, fast delivery) but items still show no "why I added this" |
| 2 | **Over-filtering** | Ready to buy + 4.5★ + EXPRESS+ + size M → 0–2 items or empty state: "No items match your filters" |
| 3 | **Wrong winner** | Sort by highest discount / lowest price promotes irrelevant cheap items (e.g. Tokyo Talkies tee) over items saved for a specific occasion |
| 4 | **Filter tinkering** | Active filter chips + count jumping (42 → 18 → 6 → 0 → 3); cognitive load shifts to adjusting filters, not recalling intent |

### UI placement

- **Entry point:** Header-right filter/sort icon (already in reference UI `IMG_9610`) opens a **bottom sheet** panel.
- **Category circles** (Sandals, Sarees, etc.) stay as quick browse; advanced filters live in the panel.
- **Active filters:** Removable chips below header; live count line: "Showing X of 42 items".
- **Optional preset chip:** "Ready to buy" toggle to surface empty-state friction quickly.

### Filters

**Strong fits** (from screenshot data)

| Filter | Options |
|--------|---------|
| Availability | In stock · Out of stock |
| Delivery | EXPRESS+ / M EXPRESS only · By Aug 27 · Aug 28 · Aug 29 |
| Rating | 4★+ · 4.5★+ · Below 4★ |
| Price range | Under ₹500 · ₹500–1000 · ₹1000+ |
| Discount | 50%+ off · Price dropped only |
| Brand | Multi-select (from 42-product catalog) |
| Category | Sandals · Tshirts · Sarees · Pendant · Hair Masks · Co-ord · etc. |

**Good additions** (light mock metadata)

| Filter | Options |
|--------|---------|
| Size available | XS · S · M · L · XL |
| Color | Multi-select per product (2–3 colors mocked) |
| Sort | Price low→high · Highest discount · Fastest delivery · Highest rated · Recently added |

**Optional** (extra friction, same panel)

| Filter | Options |
|--------|---------|
| Ready to buy | Toggle: in stock + my size + fast delivery (composite AND) |
| Filter logic | Implicit AND across all active filters |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Wishlist Page (shared shell)                           │
│  ┌─────────────┐  ┌──────────────────────────────────┐│
│  │ Header      │  │ Filter icon → opens bottom sheet ││
│  │ 42 items    │  │ Active filter chips + count line ││
│  └─────────────┘  └──────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │ Product Grid (2-col) ← filteredProducts[]           ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
         │                          ▲
         ▼                          │
┌─────────────────┐      ┌──────────────────────┐
│ products.json   │      │ filterEngine.js      │
│ (42 items)      │─────▶│ - applyFilters()     │
│ - id, brand     │      │ - applySort()        │
│ - price, rating │      │ - getActiveCount()   │
│ - stock, delivery│     │ - AND logic          │
│ - category      │      └──────────────────────┘
│ - sizes[] (mock)│
│ - colors[] (mock)│
└─────────────────┘
         ▲
         │
┌─────────────────┐
│ /assets/products│  ← cropped images from screenshots/
└─────────────────┘
```

**Stack:** Static web app (HTML/CSS/JS or React). No backend. All filter logic client-side on `products.json`.

**State:** `activeFilters`, `sortBy`, `filteredProducts` derived from `products` on every change.

### Implementation plan

**Step 1 — Shared wishlist shell + catalog (~1–1.5 hr)**

- Build recognisable Myntra wishlist layout (header, grid, product cards).
- Create `products.json` from 42 screenshots: crop images, transcribe brand/title/price/rating/stock/delivery/discount/category.
- Add mocked `sizes[]` and `colors[]` per product for size/color filters.

**Step 2 — Filter panel + friction (~1–1.5 hr)**

- Wire header filter icon → bottom sheet with all filter groups + sort.
- Implement `filterEngine` (AND logic, sort, live count).
- Render active filter chips; empty state for over-filtering.
- Seed preset path: "Ready to buy + 4.5★" → empty/near-empty; sort by discount → wrong winner visible.

### Success criteria

- Reviewer can open filters, apply combinations, and see the grid update live.
- All 4 friction cases are reachable within ~2 minutes of interaction.
- Build completes in ~2–3 hours total (shell + filters).

---

## Solution 2 — Chatbot Filtering

### What it is

An **AI chatbot** on the Myntra wishlist that lets users describe what they're looking for in natural language. The bot parses intent, asks follow-up questions, and filters/highlights products from the 42-item wishlist.

### Essence

Shifts the problem onto the user: **"Tell me what you want."** But the whole issue is they **don't know what they're missing** — they've lost the context of why items were saved. A chatbot also demands **typing and conversation** during a **commute-scroll moment** when users want to skim and tap, not dialogue. Fails the **M-Live lesson**: passive browse contexts don't support active conversational effort. Even when the bot filters successfully, it surfaces attributes — never *why you added this*.

### Friction cases (reviewer must experience all 4)

| # | Friction | Demo behavior |
|---|----------|---------------|
| 1 | **Blank / vague prompt** | User opens chat, doesn't know what to type → generic "What are you looking for?" — no progress |
| 2 | **Multi-turn tax** | "Something for a trip" → bot asks 2–3 clarifying questions before showing anything — effort in a scroll moment |
| 3 | **Confident wrong filter** | "Show me best deals" → bot returns cheap/high-discount items — wrong winner, still no "why" |
| 4 | **Conversation without recontext** | Bot narrows to 5 items with helpful summaries — specs and attributes only, never why you saved them |

### UI placement

- **Entry point:** Floating **"Ask AI"** pill or chat bubble (bottom-right) over the wishlist grid — or header chip beside filter icon.
- Opens a **half-height chat sheet**; wishlist remains visible behind to show the interrupt of scroll flow.
- Opening prompt: *"Tell me what you're looking for…"* — surfaces the ask burden immediately.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Wishlist Page (shared shell)                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Product Grid ← highlighted/filtered by bot response ││
│  └─────────────────────────────────────────────────────┘│
│                              ┌──────────────────────────┐│
│                              │ "Ask AI" floating button ││
│                              └───────────┬──────────────┘│
└──────────────────────────────────────────┼──────────────┘
                                           ▼
                              ┌────────────────────────────┐
                              │ ChatPanel (half sheet)     │
                              │ - message list             │
                              │ - text input + send        │
                              │ - typing indicator         │
                              └─────────────┬──────────────┘
                                            │
                                            ▼
                              ┌────────────────────────────┐
                              │ OpenAI API (gpt-4o-mini)   │
                              │ system prompt:             │
                              │   42-item catalog summary  │
                              │   "help user find items"   │
                              │ returns:                   │
                              │   { message, productIds[] }│
                              │   or clarifying question   │
                              └─────────────┬──────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
         ┌──────────────────┐                          ┌──────────────────┐
         │ products.json    │                          │ cachedResponses  │
         │ (shared catalog) │                          │ (preset friction │
         └──────────────────┘                          │  paths, no API)  │
                                                       └──────────────────┘
```

**Stack:** Shared wishlist shell + chat UI. OpenAI API via lightweight backend route or direct client call. **gpt-4o-mini** to stay within ~$3.4 credit budget.

**Credit safety:** Compact product list in system prompt (id, brand, title, price, category). Cached local responses for preset friction paths ("best deals", blank send). Cap ~10 messages per session.

**State:** `messages[]`, `highlightedProductIds[]`, `isChatOpen`.

### Implementation plan

**Step 1 — Chat UI + wishlist integration (~1 hr)**

- Floating "Ask AI" entry point + half-sheet chat (messages, input, send).
- Wishlist grid reacts when bot returns `productIds` (filter or highlight).
- Empty/vague state UI on open (friction #1).

**Step 2 — OpenAI wire-up + friction paths (~1–1.5 hr)**

- API call with product catalog in system prompt; parse `{ message, productIds[] }` from response.
- Multi-turn clarifying behavior for vague queries (friction #2).
- Cached responses for "best deals" and blank prompt (friction #3 & #4).
- Bot responses deliberately exclude "why you added this" — by design.

### Success criteria

- Reviewer can open chat, type (or hesitate), and experience all 4 friction cases within ~2 minutes.
- Real OpenAI responses for free-form input; cached paths for repeatable demo friction.
- Build completes in ~1–2 hours on top of shared wishlist shell (~2–3 hr if shell not yet built).

---

## Solution 3 — Prioritisation & Reorganisation

### What it is

**Priority buttons** on each wishlist product card (Soon · Maybe · Later) that **reorganise the 42-item list** into grouped sections by priority. Optional drag-to-reorder within sections.

### Essence

From **choice research**: **reordering without reducing or resolving leaves the same evaluation work.** Users feel productive organising their wishlist, but the decision set stays the same — 42 items to evaluate, just in a different order. It **looks convincing until you use it**: sections feel helpful, yet priority tags don't restore *why* you saved something, and assigning priority across many items adds meta-work on top of the original problem.

### Friction cases (reviewer must experience all 4)

| # | Friction | Demo behavior |
|---|----------|---------------|
| 1 | **Looks convincing** | Priority sections ("Buy soon", "Maybe", "Later", "Undecided") feel helpful and in-control at first |
| 2 | **Same evaluation load** | Header still shows **42 items** after prioritising — count unchanged, only order/sections changed |
| 3 | **Priority fatigue** | Tagging many items high/medium/low becomes meta-work; "Undecided" pile stays large |
| 4 | **No recontext at top** | Top "Buy soon" item still shows brand/price only — no "why I added this" |

### UI placement

- **On each card:** 3-tap priority pill — **Soon · Maybe · Later** (or icon on existing action bar).
- **List reorganises live** into section headers with counts:
  - Buy soon (N) · Maybe (N) · Later (N) · Undecided (N)
- **Header:** Total count stays **"42 items"** regardless of prioritisation — subtle friction signal.
- **Optional:** Drag handle for manual reorder within a section (+~30 min if included).

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Wishlist Page (shared shell)                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Header: "Wishlist · 42 items" (count never drops)   ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─ Buy soon (4) ──────────────────────────────────────┐│
│  │  [cards with priority: "soon"]                      ││
│  ├─ Maybe (12) ────────────────────────────────────────┤│
│  │  ...                                                ││
│  ├─ Later (8) ──────────────────────────────────────────┤│
│  │  ...                                                ││
│  ├─ Undecided (18) ────────────────────────────────────┤│
│  │  ...                                                ││
│  └─────────────────────────────────────────────────────┘│
│  Each card: [Soon · Maybe · Later] priority pills       │
└─────────────────────────────────────────────────────────┘
         │                          ▲
         ▼                          │
┌─────────────────┐      ┌──────────────────────┐
│ products.json   │      │ priorityEngine.js    │
│ (42 items)      │─────▶│ - setPriority()      │
└─────────────────┘      │ - groupBySection()   │
         ▲               │ - getSectionCounts() │
         │               └──────────────────────┘
┌─────────────────┐               ▲
│ priorityState   │───────────────┘
│ { id → soon|    │  persisted in localStorage
│   maybe|later|  │
│   null }        │
└─────────────────┘
```

**Stack:** Client-side only. Priority state in `localStorage` for session persistence. No backend.

**State:** `priorityState` map, `groupedProducts` derived by section + optional manual order.

### Implementation plan

**Step 1 — Priority UI + state (~45 min)**

- Add Soon · Maybe · Later pills/buttons on each product card.
- `priorityState` map + localStorage persistence.
- Live section grouping with header counts (Buy soon / Maybe / Later / Undecided).

**Step 2 — Friction polish (~45 min)**

- Header total stays "42 items" — never reduces with prioritisation.
- Undecided section visible and grows when user only tags a few items.
- No "why added" on any card — top of "Buy soon" is still specs only.

### Success criteria

- Reviewer can tag items, see list reorganise into sections, and feel initial satisfaction fade into same evaluation burden.
- All 4 friction cases reachable within ~2 minutes.
- Build completes in ~1–2 hours on shared wishlist shell.

---

## Solution 4 — Always-On Information Tiles

### What it is

**Permanent information rows** on every wishlist product card — size availability, return policy, and optional stock/non-returnable flags — displayed inline below price and delivery, same as existing metadata. No button, no expand, no on-demand reveal.

### Essence

The weakness isn't that the information is **wrong** — it's that **always-on tiles add clutter** to a list that's already overloaded (42 items), and **static data can't adapt to why the item was saved**. This is the direct contrast with the actual solution: **on-demand and situation-aware** versus **permanent and uniform**. It also makes every tile look **more similar**, which worsens the **retroactive interference** problem rather than solving it.

### Friction cases (reviewer must experience all 4)

| # | Friction | Demo behavior |
|---|----------|---------------|
| 1 | **Visual clutter** | Scroll 42 items — each card is taller; list feels heavier and harder to scan |
| 2 | **Uniform sameness** | Every card has identical info block structure → harder to distinguish items at a glance |
| 3 | **Static irrelevance** | Same size/return rows on sarees, sandals, and lip gloss — equal weight, wrong context |
| 4 | **No recontext** | User reads size + returns on top item — purchase facts only, zero "why I added this" |

### UI placement

Inline below price/delivery, above action bar — mirrors existing Myntra metadata pattern:

```
[Image + rating + Add]
Brand
Title
₹813   59% OFF   ₹1995
Delivery on Aug 28   EXPRESS+
Sizes: M, L, XL available          ← always visible
7-day returns · Free exchange      ← always visible
─────────────────────────────────
🗑  │  📁+  │  ↗
```

**No toggle, no info button, no expand** — permanent and uniform by design.

**Optional third tile (select items only):** stock urgency (`Only 2 left`) or `Non-returnable` badge for variety — not on every card.

### Information tiles

| Tile | Example | Scope |
|------|---------|-------|
| **Size availability** | `Sizes: M, L available` or size chips with ✓/✗ | All 42 products |
| **Return policy** | `7-day returns · Free exchange` | All 42 products |
| **Stock urgency** (optional) | `Only 2 left` | Select items only |
| **Non-returnable** (optional) | `Non-returnable` | Select items only |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Wishlist Page (shared shell)                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ProductCard (taller than baseline)                  ││
│  │   ├── image, brand, title, price, delivery        ││
│  │   ├── SizeRow        ← always rendered              ││
│  │   ├── ReturnRow      ← always rendered              ││
│  │   ├── StockRow?      ← select items only            ││
│  │   └── action bar                                    ││
│  └─────────────────────────────────────────────────────┘│
│  × 42 items → visual clutter on scroll                  │
└─────────────────────────────────────────────────────────┘
         ▲
         │
┌─────────────────┐
│ products.json   │
│ (42 items)      │
│ + sizesAvailable│
│ + returnPolicy  │
│ + stockLevel?   │
│ + nonReturnable?│
└─────────────────┘
```

**Stack:** Display-only. No interaction logic on tiles. Mock metadata on all 42 products. Fastest rejected solution — mostly UI additions to existing card template.

**Contrast with actual solution:**

| Rejected #4 | Actual solution |
|-------------|-----------------|
| Permanent tiles on every card | On-demand, when relevant |
| Same info for all items | Situation-aware per item |
| More visual sameness | Restores distinct *why* |
| Adds noise to overloaded list | Restores context |

### Implementation plan

**Step 1 — Mock metadata (~30 min)**

- Extend `products.json`: `sizesAvailable[]`, `returnPolicy` on all 42 products.
- Optional: `stockLevel` or `nonReturnable` on ~5–8 select items for variety.

**Step 2 — Always-on tile rows (~45 min)**

- `SizeRow` + `ReturnRow` components on every card, below delivery line.
- Optional third row on select items.
- Taller cards → clutter and sameness visible on scroll (friction #1 & #2 emerge naturally).

### Success criteria

- Reviewer scrolls full list and feels increased visual weight and sameness across tiles.
- All 4 friction cases apparent within ~1–2 minutes of scrolling.
- Clear contrast with on-demand, situation-aware approach (actual solution).
- Build completes in ~1–1.5 hours on shared wishlist shell.

---

## Solution 5 — Multi-Item Comparison

### What it is

A **compare mode** on the Myntra wishlist that lets users select 2+ products and view them **side-by-side** in a comparison table — price, rating, size availability, delivery, discount, brand. The obvious feature people propose for wishlists: "Just let them compare and decide."

### Essence

Comparison is the suggestion most likely to come up — it sounds obviously right for wishlists. But it **doesn't restore why each item was saved**. It turns the wishlist into a **spec sheet exercise**, adds **more evaluation work** (not less), and makes items look like **interchangeable SKUs**. On a 42-item, cross-category list (sarees, sandals, lip gloss), it enables **apples-to-oranges** comparisons. The user must still **choose what to compare** — same burden as the chatbot: they don't know what they're deciding between. Looks convincing until you use it.

### Friction cases (reviewer must experience all 4)

| # | Friction | Demo behavior |
|---|----------|---------------|
| 1 | **Sounds obvious, feels smart** | Compare flow with checkboxes and side-by-side table looks like the right feature |
| 2 | **Spec comparison, no intent** | Rows show price/rating/delivery — zero "why I added this" column |
| 3 | **Apples to oranges** | User can compare saree vs sandals vs lip gloss — meaningless or misleading comparison |
| 4 | **More evaluation, not less** | Side-by-side spec table increases cognitive load; decision doesn't get easier |

### UI placement

- **Header:** "Compare" toggle enters selection mode.
- **On cards:** Compare checkbox (or "+ Compare" corner affordance).
- **Sticky bottom bar** when 2+ selected: `Compare (N)` fixed CTA.
- **Comparison view:** Full-screen modal with **2 columns** (max 2 on mobile for readability):

```
        │ Item A          │ Item B          │
────────┼─────────────────┼─────────────────┤
 Image  │ [img]           │ [img]           │
 Brand  │ KALINI          │ HRX             │
 Price  │ ₹702            │ ₹585            │
 Rating │ 4.5★            │ 3.1★            │
 Size   │ M, L avail      │ 8, 9 avail      │
 Delivery│ Aug 29         │ Aug 29          │
 Discount│ 63% OFF        │ 71% OFF         │
```

- **Optional per-row "best value" green highlight** — implies a winner when categories aren't comparable (extra friction).

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Wishlist Page (shared shell)                           │
│  compareMode: boolean                                   │
│  selectedIds: string[]  (max 2)                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ProductCard + compare checkbox                      ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │ CompareBar (sticky bottom): "Compare (2)"           ││
│  └─────────────────────────────────────────────────────┘│
└──────────────────────────────┬──────────────────────────┘
                               ▼
                  ┌────────────────────────────┐
                  │ CompareView (full-screen   │
                  │ modal)                     │
                  │ - side-by-side columns     │
                  │ - rows from products.json  │
                  │ - optional row "winner"    │
                  │   highlight                │
                  └─────────────┬──────────────┘
                                │
                  ┌─────────────▼──────────────┐
                  │ products.json (shared)     │
                  │ price, rating, sizes,      │
                  │ delivery, discount, brand  │
                  └────────────────────────────┘
```

**Stack:** Client-side only. Max 2 items on mobile. No smart pairing, no AI suggestions, no saved comparisons.

**State:** `compareMode`, `selectedIds[]`, opens `CompareView` on bar tap.

### Implementation plan

**Step 1 — Selection mode + sticky bar (~45 min)**

- "Compare" toggle in header; checkboxes on cards; `selectedIds` state (max 2).
- Sticky "Compare (N)" bottom bar when 2+ selected.

**Step 2 — Comparison view + friction (~45 min)**

- Full-screen modal with side-by-side rows from existing `products.json` fields.
- No "why added" column — friction #2 & #4 by design.
- Cross-category selection allowed freely — friction #3 emerges naturally.
- Optional green highlight on per-row "best value" for misleading winner effect.

### Success criteria

- Reviewer can select items, open comparison, and feel the "obvious solution" fall flat.
- All 4 friction cases reachable within ~2 minutes.
- Build completes in ~1–2 hours on shared wishlist shell.

---
