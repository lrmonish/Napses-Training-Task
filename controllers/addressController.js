const { Address } = require("../models");
const getUserByPk = require("../services/get-userby-pk-service");
const getAddressesByUserId = require("../services/get-addresses-byUserId-service");
const findAddressesById = require("../services/find-Address-byId-service");


const addressController = {
  postAddressForUser: async (req, res) => {
    const userId = req.params.id;
    const { name, street, city, country } = req.body;
    try {
      const address = await Address.create({
        name,
        street,
        city,
        country,
        userId,
      });
      return res.status(200).json({ message: address });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  getAddressesForUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ message: exvalue });
      }
      const addresses = await getAddressesByUserId.getAddressByUserId(userId);
      const ext = extract(addresses);
      return res.status(200).json({ message: ext });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  getAddressesForUserAndAddressId: async (req, res) => {
    const userId = req.params.id;
    const addressId = req.params.addressid;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ message: exvalue });
      }
      const addresses = await getAddressesByUserId.getAddressByUserId(userId);
      const a = extract(addresses);
      if (a.length === 0) {
        return res.status(200).json({ message: "Addresses NotFound For User" });
      }
      const add = extract(await findAddressesById.findAddressById(addressId));
      return res.status(200).json({ message: add });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  putAddressByUserIdAndAddressId: async (req, res) => {
    const userId = req.params.id;
    const addressId = req.params.addressid;
    const { name, street, city, country } = req.body;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ message: exvalue });
      }
      const addresses = await getAddressesByUserId.getAddressByUserId(userId);
      const a = extract(addresses);
      if (a.length === 0) {
        return res.status(200).json({ message: "Addresses NotFound For User" });
      }
      const add = extract(await findAddressesById.findAddressById(addressId));

      const update = await add.update({ name, street, city, country });
      return res.status(200).json({ message: update });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};
const extract = (extract) => {
  const value = extract.matchWith({
    Ok: ({ value }) => value,
    Error: ({ value }) => {
      throw new Error(value);
    },
  });
  return value;
};

module.exports = addressController;
