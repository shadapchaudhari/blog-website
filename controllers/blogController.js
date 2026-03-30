const Blog = require('../models/blogModel');

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            title,
            content,
            userId: req.user.id
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('userId', 'name email');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        // only owner can update
        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        const updated = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        if (blog.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        await blog.deleteOne();
        res.json({ msg: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};