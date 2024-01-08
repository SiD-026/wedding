import config from "./config";

/**
 *
 * @param {object} data
 * data to added to object
 * - `type`
 * - all the fields are required
 * @returns the added data or error
 */
const addServiceType = async (data) => {
  try {
    return await config.post("/serviceType", data);
  } catch (err) {
    return err;
  }
};

const getServiceTypeById = async (id) => {
  try {
    return await config.get("/serviceType/" + id);
  } catch (error) {
    return error;
  }
};

const getAllServiceType = async () => {
  try {
    return await config.get("/serviceType");
  } catch (error) {
    return error;
  }
};

const updateServiceTypeById = async (id, data) => {
  try {
    return await config.patch("/serviceType/" + id, data);
  } catch (error) {
    return error;
  }
};

const deleteServiceTypeById = async (id) => {
  return await config.delete("/serviceType/" + id);
};

const searchTypes = async (data) => {
  try {
    let queryString = "?";
    for (const [key, value] of Object.entries(data)) {
      if (value !== "" && value !== 0) {
        queryString += `${key}=${value}&`;
      }
    }
    return await config.get(`/serviceType/search/all${queryString}`);
  } catch (error) {
    return error;
  }
};

export default {
  addServiceType,
  deleteServiceTypeById,
  getAllServiceType,
  getServiceTypeById,
  updateServiceTypeById,
  searchTypes
};
