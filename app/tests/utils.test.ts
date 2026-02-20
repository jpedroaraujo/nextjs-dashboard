import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDateToLocal,
  generateYAxis,
  generatePagination,
} from "../lib/utils";
import type { Revenue } from "../lib/definitions";

describe("formatCurrency", () => {
  it("should format a positive amount correctly", () => {
    expect(formatCurrency(10000)).toBe("$100.00");
  });

  it("should format zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should format negative amounts correctly", () => {
    expect(formatCurrency(-5000)).toBe("-$50.00");
  });

  it("should format cents correctly", () => {
    expect(formatCurrency(1)).toBe("$0.01");
    expect(formatCurrency(99)).toBe("$0.99");
  });

  it("should format large amounts correctly", () => {
    expect(formatCurrency(123456789)).toBe("$1,234,567.89");
  });

  it("should handle decimal division correctly", () => {
    expect(formatCurrency(12345)).toBe("$123.45");
  });
});

describe("formatDateToLocal", () => {
  it("should format a date with default locale (en-US)", () => {
    const result = formatDateToLocal("2024-01-15T12:00:00");
    expect(result).toBe("Jan 15, 2024");
  });

  it("should format a date with custom locale", () => {
    const result = formatDateToLocal("2024-01-15T12:00:00", "en-GB");
    expect(result).toBe("15 Jan 2024");
  });

  it("should handle different date formats", () => {
    const result1 = formatDateToLocal("2024-12-31T12:00:00");
    expect(result1).toBe("Dec 31, 2024");

    const result2 = formatDateToLocal("2024-01-01T12:00:00");
    expect(result2).toBe("Jan 1, 2024");
  });

  it("should handle ISO datetime strings", () => {
    const result = formatDateToLocal("2024-06-15T12:30:00");
    expect(result).toMatch(/Jun 1[45], 2024/);
  });

  it("should format dates correctly regardless of input format", () => {
    const result = formatDateToLocal("2024-03-20T08:00:00");
    expect(result).toMatch(/Mar 20, 2024/);
  });
});

describe("generateYAxis", () => {
  it("should generate correct y-axis labels for simple revenue data", () => {
    const revenue: Revenue[] = [
      { month: "Jan", revenue: 2000 },
      { month: "Feb", revenue: 3000 },
      { month: "Mar", revenue: 1500 },
    ];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(3000);
    expect(result.yAxisLabels).toEqual(["$3K", "$2K", "$1K", "$0K"]);
  });

  it("should round up to nearest thousand", () => {
    const revenue: Revenue[] = [{ month: "Jan", revenue: 2500 }];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(3000);
    expect(result.yAxisLabels).toEqual(["$3K", "$2K", "$1K", "$0K"]);
  });

  it("should handle revenue that is already a round thousand", () => {
    const revenue: Revenue[] = [{ month: "Jan", revenue: 5000 }];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(5000);
    expect(result.yAxisLabels).toEqual([
      "$5K",
      "$4K",
      "$3K",
      "$2K",
      "$1K",
      "$0K",
    ]);
  });

  it("should handle zero revenue", () => {
    const revenue: Revenue[] = [{ month: "Jan", revenue: 0 }];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(0);
    expect(result.yAxisLabels).toEqual(["$0K"]);
  });

  it("should handle large revenue values", () => {
    const revenue: Revenue[] = [{ month: "Jan", revenue: 15750 }];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(16000);
    expect(result.yAxisLabels.length).toBe(17);
    expect(result.yAxisLabels[0]).toBe("$16K");
    expect(result.yAxisLabels[result.yAxisLabels.length - 1]).toBe("$0K");
  });

  it("should use the highest revenue value from multiple months", () => {
    const revenue: Revenue[] = [
      { month: "Jan", revenue: 2000 },
      { month: "Feb", revenue: 8500 },
      { month: "Mar", revenue: 3000 },
    ];

    const result = generateYAxis(revenue);

    expect(result.topLabel).toBe(9000);
  });
});

describe("generatePagination", () => {
  describe("when total pages <= 7", () => {
    it("should show all pages without ellipsis", () => {
      expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(generatePagination(1, 1)).toEqual([1]);
    });
  });

  describe("when current page is in first 3 pages", () => {
    it("should show first 3, ellipsis, and last 2 pages", () => {
      expect(generatePagination(1, 10)).toEqual([1, 2, 3, "...", 9, 10]);
      expect(generatePagination(2, 10)).toEqual([1, 2, 3, "...", 9, 10]);
      expect(generatePagination(3, 10)).toEqual([1, 2, 3, "...", 9, 10]);
    });
  });

  describe("when current page is in last 3 pages", () => {
    it("should show first 2, ellipsis, and last 3 pages", () => {
      expect(generatePagination(8, 10)).toEqual([1, 2, "...", 8, 9, 10]);
      expect(generatePagination(9, 10)).toEqual([1, 2, "...", 8, 9, 10]);
      expect(generatePagination(10, 10)).toEqual([1, 2, "...", 8, 9, 10]);
    });
  });

  describe("when current page is in the middle", () => {
    it("should show first page, ellipsis, current ±1, ellipsis, last page", () => {
      expect(generatePagination(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
      expect(generatePagination(6, 15)).toEqual([1, "...", 5, 6, 7, "...", 15]);
      expect(generatePagination(4, 8)).toEqual([1, "...", 3, 4, 5, "...", 8]);
    });
  });

  describe("edge cases", () => {
    it("should handle exactly 8 pages correctly", () => {
      expect(generatePagination(1, 8)).toEqual([1, 2, 3, "...", 7, 8]);
      expect(generatePagination(4, 8)).toEqual([1, "...", 3, 4, 5, "...", 8]);
      expect(generatePagination(8, 8)).toEqual([1, 2, "...", 6, 7, 8]);
    });

    it("should handle page 4 with 10 total pages (boundary between first 3 and middle)", () => {
      expect(generatePagination(4, 10)).toEqual([1, "...", 3, 4, 5, "...", 10]);
    });

    it("should handle page 7 with 10 total pages (boundary between middle and last 3)", () => {
      expect(generatePagination(7, 10)).toEqual([1, "...", 6, 7, 8, "...", 10]);
    });
  });
});
