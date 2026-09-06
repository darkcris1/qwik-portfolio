const START_DATE = new Date(2021, 3, 1); // April 2021

export const getYearsOfExperience = (): number =>
  Math.round((Date.now() - START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
