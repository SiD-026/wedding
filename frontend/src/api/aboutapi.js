import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `name`
 * - `designation`
 * - `image` - optional
 * @returns the added data or error
 */
const addAbout = async (data) => {
    try {
        return await config.post("/about", data)
    } catch (err) {
        return err
    }
}

const getAboutById = async (id) => {
    try {
        return await config.get("/about/" + id)
    } catch (error) {
        return error
    }
}

const getAllAbouts = async () => {
    try {
        return await config.get("/about")
    } catch (error) {
        return error
    }
}

const updateAboutById = async (id, data) => {
    try {
        return await config.patch("/about/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteAboutById = async (id) => {
    try {
        return await config.delete("/about/" + id)
    } catch (error) {
        return error
    }
}


export default {
    addAbout,
    deleteAboutById,
    getAllAbouts,
    getAboutById,
    deleteAboutById,
    updateAboutById
}