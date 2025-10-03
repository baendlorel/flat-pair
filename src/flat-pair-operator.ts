export function add<K, V>(items: any[], key: K, value: V): void {
  for (let i = 0; i < items.length; i += 2) {
    if (items[i] === key) {
      return;
    }
  }
  items.push(key, value);
}

export function size(items: any[]): number {
  if (items.length % 2 !== 0) {
    throw new Error('Invalid items length, must be even number');
  }
  return items.length / 2;
}

export function find<K, V>(items: any[], key: K): V | undefined {
  for (let i = 0; i < items.length; i += 2) {
    if (items[i] === key) {
      return items[i + 1];
    }
  }
  return undefined;
}

export function findByValue<K, V>(items: any[], value: V): K | undefined {
  for (let i = 1; i < items.length; i += 2) {
    if (items[i] === value) {
      return items[i - 1];
    }
  }
  return undefined;
}

export function remove<K>(items: any[], key: K): boolean {
  for (let i = 0; i < items.length; i += 2) {
    if (items[i] === key) {
      items.splice(i, 2);
      return true;
    }
  }
  return false;
}

export function clear(items: any[]): void {
  items.length = 0;
}

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
