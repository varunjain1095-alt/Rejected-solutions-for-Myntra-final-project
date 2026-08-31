import './StatusBar.css';

export default function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">12:30</span>
      <span className="status-icons">
        <span aria-hidden>🌙</span>
        <span className="signal" aria-hidden>▮▮▮</span>
        <span aria-hidden>WiFi</span>
        <span className="battery">37%</span>
      </span>
    </div>
  );
}
