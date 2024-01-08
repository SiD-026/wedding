import Feedback from "../model/Feedback.js"


const add = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        return res.status(200).json(feedback)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}



const list = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        return res.status(200).json(feedbacks)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const deleteById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return res
          .status(404)
          .send({ msg: "feedback with requested id not found" });
      }
      const deletedFeedback = await Feedback.findByIdAndRemove(id, req.body);
      return res.status(200).send(deletedFeedback);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
// TODO : add update , delete , get methods


export default {
    add,
    list,
    deleteById
}