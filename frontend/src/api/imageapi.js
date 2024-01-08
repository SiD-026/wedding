import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `type`
 * - `image` - optional
 * @returns the added data or error
 */
const addImage = async (data) => {
    // try {
        return await config.post("/images", data)
    // } catch (err) {
    //     return err
    // }
}

const getImageById = async (id) => {
    try {
        return await config.get("/images/" + id)
    } catch (error) {
        return error
    }
}

const getAllImages = async () => {
    // try {
        return await config.get("/images")
    // } catch (error) {
    //     return error
    // }
}

const updateImageById = async (id, data) => {
    try {
        return await config.patch("/images/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteImageById = async (id) => {
    try {
        return await config.delete("/images/" + id)
    } catch (error) {
        return error
    }
}


export default {
    addImage,
    deleteImageById,
    getAllImages,
    getImageById,
    deleteImageById,
    updateImageById
}