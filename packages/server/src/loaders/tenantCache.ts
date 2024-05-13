import Cache from '@bigcapital/server/services/Cache';

export default (tenantId: number) => {
  const cacheInstance = new Cache();

  return cacheInstance;
};
