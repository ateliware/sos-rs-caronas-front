import {
  getArrayDifferences,
  getArrayOfValuesByKey,
  getArrayOfValuesWithoutUndefined,
  getArrayWithoutUndefinedItems,
  sortAlphabeticallyByField,
} from '.';

const originalArray = [
  {
    name: 'Beta',
    surname: 'Ipsum',
    id: 1,
  },
  {
    name: 'Gama',
    surname: 'Dolor',
    id: 2,
  },
  {
    name: 'Alpha',
    surname: 'Lorem',
    id: 3,
  },
];

const finalArray = [
  {
    name: 'Beta',
    surname: 'Ipsum',
    id: 1,
  },
  {
    name: 'Alpha',
    surname: 'Lorem',
    id: 3,
  },
  {
    name: 'Another',
    surname: 'Item',
    id: 4,
  },
  {
    name: 'Newest',
    surname: 'Element',
    id: 5,
  },
];

const originalArrayWithoutObjects = [1, 2, 3];
const finalArrayWithoutObjects = [1, 3, 4, 5];

describe('sortAlphabeticallyByField', () => {
  test('returns the array correctly sorted by the correct field', () => {
    expect(originalArray[0].name).toBe('Beta');

    const sortedByName = sortAlphabeticallyByField(originalArray, 'name');
    expect(sortedByName[0].name).toBe('Alpha');

    expect(originalArray[0].name).toBe('Beta');

    const sortedBySurname = sortAlphabeticallyByField(originalArray, 'surname');
    expect(sortedBySurname[0].surname).toBe('Dolor');
  });
});

describe('getArrayDifferences', () => {
  test('returns the items added to the array correctly when an array of objects is passed', () => {
    const { itemsAdded } = getArrayDifferences(originalArray, finalArray, 'id');

    originalArray.forEach((thisItem) => {
      expect(itemsAdded).not.toContainEqual(thisItem);
    });
    expect(itemsAdded).toContainEqual(finalArray[2]);
    expect(itemsAdded).toContainEqual(finalArray[3]);
  });

  test('returns the items added to the array correctly when an array of non-objects is passed', () => {
    const { itemsAdded } = getArrayDifferences(
      originalArrayWithoutObjects,
      finalArrayWithoutObjects,
      false
    );

    originalArrayWithoutObjects.forEach((thisItem) => {
      expect(itemsAdded).not.toContainEqual(thisItem);
    });
    expect(itemsAdded).toContainEqual(4);
    expect(itemsAdded).toContainEqual(5);
  });

  test('returns the items removed from the array correctly when an array of objects is passed', () => {
    const { itemsRemoved } = getArrayDifferences(
      originalArray,
      finalArray,
      'id'
    );

    finalArray.forEach((thisItem) => {
      expect(itemsRemoved).not.toContainEqual(thisItem);
    });
    expect(itemsRemoved).toContainEqual(originalArray[1]);
  });

  test('returns the items added to the array correctly when an array of non-objects is passed', () => {
    const { itemsRemoved } = getArrayDifferences(
      originalArrayWithoutObjects,
      finalArrayWithoutObjects,
      false
    );

    finalArrayWithoutObjects.forEach((thisItem) => {
      expect(itemsRemoved).not.toContainEqual(thisItem);
    });
    expect(itemsRemoved).toContainEqual(originalArrayWithoutObjects[1]);
  });
});

describe('getArrayOfValuesByKey', () => {
  test('returns the expected array', () => {
    const arrayOfNames = getArrayOfValuesByKey(originalArray, 'name');
    const arrayOfIds = getArrayOfValuesByKey(originalArray, 'id');

    originalArray.forEach(({ name, id }) => {
      expect(arrayOfNames).toContain(name);
      expect(arrayOfIds).toContain(id);
    });
  });
});

describe('getArrayWithoutUndefined', () => {
  test('returns the expected array', () => {
    const originalArray = [1, 2, 3, undefined, 5, undefined, undefined, 6];

    expect(originalArray).not.toBe([1, 2, 3, 5, 6]);

    const returnedArray = getArrayWithoutUndefinedItems(originalArray);

    expect(returnedArray).toStrictEqual([1, 2, 3, 5, 6]);
  });
});

describe('getArrayOfValuesWithoutUndefined', () => {
  test('returns the expected array', () => {
    const originalArray = [
      undefined,
      { id: 1, name: 'lorem' },
      { id: 2, name: 'ipsum' },
      undefined,
      { id: 3 },
      { id: 4, name: undefined },
      { id: 5, name: '' },
      { id: 6, name: 'dolor' },
    ];

    const arrayOfIds = getArrayOfValuesWithoutUndefined(originalArray, 'id');

    expect(arrayOfIds).toStrictEqual([1, 2, 3, 4, 5, 6]);

    const arrayOfNames = getArrayOfValuesWithoutUndefined(
      originalArray,
      'name'
    );

    expect(arrayOfNames).toStrictEqual(['lorem', 'ipsum', '', 'dolor']);
  });
});
