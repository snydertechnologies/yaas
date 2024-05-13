import { edgeSharedDomain } from './bigcapital-libs-backend';

describe('edgeSharedDomain', () => {
  it('should work', () => {
    expect(edgeSharedDomain()).toEqual('bigcapital-libs-backend');
  });
});
