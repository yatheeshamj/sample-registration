export function validatePassword(
  value,
  firstNameValue,
  lastNameValue,
  usernameValue
) {
  let error;

  let validateCount = 0;
  const regexCapital = new RegExp('([A-Z])');
  const regexLetter = new RegExp('([a-z])');
  const regexNumber = new RegExp('([0-9])');
  const regexSpecial = new RegExp('([^A-Za-z0-9])');

  const regexArray = [regexCapital, regexLetter, regexNumber, regexSpecial];

  regexArray.forEach((reg) => {
    if (reg.test(value.trim())) {
      validateCount++;
    }
  });

  if (value.length < 8) {
    error = 'Must be at least 8 characters';
  }

  if (value.length > 255) {
    error = 'Must be less than 256 characters';
  }

  if (validateCount < 3) {
    error = 'Requirement not met';
  }

  const myDelimiterArray = [' ', '-', '#', ',', '.', '_'];

  var allValid = false;

  if (
    value != null &&
    (usernameValue === '' ||
      value.indexOf(usernameValue.trim().replace(/ /g, '')) === -1) &&
    value.indexOf(lastNameValue.trim().replace(/ /g, '')) === -1 &&
    value.indexOf(firstNameValue.trim().replace(/ /g, '')) === -1
  ) {
    //Loop through, looking for these chars in our last and first names
    for (var delimIndex in myDelimiterArray) {
      var myDelimLastNameArray = lastNameValue.split(
        myDelimiterArray[delimIndex]
      );
      var myDelimFirstNameArray = firstNameValue.split(
        myDelimiterArray[delimIndex]
      );

      if (myDelimLastNameArray.length > 0) {
        var foundInArray = false;
        for (var index in myDelimLastNameArray) {
          var checkArrayElement = myDelimLastNameArray[index];
          if (
            value.indexOf(myDelimLastNameArray[index]) >= 0 &&
            checkArrayElement !== ''
          ) {
            foundInArray = true;
            //Break out of the loop inner loop
            break;
          }
        }
        if (!foundInArray) allValid = true;
        else {
          allValid = false;
          //Break out of the loop
          break;
        }
      } else {
        allValid = true;
      }

      //Last name check is good at this point. Lets check the first name next
      if (allValid === true) {
        if (myDelimFirstNameArray.length > 0) {
          foundInArray = false;
          for (index in myDelimFirstNameArray) {
            checkArrayElement = myDelimFirstNameArray[index];
            if (
              value.indexOf(myDelimFirstNameArray[index]) >= 0 &&
              checkArrayElement !== ''
            ) {
              foundInArray = true;
              //Break out of the loop inner loop
              break;
            }
          }
          if (!foundInArray) {
            allValid = true;
          } else {
            //Break out of the loop
            allValid = false;
            break;
          }
        } else allValid = true;
      }
      //Break out of the loop
      else break;
    }
  }

  if (!allValid) {
    error = 'Requirement for first name, last name, or username not met';
  }

  return error;
}
