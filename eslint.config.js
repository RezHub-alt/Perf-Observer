/**
 * ESLint configuration by NeaByteLab
 * @fileoverview Linting boilerplate rules with Strict Coding Rules
 */

import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import pluginSonarjs from 'eslint-plugin-sonarjs'
import pluginSecurity from 'eslint-plugin-security'
import tsESLint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/**
 * ESLint configuration array
 * @description Configuration array with ESLint rules and settings
 */
export default [
  js.configs.recommended,
  pluginSonarjs.configs.recommended,
  prettierConfig,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'examples/codebase/**/*.ts'],
    ignores: [],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        module: 'readonly',
        performance: 'readonly',
        process: 'readonly',
        NodeJS: 'readonly',
        require: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsESLint,
      security: pluginSecurity
    },
    rules: {
      // General Rules
      'arrow-spacing': 'error',
      'comma-dangle': ['error', 'never'],
      curly: ['error', 'all'],
      indent: 'off',
      'no-constant-condition': 'error',
      'no-control-regex': 'off',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-parens': [
        'error',
        'all',
        {
          conditionalAssign: false,
          returnAssign: false,
          nestedBinaryExpressions: false,
          ignoreJSX: 'all'
        }
      ],
      'no-extra-semi': 'off',
      'no-func-assign': 'error',
      'no-inline-comments': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'no-console': 'off',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true
        }
      ],
      'prefer-template': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'use-isnan': 'error',
      'valid-typeof': 'error',

      // TypeScript Rules
      ...tsESLint.configs.recommended.rules,
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-destructuring': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-promise-reject-errors': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/sort-type-constituents': 'error',
      '@typescript-eslint/unbound-method': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          arrayDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: false
        }
      ],

      // Naming Convention
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase']
        },
        {
          selector: 'enum',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE']
        },
        {
          selector: 'function',
          format: ['camelCase']
        },
        {
          selector: 'interface',
          format: ['PascalCase']
        },
        {
          selector: 'method',
          format: ['camelCase']
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'property',
          format: ['camelCase'],
          filter: {
            regex: '^\\.',
            match: false
          }
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        },
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid'
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE']
        }
      ],

      // Code Quality & Complexity
      'sonarjs/argument-type': 'error',
      'sonarjs/arguments-order': 'error',
      'sonarjs/array-callback-without-return': 'error',
      'sonarjs/array-constructor': 'error',
      'sonarjs/assertions-in-tests': 'error',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/function-return-type': 'error',
      'sonarjs/max-switch-cases': ['error', 30],
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-array-delete': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-commented-code': 'error',
      'sonarjs/no-dead-store': 'error',
      'sonarjs/no-duplicate-in-composite': 'error',
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-element-overwrite': 'error',
      'sonarjs/no-extra-arguments': 'error',
      'sonarjs/no-gratuitous-expressions': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-ignored-return': 'error',
      'sonarjs/no-inverted-boolean-check': 'error',
      'sonarjs/no-misleading-array-reverse': 'error',
      'sonarjs/no-nested-switch': 'error',
      'sonarjs/no-nested-template-literals': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-redundant-jump': 'error',
      'sonarjs/no-same-line-conditional': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/no-tab': 'error',
      'sonarjs/no-try-promise': 'error',
      'sonarjs/no-unthrown-error': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/no-useless-increment': 'error',
      'sonarjs/no-variable-usage-before-declaration': 'error',
      'sonarjs/non-existent-operator': 'error',
      'sonarjs/prefer-default-last': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-object-literal': 'error',
      'sonarjs/prefer-promise-shorthand': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/prefer-type-guard': 'error',
      'sonarjs/prefer-while': 'error',
      'sonarjs/use-type-alias': 'error',

      // Security Vulnerability Detection
      'security/detect-buffer-noassert': 'warn',
      'security/detect-child-process': 'warn',
      'security/detect-disable-mustache-escape': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-require': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',
      'security/detect-unsafe-regex': 'warn'
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.js', '**/*.d.ts', '**/*.txt', '**/*.md']
  }
]
