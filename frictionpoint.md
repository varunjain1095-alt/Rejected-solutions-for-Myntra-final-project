# Solution 1: Advanced Filtering — Friction Test Cases

Rejected solution demo friction points for reviewers. Test on tab **1. Filtering**.

---

## Case 1: Attributes, not memory

**Friction:** Filtered items look good on paper, but nothing restores *why* you saved them.

**How to test:**
1. Go to **1. Filtering**
2. Open filters (☰) and apply something reasonable: e.g. **4★+**, **In stock**, sort **Highest Rated**
3. Scroll the shortlist and read a few cards

**Pass if:** You see brand, price, rating, delivery only. **No "why I added this"** anywhere.

---

## Case 2: Over-filtering (empty / near-empty)

**Friction:** Too many filters and the list collapses to nothing.

**How to test:**
1. Open filters
2. Enable **Ready to buy** (In stock + Size M + EXPRESS+ + 4.5★+)
3. Optionally add **4.5★+** and **EXPRESS+ only** if not already implied
4. Tap **Apply**

**Pass if:** You see **"No items match your filters"** or only **0–2 items**. Count line shows something like **"Showing 0 of 42"** (or very low).

---

## Case 3: Wrong winner

**Friction:** Sorting by deals promotes irrelevant cheap items.

**How to test:**
1. **Clear all** filters
2. Sort by **Highest Discount**
3. Check what rises to the top

**Pass if:** Cheap/high-discount items dominate (e.g. **Tokyo Talkies tee ₹186**, **Biotic powders**, **sandals under ₹500**), not items you'd realistically care about for a forgotten reason.

---

## Case 4: Filter tinkering

**Friction:** You keep adjusting filters; cognitive load shifts to filters, not recall.

**How to test:**
1. Apply several filters in sequence and watch **"Showing X of 42"** jump, e.g.:
   - **50%+ off** → note count
   - Add **Sandals** category → count drops
   - Add **Size 8** → count drops again
   - Add **EXPRESS+** → may hit 0
2. Remove/add filters on/off in the panel

**Pass if:** Count keeps changing (**42 → 18 → 6 → 0 → 3** style), you are **busy tuning filters**, and you still **don't get closer to remembering why** you saved anything.

---

## Quick checklist

| # | Case | Key action | Expected result |
|---|------|------------|-----------------|
| 1 | Attributes, not memory | Smart filters + scroll | Specs only, no "why" |
| 2 | Over-filtering | **Ready to buy** | Empty or near-empty list |
| 3 | Wrong winner | Sort **Highest Discount** | Cheap/irrelevant items on top |
| 4 | Filter tinkering | Stack multiple filters | Count jumps, no recall help |

**Tip:** Tap **Take tour** on the **1. Filtering** tab for a guided walkthrough of these same cases.

---

# Solution 2: Chatbot Filtering — Friction Test Cases

Rejected solution demo friction points for reviewers. Test on tab **2. Chatbot**.

---

## Case 1: Blank / vague prompt

**Friction:** You open the chat and do not know what to ask. The whole problem is you forgot *why* you saved things, so you cannot describe what you want.

**How to test:**
1. Go to **2. Chatbot**
2. Tap **Ask AI** (floating pill, bottom-right)
3. Read the opening line: *"Tell me what you are looking for in your wishlist…"*
4. Pause at the empty input. Do not send yet.

**Pass if:** You feel the **ask burden** immediately. Placeholder hints (*best deals*, *something for a trip*) do not help you recall why you saved anything. You are stuck before typing a word.

**Optional:** Type something vague like **help** or **not sure** and send. Bot asks a clarifying question but still gives **no progress** on recall.

---

## Case 2: Multi-turn tax

**Friction:** Vague queries trigger follow-up questions. You are typing and answering in a scroll moment when you wanted to skim and tap.

