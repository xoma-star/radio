import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./Redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from "./reportWebVitals";
import {sendToGoogleAnalytics} from "./analytics";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

serviceWorkerRegistration.register()
reportWebVitals(sendToGoogleAnalytics)