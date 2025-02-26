const express = require("express");
const {
    insertBook,
    getAllBooks,
    getBooksByAuthor,
    updateBook,
    deleteBook,
} = require("../controller/bookController");

const router = express.Router();

// Define routes
router.post("/", insertBook);
router.get("/", getAllBooks);
router.get("/author/:author", getBooksByAuthor);
router.put("/:title", updateBook);
router.delete("/:title", deleteBook);

module.exports = router;