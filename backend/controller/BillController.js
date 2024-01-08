import Bill from "../model/Bill.js";

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createBill = async (req, res) => {
  try {
    const bill = req.body;
    const newBill = new Bill(bill);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ msg: "No id provided" });
    const updateBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updateBill);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteBill = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ msg: "No id provided" });
    const bill = await Bill.findByIdAndRemove(req.params.id);
    if (!bill) return res.status(404).json({ msg: "No bill found" });
    return res.status(200).json({ msg: "Bill deleted successfully" });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const search = async (req, res) => {
  try {
    //adding regex to the query params
    for (const [k, v] of Object.entries(req.query)) {
      if ( k === "sort" || k === "by") {
        continue;
      }
      req.query[k] = {
        $regex: v,
      };
    }
    const bills = await Bill.find(req.query);
    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        // case "name":
        //   bills.sort((a, b) => {
        //     return by === "asc"
        //       ? a.name.localeCompare(b.name)
        //       : b.name.localeCompare(a.name);
        //   });
        //   break;
        case "customerName":
          bills.sort((a, b) => {
            return by === "asc"
              ? a.customerName.localeCompare(b.customerName)
              : b.customerName.localeCompare(a.customerName);
          });
          break;

        case "date":
          bills.sort((a, b) => {
            return by === "asc"
              ? new Date(a.createdAt) - new Date(b.createdAt)
              : new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;

        default:
          break;
      }
    }
    res.status(200).send(bills);
  } catch (err) {
    return res.status(500).send(err);
  }
};
