const inMs = {
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
  M: (date: Date) => {
    const daysOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    return daysOfMonth * 7 * 24 * 60 * 60 * 1000;
  },
};

export const interval2Ms = (interval: string, date = new Date()) => {
  try {
    const intervalType = interval.slice(-1) as keyof typeof inMs;
    const intervalUnits = parseInt(interval.slice(0, interval.length - 1));
    let ms = 0;

    if (intervalType === "M") {
      ms = inMs.M(date);
    } else {
      ms = inMs[intervalType];
    }

    return ms * intervalUnits;
  } catch (error) {
    throw error;
  }
};
