const { Router } = require('express');
const { check, body } = require('express-validator');
const {
    validateField,
    isTeacherOrAdminRole,
    isAdminRole,
    validateJWT,
} = require('../middlewares');

const {
    coursesGet,
    courseGetById,
    coursePost,
    courseUpdate,
    courseDelete,
    courseGetStudents,
} = require('../controllers/course.controller.js');
const {
    existModelById,
    existModelDB,
    existModelByIdAndField,
} = require('../helpers/db-validator.js');
const { Course, User, Lesson } = require('../models');

const router = Router();

// general api operations
router.get('/', coursesGet);

router.post(
    '/',
    [
        validateJWT,
        isAdminRole,
        body('courseName', 'Course name is required').not().isEmpty(),
        body('courseName', 'Course name must be unique').custom((courseName) =>
            existModelDB(Course, 'courseName', courseName)
        ),
        body('image', 'image src is required').not().isEmpty(),
        body('description', 'Course description is required').not().isEmpty(),
        body('teacher', 'teacher is not mongoid').isMongoId(),
        body('teacher').custom((teacher) =>
            existModelByIdAndField(User, teacher, 'role', 'teacher')
        ),
        body('students').isArray(),
        body('students.*').isMongoId(),
        body('students.*').custom((student) =>
            existModelByIdAndField(User, student, 'role', 'student')
        ),
        validateField,
    ],
    coursePost
);

router.put(
    '/:id',
    [
        validateJWT,
        isTeacherOrAdminRole,
        check('id', 'id is not mongoId').isMongoId(),
        check('id').custom((id) => existModelById(Course, id)),
        body('courseName', 'Course name must be unique')
            .if(body('courseName').exists())
            .custom((courseName) =>
                existModelDB(Course, 'courseName', courseName)
            ),
        body('teacher')
            .if(body('teacher').exists())
            .custom((teacher, { req }) => {
                if (req.user.role != 'admin') {
                    throw new Error(
                        'Only admin can update the teacher of the course'
                    );
                }
                return true;
            }),
        body('teacher')
            .if(body('teacher').exists())
            .custom((teacher) =>
                existModelByIdAndField(User, teacher, 'role', 'teacher')
            ),
        body('students', 'students must be an array')
            .if(body('students').exists())
            .isArray(),
        body('students.*')
            .if(body('students').exists())
            .custom((student) =>
                existModelByIdAndField(User, student, 'role', 'student')
            ),
        body('lessons', "lessons id can't be modified").not().exists(),
        body('events', "events id can't be modified").not().exists(),
        body('grades', "grades id can't be modified").not().exists(),
        body('forum', "forum id can't be modified").not().exists(),
        validateField,
    ],
    courseUpdate
);

router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'id is not mongoId').isMongoId(),
        check('id').custom((id) => existModelById(Course, id)),
        validateField,
    ],
    courseDelete
);

// specific api operations

router.get(
    '/:id',
    [
        check('id', 'id is not mongoId').isMongoId(),
        check('id').custom((id) => existModelById(Course, id)),
        validateField,
    ],
    courseGetById
);

router.get(
    '/students/:id',
    [
        check('id', 'id is not mongoId').isMongoId(),
        check('id').custom((id) => existModelById(Course, id)),
        validateField,
    ],
    courseGetStudents
);

module.exports = router;
