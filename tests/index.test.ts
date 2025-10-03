import { expect, describe, it, beforeEach } from 'vitest';
import {
  FlatPair,
  FlatPairOperator,
  add,
  remove,
  get,
  getByValue,
  size,
  clear,
  removeByValue,
  forEach,
} from '../src/index.js';

describe('FlatPair Class', () => {
  it('should create FlatPair from Map', () => {
    const map = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);
    const flatPair = FlatPair.from(map);

    expect(flatPair.size).toBe(2);
    expect(flatPair.find('key1')).toBe('value1');
    expect(flatPair.find('key2')).toBe('value2');
  });

  it('should throw error when creating from non-Map', () => {
    expect(() => FlatPair.from({} as any)).toThrow('Argument must be a Map');
  });

  it('should create FlatPair with even number of items', () => {
    const flatPair = new FlatPair(['key1', 'value1', 'key2', 'value2']);
    expect(flatPair.size).toBe(2);
  });

  it('should throw error with odd number of items', () => {
    expect(() => new FlatPair(['key1', 'value1', 'key2'])).toThrow(
      'FlatPair items length must be even'
    );
  });

  it('should add key-value pairs', () => {
    const flatPair = new FlatPair([]);
    flatPair.add('key1', 'value1');
    flatPair.add('key2', 'value2');

    expect(flatPair.size).toBe(2);
    expect(flatPair.find('key1')).toBe('value1');
    expect(flatPair.find('key2')).toBe('value2');
  });

  it('should not add duplicate keys', () => {
    const flatPair = new FlatPair([]);
    flatPair.add('key1', 'value1');
    flatPair.add('key1', 'value2'); // Should not add

    expect(flatPair.size).toBe(1);
    expect(flatPair.find('key1')).toBe('value1'); // Original value preserved
  });

  it('should remove key-value pairs', () => {
    const flatPair = new FlatPair(['key1', 'value1', 'key2', 'value2']);

    expect(flatPair.remove('key1')).toBe(true);
    expect(flatPair.size).toBe(1);
    expect(flatPair.find('key1')).toBeUndefined();
    expect(flatPair.find('key2')).toBe('value2');
  });

  it('should return false when removing non-existent key', () => {
    const flatPair = new FlatPair(['key1', 'value1']);
    expect(flatPair.remove('nonexistent')).toBe(false);
    expect(flatPair.size).toBe(1);
  });

  it('should find values by key', () => {
    const flatPair = new FlatPair(['key1', 'value1', 'key2', 'value2']);

    expect(flatPair.find('key1')).toBe('value1');
    expect(flatPair.find('key2')).toBe('value2');
    expect(flatPair.find('nonexistent')).toBeUndefined();
  });

  it('should find keys by value', () => {
    const flatPair = new FlatPair(['key1', 'value1', 'key2', 'value2']);

    expect(flatPair.findByValue('value1')).toBe('key1');
    expect(flatPair.findByValue('value2')).toBe('key2');
    expect(flatPair.findByValue('nonexistent')).toBeUndefined();
  });

  it('should clear all items', () => {
    const flatPair = new FlatPair(['key1', 'value1', 'key2', 'value2']);
    flatPair.clear();

    expect(flatPair.size).toBe(0);
    expect(flatPair.find('key1')).toBeUndefined();
  });

  it('should support method chaining', () => {
    const flatPair = new FlatPair([]);
    const result = flatPair.add('key1', 'value1').add('key2', 'value2');

    expect(result).toBe(flatPair);
    expect(flatPair.size).toBe(2);
  });
});

describe('FlatPairOperator Functions', () => {
  it('should add items to array', () => {
    const items: any[] = [];
    add(items, 'key1', 'value1');
    add(items, 'key2', 'value2');

    expect(items).toEqual(['key1', 'value1', 'key2', 'value2']);
  });

  it('should not add duplicate keys', () => {
    const items = ['key1', 'value1'];
    add(items, 'key1', 'value2'); // Should not add

    expect(items).toEqual(['key1', 'value1']);
  });

  it('should calculate size correctly', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];
    expect(size(items)).toBe(2);
  });

  it('should throw error for invalid size calculation', () => {
    const items = ['key1', 'value1', 'key2']; // Odd length
    expect(() => size(items)).toThrow('Invalid items length, must be even number');
  });

  it('should find values by key', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];

    expect(get(items, 'key1')).toBe('value1');
    expect(get(items, 'key2')).toBe('value2');
    expect(get(items, 'nonexistent')).toBeUndefined();
  });

  it('should find keys by value', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];

    expect(getByValue(items, 'value1')).toBe('key1');
    expect(getByValue(items, 'value2')).toBe('key2');
    expect(getByValue(items, 'nonexistent')).toBeUndefined();
  });

  it('should remove items from array', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];

    expect(remove(items, 'key1')).toBe(true);
    expect(items).toEqual(['key2', 'value2']);

    expect(remove(items, 'nonexistent')).toBe(false);
    expect(items).toEqual(['key2', 'value2']);
  });

  it('should clear all items', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];
    clear(items);

    expect(items).toEqual([]);
  });
});

