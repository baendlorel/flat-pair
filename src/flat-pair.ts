import { add, remove, find, findByValue } from './flat-pair-operator.js';

export class FlatPair<K, V> {
  static from<T extends Map<any, any>>(
    map: T
  ): T extends Map<infer K, infer V> ? FlatPair<K, V> : never {
    if (Object.prototype.toString.call(map) !== '[object Map]') {
      throw new TypeError('[__NAME__: __func__] Argument must be a Map');
    }

    const items: any[] = [];
    map.forEach((v, k) => items.push(k, v));
    return new FlatPair(items) as any;
  }

  private readonly items: any[] = [];

  constructor(items: any[]) {
    if (items.length % 2 !== 0) {
      throw new TypeError('FlatPair items length must be even');
    }
    this.items = items;
  }

  get size() {
    return this.items.length / 2;
  }

  /**
   * Will check if the key already exists, if so then do nothing.
   */
  add(key: K, value: V): this {
    add<K, V>(this.items, key, value);
    return this;
  }

  remove(key: K): boolean {
    return remove(this.items, key);
  }

  find(key: K): V | undefined {
    return find<K, V>(this.items, key);
  }

  findByValue(value: V): K | undefined {
    return findByValue<K, V>(this.items, value);
  }

  clear() {
    this.items.length = 0;
  }
}
