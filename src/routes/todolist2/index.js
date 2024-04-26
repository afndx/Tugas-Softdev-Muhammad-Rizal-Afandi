const express = require("express");
const {
  createTodolist,
  deleteTodoList,
  updateTodoList,
  getTodoList,
  getTodoLists,
} = require("../../resolvers/todolist2");

const router = express.Router();

router.post("/:user_id", createTodolist);
router.get("/", getTodoLists);
router.get("/:id", getTodoList);
router.put("/:id/:user_id", updateTodoList);
router.delete("/:id", deleteTodoList);

module.exports = router;