describe('FlatPairOperator Class', () => {
  let operator: FlatPairOperator<string, string>;
  let items: any[];

  beforeEach(() => {
    operator = new FlatPairOperator();
    items = [];
  });

  it('should add items via operator', () => {
    operator.add(items, 'key1', 'value1');
    operator.add(items, 'key2', 'value2');

    expect(items).toEqual(['key1', 'value1', 'key2', 'value2']);
  });

  it('should find items via operator', () => {
    items.push('key1', 'value1', 'key2', 'value2');

    expect(operator.find(items, 'key1')).toBe('value1');
    expect(operator.findByValue(items, 'value2')).toBe('key2');
  });

  it('should remove items via operator', () => {
    items.push('key1', 'value1', 'key2', 'value2');

    expect(operator.remove(items, 'key1')).toBe(true);
    expect(items).toEqual(['key2', 'value2']);
  });

  it('should clear items via operator', () => {
    items.push('key1', 'value1', 'key2', 'value2');
    operator.clear(items);

    expect(items).toEqual([]);
  });
});

describe('Edge Cases and Type Safety', () => {
  it('should handle different data types as keys and values', () => {
    const flatPair = new FlatPair([]);
    flatPair.add(1, 'number key');
    flatPair.add('string', 42);
    flatPair.add(Symbol('sym'), { object: 'value' });

    expect(flatPair.find(1)).toBe('number key');
    expect(flatPair.find('string')).toBe(42);
    expect(flatPair.findByValue(42)).toBe('string');
  });

  it('should handle null and undefined values', () => {
    const flatPair = new FlatPair([]);
    flatPair.add('null', null);
    flatPair.add('undefined', undefined);

    expect(flatPair.find('null')).toBeNull();
    expect(flatPair.find('undefined')).toBeUndefined();
    expect(flatPair.findByValue(null)).toBe('null');
  });

  it('should handle empty arrays correctly', () => {
    const flatPair = new FlatPair([]);
    expect(flatPair.size).toBe(0);
    expect(flatPair.find('any')).toBeUndefined();
    expect(flatPair.remove('any')).toBe(false);
  });
});

describe('forEach and removeByValue behavior', () => {
  it('FlatPair.forEach should call callback with (value, key, index, arr) and bind thisArg', () => {
    const flatPair = new FlatPair(['k1', 'v1', 'k2', 'v2']);
    const calls: any[] = [];
    const thisArg = { marker: 'yes' };

    flatPair.forEach(function (this: any, value, key, index, arr) {
      calls.push({ value, key, index, arr, thisMarker: this.marker });
    }, thisArg);

    expect(calls.length).toBe(2);
    expect(calls[0].value).toBe('v1');
    expect(calls[0].key).toBe('k1');
    expect(calls[0].index).toBe(0);
    expect(calls[0].arr).toBe((flatPair as any).items);
    expect(calls[0].thisMarker).toBe('yes');

    expect(calls[1].value).toBe('v2');
    expect(calls[1].key).toBe('k2');
    expect(calls[1].index).toBe(1);
  });

  it('FlatPairOperator.forEach should call callback with (value, key, index, arr) and bind thisArg', () => {
    const operator = new FlatPairOperator<string, string>();
    const items: any[] = ['a', 'A', 'b', 'B'];
    const calls: any[] = [];
    const thisArg = { t: 1 };

    operator.forEach(
      items,
      function (this: any, value, key, index, arr) {
        calls.push({ value, key, index, arr, t: this.t });
      },
      thisArg
    );

    expect(calls.length).toBe(2);
    expect(calls[0].value).toBe('A');
    expect(calls[0].key).toBe('a');
    expect(calls[0].index).toBe(0);
    expect(calls[0].arr).toBe(items);
    expect(calls[0].t).toBe(1);
  });

  it('static removeByValue should remove first pair matching value and return boolean', () => {
    const items: any[] = ['x', 'X', 'y', 'Y'];
    expect(removeByValue(items, 'X')).toBe(true);
    expect(items).toEqual(['y', 'Y']);
    expect(removeByValue(items, 'nope')).toBe(false);
  });

  it('FlatPair.removeByValue should remove by value and update size', () => {
    const fp = new FlatPair(['p', 'P', 'q', 'Q']);
    expect(fp.removeByValue('Q')).toBe(true);
    expect(fp.size).toBe(1);
    expect(fp.findByValue('Q')).toBeUndefined();
    expect(fp.removeByValue('missing')).toBe(false);
  });
});
