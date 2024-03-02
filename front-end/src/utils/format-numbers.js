export function formatNumberWithSuffixAndCommas(number) {
    if (number < 1000000) return Number(number).toLocaleString();
    
    if (isNaN(number)) {
        return "Invalid input";
    }

    const suffixes = ["", "K", "M", "B", "T"];
    let suffixIndex = 0;

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
        number /= 1000;
        suffixIndex++;
    }

    const formattedNumber = number % 1 !== 0 ? number.toFixed(1) : Math.floor(number);
    const numberWithCommas = formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const suffix = suffixes[suffixIndex];

    return `${numberWithCommas}${suffix}`;
}


// console.log(formatNumberWithSuffixAndCommas(100), ' -> 100'); 
// console.log(formatNumberWithSuffixAndCommas(1000), ' -> 1,000'); 
// console.log(formatNumberWithSuffixAndCommas(10000), ' -> 10,000'); 
// console.log(formatNumberWithSuffixAndCommas(100000), ' -> 100,000'); 
// console.log(formatNumberWithSuffixAndCommas(1000000), ' -> 1M'); 
// console.log(formatNumberWithSuffixAndCommas(10000000), ' -> 10M'); 
// console.log(formatNumberWithSuffixAndCommas(100000000), ' -> 100M'); 
// console.log(formatNumberWithSuffixAndCommas(1000000000), ' -> 1B'); 
// console.log(formatNumberWithSuffixAndCommas(10000000000), ' -> 10B'); 
// console.log(formatNumberWithSuffixAndCommas(100000000000), ' -> 100B'); 
// console.log(formatNumberWithSuffixAndCommas(10000000000000), ' -> 1T'); 

// console.log(formatNumberWithSuffixAndCommas(1200000), ' -> 1.2M'); 
// console.log(formatNumberWithSuffixAndCommas(10001000), ' -> 10.0M'); 
// console.log(formatNumberWithSuffixAndCommas(100010000), ' -> 100.0M'); 
// console.log(formatNumberWithSuffixAndCommas(1300000000), ' -> 1.3B'); 
// console.log(formatNumberWithSuffixAndCommas(10300000000), ' -> 10.3B'); 
// console.log(formatNumberWithSuffixAndCommas(100001000000), ' -> 100B.0'); 
// console.log(formatNumberWithSuffixAndCommas(10000001000000), ' -> 1.0T'); 
