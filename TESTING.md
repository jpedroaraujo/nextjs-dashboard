# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit testing.

## Running Tests

```bash
# Run tests in watch mode (reruns on file changes)
pnpm test

# Run tests once (CI mode)
pnpm test:run

# Run tests with UI
pnpm test:ui
```

## Test Coverage

### `app/lib/utils.ts` ✅

All utility functions are fully tested:

- **`formatCurrency(amount)`** - 6 tests
  - Positive amounts, zero, negative amounts
  - Cents and large amounts
  - Decimal division correctness

- **`formatDateToLocal(dateStr, locale)`** - 5 tests
  - Default locale (en-US)
  - Custom locales (en-GB)
  - Different date formats
  - ISO datetime strings

- **`generateYAxis(revenue)`** - 6 tests
  - Simple revenue data
  - Rounding to nearest thousand
  - Zero and large values
  - Multiple months with varying revenue

- **`generatePagination(currentPage, totalPages)`** - 7 tests
  - Total pages ≤ 7 (no ellipsis)
  - Current page in first 3
  - Current page in last 3
  - Current page in middle
  - Edge cases and boundary conditions

## Test Structure

Tests are located next to the files they test with a `.test.ts` extension:
```
app/lib/
├── utils.ts
└── utils.test.ts
```

## Configuration

Vitest configuration is in `vitest.config.ts`:
- Node environment for server-side code
- Global test APIs (describe, it, expect)
- Path aliases matching your tsconfig (@/ → project root)

## Writing New Tests

1. Create a file with `.test.ts` extension next to the code you're testing
2. Import test utilities from `vitest`
3. Use `describe` blocks to group related tests
4. Use `it` or `test` for individual test cases
5. Use `expect` for assertions

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFile';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

## Next Steps

Consider adding tests for:
- Form validation schemas in `actions.ts`
- Data transformation logic in `data.ts` (with mocked database)
- React components using `@testing-library/react`
