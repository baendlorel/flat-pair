import { add, remove, find, findByValue } from './operators.js';

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

  clear(items: any[]): void {
    items.length = 0;
  }
}
