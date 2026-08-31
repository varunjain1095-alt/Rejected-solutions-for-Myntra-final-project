import StatusBar from './StatusBar';
import './MobilePhone.css';

export default function MobilePhone({ children, footer, overlays }) {
  return (
    <div className="mobile-stage">
      <div className="mobile-phone">
        <div className="mobile-phone-notch" aria-hidden />
        <div className="mobile-phone-screen">
          <StatusBar />
          <div className="mobile-scroll tour-scroll-root">{children}</div>
          {footer && <div className="mobile-footer">{footer}</div>}
          {overlays && <div className="mobile-overlays">{overlays}</div>}
        </div>
      </div>
    </div>
  );
}