**How to test:**
1. With **Ask AI** open, type **something for a trip** and tap **Send**
2. Bot asks: *"What kind of trip is it? Beach, city, or formal event?"*
3. Wait a moment. A second follow-up appears: *"Also, what is your budget range?"*
4. Notice the wishlist grid behind the chat sheet: still **42 items**, nothing narrowed yet.

**Pass if:** You have **2+ bot turns** before any products appear. You are **doing conversational work** during passive browse, and the grid has **not helped you remember** why anything is saved.

---

## Case 3: Confident wrong filter

**Friction:** The bot returns a plausible answer that surfaces the wrong items: cheap deals, not items you actually care about.

**How to test:**
1. In **Ask AI**, type **best deals** and tap **Send**
2. Bot replies with a short summary and the grid narrows to **5 items**
3. Check what surfaced

**Pass if:** Results are **cheap / high-discount** picks, e.g.:
- **Tokyo Talkies Graphic Printed T-shirt** (₹186, 78% off)
- **Biotic Amla Reetha Shikakai Powders** (₹168–273)
- **AJANTA SHOES Comfort Sandals** (₹499)
- **Renee Makeup Fix Setting Spray** (₹315)

Bot sounds confident. Items look like "deals." Still **no link to why you saved them**.

---

## Case 4: Conversation without recontext

**Friction:** Even when the bot narrows the list successfully, every card shows specs only. Attributes, never *why you added this*.

**How to test:**
1. After **best deals** (Case 3), close the chat sheet (✕) or leave it open
2. Scroll the **5 highlighted items** in the grid
3. Read brand, price, rating, delivery on each card

**Pass if:** Shortlist is cleaner, but **every card is specs-only**. No saved reason, occasion, note, or memory cue anywhere. Conversation **filtered attributes**, not **restored context**.

**Reset:** Switch to another tab and back to **2. Chatbot**, or refresh, to clear the highlight filter before the next case.

---

## Quick checklist

| # | Case | Key action | Expected result |
|---|------|------------|-----------------|
| 1 | Blank / vague prompt | Open **Ask AI**, pause at input | Ask burden, no recall help |
| 2 | Multi-turn tax | Type **something for a trip** | 2+ follow-ups, grid still 42 |
| 3 | Confident wrong filter | Type **best deals** | Cheap/irrelevant deals on top |
| 4 | No recontext | Scroll narrowed results | Specs only, no "why saved" |

**Tip:** Tap **Take tour** on the **2. Chatbot** tab for a guided walkthrough of these same cases.

**Note:** Free-form prompts (anything other than the cached paths above) call OpenAI. **best deals** and **something for a trip** use cached responses so friction is repeatable without API cost.

---

# Solution 3: Prioritisation — Friction Test Cases

Rejected solution demo friction points for reviewers. Test on tab **3. Priority**.

---

## Case 1: Looks convincing

**Friction:** Priority sections feel helpful and in-control at first glance. Organising *looks* like progress.

**How to test:**
1. Go to **3. Priority**
2. Tag **3–4 items** with different pills: tap **Soon** on one card, **Maybe** on another, **Later** on a third
3. Scroll up and watch the list **reorganise** into section headers

**Pass if:** You see grouped sections like **Buy soon (N)**, **Maybe (N)**, **Later (N)**, **Undecided (N)**. It feels structured and productive, like you are getting the wishlist under control.

---

## Case 2: Same evaluation load

**Friction:** Reordering does not reduce the decision set. You still have 42 items to evaluate.

**How to test:**
1. After tagging several items (Case 1), look at the **header**
2. Count items across all sections (Soon + Maybe + Later + Undecided)

**Pass if:** Header still says **42 items**. Nothing was removed, archived, or resolved. You only changed **order and grouping**, not how many decisions remain.

---

## Case 3: Priority fatigue

**Friction:** Tagging items across a 42-item list becomes meta-work on top of the original problem. Most items stay undecided.

**How to test:**
1. Try tagging **8–10 more items** across Soon / Maybe / Later (scroll and tap pills)
2. Watch the **Undecided** section count as you go
3. Ask yourself: would you tag all **42** items this way during a commute scroll?

