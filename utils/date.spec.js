const { isBetweenDates, isDateValid } = require('./date')

describe('isBetweenDates fn', () => {
  it('should return true if a date is between a range', () => {
    const lowerLimit = new Date('2021-01-01')
    const upperLimit = new Date('2021-02-01')
    const date = new Date('2021-01-15');
    const result = isBetweenDates({
      date,
      upperLimit,
      lowerLimit,
    })
    expect(result).toBe(true)
  });

  it('should return false if a date is not between a range', () => {
    const lowerLimit = new Date('2021-01-01')
    const upperLimit = new Date('2021-02-01')
    const date = new Date('2021-02-15');
    const result = isBetweenDates({
      date,
      upperLimit,
      lowerLimit,
    })
    expect(result).toBe(false)
  });

  it('should false if dates are invalid', () => {
    expect(isBetweenDates({
      date: new Date('invalid date'),
      upperLimit: new Date('2021-02-01'),
      lowerLimit: new Date('2021-01-15'),
    })).toBe(false)

    expect(isBetweenDates({
      upperLimit: new Date('invalid date'),
      date: new Date('2021-02-01'),
      lowerLimit: new Date('2021-01-15'),
    })).toBe(false)

    expect(isBetweenDates({
      lowerLimit: new Date('invalid date'),
      date: new Date('2021-02-01'),
      upperLimit: new Date('2021-01-15'),
    })).toBe(false)

    expect(isBetweenDates({
      lowerLimit: new Date('2021-01-01'),
      date: undefined,
      upperLimit: new Date('2021-12-15'),
    })).toBe(false)
  });
});

describe('isDateValid fn', () => {
  it('should return false if date is invalid', () => {
    expect(isDateValid(null)).toBe(false)
    expect(isDateValid(undefined)).toBe(false)
    expect(isDateValid(false)).toBe(false)
    expect(isDateValid(new Date('invalid date'))).toBe(false)
  });
});