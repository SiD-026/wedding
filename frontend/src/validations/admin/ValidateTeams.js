const ValidateTeams = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Please Enter Name";
    }
 
    if (!values.designation) {
      errors.designation = "Please Enter Designation";
    }

    return errors;
  };
  
  export default ValidateTeams;
  