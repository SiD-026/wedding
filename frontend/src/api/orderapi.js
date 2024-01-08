import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `vendorId`
 * - `customerId`
 * - `serviceId`
 * @returns the added data or error
 */
const addOrder = async (data) => {
    // try {
        return await config.post("/orders", data)
    // } catch (err) {
    //     return err
    // }
}

const getOrderById = async (id) => {
    try {
        return await config.get("/orders/" + id)
    } catch (error) {
        return error
    }
}

const getAllOrders = async () => {
    // try {
        return await config.get("/orders")
    // } catch (error) {
    //     return error
    // }
}

const updateOrderById = async (id, data) => {
    // try {
        return await config.patch("/orders/" + id, data)
    // } catch (error) {
    //     return error
    // }
}

const deleteOrderById = async (id) => {
    try {
        return await config.delete("/orders/" + id)
    } catch (error) {
        return error
    }
}

/**
 * 
 * @param {object} data
 * you can search by the below parameters as key value pairs in the object
 * - date
 * - sort - `name , email , date , phone`
 * - by - `asc | dsc`
 * @returns the found data or error
 */
const searchOrders = async (data) => {
    try {
        let queryString = "?";

        for (const [key, value] of Object.entries(data)) {
            queryString += `${key}=${value}&`

        }
        return await config.get(`/orders/search${queryString}`)
    } catch (error) {
        return error
    }
}


export default {
    addOrder,
    deleteOrderById,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    searchOrders,
    updateOrderById
}