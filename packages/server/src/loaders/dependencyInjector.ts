import config from '@bigcapital/server/config';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import agendaFactory from '@bigcapital/server/loaders/agenda';
import dbManagerFactory from '@bigcapital/server/loaders/dbManager';
import i18n from '@bigcapital/server/loaders/i18n';
import LoggerInstance from '@bigcapital/server/loaders/logger';
import mailInstance from '@bigcapital/server/loaders/mail';
import SmsClientLoader from '@bigcapital/server/loaders/smsClient';
import repositoriesLoader from '@bigcapital/server/loaders/systemRepositories';
import Cache from '@bigcapital/server/services/Cache';
import { Container } from 'typedi';
import eventEmitter, { susbcribers } from './eventEmitter';
import rateLimiterLoaders from './rateLimiterLoader';

export default ({ mongoConnection, knex }) => {
  try {
    const agendaInstance = agendaFactory({ mongoConnection });
    const smsClientInstance = SmsClientLoader(config.easySMSGateway.api_key);
    const dbManager = dbManagerFactory(knex);
    const cacheInstance = new Cache();

    Container.set('logger', LoggerInstance);
    Container.set('knex', knex);
    Container.set('SMSClient', smsClientInstance);
    Container.set('mail', mailInstance);

    Container.set('dbManager', dbManager);
    LoggerInstance.info('[DI] Database manager has been injected into container.');

    Container.set('agenda', agendaInstance);
    LoggerInstance.info('[DI] Agenda has been injected into container');

    Container.set('i18n', i18n());
    LoggerInstance.info('[DI] i18n has been injected into container');

    Container.set('cache', cacheInstance);
    LoggerInstance.info('[DI] cache has been injected into container');

    Container.set('repositories', repositoriesLoader());
    LoggerInstance.info('[DI] repositories has been injected into container');

    rateLimiterLoaders();
    LoggerInstance.info('[DI] rate limiter has been injected into container.');

    Container.set(EventPublisher, eventEmitter());

    const emitter = Container.get(EventPublisher);

    emitter.loadSubscribers(susbcribers());

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};
