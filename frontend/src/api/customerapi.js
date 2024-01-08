import config from "./config";

/**
 *
 * @param {object} data
 * data to added to object
 * - `name`
 * - `email`
 * - `password`
 * - `phone`
 * - `address`
 * - all the fields are required
 * @returns the added data or error
 */
const addCustomer = async (data) => {
  return await config.post("/customers", data);
};

const getCustomerById = async (id) => {
  // try {
    return await config.get("/customers/" + id);
  // } catch (error) {
  //   return error;
  // }
};

const getAllCustomers = async () => {
  try {
    return await config.get("/customers");
  } catch (error) {
    return error;
  }
};

const updateCustomerById = async (id, data) => {
  try {
    return await config.patch("/customers/" + id, data);
  } catch (error) {
    return error;
  }
};

const deleteCustomerById = async (id) => {
  // try {
  return await config.delete("/customers/" + id);
  // } catch (error) {
  //     return error
  // }
};

/**
 *
 * @param {object} data
 * you can search by the below parameters as key value pairs in the object
 * - name
 * - email
 * - phone
 * - date
 * - sort - `name , email , date , phone`
 * - by - `asc | bsc`
 * @returns the found data or error
 */
const searchCustomers = async (data) => {
  try {
    let queryString = "?";
    for (const [key, value] of Object.entries(data)) {
      queryString += `${key}=${value}&`;
    }
    return await config.get(`/customers/search${queryString}`);
  } catch (error) {
    return error;
  }
};
const changePassword = async (data) => {
  // try {
  return await config.post("/customers/password/change", data);
  // } catch (error) {
  //     return error
  // }
};
export default {
  addCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
  searchCustomers,
  updateCustomerById,
  changePassword,
};
