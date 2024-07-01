/**
 * Difficult: [ Medium ]
 * String Challenge: Have a function StringChallenge(str) take the str parameter being passed and return
 * a compressed version of the string using the Run-length encoding algorithm. this algorith works by taking
 * the occurrence of each repeating character and outputing that number along whit a single character
 * of the repeating sequence. For example: "wwwggopp" would return 3w2g1o2p. The string will not contain
 * any numbers, punctuation or symbols.
 */

function StringChallenge(str) {
  let result = "";
  let i = 0;

  while (i < str.length) {
    let count = 1;
    while (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
      i++;
    }
    result += count + str[i];
    i++;
  }

  return result;
}

function modifyStringWithToken(encodedStr, token) {
  let finalStr = encodedStr + token;
  let modifiedStr = "";

  for (let i = 0; i < finalStr.length; i++) {
    if ((i + 1) % 4 === 0) {
      modifiedStr += "_";
    } else {
      modifiedStr += finalStr[i];
    }
  }

  return modifiedStr;
}

let encodedStr = StringChallenge("aabbcde");
let ChallengeToken = "f674zirpe";
let finalOutput = modifyStringWithToken(encodedStr, ChallengeToken);
console.log(finalOutput);
