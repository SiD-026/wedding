import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `name`
 * - `email`
 * - `phone`
 * - `message`
 * - `subject`
 * @returns the added data or error
 */
const addContact = async (data) => {
    try {
        return await config.post("/feedbacks", data)
    } catch (err) {
        return err
    }
}

// const getContactById = async (id) => {
//     try {
//         return await config.get("/feedbacks/" + id)
//     } catch (error) {
//         return error
//     }
// }

const getAllContacts = async () => {
    try {
        return await config.get("/feedbacks")
    } catch (error) {
        return error
    }
}

// const updateContactById = async (id, data) => {
//     try {
//         return await config.patch("/feedbacks/" + id, data)
//     } catch (error) {
//         return error
//     }
// }

const deleteContactById = async (id) => {
        return await config.delete("/feedbacks/" + id)
    
}

/**
 * 
 * @param {object} data
 * you can search by the below parameters as key value pairs in the object
 * - date
 * - sort - `name , email , date , phone`
 * - by - `asc | bsc`
 * @returns the found data or error
 */
// const searchfeedbacks = async (data) => {
//     try {
//         let queryString = "?";
//         for (const [key, value] in Object.entries(data)) {
//             queryString += `${key}=${value}&`
//         }
//         return await config.get(`/feedbacks/search${queryString}`)
//     } catch (error) {
//         return error
//     }
// }


export default {
    addContact,
    deleteContactById,
    getAllContacts,
    // getContactById,
    deleteContactById,
    // searchContacts,
    // updateContactById
}