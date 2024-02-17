export const subtractYears = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - years);
    return newDate;
}

export const getFromToDates = () => {
    const endDate = new Date();
    const startDate = subtractYears(endDate, 1);

    return {
        startDate, endDate
    };
};

export const formatDateAsIsoString = (date) => {
    return date.toISOString();
};