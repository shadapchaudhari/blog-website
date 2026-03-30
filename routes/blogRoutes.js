const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

// protected routes
router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;