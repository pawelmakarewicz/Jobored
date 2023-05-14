import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { MantineProvider } from '@mantine/core';
import setTheme from './myTheme.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <MantineProvider withGlobalStyles withNormalizeCSS theme={setTheme()}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
