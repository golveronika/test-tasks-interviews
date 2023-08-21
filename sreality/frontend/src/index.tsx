import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n";

import './style/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "keen-slider/keen-slider.min.css"
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Store } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Store>
        <App />
      </Store>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
