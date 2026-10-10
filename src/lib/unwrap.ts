/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The API envelope has two shapes in the wild:
 *   new:  { success, message, meta, data: [...] }        (or data: <object>)
 *   old:  { success, message, data: { meta, <key>: [...] } }
 * These helpers read a list/meta from either, so the UI keeps working while the
 * backend deploy catches up.
 */
export function unwrapList<T = any>(res: any, key?: string): T[] {
  const data = res?.data;

  if (Array.isArray(data)) return data as T[];

  if (key && Array.isArray(data?.[key])) return data[key] as T[];

  if (data && typeof data === "object") {
    const firstArray = Object.values(data).find((value) => Array.isArray(value));
    if (Array.isArray(firstArray)) return firstArray as T[];
  }

  return [];
}

export function unwrapMeta(res: any): { page: number; limit: number; total: number } {
  return res?.meta ?? res?.data?.meta ?? { page: 1, limit: 9, total: 0 };
}
