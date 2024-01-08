import moment from "moment/moment.js";
import mongoose from "mongoose";
import Order from "../model/Order.js";

const create = async (req, res) => {
  try {
    const vendors = await Order.aggregate([
      {
        $match: {
          vendorId: new mongoose.Types.ObjectId(req.body.vendorId),
          serviceId: new mongoose.Types.ObjectId(req.body.serviceId),
        },
      },
    ]);
    if (vendors.length > 0) {
      // const dateExist = await Order.findOne({
      //   bookingDate: req.body.bookingDate,
      // });

      let dateExist = "";
      for (let i of vendors) {
        const date = moment(i.bookingDate).format("YYYY-MM-DD");
        dateExist = date === req.body.bookingDate;
      }
      if (dateExist)
        return res.status(400).send({ msg: "Booking already exists" });
    }
    const order = await Order.create(req.body);
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ msg: "Order with requested id not found" });
    }
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const list = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).send({ msg: "There are no orders found" });
    }
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ msg: "Order with requested id not found" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body);
    return res.status(200).send(updatedOrder);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ msg: "order with requested id not found" });
    }
    const deletedOrder = await Order.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedOrder);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const search = async (req, res) => {
  try {
    //adding regex to the query params
    const vendors = await Order.find(req.query);
    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        case "date":
          vendors.sort((a, b) => {
            return by === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;

        default:
          break;
      }
    }
    res.status(200).send(vendors);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// export const search = async (req, res) => {
//   try {
//     const result = await Vendor.find({
//       $or: [
//         { type: { $regex: req.params.key } },
//         { name: { $regex: req.params.key } },
//       ],
//     });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
export default {
  create,
  get,
  update,
  list,
  search,
  deleteById,
};
