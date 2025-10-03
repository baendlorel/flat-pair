export function add<K, V>(items: any[], key: K, value: V): void {
  const len = items.length;
  for (let i = 0; i < len; i += 2) {
    if (items[i] === key) {
      return;
    }
  }
  items.push(key, value);
}

export function size(items: any[]): number {
  const len = items.length;
  if (len % 2 !== 0) {
    throw new Error('Invalid items length, must be even number');
  }
  return len / 2;
}

export function find<K, V>(items: any[], key: K): V | undefined {
  const len = items.length;
  for (let i = 0; i < len; i += 2) {
    if (items[i] === key) {
      return items[i + 1];
    }
  }
  return undefined;
}

export function findByValue<K, V>(items: any[], value: V): K | undefined {
  const len = items.length;
  for (let i = 1; i < len; i += 2) {
    if (items[i] === value) {
      return items[i - 1];
    }
  }
  return undefined;
}

export function remove<K>(items: any[], key: K): boolean {
  const len = items.length;
  for (let i = 0; i < len; i += 2) {
    if (items[i] === key) {
      items.splice(i, 2);
      return true;
    }
  }
  return false;
}

export function removeByValue<V>(items: any[], value: V): boolean {
  const len = items.length;
  for (let i = 1; i < len; i += 2) {
    if (items[i] === value) {
      items.splice(i - 1, 2);
      return true;
    }
  }
  return false;
}

/**
 *
 * @param items
 * @param callback
 * @param thisArg
 */
export function forEach<K, V>(
  items: any[],
  callback: (value: V, key: K, pairIndex: number, arr: any[]) => void,
  thisArg?: any
): void {
  let idx = 0;
  const len = items.length;
  for (let i = 0; i < len; i += 2) {
    if (i in items) {
      callback.call(thisArg, items[i + 1] as V, items[i] as K, idx, items);
    }
    idx++;
  }
}

export function at<K, V>(items: any[], pairIndex: number): [K, V] | undefined {
  if (pairIndex < 0) {
    return undefined;
  }

  const pos = pairIndex * 2;
  if (pos + 1 >= items.length) {
    return undefined;
  }

  return [items[pos] as K, items[pos + 1] as V];
}

export function clear(items: any[]): void {
  items.length = 0;
}
