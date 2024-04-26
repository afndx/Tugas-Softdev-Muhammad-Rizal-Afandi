const knex = require("../../databases");
const { check, validationResult } = require("express-validator");

module.exports = {
  createUser: async (req, res) => {
    const { username, nrp } = req.body;
    console.log(req.body);
    await check("username").isString().notEmpty().run(req);
    await check("nrp")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 10 })
      .run(req);
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).message({ error: result.array() });
    const user = await knex("users").insert({
      nrp,
      username,
    });
    if (user.length == 0)
      return res.status(400).json({ message: "Gagal menambahkan data user" });
    return res.status(200).json({ message: "Berhasil menambahkan data user" });
  },
  getUser: async (req, res) => {
    const users = await knex("users").select("*");
    return res
      .status(200)
      .json({ data: users, message: "Berhasil mengambil semua data user" });
  },
  getUsers: async (req, res) => {
    const { id } = req.params;
    const users = await knex("users").select("*").where({ id });
    return res
      .status(200)
      .json({ data: users, message: "Berhasil mengambil semua data user" });
  },
  updateUser: async (req, res) => {
    const { nrp, username } = req.body;
    const { id } = req.params;
    const user = await knex("users").where({ nrp }).first();
    if (!user)
      return res.status(400).json({ message: "Data user tidak ditemukan" });
    const users = await knex("users")
      .update({
        username,
        nrp,
      })
      .where({ id });
    return res
      .status(200)
      .json({ data: users, message: "Berhasil mengambil semua data user" });
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await knex("users").where({ id }).first();
    if (!user)
      return res.status(400).json({ message: "Data user tidak ditemukan" });
    const users = await knex("users").where({ id }).del();
    return res
      .status(200)
      .json({ data: users, message: "Berhasil mengambil semua data user" });
  },
};
