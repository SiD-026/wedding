const ValidateServiceTypes = (values) => {
    const errors = {}
    if (!values.type) {
      errors.type = 'Please Enter Type'
    }
    return errors
  }
  
  export default ValidateServiceTypes
  