import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './utils/i18n';
import 'moment/locale/es';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.update();
    }
  },
});
