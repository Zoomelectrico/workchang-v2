module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-inferrable-types': [
      'warn', {
        'ignoreParameters': true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': [
      1,
      {
        'argsIgnorePattern': 'res|next|^err'
      }
    ],
    'arrow-body-style': [
      2,
      'as-needed'
    ],
    'no-param-reassign': [
      2,
      {
        'props': false
      }
    ],
    'no-console': 0,
    'import': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'radix': 0,
    'no-shadow': [
      2,
      {
        'hoist': 'all',
        'allow': [
          'resolve',
          'reject',
          'done',
          'next',
          'err',
          'error'
        ]
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'lf',
        'semi': true,
        'singleQuote': true,
        'tabWidth': 2,
        'trailingComma': 'es5',
        'printWidth': 80
      }
    ],
    'import/no-cycle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
};
