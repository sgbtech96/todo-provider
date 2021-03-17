const express = require("express");
const getTodos = require("./getTodos");
const createTodo = require("./createTodo");
const editTodo = require("./editTodo");
const deleteTodo = require("./deleteTodo");
const auth = require("../../../middleware/auth");

const router = express.Router();

router.get("/all", [auth], getTodos);
router.post("/create", [auth], createTodo);
router.put("/edit/:todoId", [auth], editTodo);
router.put("/delete/:todoId", [auth], deleteTodo);

module.exports = router;
