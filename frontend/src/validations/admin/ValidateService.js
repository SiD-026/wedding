const ValidateService = (values) => {
  const errors = {};
  if (!values.type) {
    errors.type = "Please Enter Type";
  }

  if (!values.title) {
    errors.title = "Please Enter Title";
  }else if (values.title.length > 20) {
    errors.title = 'Title cannot exceed 20 characters'
  }

  if (!values.price) {
    errors.price = "Please Enter Price";
  }

  if (!values.city) {
    errors.city = "Please Enter city";
  }

  if (!values.state) {
    errors.state = "Please Enter State";
  }

  if (!values.vendorId) {
    errors.vendorId = "Please Enter Vendor";
  }

  return errors;
};

export default ValidateService;
