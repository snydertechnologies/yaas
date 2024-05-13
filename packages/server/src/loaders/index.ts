import objectionLoader from '@bigcapital/server/database/objection';
import databaseLoader from '@bigcapital/server/loaders/database';
import dependencyInjectorLoader from '@bigcapital/server/loaders/dependencyInjector';
import expressLoader from '@bigcapital/server/loaders/express';
import i18nConfig from '@bigcapital/server/loaders/i18n';
import jobsLoader from '@bigcapital/server/loaders/jobs';
import Logger from '@bigcapital/server/loaders/logger';
import mongooseLoader from '@bigcapital/server/loaders/mongoose';

// We have to import at least all the events once so they can be triggered
// import '@bigcapital/server/loaders/events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('[init] MongoDB loaded and connected!');

  // Initialize the system database once app started.
  const knex = databaseLoader();

  // Initialize the objection.js from knex instance.
  objectionLoader({ knex });

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({ mongoConnection, knex });

  await jobsLoader({ agenda });
  Logger.info('[init] Jobs loaded');

  expressLoader({ app: expressApp });
  Logger.info('[init] Express loaded');

  i18nConfig();
  Logger.info('[init] I18n node configured.');
};
