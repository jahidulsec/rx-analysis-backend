export const cleanedQuery = (rawQuery: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(rawQuery).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ])
  );
