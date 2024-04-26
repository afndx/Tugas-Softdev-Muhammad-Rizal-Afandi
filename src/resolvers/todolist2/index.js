const knex = require("../../databases");
const { check, validationResult } = require("express-validator");

module.exports = {
  createTodolist: async (req, res) => {
    const { title, description } = req.body;
    const { user_id } = req.params;
    console.log(req.body);
    await check("title").isString().notEmpty().run(req);
    await check("description").isString().notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).message({ error: result.array() });
    const todolist = await knex("todolist2").insert({
      user_id,
      title,
      description,
    });
    if (todolist.length == 0)
      return res
        .status(400)
        .json({ message: "Gagal menambahkan Todolist baru" });
    return res
      .status(200)
      .json({ message: "Berhasil menambahkan Todolist baru" });
  },
  getTodoLists: async (req, res) => {
    const todolist = await knex("todolist2").select("*");
    return res.status(200).json({
      data: todolist,
      message: "Berhasil mengambil semua data Todolist",
    });
  },
  getTodoList: async (req, res) => {
    const { id } = req.params;
    const todolist = await knex("todolist2").select("*").where({ id });
    return res.status(200).json({
      data: todolist,
      message: "Berhasil mengambil semua data Todolist",
    });
  },
  updateTodoList: async (req, res) => {
    const { id, user_id } = req.params;
    const { title, description } = req.body;
    await check("title").isString().notEmpty().run(req);
    await check("description").isString().notEmpty().run(req);
    const todolist = await knex("todolist2").select("*").where({ id });
    if (!todolist)
      return res.status(400).json({ message: "Data todolist tidak ditemukan" });
    await knex("todolists2")
      .update({
        title,
        description,
      })
      .where({ id });
    return res
      .status(200)
      .json({ message: "Berhasil memperbarui data Todolist" });
  },
  deleteTodoList: async (req, res) => {
    const { id } = req.params;
    await knex("todolists2").where({ id }).del();
    return res
      .status(200)
      .json({ message: "Berhasil menghapus data Todolist" });
  },
};
