import Service from "../model/Service.js";
import ServiceType from "../model/ServiceType.js";
import Vendor from "../model/Vendor.js";

const create = async (req, res) => {
  try {
    const type = await ServiceType.create(req.body);
    return res.status(200).send(type);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const type = await ServiceType.findById(id);
    if (!type) {
      return res
        .status(404)
        .send({ msg: "ServiceType with requested id not found" });
    }
    return res.status(200).send(type);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const list = async (req, res) => {
  try {
    const type = await ServiceType.find();
    if (type.length === 0) {
      return res.status(404).send({ msg: "There are no ServiceType found" });
    }
    return res.status(200).send(type);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const type = await ServiceType.findById(id);
    if (!type) {
      return res
        .status(404)
        .send({ msg: "ServiceType with requested id not found" });
    }
    const updatedtype = await ServiceType.findByIdAndUpdate(id, req.body);
    return res.status(200).send(updatedtype);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const type = await ServiceType.findById(id);
    if (!type) {
      return res
        .status(404)
        .send({ msg: "ServiceType with requested id not found" });
    }

    const service = await Service.findOne({ type: type.type });

    if (service) {
      return res
        .status(404)
        .send({ msg: "Service Types Are Avialble at Service Table" });
    }

    const vendor = await Vendor.findOne({ type: type.type });

    if (vendor) {
      return res
        .status(404)
        .send({ msg: "Service Types Are Avialble at Vendors Table" });
    }

    const deletedtype = await ServiceType.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedtype);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const search = async (req, res) => {
  try {
    //adding regex to the query params
    for (const [k, v] of Object.entries(req.query)) {
      if (k === "sort" || k === "by") {
        continue;
      }
      req.query[k] = {
        $regex: v,
      };
    }
    const types = await ServiceType.find(req.query);
    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        case "type":
          types.sort((a, b) => {
            return by === "asc"
              ? a.type.localeCompare(b.type)
              : b.type.localeCompare(a.type);
          });
          break;
        case "date":
          types.sort((a, b) => {
            return by === "asc"
              ? new Date(a.joinedAt) - new Date(b.joinedAt)
              : new Date(b.joinedAt) - new Date(a.joinedAt);
          });
          break;

        default:
          break;
      }
    }
    res.status(200).send(types);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  create,
  get,
  update,
  list,
  deleteById,
  search,
};
