const Books = require("../model/bookModel");


const insertBook = async (req, res) => {
    try {
        const { title, author, price, stock } = req.body;

       
        if (!title || !author) {
            return res.status(400).send({ error: "Title and author are required." });
        }

        const newBook = new Books({ title, author, price, stock });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while inserting the book: ${error.message}` });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while fetching the books: ${error.message}` });
    }
};


const getBooksByAuthor = async (req, res) => {
    try {
        const authorName = new RegExp(req.params.author, "i"); 
        const books = await Books.find({ author: authorName });
        if (books.length === 0) {
            return res.status(404).send({ error: "No books found for the given author." });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while fetching the books by author: ${error.message}` });
    }
};


const updateBook = async (req, res) => {
    try {
        const updatedBook = await Books.findOneAndUpdate(
            { title: req.params.title },
            { $set: req.body },
            { new: true } 
        );
        if (!updatedBook) {
            return res.status(404).send({ error: "Book not found." });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while updating the book: ${error.message}` });
    }
};


const deleteBook = async (req, res) => {
    try {
        const result = await Books.deleteOne({ title: req.params.title });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: "Book not found." });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while deleting the book: ${error.message}` });
    }
};

module.exports = {
    insertBook,
    getAllBooks,
    getBooksByAuthor,
    updateBook,
    deleteBook,
};
