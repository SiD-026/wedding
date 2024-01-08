import Team from "../model/Team.js";

// TODO:add delete , update , get

const add = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
      const team = await Team.create(req.body);
      return res.status(200).send(team);
    } else {
      const team = await Team.create(req.body);
      return res.status(200).send(team);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const list = async (req, res) => {
  try {
    return res.status(200).json(await Team.find());
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};



const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);
    if (!team) {
      return res
        .status(404)
        .send({ msg: "Team with requested id not found" });
    }
    return res.status(200).send(team);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const team = await Team.findById(id);
    if (!team) {
      return res
        .status(404)
        .send({ msg: "Team with requested id not found" });
    }

    if (req.file) {
      req.body.image = req.file.filename;
      const team = {
        ...req.body,
      };
      const updatedTeam = await Team.findByIdAndUpdate(id, team, {
        new: true,
      });
      return res.status(200).send(updatedTeam);
    } else {
      const team = {
        ...req.body,
      };
      const updatedTeam = await Team.findByIdAndUpdate(id, team, {
        new: true,
      });
      return res.status(200).send(updatedTeam);
    }

  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);

    if (!team) {
      return res
        .status(404)
        .send({ msg: "Team Image with requested id not found" });
    }
    const deletedTeam = await Team.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedTeam);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  add,
  list,
  getById,
  update,
  deleteById
};
