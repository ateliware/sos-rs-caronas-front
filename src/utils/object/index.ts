export const reverseKeyValueObject = (object: { [key: string]: string }) => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [value, key])
  );
};

export function isEmpty(obj: any) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

export function toValueLabel(value: string) {
  return {
    value: value,
    label: value,
  };
}

export type ObjectWithNonNullableKey<O, K extends keyof O> = Omit<O, K> &
  Record<K, NonNullable<O[K]>>;
