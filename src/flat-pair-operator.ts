import { add, remove, find, findByValue, removeByValue, forEach, at } from './operators.js';

/**
 * Creates an static operator
 */
export class FlatPairOperator<K, V> {
  add(items: any[], key: K, value: V): void {
    add(items, key, value);
  }

  remove(items: any[], key: K): boolean {
    return remove(items, key);
  }

  find(items: any[], key: K): V | undefined {
    return find(items, key);
  }

  findByValue(items: any[], value: V): K | undefined {
    return findByValue(items, value);
  }

  removeByValue(items: any[], value: V): boolean {
    return removeByValue(items, value);
  }

  forEach(
    items: any[],
    callback: (value: V, key: K, pairIndex: number, arr: any[]) => void,
    thisArg?: any
  ): void {
    return forEach(items, callback, thisArg);
  }

  at(items: any[], pairIndex: number): [K, V] | undefined {
    return at<K, V>(items, pairIndex);
  }

  *keys(items: any[]): IterableIterator<K> {
    for (let i = 0; i < items.length; i += 2) {
      yield items[i] as K;
    }
  }

  *values(items: any[]): IterableIterator<V> {
    for (let i = 1; i < items.length; i += 2) {
      yield items[i] as V;
    }
  }

  *entries(items: any[]): IterableIterator<[K, V]> {
    for (let i = 0; i < items.length; i += 2) {
      yield [items[i] as K, items[i + 1] as V];
    }
  }

  clear(items: any[]): void {
    items.length = 0;
  }
}
