import { ObjectWithNonNullableKey } from '../object';

interface sortAlphabeticallyByFieldFunction {
  <T>(list: Array<T>, key: keyof T): Array<T>;
}

export const sortAlphabeticallyByField: sortAlphabeticallyByFieldFunction = (
  list,
  key
) => {
  return [...list].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }

    return 0;
  });
};

interface getArrayDifferencesFn {
  <T>(
    originalList: Array<T>,
    finalList: Array<T>,
    itemIdKey: T extends nonObjectTypes ? false : keyof T
  ): {
    itemsRemoved: Array<T>;
    itemsAdded: Array<T>;
  };
}

type nonObjectTypes = string | number | boolean;

export const getArrayDifferences: getArrayDifferencesFn = (
  originalList,
  finalList,
  itemIdKey
) => {
  const finalListIdentifiers = finalList.map((finalListItem) => {
    if (
      finalListItem &&
      typeof finalListItem === 'object' &&
      itemIdKey !== false
    ) {
      return finalListItem[itemIdKey as keyof typeof finalListItem];
    }
    return finalListItem;
  });

  const originalListIdentifiers = originalList.map((originalListItem) => {
    if (
      originalListItem &&
      typeof originalListItem === 'object' &&
      itemIdKey !== false
    ) {
      return originalListItem[itemIdKey as keyof typeof originalListItem];
    }
    return originalListItem;
  });

  const itemsRemoved = originalList.filter((originalListItem) => {
    const thisItemValue =
      originalListItem &&
      typeof originalListItem === 'object' &&
      itemIdKey !== false
        ? originalListItem[itemIdKey as keyof typeof originalListItem]
        : originalListItem;

    return !finalListIdentifiers.includes(thisItemValue);
  });

  const itemsAdded = finalList.filter((finalListItem) => {
    const thisItemValue =
      finalListItem && typeof finalListItem === 'object' && itemIdKey !== false
        ? finalListItem[itemIdKey as keyof typeof finalListItem]
        : finalListItem;

    return !originalListIdentifiers.includes(thisItemValue);
  });

  return { itemsRemoved, itemsAdded };
};

interface getArrayOfValuesByKeyFn {
  <O, K extends keyof O>(list: Array<O>, key: K): Array<O[K]>;
}

export const getArrayOfValuesByKey: getArrayOfValuesByKeyFn = (list, key) => {
  return list.map((item) => item[key]);
};

interface getArrayWithoutUndefinedItemsFn {
  <T>(array: Array<T | undefined>): Array<T>;
}

export const getArrayWithoutUndefinedItems: getArrayWithoutUndefinedItemsFn = (
  list
) => {
  return list.filter((item) => typeof item !== 'undefined') as Array<
    NonNullable<(typeof list)[number]>
  >;
};

interface getArrayOfValuesWithoutUndefinedFn {
  <O, K extends keyof O>(list: Array<O | undefined>, key: K): Array<
    NonNullable<O[K]>
  >;
}

export const getArrayOfValuesWithoutUndefined: getArrayOfValuesWithoutUndefinedFn =
  (list, key) => {
    const listWithoutUndefinedItems = getArrayWithoutUndefinedItems(list);
    const listOfValues = getArrayOfValuesByKey(listWithoutUndefinedItems, key);
    const listOfValuesWithoutUndefinedItems =
      getArrayWithoutUndefinedItems(listOfValues);
    return listOfValuesWithoutUndefinedItems as Array<
      NonNullable<(typeof listOfValuesWithoutUndefinedItems)[number]>
    >;
  };

interface getArrayOfObjectFilterByNonUndefinedKeyFn {
  <O, K extends keyof O>(list: Array<O>, key: K): Array<
    ObjectWithNonNullableKey<O, K>
  >;
}

export const getArrayOfObjectFilterByNonUndefinedKey: getArrayOfObjectFilterByNonUndefinedKeyFn =
  (list, key) => {
    return list.filter((item) => typeof item[key] !== 'undefined') as Array<
      ObjectWithNonNullableKey<(typeof list)[number], typeof key>
    >;
  };
