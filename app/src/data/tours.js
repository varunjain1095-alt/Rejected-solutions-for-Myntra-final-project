/** Each solution tour: 1) where the feature lives 2) how to use it 3) one friction test */
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
      target: '.tour-ready-to-buy',
      title: 'Friction test',
      content:
        'Try this: turn on Ready to buy, tap Apply. Filters stack with AND logic and the list often empties. You tuned specs, not memory.',
      placement: 'top',
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
      title: 'Friction test',
      content:
        'After best deals you get a shortlist of cheap items. Every card is still specs only. No row explains why you saved it.',
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
      title: 'Friction test',
      content:
        'Tag several items, then check the header. It still says 42 items. Reordering did not remove any decisions.',
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
      title: 'Friction test',
      content:
        'Jump categories (Sarees, Sandals, Beauty). Same size and return rows on a saree and lip gloss. Static facts, not why you saved it.',
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
      title: 'Friction test',
      content:
        'This table compares a saree and sandals. Price and discount rows imply a winner across unrelated categories. No column for why you saved either item.',
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
