import { COMPARE_ROWS, getRowBest } from '../utils/helpers';
import './CompareView.css';

export default function CompareView({ open, products, onClose }) {
  if (!open || products.length < 2) return null;

  return (
    <div className="compare-overlay">
      <div className="compare-modal">
        <div className="compare-header">
          <h2>Compare ({products.length})</h2>
          <button type="button" onClick={onClose}>✕</button>
        </div>
        <div className="compare-table-wrap tour-compare-table">
          <table className="compare-table">
            <thead>
              <tr>
                <th />
                {products.map((p) => (
                  <th key={p.id}>
                    <img
                      src={`/assets/products/${p.id}.jpg`}
                      alt={p.brand}
                      className="compare-thumb"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => {
                const bestId = getRowBest(products, row);
                return (
                  <tr key={row.key}>
                    <td className="row-label">{row.label}</td>
                    {products.map((p) => {
                      const val = row.format ? row.format(p) : p[row.key];
                      const isBest = bestId === p.id;
                      return (
                        <td key={p.id} className={isBest ? 'best' : ''}>
                          {val ?? '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="compare-note">
          Spec comparison only. No column for why you saved these items.
        </p>
      </div>
    </div>
  );
}

export function CompareBar({ count, onCompare }) {
  if (count < 2) return null;
  return (
    <div className="compare-bar tour-compare-bar">
      <button type="button" onClick={onCompare}>
        Compare ({count})
      </button>
    </div>
  );
}
