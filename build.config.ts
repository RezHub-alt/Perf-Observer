/**
 * Build configuration for Serve project
 * @fileoverview Configuration for unbuild bundler with TypeScript support
 */

import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'

/**
 * Build configuration object
 * @description Defines the build settings for bundling TypeScript source files
 * @returns Build configuration
 */
export default defineBuildConfig({
  /** Entry points for the build process */
  entries: ['src/index'],
  /** Whether to generate TypeScript declaration files */
  declaration: true,
  /** Whether to clean the output directory before building */
  clean: true,
  /**
   * Path aliases for module resolution
   * Map of alias names to their resolved paths
   */
  alias: {
    /** Alias for root directory */
    '@root': resolve(__dirname, 'src')
  },
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  /** Whether to generate source maps */
  sourcemap: false,
  /** Whether to fail the build on warnings */
  failOnWarn: false
})
