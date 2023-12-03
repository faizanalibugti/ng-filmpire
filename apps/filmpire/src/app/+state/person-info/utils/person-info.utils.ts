import { Cast } from '@ng-filmpire/api-interfaces';

export const removeDuplicates = <T, K extends keyof T>(
  arr: T[],
  property: K
): T[] => {
  const uniqueMap = new Map<T[K], T>();

  for (const item of arr) {
    // Use the specified property as the key in the Map
    uniqueMap.set(item[property], item);
  }

  return Array.from(uniqueMap.values());
};

// Calculate actor's age
export const calculateAge = (birthday: string) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  return today.getFullYear() - birthDate.getFullYear();
};

export const sortMediaByReleaseDate = (mediaA: Cast, mediaB: Cast) => {
  const dateA = mediaA.release_date || mediaA.first_air_date;
  const dateB = mediaB.release_date || mediaB.first_air_date;

  // Handle media without release dates
  if (!dateA && !dateB) {
    return 0; // Both media items are missing release dates
  } else if (!dateA) {
    return -1; // mediaA (no release date) comes before mediaB
  } else if (!dateB) {
    return 1; // mediaB (no release date) comes before mediaA
  }

  // Convert date strings to Date objects
  const dateObjA = new Date(dateA);
  const dateObjB = new Date(dateB);

  // Compare dates in descending order
  if (dateObjA > dateObjB) {
    return -1; // mediaA comes before mediaB
  } else if (dateObjA < dateObjB) {
    return 1; // mediaA comes after mediaB
  } else {
    return 0; // dates are equal
  }
};
