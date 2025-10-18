# Perf Observer [![](https://img.shields.io/npm/v/@neabyte/perf-observer.svg)](https://www.npmjs.org/package/@neabyte/perf-observer) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight performance observer using native Node.js performance APIs for debugging and benchmarking.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Core Methods](#core-methods)
  - [Types](#types)
    - [ProcessStats](#processstats)
    - [BenchmarkOptions](#benchmarkoptions)
    - [BenchmarkResult](#benchmarkresult)
- [Usage Examples](#usage-examples)
  - [Basic Timing](#basic-timing)
  - [Function Tracking](#function-tracking)
  - [Performance Statistics](#performance-statistics)
  - [Benchmarking](#benchmarking)
  - [Finding Slow Processes](#finding-slow-processes)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @neabyte/perf-observer
```

## Quick Start

```typescript
import perf from '@neabyte/perf-observer'

// Track a function automatically
const trackedFunction = perf.track(() => {
  // Your code here
  return 'result'
})

// Manual timing
perf.start('my-process')
// ... do work ...
const duration = perf.end('my-process')

// Run benchmarks
const result = perf.benchmark(() => {
  // Function to benchmark
}, { iterations: 1000 })
```

## API Reference

### Core Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `start(name)` | Start timing a process | `void` |
| `end(name)` | End timing and get duration | `number` (ms) |
| `track(fn, name?)` | Wrap function with automatic timing | `Function` |
| `getStats(name?)` | Get performance statistics | `ProcessStats` |
| `findSlowProcesses(threshold?)` | Find processes exceeding threshold | `ProcessEntry[]` |
| `benchmark(fn, options?)` | Run benchmark test | `BenchmarkResult` |

### Types

#### ProcessStats
| Property | Type | Description |
|----------|------|-------------|
| `count` | `number` | Number of processes |
| `avgDuration` | `number` | Average duration (ms) |
| `minDuration` | `number` | Minimum duration (ms) |
| `maxDuration` | `number` | Maximum duration (ms) |
| `p95Duration` | `number` | 95th percentile (ms) |
| `p99Duration` | `number` | 99th percentile (ms) |

#### BenchmarkOptions
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iterations` | `number` | `1000` | Number of test iterations |
| `warmup` | `number` | `min(100, iterations/10)` | Warmup iterations |
| `maxDuration` | `number` | `60000` | Max test duration (ms) |
| `outlierThreshold` | `number` | `3` | Outlier detection threshold |
| `trackMemory` | `boolean` | `false` | Track memory usage |
| `name` | `string` | `fn.name` | Custom benchmark name |

#### BenchmarkResult
| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Benchmark name |
| `iterations` | `number` | Actual iterations completed |
| `warmupIterations` | `number` | Warmup iterations performed |
| `totalTime` | `number` | Total time (ms) |
| `avgTime` | `number` | Average time per iteration (ms) |
| `minTime` | `number` | Minimum iteration time (ms) |
| `maxTime` | `number` | Maximum iteration time (ms) |
| `p95Time` | `number` | 95th percentile time (ms) |
| `p99Time` | `number` | 99th percentile time (ms) |
| `stdDev` | `number` | Standard deviation |
| `outliers` | `number` | Number of outliers removed |
| `memoryDelta` | `number?` | Memory usage change (bytes) |

## Usage Examples

### Basic Timing

```typescript
// Manual timing
perf.start('database-query')

// Simulate database operation
await new Promise(resolve => setTimeout(resolve, 50))
const duration = perf.end('database-query')
console.log(`Query took ${duration}ms`)
```

### Function Tracking

```typescript
// Automatic timing
const expensiveOperation = perf.track(async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return 'completed'
})

const result = await expensiveOperation()
```

> **Duplicate Name Behavior**: Multiple functions with the same name will overwrite each other's performance data. Only the last function's data will be preserved in statistics. To avoid data loss:
>
> - Use unique names: `perf.track(fn, 'unique-name')`
> - Add hash suffixes: `perf.track(fn, 'operation-' + crypto.randomBytes(4).toString('hex'))`
> - Use function names: `function myOperation() {}` then `perf.track(myOperation)`
>
> Anonymous functions all use 'anonymous' name and will overwrite each other.

### Performance Statistics

```typescript
// Get stats for all processes
const allStats = perf.getStats()
console.log(`Average: ${allStats.avgDuration}ms`)

// Get stats for specific process
const queryStats = perf.getStats('database-query')
console.log(`95th percentile: ${queryStats.p95Duration}ms`)
```

### Benchmarking

```typescript
// Simple benchmark
const result = perf.benchmark(() => {
  return Math.random() * 1000
}, 10000)

console.log(`Average: ${result.avgTime}ms`)
console.log(`Standard deviation: ${result.stdDev}ms`)

// Advanced benchmark with options
const advancedResult = perf.benchmark(
  () => {
    // Simulate data processing
    return Array.from({ length: 1000 }, (_, i) => i * 2)
  },
  {
    iterations: 5000,
    warmup: 100,
    trackMemory: true,
    outlierThreshold: 2,
    name: 'data-processing'
  }
)
```

### Finding Slow Processes

```typescript
// Find processes taking longer than 1 second
const slowProcesses = perf.findSlowProcesses(1000)
slowProcesses.forEach(process => {
  console.log(`${process.name}: ${process.duration}ms`)
})
```

## Requirements

- Node.js >= 22.0.0
- TypeScript (optional, for type definitions)

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/NeaByteLab/Perf-Observer).

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
