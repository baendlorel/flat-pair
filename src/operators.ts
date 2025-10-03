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

export function removeByValue<K, V>(items: any[], value: V): boolean {
  for (let i = 1; i < items.length; i += 2) {
    if (items[i] === value) {
      items.splice(i - 1, 2);
      return true;
    }
  }
  return false;
}

export function forEach<K, V>(
  items: any[],
  callback: (value: V, key: K, index: number, arr: any[]) => void,
  thisArg?: any
): void {
  let idx = 0;
  for (let i = 0; i < items.length; i += 2) {
    // callback receives value, key, index, and the items array itself
    callback.call(thisArg, items[i + 1] as V, items[i] as K, idx, items);
    idx++;
  }
}

export function at<K, V>(items: any[], index: number): [K, V] | undefined {
  if (index < 0) return undefined;
  const pos = index * 2;
  if (pos + 1 >= items.length) return undefined;
  return [items[pos] as K, items[pos + 1] as V];
}

export function clear(items: any[]): void {
  items.length = 0;
}
