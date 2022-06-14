import React from 'react';
import Router from './routes/router';
import '@/presentation/styles/global.scss';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('main');
const root = createRoot(container);
root.render(<Router />);
