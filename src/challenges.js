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
