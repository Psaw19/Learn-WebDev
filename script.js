var birthDate = document.querySelector("#birth-date");
var checkButton = document.querySelector("#check-button");
var message = document.querySelector("#message");

checkButton.addEventListener('click' , () => {
  var birthDateStr = birthDate.value;

  if(birthDateStr !== ''){
    var listOfBirthDate = birthDateStr.split('-');
    date = {day : Number(listOfBirthDate[2]),
      month : Number(listOfBirthDate[1]),
      year : Number(listOfBirthDate[0]),};

    if(checkPalindromeForAllDateFormats(date)){
      message.innerText = ('🎊 Hurrah!! 🎊 Your were born on palindrome date 🎉🎉');
    } else {
      var diff = getPrevOrNextPalindromeDate(date);
      var nextDateStr = diff[1].day + '-'  +diff[1].month + '-' + diff[1].year;

      message.innerText = 'OOPS!! if you were born on ' + nextDateStr + ' your birth date would have been a palindrome birthday';

    }
  }
  
})

function reverseStr(str){
  return str.split('').reverse().join('');
}

function isPalindrome(str){
  var word = reverseStr(str);
  return str === word;
}

function convertDateToStr(date) {
  var dateStr = {day:'',month:'',year:'',};

  if(date.day < 10){
    dateStr.day = '0'+ date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if(date.month < 10){
    dateStr.month = '0'+ date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
  
}

function getAllDateFormat(date){
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;

  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;

  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy , mmddyyyy , yyyymmdd , ddmmyy , mmddyy , yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  
  var dateArr = getAllDateFormat(date);
  var hasPalindromeDate = false;

  for(var i = 0; i < dateArr.length; i++){
    if(isPalindrome(dateArr[i])){
      hasPalindromeDate = true;
      break;
    }
  }

  return hasPalindromeDate;
}

function isLeapYear(year) {
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
}

function getNextDate(date) {
  var day = date.day+1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

  if(month === 2){
      daysInMonth[1] = isLeapYear(year) ? 29:28;
  }

  if(day > daysInMonth[month-1]){
    day = 1;
    month++;
    if(month > 12){
      month = 1;
      year++;
    }
  }

  return {day:day,month:month,year:year,}
}

function getPrevOrNextPalindromeDate(date){
  var nextDate = getNextDate(date);
  var prevDate = getPrevDate(date);
  var ctr = 0;
  var flag = false;

  while(true){
    ctr += 1;
    if(checkPalindromeForAllDateFormats(nextDate)){
      flag = true;
      break;
    } else if(checkPalindromeForAllDateFormats(prevDate)){
      break;
    }
    nextDate = getNextDate(nextDate);
    prevDate = getPrevDate(prevDate);
  }

  var closestPalindromeDate = flag ? nextDate : prevDate;
  return [ctr, closestPalindromeDate];
}

function getPrevDate(date){
  var day = date.day-1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

  if(month === 3){
    daysInMonth[1] = isLeapYear(year) ? 29:28;
}

  if(day === 0){
    month--;
    if(month === 0){
      month = 12;
      year--;
    }
    day = daysInMonth[month-1];
  }

return {day:day,month:month,year:year,}
}
