/**
 * Converts a number into Indian Rupees words.
 * E.g., 25000 -> "Indian Rupees Twenty-Five Thousand Only"
 */
export const numberToWordsIndian = (num) => {
  if (isNaN(num) || num < 0) return '';
  if (num === 0) return 'Indian Rupees Zero Only';

  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const convertToWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
    return '';
  };

  const getWords = (num) => {
    let result = '';
    
    // Crores
    const crores = Math.floor(num / 10000000);
    if (crores > 0) {
      result += convertToWords(crores) + ' Crore ';
      num %= 10000000;
    }
    
    // Lakhs
    const lakhs = Math.floor(num / 100000);
    if (lakhs > 0) {
      result += convertToWords(lakhs) + ' Lakh ';
      num %= 100000;
    }
    
    // Thousands
    const thousands = Math.floor(num / 1000);
    if (thousands > 0) {
      result += convertToWords(thousands) + ' Thousand ';
      num %= 1000;
    }
    
    // Remaining (Hundreds, Tens, Ones)
    if (num > 0) {
      result += convertToWords(num);
    }
    
    return result.trim();
  };

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  let words = 'Indian Rupees ' + getWords(wholePart);

  if (decimalPart > 0) {
    words += ' and ' + getWords(decimalPart) + ' Paise';
  }

  words += ' Only';
  return words;
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
