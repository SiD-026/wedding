const ValidateOrders = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Please Enter Name'
    }
  
    if (!values.email) {
      errors.email = 'Please Enter Email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid Email'
    }
  
    if (!values.phone) {
      errors.phone = 'Please Enter phone'
    } else if (values.phone.length > 10) {
      errors.phone = 'Phone cannot exceed 10 numbers'
    } else if (values.phone.length < 10) {
      errors.phone = 'Phone cannot be less than 10 numbers'
    }
  
    if (!values.city) {
      errors.city = "Please Enter City";
    }
    if (!values.state) {
      errors.state = "Please Enter State";
    }

      if (!values.title) {
        errors.title = 'Please Enter Title'
      }

      if (!values.price) {
        errors.price = 'Please Enter Price'
      }

      if (!values.event_date) {
        errors.event_date = 'Please Enter Event Date'
      }
      
    return errors
  }
  
  export default ValidateOrders
  