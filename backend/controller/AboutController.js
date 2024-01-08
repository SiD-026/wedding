import About from "../model/About.js";

const add = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      const about = await About.create(req.body);
      return res.status(200).send(about);
    } else {
      const about = await About.create(req.body);
      return res.status(200).send(about);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const list = async (req, res) => {
  try {
    return res.status(200).json(await About.find());
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const about = await About.findById(id);

    if (!about) {
      return res
        .status(404)
        .send({ msg: "About Image with requested id not found" });
    }
    const deletedAbout = await About.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedAbout);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const about = await About.findById(id);
    if (!about) {
      return res
        .status(404)
        .send({ msg: "About with requested id not found" });
    }
    return res.status(200).send(about);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const about = await About.findById(id);
    if (!about) {
      return res
        .status(404)
        .send({ msg: "About with requested id not found" });
    }

    if (req.file) {
      req.body.image = req.file.filename;
      const about = {
        ...req.body,
      };
      const updatedAbout = await About.findByIdAndUpdate(id, about, {
        new: true,
      });
      return res.status(200).send(updatedAbout);
    } else {
      const about = {
        ...req.body,
      };
      const updatedAbout = await About.findByIdAndUpdate(id, about, {
        new: true,
      });
      return res.status(200).send(updatedAbout);
    }

  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  add,
  list,
  deleteById,
  getById,
  update
};
