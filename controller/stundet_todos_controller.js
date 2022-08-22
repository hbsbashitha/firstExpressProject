// const { STUDENT_TODO_MODEL } = require("../model/TODO.JS");
const { isEmpty } = require("../utils/is_empty");
const joi = require("@hapi/joi"); //form input server-side validation
const AppError = require("../utils/appError");
const { CREATE_TODO } = require("../query/todos");
const conn = require('../service/db_service');

const STUDENT_TODO_MODEL = joi.object({
    title: joi.string().min(10).required(),
    description: joi.string().min(10).required(),
    s_id: joi.number().required()
})

exports.create_todo = (req, res, next) => {
    if (isEmpty(req.body)) return next( new AppError("form data not found" , 400));

    try {
        const { error } = STUDENT_TODO_MODEL.validate(req.body);
        if( error ) return next( new AppError(error.details[0].message , 500) )
        
        const values = [req.body.title, req.body.description , req.body.s_id];

        conn.query(
            CREATE_TODO,
            [values],
            function (err, data, fields) {
                if( err ) return next( new AppError( err , 500) )
                res.status(201).json({
                    status: "success",
                    message: "Todo Added!",
                });
            }
        );

    } catch ( err ) {
        res.status(500).json({
            error : err
        })
    }

}

exports.delete_todos = (req, res, next) => {
  
}

exports.get_Student_todos = (req, res, next) => {
    if (!req.params.s_id) { 
        return next(new AppError("No student found", 401));
    }
    conn.query(
        "SELECT * FROM todos WHERE s_id = ?",
        [req.params.s_id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
}


