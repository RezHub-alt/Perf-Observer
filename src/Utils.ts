import type { ProcessStats } from '@root/Interfaces'

/**
 * Calculates benchmark statistics from duration data.
 * @param durations - Array of duration measurements in milliseconds
 * @returns ProcessStats object with calculated statistics
 */
export function calcBenchmarkStats(durations: number[]): ProcessStats {
  if (durations.length === 0) {
    return defaultStats()
  }
  const validDurations: number[] = durations.filter(
    (val: number) => Number.isFinite(val) && !Number.isNaN(val)
  )
  if (validDurations.length === 0) {
    return defaultStats()
  }
  return {
    count: validDurations.length,
    avgDuration:
      validDurations.reduce((sum: number, d: number) => sum + d, 0) / validDurations.length,
    minDuration: Math.min(...validDurations),
    maxDuration: Math.max(...validDurations),
    p95Duration: calcPercentile(validDurations, 95),
    p99Duration: calcPercentile(validDurations, 99)
  }
}

/**
 * Calculates percentile value from array of numbers using linear interpolation.
 * @param values - Array of numeric values
 * @param percentile - Percentile to calculate (0-100)
 * @returns Value at the specified percentile
 */
export function calcPercentile(values: number[], percentile: number): number {
  if (values.length === 0) {
    return 0
  }
  const validValues: number[] = values.filter(
    (val: number) => Number.isFinite(val) && !Number.isNaN(val)
  )
  if (validValues.length === 0) {
    return 0
  }
  const sorted: number[] = [...validValues].sort((a: number, b: number) => a - b)
  const n: number = sorted.length

  if (percentile <= 0) {
    return sorted[0] ?? 0
  }
  if (percentile >= 100) {
    return sorted[n - 1] ?? 0
  }
  const position: number = (percentile / 100) * (n - 1)
  const lower: number = Math.floor(position)
  const upper: number = Math.ceil(position)
  const weight: number = position - lower
  if (weight === 0) {
    return sorted[lower] ?? 0
  }
  return (sorted[lower] ?? 0) * (1 - weight) + (sorted[upper] ?? 0) * weight
}

/**
 * Calculates standard deviation of array values.
 * @param values - Array of numeric values
 * @returns Standard deviation value
 */
export function calcStdDev(values: number[]): number {
  if (values.length === 0) {
    return 0
  }
  const validValues: number[] = values.filter(
    (val: number) => Number.isFinite(val) && !Number.isNaN(val)
  )
  if (validValues.length === 0) {
    return 0
  }
  if (validValues.length === 1) {
    return 0
  }
  const mean: number =
    validValues.reduce((sum: number, val: number) => sum + val, 0) / validValues.length
  const variance: number =
    validValues.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) /
    (validValues.length - 1)
  return Math.sqrt(variance)
}

/**
 * Returns default process statistics.
 * @returns ProcessStats object with default values
 */
export function defaultStats(): ProcessStats {
  return {
    count: 0,
    avgDuration: 0,
    minDuration: 0,
    maxDuration: 0,
    p95Duration: 0,
    p99Duration: 0
  }
}

/**
 * Removes outliers from array using statistical analysis.
 * @param values - Array of numeric values to filter
 * @param threshold - Maximum z-score allowed (default: 3 standard deviations)
 * @returns Array with outliers removed
 */
export function removeOutliers(values: number[], threshold: number): number[] {
  if (values.length === 0) {
    return []
  }
  const validValues: number[] = values.filter(
    (val: number) => Number.isFinite(val) && !Number.isNaN(val)
  )
  if (validValues.length === 0) {
    return []
  }
  if (validValues.length === 1) {
    return validValues
  }
  const mean: number =
    validValues.reduce((sum: number, val: number) => sum + val, 0) / validValues.length
  const variance: number =
    validValues.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) /
    (validValues.length - 1)
  const stdDev: number = Math.sqrt(variance)
  if (stdDev === 0) {
    return validValues
  }
  return validValues.filter((value: number) => {
    const zScore: number = Math.abs(value - mean) / stdDev
    return zScore <= threshold
  })
}