**Pass if:** **Undecided** stays the largest section (e.g. **30+ items**). Tagging feels like **extra work** on top of deciding what to buy. You are managing labels, not recovering why you saved anything.

**Reset tip:** Tap an active pill again (Soon / Maybe / Later) to clear that item's tag.

---

## Case 4: No recontext at top

**Friction:** Even your top-priority "Buy soon" items show specs only. Priority does not restore *why* you added them.

**How to test:**
1. Ensure at least **one item** is tagged **Soon** so **Buy soon** appears at the top
2. Open that section and read the **first card** in full: brand, price, rating, delivery, priority pills

**Pass if:** Top of **Buy soon** is still **brand / price / specs only**. No saved reason, occasion, note, or memory cue. Priority sorted the list but did **not recontext** any item.

---

## Quick checklist

| # | Case | Key action | Expected result |
|---|------|------------|-----------------|
| 1 | Looks convincing | Tag 3–4 items, scroll sections | Feels organised and in-control |
| 2 | Same evaluation load | Check header after tagging | Still **42 items** total |
| 3 | Priority fatigue | Tag 8–10 more items | **Undecided** pile stays large |
| 4 | No recontext at top | Read first **Buy soon** card | Specs only, no "why saved" |

**Tip:** Tap **Take tour** on the **3. Priority** tab for a guided walkthrough of these same cases.

**Note:** Priority tags persist in **localStorage** between sessions. Refresh the page or clear tags manually if you want a clean slate.

---

# Solution 4: Always-On Info Tiles — Friction Test Cases

Rejected solution demo friction points for reviewers. Test on tab **4. Info Tiles**.

---

## Case 1: Visual clutter

**Friction:** Every card is taller. A 42-item list feels heavier and harder to scan.

**How to test:**
1. Go to **4. Info Tiles**
2. Scroll through **10–15 cards** without stopping
3. Compare mentally to **1. Filtering** or **3. Priority** (same grid, no extra rows)

**Pass if:** Each card has **2 extra lines** below delivery (sizes + returns). The list feels **denser and slower to skim**. You see fewer products per screen.

---

## Case 2: Uniform sameness

**Friction:** Every card uses the same info block structure, so items blur together at a glance.

**How to test:**
1. Stay on **4. Info Tiles**
2. Scroll quickly through **6–8 cards in a row**
3. Glance at the grey info rows without reading titles closely

**Pass if:** Every card shows the same pattern:
- `Sizes: … available`
- `7-day returns · Free exchange`

Cards look **structurally identical**. Harder to spot what makes each item distinct.

---

## Case 3: Static irrelevance

**Friction:** Same size/return rows on sarees, sandals, and lip gloss. Equal weight, wrong context.

**How to test:**
1. Use category bubbles to jump between unlike items, or scroll until you spot:
   - A **Sarees** item (e.g. **KALINI** or **Tradivibe**)
   - A **Sandals** item (e.g. **HRX** or **Roadster**)
   - A **Beauty** item (e.g. **Simple** face wash or **Renee** spray)
2. Read the info tiles on each

**Pass if:** All three show the **same tile types** (sizes + returns) with similar formatting. Nothing adapts to category or why you might have saved it. A saree and a lip gloss get the **same permanent treatment**.

**Bonus:** Find **Biotic Amla Reetha Shikakai Powders** for an **Only 2 left** urgency tile. Still static purchase facts, not recall.

---

## Case 4: No recontext

**Friction:** You read size and returns on the top item. Purchase facts only. Zero "why I added this."

**How to test:**
1. Scroll to the **first visible card** at the top of the list
2. Read everything below the image: brand, title, price, delivery, **sizes row**, **returns row**

**Pass if:** All readable text is **specs and policy**. No saved reason, occasion, note, or memory cue anywhere on the card.

---

## Quick checklist

