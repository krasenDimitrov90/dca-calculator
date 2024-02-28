export const subtractYears = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - years);
    return newDate;
}

export const sumYears = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + years);
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

export const formatDateAsLocalString = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-GB', options);

    // DD/MM/YYYY
    return formattedDate;
};