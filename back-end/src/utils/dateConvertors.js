const convertDateInZeroHours = (date) => {
    let newDate = new Date(date);
    newDate.setUTCHours(0,0,0,0);
    return newDate.toISOString();
};

module.exports = {
    convertDateInZeroHours,
};