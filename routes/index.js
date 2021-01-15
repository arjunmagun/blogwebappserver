const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

router.get("/", (req, res) => {
    Blog.find({}, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results)
        }
    });
});


router.post("/create", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const date = req.body.date;
    const createdBy = req.body.createdBy;
    const newBlog = new Blog({
        title,
        description,
        date,
        imageUrl,
        createdBy
    });
    newBlog.save()
        .then(() => res.json("Added new blog to the database"))
        .catch((err) => console.log("Found an error" + err));
});

router.get("/:id", (req, res) => {
    Blog.findById(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

router.post("/:id/update", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const date = Date.parse(req.body.date);
    const editDetails = { title, description, date, imageUrl };
    Blog.findOneAndUpdate(req.params.id, editDetails, (err, result) => {
        if (err) {
            res.json(err.message)
            console.log(err);
        } else {
            res.json(result)
        }
    });
});

router.delete("/:id/update", (req, res) => {
    Blog.findOneAndDelete(req.params.id, (err, result) => {
        if (err) {
            res.json(err.message)
            console.log(err);
        } else {
            res.send("deleted one blog")
        }
    });
});

module.exports = router;