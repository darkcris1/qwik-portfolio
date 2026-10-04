const START_DATE = new Date(2021, 3, 1); // April 2021

// Whole years, plus whether the remainder is half a year or more (e.g. 5.51 counts as "over 5").
export const getYearsOfExperience = (): { years: number; over: boolean } => {
  const exact = (Date.now() - START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const years = Math.floor(exact);
  return { years, over: exact - years >= 0.5 };
};
