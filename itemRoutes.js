const express = require("express");
const router = express.Router();
const Item = require("./item");

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new item
router.post("/", async (req, res) => {
    const item = new Item({
        text: req.body.text,
        completed: req.body.completed || false
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update item
router.patch("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (req.body.text != null) {
            item.text = req.body.text;
        }
        if (req.body.completed != null) {
            item.completed = req.body.completed;
        }
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete item
router.delete("/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
