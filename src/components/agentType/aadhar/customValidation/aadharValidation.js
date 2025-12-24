export function validateConfirmAadhar(value, ssn) {
    let error;
        
    if (value !== ssn) {
      error = 'Aadhar Numbers do not match';
    }
  
    return error;
  }
