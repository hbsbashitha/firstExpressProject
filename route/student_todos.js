const express = require('express');
const student_todos_route = express.Router();
const student_todos_controller = require('../controller/stundet_todos_controller');


student_todos_route.route("/")
    .post(student_todos_controller.create_todo)

student_todos_route.route("/student/:s_id")
    .get(student_todos_controller.get_Student_todos)

student_todos_route.route("/:t_id")
    .delete(student_todos_controller.delete_todos)

module.exports = student_todos_route;