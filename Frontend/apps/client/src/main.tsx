import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.scss';
import App from './app/app';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { globalPersistor, globalStore } from "@infralastic/global-state";
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-m5gzmusnw1tjazns.us.auth0.com"
    clientId="wKgp4JiDjJ0HqhRY9H1qcavIocH6PhS3"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }}
  >
  <Provider store={globalStore}>
    <PersistGate loading={null} persistor={globalPersistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </Auth0Provider>
);
