/** Each solution tour: 1) where the feature lives 2) how to use it 3) all friction points */
const TOUR_STEP_DEFS = {
  filter: [
    {
      target: '.tour-filter-btn',
      title: 'Where it lives',
      content:
        'Solution 1 adds a Filters icon (☰) in the wishlist header. Only this tab has it. Tap it anytime to narrow the 42 items.',
      placement: 'bottom',
    },
    {
      target: '.tour-sort-select',
      title: 'How to use it',
      content:
        'Pick a sort order, toggle filters (rating, delivery, brand, category), then tap Apply. A count line appears when filters are active.',
      placement: 'top',
    },
    {
      target: '.tour-product-grid',
      title: 'Friction points',
      content:
        '1. Attributes, not memory: Smart filters show brand/price/rating only; no "why I added this"\n2. Over-filtering: Ready to buy stacks filters and the list empties\n3. Wrong winner: Sort Highest Discount puts cheap irrelevant items on top\n4. Filter tinkering: Count jumps (42→18→6→0); busy tuning filters, no recall help',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
  ],
  chat: [
    {
      target: '.tour-chat-fab',
      title: 'Where it lives',
      content:
        'Solution 2 adds an Ask AI pill at the bottom-right of the wishlist. It floats over the grid while you scroll.',
      placement: 'left',
    },
    {
      target: '.tour-chat-input',
      title: 'How to use it',
      content:
        'Type what you want in plain language and tap Send. Try best deals or something for a trip. Matching items highlight in the grid behind the sheet.',
      placement: 'top',
    },
    {
      target: '.tour-product-grid',
      title: 'Friction points',
      content:
        '1. Blank / vague prompt: "Tell me what you want" but you do not know what you are missing\n2. Multi-turn tax: something for a trip leads to 2+ follow-ups before any results; still 42 items\n3. Confident wrong filter: best deals surfaces cheap items (Tokyo Talkies, Biotic powders, sandals)\n4. No recontext: Even narrowed to 5 items, every card is specs only',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
  ],
  priority: [
    {
      target: '.tour-priority-pills',
      title: 'Where it lives',
      content:
        'Solution 3 adds Soon, Maybe, and Later pills on every product card, below price and delivery.',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
    {
      target: '.tour-priority-sections',
      title: 'How to use it',
      content:
        'Tap a pill to tag an item. The list reorganises into Buy soon, Maybe, Later, and Undecided sections with counts.',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
    {
      target: '.tour-item-count',
      title: 'Friction points',
      content:
        '1. Looks convincing: Soon/Maybe/Later sections feel productive at first\n2. Same evaluation load: Header still 42 items; nothing removed\n3. Priority fatigue: Tagging 42 items is meta-work; Undecided pile stays huge\n4. No recontext at top: Top Buy soon card still brand/price/specs only',
      placement: 'bottom',
    },
  ],
  tiles: [
    {
      target: '.tour-info-tiles',
      title: 'Where it lives',
      content:
        'Solution 4 adds two grey info rows on every card: size availability and return policy. They are always visible, no expand.',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
    {
      target: '.tour-first-card',
      title: 'How to use it',
      content:
        'Scroll the wishlist. Every card shows the same tile pattern. Optional urgency (Only 2 left) appears on select items only.',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
    {
      target: '.tour-product-grid',
      title: 'Friction points',
      content:
        '1. Visual clutter: Every card is taller; 42 items harder to scan\n2. Uniform sameness: Same Sizes + Returns block on every card; items blur together\n3. Static irrelevance: Saree, sandals, lip gloss get identical treatment\n4. No recontext: Size/returns are purchase facts, not why you saved it',
      placement: 'top',
      scrollTarget: '.tour-scroll-root',
    },
  ],
  compare: [
    {
      target: '.tour-compare-btn',
      title: 'Where it lives',
      content:
        'Solution 5 adds a Compare icon (⇄) in the header. Tap it to enter selection mode on this tab only.',
      placement: 'bottom',
    },
    {
      target: '.tour-compare-check',
      title: 'How to use it',
      content:
        'Check Compare on two cards (max 2). A sticky Compare (2) bar appears at the bottom. Tap it to open the side-by-side table.',
      placement: 'right',
      scrollTarget: '.tour-scroll-root',
    },
    {
      target: '.tour-compare-table',
      title: 'Friction points',
      content:
        '1. Sounds obvious, feels smart: Compare flow looks like the "right" wishlist feature\n2. Spec comparison, no intent: Table has price/rating/discount; no "why saved" column\n3. Apples to oranges: Can compare saree vs sandals; UI still picks a "winner"\n4. More evaluation, not less: Spec sheet adds load; decision is not easier',
      placement: 'top',
    },
  ],
};

export function buildTourSteps(solutionId, prepareStep) {
  const defs = TOUR_STEP_DEFS[solutionId] || [];
  return defs.map((step, index) => ({
    ...step,
    skipBeacon: true,
    before: prepareStep ? () => prepareStep(solutionId, index, step.target) : undefined,
  }));
}

export function getTourSteps(solutionId) {
  return TOUR_STEP_DEFS[solutionId] || [];
}
