const ValidateBook = (values) => {
  const errors = {};
  if (!values.cardName) {
    errors.cardName = "Please Enter Name on Card";
  }
  if (!values.cardNo) {
    errors.cardNo = "Please Enter Card Number";
  } else if(values.cardNo.length !== 16){
    errors.cardNo = "Invalid Card Number";
  }
  // else if (/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|
  // (6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])
  // [0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(values.cardNo) === false) {
  //   // errors["digit"] = "digit Format 0000-0000-0000-0000 Required";
  //   errors["digit"] = "Invalid Number";

  // }
// else if (/^6011-?\d{4}-?\d{4}-?\d{4}$/.test(values.cardNo)) {
//     errors.cardNo = "Invalid Card Number";
//   }


  if (!values.expiryDate) {
    errors.expiryDate = "Please Enter Expiry Date";
  }
  if (!values.cvv) {
    errors.cvv = "Please Enter CVV";
  }else if (values.cvv.length !== 3) {
    errors.cvv = "Invalid CVV";
  }
  return errors;
};

export default ValidateBook;
