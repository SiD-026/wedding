import mongoose from "mongoose";
import Order from "../model/Order.js";
import Service from "../model/Service.js";
import StateCity from "../model/State-City.js";

const create = async (req, res) => {
  try {
    //validate customer data
    const titleExist = await Service.findOne({ title: req.body.title });
    if (titleExist)
      return res.status(400).send({ msg: "Title already exists" });

    if (req.file) {
      req.body.image = req.file.filename;
      const service = await Service.create(req.body);
      return res.status(200).send(service);
    } else {
      const service = await Service.create(req.body);
      return res.status(200).send(service);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .send({ msg: "service with requested id not found" });
    }
    return res.status(200).send(service);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const list = async (req, res) => {
  try {
    const services = await Service.find();
    if (services.length === 0) {
      return res.status(404).send({ msg: "There are no services found" });
    }
    return res.status(200).send(services);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .send({ msg: "service with requested id not found" });
    }

    if (req.file) {
      req.body.image = req.file.filename;
      const service = {
        ...req.body,
      };
      const updatedService = await Service.findByIdAndUpdate(id, service, {
        new: true,
      });
      return res.status(200).send(updatedService);
    } else {
      const service = {
        ...req.body,
      };
      const updatedService = await Service.findByIdAndUpdate(id, service, {
        new: true,
      });
      return res.status(200).send(updatedService);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.aggregate([
      {
        $match: {
          serviceId: new mongoose.Types.ObjectId(id),
        },
      },
    ]);

    if (order.length > 0) {
      return res
        .status(404)
        .send({ msg: "Services Are Avialble at Orders Table" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .send({ msg: "service with requested id not found" });
    }
    const deletedService = await Service.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedService);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const search = async (req, res) => {
  try {
    //adding regex to the query params
    for (const [k, v] of Object.entries(req.query)) {
      if (k === "sort" || k === "by" || k === "vendor") {
        continue;
      }
      if (k === "price") {
        req.query[k] = {
          $lte: v,
        };
        continue;
      }
      req.query[k] = {
        $regex: v,
      };
    }

    const services = await Service.find(req.query);

    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        case "title":
          services.sort((a, b) => {
            return by === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          });
          break;

        case "type":
          services.sort((a, b) => {
            return by === "asc"
              ? a.type.localeCompare(b.type)
              : b.type.localeCompare(a.type);
          });
          break;

        case "price":
          services.sort((a, b) => {
            return by === "asc" ? a.price - b.price : b.price - a.price;
          });
          break;

        case "date":
          services.sort((a, b) => {
            return by === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;

        default:
          break;
      }
    }
    return res.status(200).send(services);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const searchByVendors = async (req, res) => {
  try {
    //adding regex to the query params
    const vendor = await Service.find(req.query);
    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        case "date":
          vendor.sort((a, b) => {
            return by === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;

        default:
          break;
      }
    }
    res.status(200).send(vendor);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const AllState = async (req, res) => {
  try {
    const state = await StateCity.find();
    if (state.length === 0) {
      return res.status(404).send({ msg: "There are no State found" });
    }
    return res.status(200).send(state);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const Like = async (req, res) => {
  try {
    const id = req.params.id;

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .send({ msg: "Services with requested id not found" });
    }

    const likeExists = service.likes.filter((like) =>{
      return like.toString() === req.body.customerId
    })
    if (likeExists.length !== 0)
      return res.status(400).send({ msg: "Likes already exists" });

    const like = await Service.findByIdAndUpdate(
      id,
      { $push: { likes: req.body.customerId } },
      { new: true }
    );
    return res.status(200).send(like);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const UnLike = async (req, res) => {
  try {
    const id = req.params.id;

    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .send({ msg: "Services with requested id not found" });
    }
    const likeExists = service.likes.filter((like) =>{
      return like.toString() === req.body.customerId
    })
    if (likeExists.length === 0)
      return res.status(400).send({ msg: "Dislike already exists" });

    const like = await Service.findByIdAndUpdate(
      id,
      { $pull: { likes: req.body.customerId } },
      { new: true }
    );
    return res.status(200).send(like);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  create,
  get,
  update,
  list,
  search,
  deleteById,
  searchByVendors,
  AllState,
  Like,
  UnLike,
};
