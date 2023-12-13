// const login = require('../models/login')

// exports.loginUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await User.findOne({ username }).lean();
//     if (!admin) return res.status(404).send("Invalid credentials");
//     if (admin.password !== "admin")
//       return res.status(404).send("Invalid credentials..");
//     return res.status(200).send("admin");
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };