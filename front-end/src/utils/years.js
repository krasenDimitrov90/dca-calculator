export const calculateYearsPast = () => {
    const startDate = new Date('2013-01-01'); // Assuming the start date is January 1, 2013
    const currentDate = new Date();

    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    const yearsPast = currentYear - startYear;

    return yearsPast;
}

export const createYearsNumbersArray = (yearsPast) => {
    const yearArray = Array.from({ length: yearsPast }, (_, index) => index + 1);
    return yearArray;
}

// Format 2: [1 Year, 2 Years, 3 Years]
export const createYearsStringArray = (yearArray) => {
    return yearArray.map(year => `${year} Year${year !== 1 ? 's' : ''}`);
}

// Format 2: [1 Year Ago, 2 Years Ago, 3 Years Ago]
export const createYearsStringArrayWithAgo = (yearArray) => {
    return yearArray.map(year => `${year} Year${year !== 1 ? 's' : ''} Ago`);
}

const yearsFormats = {
    primary: createYearsStringArray,
    secondary: createYearsStringArrayWithAgo,
};

export const createYearsArray = (format) => {
    const yearsPast = calculateYearsPast();
    const yearsArray = createYearsNumbersArray(yearsPast);

    const yearsFormatedArray = yearsFormats[format](yearsArray);

    return yearsFormatedArray;
};