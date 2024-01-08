import config from "./config";

/**
 *
 * @param {object} data the order object to add
 * - `title`
 * - `type`
 * - `price`
 * - `vendorId`
 * - `address`
 * - `image` - optional
 * @returns the added data or error
 */
const addService = async (data) => {
  return await config.post("/services", data);
};

const getServiceById = async (id) => {
  try {
    return await config.get("/services/" + id);
  } catch (error) {
    return error;
  }
};

const getAllServices = async () => {
  try {
    return await config.get("/services");
  } catch (error) {
    return error;
  }
};

const updateServiceById = async (id, data) => {
  // try {
  return await config.patch("/services/" + id, data);
  // } catch (error) {
  //   return error;
  // }
};

const deleteServiceById = async (id) => {
  // try {
  return await config.delete("/services/" + id);
  // } catch (error) {
  //   return error;
  // }
};

/**
 *
 * @param {object} data
 * you can search by the below parameters as key value pairs in the object
 * - date
 * - sort - `name , email , date , phone`
 * - by - `asc | bsc`
 * @returns the found data or error
 */
const searchServices = async (data) => {
  try {
    let queryString = "?";
    for (const [key, value] of Object.entries(data)) {
      if (value !== "" && value !== 0) {
        queryString += `${key}=${value}&`;
      }
    }
    return await config.get(`/services/search/all${queryString}`);
  } catch (error) {
    return error;
  }
};

const searchServiceByVendors = async (data) => {
  try {
    let queryString = "?";

    for (const [key, value] of Object.entries(data)) {
      queryString += `${key}=${value}&`;
    }
    return await config.get(`/services/searchByVendors${queryString}`);
  } catch (error) {
    return error;
  }
};

const getAllAddress = async () => {
  try {
    return await config.get("/services/stateCity/state/city");
  } catch (error) {
    return error;
  }
};

const getLikes = async (id, data) => {
  return await config.put("/services/like/" + id, data);
};

const getDisLikes = async (id, data) => {
  return await config.put("/services/unlike/" + id, data);
};

export default {
  addService,
  deleteServiceById,
  getAllServices,
  getServiceById,
  deleteServiceById,
  searchServices,
  updateServiceById,
  searchServiceByVendors,
  getAllAddress,
  getLikes,
  getDisLikes,
};
