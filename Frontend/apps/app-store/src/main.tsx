import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { globalPersistor, globalStore } from "@infralastic/global-state";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={globalStore}>
    <PersistGate loading={null} persistor={globalPersistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
