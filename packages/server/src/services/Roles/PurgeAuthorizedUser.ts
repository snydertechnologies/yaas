import events from '@bigcapital/server/subscribers/events';
import { Service } from 'typedi';
import { ABILITIES_CACHE } from '../../api/middleware/AuthorizationMiddleware';

@Service()
export default class PurgeAuthorizedUserOnceRoleMutate {
  /**
   * Attaches events with handlers.
   * @param bus
   */
  attach(bus) {
    bus.subscribe(events.roles.onEdited, this.purgeAuthedUserOnceRoleMutated);
    bus.subscribe(events.roles.onDeleted, this.purgeAuthedUserOnceRoleMutated);
  }

  /**
   * Purges authorized user once role edited or deleted.
   */
  purgeAuthedUserOnceRoleMutated({}) {
    ABILITIES_CACHE.reset();
  }
}
