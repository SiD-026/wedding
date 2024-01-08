import Reviews from "../model/Reviews.js";

const add = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      const review = await Reviews.create(req.body);
      return res.status(200).send(review);
    } else {
      const review = await Reviews.create(req.body);
      return res.status(200).send(review);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// const list = async (req, res) => {
//   try {
//     return res.status(200).json(await Reviews.find());
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }
// };

const list = async (req, res) => {
    try {
      const review = await Reviews.find(req.query);
      if (req.query.sort && req.query.by) {
        const by = req.query.by;
        const sort = req.query.sort;
        //sorting
        switch (sort) {
          case "date":
            review.sort((a, b) => {
              return by === "asc"
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
            });
            break;
  
          default:
            break;
        }
      }
      res.status(200).send(review);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

const getReviewById = async (req, res) => {
    try {
      const id = req.params.id;
      const review = await Reviews.findById(id);
      if (!review) {
        return res
          .status(404)
          .send({ msg: "Reviews with requested id not found" });
      }
      return res.status(200).send(review);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  const update = async (req, res) => {
    try {
      const id = req.params.id;
  
      const review = await Reviews.findById(id);
      if (!review) {
        return res
          .status(404)
          .send({ msg: "Reviews with requested id not found" });
      }
      const updatedReviews = await Reviews.findByIdAndUpdate(id, req.body);
      return res.status(200).send(updatedReviews);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Reviews.findById(id);

    if (!review) {
      return res
        .status(404)
        .send({ msg: "Reviews Image with requested id not found" });
    }
    const deletedReviews = await Reviews.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedReviews);
  } catch (err) {
    return res.status(500).send(err);
  }
};
export default {
  add,
  list,
  getReviewById,
  update,
  deleteById,
};
