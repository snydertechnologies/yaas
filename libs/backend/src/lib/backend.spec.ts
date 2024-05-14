import { mylib } from './mylib';

import { describe, expect, test } from 'bun:test';

describe('mylib', () => {
  test('should work', () => {
    expect(mylib()).toEqual('mylib');
  });
});
