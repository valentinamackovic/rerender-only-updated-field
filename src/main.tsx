import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SimpleFormProvider } from './SimpleFormContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleFormProvider>
      <App />
    </SimpleFormProvider>
  </StrictMode>
);
