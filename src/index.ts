import type {
  BenchmarkOptions,
  BenchmarkResult,
  ProcessEntry,
  ProcessStats
} from '@root/Interfaces'
import { Benchmark } from '@root/Benchmark'
import { calcPercentile, defaultStats } from '@root/Utils'
import { performance } from 'perf_hooks'

/**
 * Performance tracking utility.
 * @description Provides timing and benchmarking.
 */
class PerfObserver {
  /** Map of currently running processes */
  private readonly processes: Map<string, ProcessEntry> = new Map<string, ProcessEntry>()
  /** Map of completed processes with timing data */
  private readonly completed: Map<string, ProcessEntry> = new Map<string, ProcessEntry>()
  /** Maximum number of completed entries to retain in memory */
  private readonly maxCompletedEntries: number = 1000

  /**
   * Ends timing for a process and calculates its duration.
   * @param name - Name of the process to end
   * @returns Duration of the process in milliseconds
   * @throws {Error} When the process was not started
   */
  public end(name: string): number {
    const process: ProcessEntry | undefined = this.processes.get(name)
    if (!process) {
      throw new Error(`Process "${name}" was not started`)
    }
    const endTime: number = performance.now()
    const duration: number = endTime - process.startTime
    const completedProcess: ProcessEntry = {
      ...process,
      endTime,
      duration
    }
    this.completed.set(name, completedProcess)
    this.processes.delete(name)
    if (this.completed.size > this.maxCompletedEntries) {
      const entries: [string, ProcessEntry][] = Array.from(this.completed.entries())
      const toDelete: [string, ProcessEntry][] = entries.slice(
        0,
        entries.length - this.maxCompletedEntries
      )
      toDelete.forEach(([key]: [string, ProcessEntry]) => this.completed.delete(key))
    }
    return duration
  }

  /**
   * Finds processes that took longer than the specified threshold.
   * @param threshold - Minimum duration threshold in milliseconds
   * @returns Array of slow processes sorted by duration descending
   */
  public findSlowProcesses(threshold: number = 1000): ProcessEntry[] {
    return Array.from(this.completed.values())
      .filter((process: ProcessEntry) => (process.duration as number) > threshold)
      .sort((a: ProcessEntry, b: ProcessEntry) => (b.duration as number) - (a.duration as number))
  }

  /**
   * Calculates statistical summary for process durations.
   * @param name - Optional specific process name to analyze, or undefined for all processes
   * @returns ProcessStats object with calculated statistics
   */
  public getStats(name?: string): ProcessStats {
    const entries: (ProcessEntry | undefined)[] =
      name !== undefined ? [this.completed.get(name)] : Array.from(this.completed.values())
    const validEntries: ProcessEntry[] = entries.filter(
      (e: ProcessEntry | undefined): e is ProcessEntry => e?.duration !== undefined
    )
    if (validEntries.length === 0) {
      return defaultStats()
    }
    const durations: number[] = validEntries.map((e: ProcessEntry) => e.duration as number)
    return {
      count: validEntries.length,
      avgDuration: durations.reduce((sum: number, d: number) => sum + d, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      p95Duration: calcPercentile(durations, 95),
      p99Duration: calcPercentile(durations, 99)
    }
  }

  /**
   * Starts timing for a process.
   * @param name - Name identifier for the process to start timing
   */
  public start(name: string): void {
    const startTime: number = performance.now()
    this.processes.set(name, {
      name,
      startTime
    })
  }

  /**
   * Wraps a function with automatic performance tracking.
   * @param fn - Function to wrap with performance tracking
   * @param name - Optional custom name for the process, defaults to function name or 'anonymous'
   * @returns Wrapped function with automatic timing
   */
  public track<T extends (...args: unknown[]) => unknown>(fn: T, name?: string): T {
    const processName: string = name ?? fn.name ?? 'anonymous'
    return ((...args: unknown[]) => {
      this.start(processName)
      try {
        const result: unknown = fn(...args)
        if (result instanceof Promise) {
          return result.finally(() => {
            this.end(processName)
          }) as unknown as T
        }
        this.end(processName)
        return result as T
      } catch (error: unknown) {
        this.end(processName)
        throw error
      }
    }) as T
  }

  /**
   * Executes a benchmark test on a function.
   * @param fn - Function to benchmark
   * @param options - Benchmark configuration options or number of iterations
   * @returns BenchmarkResult with performance metrics
   */
  public benchmark<T extends (...args: unknown[]) => unknown>(
    fn: T,
    options: BenchmarkOptions | number = {}
  ): BenchmarkResult {
    return Benchmark.run(fn, options)
  }
}

/**
 * Exports interfaces and types.
 * @description Re-exports type definitions.
 */
export * from '@root/Interfaces'

/**
 * Default PerfObserver instance.
 * @description Pre-configured singleton instance.
 */
const perfObserver: PerfObserver = new PerfObserver()
export default perfObserver
