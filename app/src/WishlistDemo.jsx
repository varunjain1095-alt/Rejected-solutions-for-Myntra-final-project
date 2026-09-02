import { useMemo, useState, useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { products, TOTAL_ITEMS } from './data/products';
import { applyFilters, sortProducts, groupByPriority, PRIORITY_LABELS } from './utils/helpers';
import WishlistHeader from './components/WishlistHeader';
import AddressBar from './components/AddressBar';
import CategoryFilters from './components/CategoryFilters';
import ProductCard from './components/ProductCard';
import FilterPanel, { emptyFilters } from './components/FilterPanel';
import ChatPanel, { ChatFab } from './components/ChatPanel';
import CompareView, { CompareBar } from './components/CompareView';
import SolutionTour from './components/SolutionTour';
import MobilePhone from './components/MobilePhone';
import { waitForSelector, nextFrame } from './utils/tourHelpers';
import './WishlistDemo.css';
import './components/JoyrideOverrides.css';

const SOLUTIONS = [
  { id: 'filter', label: '1. Filtering' },
  { id: 'chat', label: '2. Chatbot' },
  { id: 'priority', label: '3. Priority' },
  { id: 'tiles', label: '4. Info Tiles' },
  { id: 'compare', label: '5. Compare' },
];

const SOLUTION_IDS = new Set(SOLUTIONS.map((s) => s.id));

function readSolutionFromUrl() {
  const s = new URLSearchParams(window.location.search).get('s');
  return SOLUTION_IDS.has(s) ? s : 'filter';
}

function writeSolutionToUrl(id) {
  const url = new URL(window.location.href);
  url.searchParams.set('s', id);
  window.history.pushState({ solution: id }, '', url);
}

function countActiveFilters(f) {
  let n = 0;
  if (f.availability) n++;
  if (f.express) n++;
  if (f.deliveryDate) n++;
  if (f.ratingMin) n++;
  if (f.ratingBelow4) n++;
  if (f.priceMin || f.priceMax) n++;
  if (f.discount50) n++;
  if (f.priceDrop) n++;
  if (f.brands.length) n++;
  if (f.categories.length) n++;
  if (f.size) n++;
  if (f.readyToBuy) n++;
  if (f.sortBy) n++;
  return n;
}

export default function WishlistDemo() {
  const [solution, setSolution] = useState(readSolutionFromUrl);
  const [filters, setFilters] = useState(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [highlightIds, setHighlightIds] = useState([]);
  const [priorityState, setPriorityState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('priorityState') || '{}');
    } catch {
      return {};
    }
  });
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [tourRun, setTourRun] = useState(false);

  const resetTourUi = useCallback(() => {
    setFilterOpen(false);
    setChatOpen(false);
    setCompareMode(false);
    setCompareIds([]);
    setCompareOpen(false);
  }, []);

  // Auto-start tour on first load and whenever the solution tab changes
  useEffect(() => {
    setTourRun(false);
    const timer = window.setTimeout(() => setTourRun(true), 500);
    return () => window.clearTimeout(timer);
  }, [solution]);

  useEffect(() => {
    const onPopState = () => setSolution(readSolutionFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectSolution = useCallback(
    (id) => {
      setSolution(id);
      setHighlightIds([]);
      setCategoryFilter('');
      resetTourUi();
      writeSolutionToUrl(id);
    },
    [resetTourUi]
  );

  const filtered = useMemo(() => {
    let list = products;
    if (solution === 'filter') {
      list = applyFilters(list, filters);
      list = sortProducts(list, filters.sortBy);
    }
    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (highlightIds.length && solution === 'chat') {
      const set = new Set(highlightIds);
      list = list.filter((p) => set.has(p.id));
    }
    return list;
  }, [filters, categoryFilter, highlightIds, solution]);

  const handlePriority = (id, level) => {
    const next = { ...priorityState };
    if (level) next[id] = level;
    else delete next[id];
    setPriorityState(next);
    localStorage.setItem('priorityState', JSON.stringify(next));
  };

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const startTour = () => {
    resetTourUi();
    setHighlightIds([]);
    setTourRun(false);
    window.setTimeout(() => setTourRun(true), 150);
  };

  const finishTour = () => {
    setTourRun(false);
    setHighlightIds([]);
    resetTourUi();
  };

  const prepareTourStep = useCallback(
    async (solutionId, index, targetSelector) => {
      await nextFrame();

      if (solutionId === 'filter') {
        if (index === 1) {
          flushSync(() => setFilterOpen(true));
          await waitForSelector('.tour-sort-select');
        }
        if (index === 2) {
          flushSync(() => setFilterOpen(false));
          await waitForSelector('.tour-product-grid');
        }
        return;
      }

      if (solutionId === 'chat') {
        if (index === 1) {
          flushSync(() => setChatOpen(true));
          await waitForSelector('.tour-chat-input');
        }
        if (index === 2) {
          flushSync(() => {
            setChatOpen(false);
            setHighlightIds([]);
          });
          await waitForSelector('.tour-product-grid');
        }
        return;
      }

      if (solutionId === 'compare') {
        if (index === 1) {
          flushSync(() => {
            setCompareMode(true);
            setCompareIds(['42']);
          });
          await waitForSelector('.tour-compare-check');
        }
        if (index === 2) {
          flushSync(() => {
            setCompareMode(true);
            setCompareIds(['42', '29']);
            setCompareOpen(true);
          });
          await waitForSelector('.tour-compare-table');
        }
      }
    },
    []
  );

  const compareProducts = products.filter((p) => compareIds.includes(p.id));
  const activeFilterCount = countActiveFilters(filters);

  const renderGrid = (list) => (
    <div className="product-grid tour-product-grid">
      {list.length === 0 ? (
        <div className="empty-state">
          <p>No items match your filters.</p>
          <p className="hint">Try loosening Ready to buy or rating filters.</p>
        </div>
      ) : (
        list.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            showInfoTiles={solution === 'tiles'}
            priority={priorityState[p.id]}
            onPriorityChange={solution === 'priority' ? handlePriority : undefined}
            compareMode={solution === 'compare' && compareMode}
            compareSelected={compareIds.includes(p.id)}
            onCompareToggle={toggleCompare}
            highlight={highlightIds.includes(p.id)}
            isFirstCard={i === 0}
          />
        ))
      )}
    </div>
  );

  const renderPrioritySections = () => {
    const groups = groupByPriority(products, priorityState);
    let firstCardMarked = false;
    return (
      <div className="priority-sections tour-priority-sections">
        {['soon', 'maybe', 'later', 'undecided'].map((key) =>
          groups[key].length > 0 ? (
            <section key={key}>
              <h3 className="section-title">
                {PRIORITY_LABELS[key]} ({groups[key].length})
              </h3>
              <div className="product-grid tour-product-grid">
                {groups[key].map((p) => {
                  const isFirst = !firstCardMarked;
                  if (isFirst) firstCardMarked = true;
                  return (
                    <ProductCard
                      key={p.id}
                      product={p}
                      priority={priorityState[p.id]}
                      onPriorityChange={handlePriority}
                      isFirstCard={isFirst}
                    />
                  );
                })}
              </div>
            </section>
          ) : null
        )}
      </div>
    );
  };

  const phoneFooter =
    solution === 'compare' && compareIds.length >= 2 ? (
      <CompareBar count={compareIds.length} onCompare={() => setCompareOpen(true)} />
    ) : null;

  const phoneOverlays = (
    <>
      {solution === 'chat' && !chatOpen && (
        <ChatFab onClick={() => setChatOpen(true)} />
      )}
      {solution === 'filter' && (
        <FilterPanel
          open={filterOpen}
          filters={filters}
          onChange={setFilters}
          onClose={() => setFilterOpen(false)}
          onClear={() => setFilters(emptyFilters)}
        />
      )}
      {solution === 'chat' && (
        <ChatPanel
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          onHighlight={setHighlightIds}
          products={products}
        />
      )}
      {solution === 'compare' && (
        <CompareView
          open={compareOpen}
          products={compareProducts}
          onClose={() => setCompareOpen(false)}
        />
      )}
    </>
  );

  return (
    <div className="demo-app">
      <nav className="solution-nav">
        {SOLUTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={solution === s.id ? 'active' : ''}
            onClick={() => selectSolution(s.id)}
          >
            {s.label}
          </button>
        ))}
        <button type="button" className="tour-start-btn" onClick={startTour}>
          Take tour
        </button>
      </nav>

      <SolutionTour
        solution={solution}
        run={tourRun}
        onFinish={finishTour}
        prepareStep={prepareTourStep}
      />

      <MobilePhone footer={phoneFooter} overlays={phoneOverlays}>
        <WishlistHeader
          totalCount={TOTAL_ITEMS}
          onFilterClick={solution === 'filter' ? () => setFilterOpen(true) : undefined}
          onCompareToggle={solution === 'compare' ? () => setCompareMode((m) => !m) : undefined}
          compareMode={compareMode}
          filterActive={activeFilterCount > 0}
        />

        <AddressBar />
        <div className="quick-pills">
          <button type="button" className="pill">Collections</button>
          <button type="button" className="pill">Out of Stock</button>
        </div>
        <CategoryFilters active={categoryFilter} onChange={setCategoryFilter} />
        {solution === 'filter' && activeFilterCount > 0 && (
          <p className="count-line">Showing {filtered.length} of {TOTAL_ITEMS} items</p>
        )}

        <main className="wishlist-main">
          {solution === 'priority' ? renderPrioritySections() : renderGrid(filtered)}
        </main>
      </MobilePhone>
    </div>
  );
}
