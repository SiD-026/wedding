import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `name`
 * - `designation`
 * - `image` - optional
 * @returns the added data or error
 */
const addBill = async (data) => {
    // try {
        return await config.post("/bills", data)
    // } catch (err) {
    //     return err
    // }
}

const getBillById = async (id) => {
    try {
        return await config.get("/bills/" + id)
    } catch (error) {
        return error
    }
}

const getAllBills = async () => {
    try {
        return await config.get("/bills")
    } catch (error) {
        return error
    }
}

const updateBillById = async (id, data) => {
    try {
        return await config.patch("/bills/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteBillById = async (id) => {
    try {
        return await config.delete("/bills/" + id)
    } catch (error) {
        return error
    }
}

const searchBills = async (data) => {
    try {
      let queryString = "?";
      for (const [key, value] of Object.entries(data)) {
        if (value !== "" && value !== 0) {
          queryString += `${key}=${value}&`;
        }
      }
      return await config.get(`/bills/search${queryString}`);
    } catch (error) {
      return error;
    }
  };

export default {
    addBill,
    deleteBillById,
    getAllBills,
    getBillById,
    deleteBillById,
    updateBillById,
    searchBills
}