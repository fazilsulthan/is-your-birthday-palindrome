const inputDate = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check");
const output = document.querySelector("#output");

function reverseStr(str) {
  const reverseString = str.split("").reverse().join("");
  return reverseString;
}

function checkPalindrome(str) {
  const reverseString = reverseStr(str);
  return str === reverseString;
}

function dateToString(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function dateFormats(date) {
  const dateStr = dateToString(date);
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeFormat(date) {
  var dateAllFormats = dateFormats(date);
  var flag = false;
  for (let i = 0; i < dateAllFormats.length; i++) {
    if (checkPalindrome(dateAllFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function leapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function checkDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date) {
  var ctr = 0;
  var palindromeDate = checkDate(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeFormat(palindromeDate);
    if (isPalindrome) {
      break;
    }
    palindromeDate = checkDate(palindromeDate);
  }
  return [ctr, palindromeDate];
}

function checkPreviousDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (leapYear(year)) {
      if (day > 29) {
        day = 1;
        month--;
      }
    } else {
      if (day > 28) {
        day = 1;
        month--;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month--;
    }
  }
  if (month > 12) {
    month = 1;
    year--;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function previousPalindromeDate(date) {
  var ctr = 0;
  var palindromeDate = checkPreviousDate(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeFormat(palindromeDate);
    if (isPalindrome) {
      break;
    }
    palindromeDate = checkPreviousDate(palindromeDate);
  }
  return [ctr, palindromeDate];
}

function clickHandler() {
  var date = inputDate.value;
  if (date !== "") {
    var bdayStr = date.split("-");
    var bdayDate = {
      day: Number(bdayStr[2]),
      month: Number(bdayStr[1]),
      year: Number(bdayStr[0]),
    };
    var checkIfPalindrome = checkPalindromeFormat(bdayDate);
    if (checkIfPalindrome) {
      output.innerText = "Birthdate is a palindrome";
    } else {
      var [ctr, palindromeDate] = nextPalindromeDate(bdayDate);
      var [count, countDate] = previousPalindromeDate(bdayDate);
      output.innerText = `the previous palindrome date is  ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year} missed by ${ctr} days and the next palindrome date is ${countDate.day}-${countDate.month}-${countDate.year} missed by ${count} days`;
    }
  } else {
    output.innerText = "Please enter the required fields";
  }
}

checkBtn.addEventListener("click", clickHandler);
