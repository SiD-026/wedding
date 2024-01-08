import Images from "../model/Images.js";

const add = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      const image = await Images.create(req.body);
      return res.status(200).send(image);
    } else {
      const image = await Images.create(req.body);
      return res.status(200).send(image);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const list = async (req, res) => {
  try {
    return res.status(200).json(await Images.find());
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Images.findById(id);

    if (!image) {
      return res
        .status(404)
        .send({ msg: "Images Image with requested id not found" });
    }
    const deletedImages = await Images.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedImages);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Images.findById(id);
    if (!image) {
      return res
        .status(404)
        .send({ msg: "Images with requested id not found" });
    }
    return res.status(200).send(image);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const image = await Images.findById(id);
    if (!image) {
      return res
        .status(404)
        .send({ msg: "Images with requested id not found" });
    }

    if (req.file) {
      req.body.image = req.file.filename;
      const image = {
        ...req.body,
      };
      const updatedImages = await Images.findByIdAndUpdate(id, image, {
        new: true,
      });
      return res.status(200).send(updatedImages);
    } else {
      const image = {
        ...req.body,
      };
      const updatedImages = await Images.findByIdAndUpdate(id, image, {
        new: true,
      });
      return res.status(200).send(updatedImages);
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
