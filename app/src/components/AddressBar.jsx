import './AddressBar.css';

export default function AddressBar() {
  return (
    <div className="address-bar">
      <span className="pin">📍</span>
      <span className="address">1 - B7 Street, B7 Street, Vasant Vihar, New Delhi,...</span>
      <span className="chevron">▾</span>
    </div>
  );
}
