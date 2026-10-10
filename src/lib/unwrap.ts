type UnknownRecord = Record<string, unknown>;

/**
 * The API envelope has two shapes in the wild:
 *   new:  { success, message, meta, data: [...] }        (or data: <object>)
 *   old:  { success, message, data: { meta, <key>: [...] } }
 * These helpers read a list/meta from either, so the UI keeps working while the
 * backend deploy catches up.
 *
 * `T` defaults to `never` so an unparameterised call stays assignable to any
 * expected array type at the call site.
 */
export function unwrapList<T = never>(res: unknown, key?: string): T[] {
  const data = (res as UnknownRecord | null)?.data;

  if (Array.isArray(data)) return data as T[];

  if (data && typeof data === "object") {
    const record = data as UnknownRecord;
    if (key && Array.isArray(record[key])) return record[key] as T[];
    const firstArray = Object.values(record).find((value) => Array.isArray(value));
    if (Array.isArray(firstArray)) return firstArray as T[];
  }

  return [];
}

export function unwrapMeta(res: unknown): { page: number; limit: number; total: number } {
  const record = res as UnknownRecord | null;
  const meta = (record?.meta ?? (record?.data as UnknownRecord | undefined)?.meta) as
    | { page?: number; limit?: number; total?: number }
    | undefined;

  return { page: meta?.page ?? 1, limit: meta?.limit ?? 9, total: meta?.total ?? 0 };
}
