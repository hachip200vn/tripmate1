/**
 * Utility functions for formatting numbers, currency, and text.
 * Enforces dot (.) as thousands separator for Vietnamese currency (e.g. 350000 -> 350.000).
 */

export function formatCurrency(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return '0';
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  if (isNaN(num)) return '0';
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatVND(value: number | string | undefined | null): string {
  return `${formatCurrency(value)} đ`;
}
