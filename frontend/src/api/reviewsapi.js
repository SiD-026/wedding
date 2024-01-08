import config from "./config";

/**
 * 
 * @param {object} data the order object to add
 * - `brideName`
 * - `groomName`
 * - `city`
 * - `image`
 * - `comments`
 * @returns the added data or error
 */
const addReview = async (data) => {
    try {
        return await config.post("/reviews", data)
    } catch (err) {
        return err
    }
}

const getReviewById = async (id) => {
    try {
        return await config.get("/reviews/" + id)
    } catch (error) {
        return error
    }
}

const getAllReviews = async () => {
    try {
        return await config.get("/reviews")
    } catch (error) {
        return error
    }
}

const updateReviewById = async (id, data) => {
    try {
        return await config.patch("/reviews/" + id, data)
    } catch (error) {
        return error
    }
}

const deleteReviewById = async (id) => {
    try {
        return await config.delete("/reviews/" + id)
    } catch (error) {
        return error
    }
}

const isFeaturedReviews = async (data) => {
    try {
      let queryString = "?";
  
      for (const [key, value] of Object.entries(data)) {
        queryString += `${key}=${value}&`;
      }
      return await config.get(`/reviews${queryString}`);
    } catch (error) {
      return error;
    }
  };

export default {
    addReview,
    deleteReviewById,
    getAllReviews,
    getReviewById,
    deleteReviewById,
    updateReviewById,
    isFeaturedReviews
}