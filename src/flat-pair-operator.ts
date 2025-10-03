import { add, remove, find, findByValue, removeByValue, forEach } from './operators.js';

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
    callback: (value: V, key: K, index: number, arr: any[]) => void,
    thisArg?: any
  ): void {
    return forEach(items, callback, thisArg);
  }

  clear(items: any[]): void {
    items.length = 0;
  }
}
