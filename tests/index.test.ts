import { expect, describe, it, beforeEach } from 'vitest';
import {
  FlatPair,
  FlatPairOperator,
  add,
  remove,
  find,
  findByValue,
  size,
  clear,
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

    expect(find(items, 'key1')).toBe('value1');
    expect(find(items, 'key2')).toBe('value2');
    expect(find(items, 'nonexistent')).toBeUndefined();
  });

  it('should find keys by value', () => {
    const items = ['key1', 'value1', 'key2', 'value2'];

    expect(findByValue(items, 'value1')).toBe('key1');
    expect(findByValue(items, 'value2')).toBe('key2');
    expect(findByValue(items, 'nonexistent')).toBeUndefined();
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
