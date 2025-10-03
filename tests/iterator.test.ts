import { expect, describe, it } from 'vitest';
import { FlatPair, at as atFunc } from '../src/index.js';

describe('Iterators and at()', () => {
  it('keys(), values(), entries() and default iterator (entries) work as expected', () => {
    const fp = new FlatPair(['k1', 'v1', 'k2', 'v2']);

    expect([...fp.keys()]).toEqual(['k1', 'k2']);
    expect([...fp.values()]).toEqual(['v1', 'v2']);
    expect([...fp.entries()]).toEqual([
      ['k1', 'v1'],
      ['k2', 'v2'],
    ]);

    // default iterator should iterate entries
    expect([...fp]).toEqual([
      ['k1', 'v1'],
      ['k2', 'v2'],
    ]);

    // use keys in for..of
    const keys: any[] = [];
    for (const k of fp.keys()) {
      keys.push(k);
    }
    expect(keys).toEqual(['k1', 'k2']);
  });

  it('at() returns [key,value] or undefined for out-of-range', () => {
    const fp = new FlatPair(['k1', 'v1', 'k2', 'v2']);

    expect(fp.at(0)).toEqual(['k1', 'v1']);
    expect(fp.at(1)).toEqual(['k2', 'v2']);
    expect(fp.at(2)).toBeUndefined();
    expect(fp.at(-1)).toBeUndefined();

    // also test the exported at function
    expect(atFunc(['a', 'A', 'b', 'B'], 0)).toEqual(['a', 'A']);
    expect(atFunc(['a', 'A', 'b', 'B'], 1)).toEqual(['b', 'B']);
    expect(atFunc(['a', 'A'], 2)).toBeUndefined();
  });
});