| # | Case | Key action | Expected result |
|---|------|------------|-----------------|
| 1 | Visual clutter | Scroll 10–15 cards | Taller cards, harder to scan |
| 2 | Uniform sameness | Quick-scroll 6–8 cards | Same tile pattern on every card |
| 3 | Static irrelevance | Compare Sarees / Sandals / Beauty | Same rows, wrong context |
| 4 | No recontext | Read top card fully | Specs + policy only, no "why saved" |

**Tip:** Tap **Take tour** on the **4. Info Tiles** tab for a guided walkthrough of these same cases.

**Contrast note:** This solution adds **permanent, uniform** purchase facts. The actual solution is **on-demand and situation-aware** recall of *why* each item was saved.

---

# Solution 5: Multi-Item Comparison — Friction Test Cases

Rejected solution demo friction points for reviewers. Test on tab **5. Compare**.

---

## Case 1: Sounds obvious, feels smart

**Friction:** Compare mode with checkboxes and a side-by-side table looks like the right feature for a wishlist.

**How to test:**
1. Go to **5. Compare**
2. Tap the **Compare** icon in the header (beside the bag)
3. Notice **Compare** checkboxes appear on each card
4. Select **any two items** and tap the sticky **Compare (2)** bar at the bottom

**Pass if:** The flow feels polished and intentional: selection mode, bottom bar, full-screen table. It **looks like the obvious solution** someone would propose in a review.

---

## Case 2: Spec comparison, no intent

**Friction:** The table shows purchase specs only. There is no "why I added this" column.

**How to test:**
1. With the comparison modal open, read every row:
   - Brand, Price, Rating, Sizes, Delivery, Discount, Category
2. Read the footer note at the bottom of the modal

**Pass if:** Rows are **specs only**. Green **best** highlights on price/rating/discount imply a winner. Footer says *"Spec comparison only. No column for why you saved these items."* Nothing restores **intent or memory**.

---

## Case 3: Apples to oranges

**Friction:** You can compare unrelated cross-category items. The table treats them as interchangeable SKUs.

**How to test:**
1. Close the modal (✕) if open. Stay in compare mode.
2. Select two unlike items, e.g.:
   - A **Sarees** item (e.g. **KALINI Floral Beads and Stones Saree**)
   - A **Sandals** item (e.g. **HRX by Hrithik Roshan Men Comfort Sandals**)
3. Tap **Compare (2)** again

**Pass if:** The table renders cleanly side by side. **Size, price, and discount rows** compare a saree and sandals as if they were the same decision. Category row shows different values but the UI still pushes you toward picking a **"best"** on price or discount.

**Alternate pair:** **Sarees** vs **Beauty** (e.g. **Simple** face wash) for the same effect.

---

## Case 4: More evaluation, not less

**Friction:** Side-by-side specs add cognitive load. You still do not know what to choose or why either item mattered.

**How to test:**
1. After viewing the cross-category comparison (Case 3), ask:
   - Did this make the decision **easier**?
   - Do you know **which one to buy** now?
   - Do you remember **why you saved either one**?
2. Try a same-category pair (e.g. two **Sandals**) and repeat

**Pass if:** Even with a "fair" comparison, you are **studying a spec sheet**, not recovering context. Same-category compare is slightly less absurd but still **no easier to decide** without knowing why each item was saved.

**Reset:** Tap **Compare** in the header to exit selection mode, or switch tabs.

---

## Quick checklist

| # | Case | Key action | Expected result |
|---|------|------------|-----------------|
| 1 | Sounds obvious, feels smart | Enable compare, pick 2, open table | Polished, "right" feature feel |
| 2 | Spec comparison, no intent | Read all rows + footer | Specs only, no "why saved" |
| 3 | Apples to oranges | Compare Sarees vs Sandals | Meaningless side-by-side specs |
| 4 | More evaluation, not less | Reflect after comparing | Spec sheet work, no easier decision |

**Tip:** Tap **Take tour** on the **5. Compare** tab for a guided walkthrough of these same cases.

**Note:** Max **2 items** at a time on mobile. Selecting a third replaces the older pick.
