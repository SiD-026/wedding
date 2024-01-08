import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `name`
 * - `designation`
 * - `image` - optional
 * @returns the added data or error
 */
const addTeam = async (data) => {
    try {
        return await config.post("/teams", data)
    } catch (err) {
        return err
    }
}

const getTeamById = async (id) => {
    try {
        return await config.get("/teams/" + id)
    } catch (error) {
        return error
    }
}

const getAllTeams = async () => {
    try {
        return await config.get("/teams")
    } catch (error) {
        return error
    }
}

const updateTeamById = async (id, data) => {
    try {
        return await config.patch("/teams/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteTeamById = async (id) => {
    try {
        return await config.delete("/teams/" + id)
    } catch (error) {
        return error
    }
}


export default {
    addTeam,
    deleteTeamById,
    getAllTeams,
    getTeamById,
    deleteTeamById,
    updateTeamById
}