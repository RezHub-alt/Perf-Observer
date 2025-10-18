/**
 * Configuration options for benchmark execution.
 */
export interface BenchmarkOptions {
  /** Number of iterations to run for the benchmark */
  iterations?: number
  /** Number of warmup iterations before actual measurement */
  warmup?: number
  /** Maximum duration in milliseconds for the entire benchmark */
  maxDuration?: number
  /** Threshold for outlier detection using standard deviations */
  outlierThreshold?: number
  /** Whether to track memory usage during benchmark */
  trackMemory?: boolean
  /** Custom name for the benchmark */
  name?: string
}

/**
 * Results from benchmark execution.
 */
export interface BenchmarkResult {
  /** Name of the benchmark */
  name: string
  /** Actual number of iterations completed */
  iterations: number
  /** Number of warmup iterations performed */
  warmupIterations: number
  /** Total time taken for all iterations in milliseconds */
  totalTime: number
  /** Average time per iteration in milliseconds */
  avgTime: number
  /** Minimum time for a single iteration in milliseconds */
  minTime: number
  /** Maximum time for a single iteration in milliseconds */
  maxTime: number
  /** 95th percentile time in milliseconds */
  p95Time: number
  /** 99th percentile time in milliseconds */
  p99Time: number
  /** Standard deviation of iteration times */
  stdDev: number
  /** Number of outliers detected and removed */
  outliers: number
  /** Memory usage delta in bytes (if memory tracking enabled) */
  memoryDelta?: number
}

/**
 * Individual process timing entry.
 */
export interface ProcessEntry {
  /** Name identifier for the process */
  name: string
  /** Start time in milliseconds from performance.now() */
  startTime: number
  /** End time in milliseconds from performance.now() */
  endTime?: number
  /** Calculated duration in milliseconds */
  duration?: number
}

/**
 * Statistical summary of process durations.
 */
export interface ProcessStats {
  /** Number of processes included in statistics */
  count: number
  /** Average duration across all processes in milliseconds */
  avgDuration: number
  /** Minimum duration in milliseconds */
  minDuration: number
  /** Maximum duration in milliseconds */
  maxDuration: number
  /** 95th percentile duration in milliseconds */
  p95Duration: number
  /** 99th percentile duration in milliseconds */
  p99Duration: number
}
