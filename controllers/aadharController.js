const { AadharCardDetail } = require("../models");

const getUserByPk = require("../services/get-userby-pk-service");

const aadharController = {
  postAadhar: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ exvalue });
      }
      const aadhar = await AadharCardDetail.create({
        aadharNumber: exvalue.mobile,
        name: exvalue.name,
      });
      const aadharIdAfter = aadhar.id;
      console.log("exvalue", exvalue);
      await exvalue.update({ ...exvalue, aadharId: aadharIdAfter });

      return res.status(200).json(aadhar);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  getAadharForParticularUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ message: exvalue });
      }
      const aadharId = exvalue.aadharId;
      if (aadharId === null) {
        return res
          .status(200)
          .json({ message: "Aadhar For This User Not Created" });
      }
      const aadharFind = await AadharCardDetail.findOne({
        where: {
          id: aadharId,
        },
        // include: User,
      });
      return res.status(200).json({ message: aadharFind });
    } catch (err) {
      return res.status(200).json({ message: err });
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

module.exports = aadharController;
