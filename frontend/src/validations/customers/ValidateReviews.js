const ValidateReviews = (values) => {
    const errors = {};
    if (!values.brideName) {
      errors.brideName = "Please Enter Bride Name";
    }
  
    if (!values.groomName) {
      errors.groomName = "Please Enter Groom Name";
    }

    if (!values.city) {
        errors.city = "Please Enter City";
    }
  
    return errors;
  };
  
  export default ValidateReviews;
  