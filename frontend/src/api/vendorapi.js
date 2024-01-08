import config from "./config";

/**
 * 
 * @param {object} data vendor object to add
 * - `name`
 * - `email` 
 * - `password`
 * - `phone`
 * - `address`
 * - all the fields are required
 * @returns the added data or error
 */
const addVendor = async (data) => {
    // try {
        return await config.post("/vendors/", data)
    // } catch (err) {
    //     return err
    // }
}

const getVendorById = async (id) => {
    // try {
        return await config.get("/vendors/" + id)
    // } catch (error) {
    //     return error
    // }
}

const getAllVendors = async () => {
    try {
        return await config.get("/vendors")
    } catch (error) {
        return error
    }
}

const updateVendorById = async (id, data) => {
    try {
        return await config.patch("/vendors/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteVendorById = async (id) => {
    // try {
        return await config.delete("/vendors/" + id)
    // } catch (error) {
    //     return error
    // }
}

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
const searchVendors = async (data) => {
    try {
        let queryString = "?";
        for (const [key, value] of Object.entries(data)) {
            queryString += `${key}=${value}&`
        }
        return await config.get(`/vendors/search${queryString}`)
    } catch (error) {
        return error
    }
}
const changePassword = async (data) => {
    // try {
        return await config.post("/vendors/password/change" ,data)
    // } catch (error) {
    //     return error
    // }
}

export default {
    addVendor,
    deleteVendorById,
    getAllVendors,
    getVendorById,
    deleteVendorById,
    searchVendors,
    updateVendorById,
    changePassword
}