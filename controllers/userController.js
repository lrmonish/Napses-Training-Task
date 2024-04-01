const { User } = require("../models");
const checkUserExistence = require("../services/check-user-exist-service");
const getUserByPk = require("../services/get-userby-pk-service");

const userController = {
  postUser: async (req, res) => {
    const { id, name, email, mobile, aadharId } = req.body;

    const result = composeResult(
      async () => {
        const user = await User.create({
          id,
          name,
          email,
          mobile,
          aadharId,
        });
        res.status(200).json({ user });
      },
      async () => {
        const userExist = await checkUserExistence.isUserExist(email);
        const value = await extract(userExist);
        if (value !== null) {
          res.status(200).json({ message: "User already exists" });
        }
        return value;
      }
    );
  },
  getUser: async (req, res) => {
    new Promise(async () => {
      const user = await User.findAll()
        .then((response) => {
          return res.json(response).status(200);
        })
        .catch((err) => {
          return res.status(500).json({ message: "Error fetching users" });
        });
    });
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;
    const data = await getUserByPk.getUserByPk(userId);
    console.log("data", data);
    const user = extract(data);
    if (user === null) {
      return res.json({ message: "User Not Found" }).status(200);
    } else {
      return res.json({ message: user }).status(200);
    }
  },
  putUsersById: async (req, res) => {
    const userId = req.params.id;
    const data = await getUserByPk.getUserByPk(userId);
    const user = extract(data);
    if (!user) {
      return res.json({ message: "User Not Exists" }).status(200);
    } else {
      await user.update(req.body);
      return res.status(200).json({ message: "User Updated" });
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return user
          .destroy()
          .then(() => {
            return res
              .status(200)
              .json({ message: "User deleted successfully" });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user" });
          });
      })
      .catch((error) => {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Error finding user" });
      });
  },
};

const composeResult = async (...args) => {
  const reverse = args.reverse();
  let pram;

  for (let i = 0; i < reverse.length; i++) {
    if (i == 0) {
      pram = await reverse[i]();
      if (pram !== null) {
        break;
      }
    } else {
      pram = await reverse[i](pram);
    }
  }
  return pram;
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

module.exports = userController;
