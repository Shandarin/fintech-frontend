/** Shared presentation formatting. Missing numbers are never converted to zero. */
export const number = (value: number, decimals = 2) => value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
export const numberZh = (value: string | number, maximumFractionDigits = 2) => Number(value).toLocaleString('zh-CN', { maximumFractionDigits });
export const percent = (value: number) => (value * 100).toFixed(2) + '%';
export const signedPercent = (value: number) => `${value > 0 ? '+' : ''}${percent(value)}`;
