# flat-pair

[![npm version](https://img.shields.io/npm/v/flat-pair.svg)](https://www.npmjs.com/package/flat-pair) [![npm downloads](http://img.shields.io/npm/dm/flat-pair.svg)](https://npmcharts.com/compare/flat-pair,token-types?start=1200&interval=30)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/59dd6795e61949fb97066ca52e6097ef)](https://www.codacy.com/app/Borewit/flat-pair?utm_source=github.com&utm_medium=referral&utm_content=Borewit/flat-pair&utm_campaign=Badge_Grade)

A lightweight TypeScript library for storing key-value pairs using arrays. Provides serializable storage with efficient value-based lookups and zero-cost static methods.

For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)

## Features

- 🔍 **Bidirectional Search**: Find keys by values and values by keys
- 📦 **Serializable**: Easy JSON serialization/deserialization
- 🛡️ **Type Safe**: Full TypeScript support with generic types
- 🎯 **Zero Cost**: Static methods available for minimal overhead
- ⚡ **Lightweight**: No dependencies, minimal bundle size

## Installation

```bash
npm install flat-pair
# or
pnpm install flat-pair
```

## Quick Start

### Using the FlatPair Class

```typescript
import { FlatPair } from 'flat-pair';

// Create from Map
const map = new Map([
  ['name', 'John'],
  ['age', 25],
]);
const flatPair = FlatPair.from(map);

// Or create directly
const pair = new FlatPair(['name', 'John', 'age', 25]);

// Add key-value pairs (won't add duplicates)
pair.add('city', 'New York');
pair.add('name', 'Jane'); // Won't override existing key

// Find by key
console.log(pair.find('name')); // 'John'

// Find by value
console.log(pair.findByValue('New York')); // 'city'

// Remove pairs
pair.remove('age'); // returns true
pair.remove('nonexistent'); // returns false

// Get size
console.log(pair.size); // 2

// Clear all
pair.clear();
```

### Using Static Functions (Zero Cost)

```typescript
import { add, find, findByValue, remove, size, clear } from 'flat-pair';

const items: any[] = [];

// Add items
add(items, 'name', 'John');
add(items, 'age', 25);

// Find operations
const name = find(items, 'name'); // 'John'
const ageKey = findByValue(items, 25); // 'age'

// Remove and other operations
remove(items, 'age'); // returns true
console.log(size(items)); // 1
clear(items); // empties the array
```

### Using FlatPairOperator Class (For fixed type hint)

```typescript
import { FlatPairOperator } from 'flat-pair';

const operator = new FlatPairOperator<string, number>();
const items: any[] = [];

operator.add(items, 'score', 100);
operator.add(items, 'level', 5);

console.log(operator.find(items, 'score')); // 100
console.log(operator.findByValue(items, 5)); // 'level'
```

## Use Cases

### Configuration Storage

```typescript
const config = new FlatPair(['apiUrl', 'https://api.example.com', 'timeout', 5000, 'retries', 3]);

// Easy serialization
const serialized = JSON.stringify(config.items);
const restored = new FlatPair(JSON.parse(serialized));
```

### Cache with Reverse Lookup

```typescript
const cache = new FlatPair<string, string>([]);

cache.add('user:123', 'john_doe');
cache.add('user:456', 'jane_smith');

// Find user ID by username
const userId = cache.findByValue('john_doe'); // 'user:123'
```

### Event Mapping

```typescript
const eventMap = new FlatPair([
  'click',
  'handleClick',
  'hover',
  'handleHover',
  'keypress',
  'handleKeyPress',
]);

// Get handler by event
const handler = eventMap.find('click'); // 'handleClick'

// Get event by handler
const event = eventMap.findByValue('handleHover'); // 'hover'
```

## Performance

FlatPair uses a simple array structure `[key1, value1, key2, value2, ...]` which provides:

- **Memory Efficiency**: No object overhead per pair
- **Serialization**: Direct JSON support
- **Cache Friendly**: Contiguous memory layout
- **Predictable**: O(n) operations with low constant factors

> Note: For large datasets, consider using a Map or Object for O(1) lookups instead of this package.

## License

MIT © Kasukabe Tsumugi
