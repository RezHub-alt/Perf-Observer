import type { BenchmarkOptions, BenchmarkResult, ProcessStats } from '@root/Interfaces'
import { calcBenchmarkStats, calcStdDev, removeOutliers } from '@root/Utils'
import { performance } from 'perf_hooks'

/**
 * Benchmark execution utility for performance testing.
 * @description Provides benchmarking with configurable iterations and warmup.
 */
export class Benchmark {
  /**
   * Executes benchmark test on provided function.
   * @param fn - Function to benchmark
   * @param options - Benchmark configuration options or number of iterations
   * @returns BenchmarkResult with performance metrics
   * @throws {Error} When invalid configuration parameters are provided
   */
  public static run<T extends (...args: unknown[]) => unknown>(
    fn: T,
    options: BenchmarkOptions | number = {}
  ): BenchmarkResult {
    const opts: BenchmarkOptions = typeof options === 'number' ? { iterations: options } : options
    const iterations: number = opts.iterations ?? 1000
    if (iterations <= 0) {
      throw new Error(`Invalid iterations: ${iterations}. Must be greater than 0.`)
    }
    const warmup: number = opts.warmup ?? Math.min(100, Math.floor(iterations / 10))
    if (warmup < 0) {
      throw new Error(`Invalid warmup: ${warmup}. Must be 0 or greater.`)
    }
    const maxDuration: number = opts.maxDuration ?? 60000
    if (maxDuration <= 0) {
      throw new Error(`Invalid maxDuration: ${maxDuration}. Must be greater than 0.`)
    }
    const outlierThreshold: number = opts.outlierThreshold ?? 3
    if (outlierThreshold < 0) {
      throw new Error(`Invalid outlierThreshold: ${outlierThreshold}. Must be 0 or greater.`)
    }
    const trackMemory: boolean = opts.trackMemory ?? false
    const name: string = opts.name ?? (fn.name || 'anonymous')
    const initialMemory: NodeJS.MemoryUsage | undefined = trackMemory
      ? process.memoryUsage()
      : undefined
    for (let i: number = 0; i < warmup; i++) {
      fn()
    }
    const durations: number[] = []
    const startTime: number = performance.now()
    for (let i: number = 0; i < iterations; i++) {
      const iterationStart: number = performance.now()
      fn()
      const iterationEnd: number = performance.now()
      durations.push(iterationEnd - iterationStart)
      if (performance.now() - startTime > maxDuration) {
        break
      }
    }
    const finalMemory: NodeJS.MemoryUsage | undefined = trackMemory
      ? process.memoryUsage()
      : undefined
    const actualIterations: number = durations.length
    const totalTime: number = performance.now() - startTime
    const cleanedDurations: number[] = removeOutliers(durations, outlierThreshold)
    const outliers: number = durations.length - cleanedDurations.length
    const stats: ProcessStats =
      cleanedDurations.length > 0
        ? calcBenchmarkStats(cleanedDurations)
        : calcBenchmarkStats(durations)
    const result: BenchmarkResult = {
      name,
      iterations: actualIterations,
      warmupIterations: warmup,
      totalTime,
      avgTime: stats.avgDuration,
      minTime: stats.minDuration,
      maxTime: stats.maxDuration,
      p95Time: stats.p95Duration,
      p99Time: stats.p99Duration,
      stdDev: calcStdDev(cleanedDurations.length > 0 ? cleanedDurations : durations),
      outliers
    }
    if (trackMemory && initialMemory && finalMemory) {
      const totalMemoryDelta: number =
        finalMemory.heapUsed -
        initialMemory.heapUsed +
        (finalMemory.external - initialMemory.external) +
        (finalMemory.arrayBuffers - initialMemory.arrayBuffers) +
        (finalMemory.rss - initialMemory.rss)
      result.memoryDelta = totalMemoryDelta
    }
    return result
  }
}
