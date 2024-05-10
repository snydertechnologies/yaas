import 'reflect-metadata'; // We need this in order to use @Decorators

// import 'newrelic';
import '@/config';
import './before';

import express from 'express';
import loadersFactory from './loaders/index';

async function startServer() {
  const app = express();
  // Intiialize all registered loaders.
  await loadersFactory({ expressApp: app });
}

export { startServer };
