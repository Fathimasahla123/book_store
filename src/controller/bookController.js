// //  const Books = require("../model/bookModel");

// // const insertBook = async (req, res) => {
// //     const collection = getDB().collection("books");
// //     const result = await collection.insertOne(req.body);
// //     res.send(result);
// // };


// // const getAllBooks = async (req, res) => {
// //     const collection = getDB().collection("books");
// //     const books = await collection.find().toArray();
// //     res.send(books);
// // };

// // // Get books by author
// // const getBooksByAuthor = async (req, res) => {
// //     const collection = getDB().collection("books");
// //     const books = await collection.find({ author: req.params.author }).toArray();
// //     res.send(books);
// // };


// // const updateBook = async (req, res) => {
// //     const collection = getDB().collection("books");
// //     const result = await collection.updateOne(
// //         { title: req.params.title },
// //         { $set: req.body }
// //     );
// //     res.send(result);
// // };


// // const deleteBook = async (req, res) => {
// //     const collection = getDB().collection("books");
// //     const result = await collection.deleteOne({ title: req.params.title });
// //     res.send(result);
// // };

// // module.exports = {
// //     insertBook,
// //     getAllBooks,
// //     getBooksByAuthor,
// //     updateBook,
// //     deleteBook,
// // };

// const Books = require("../model/bookModel");

// // Insert a new book
// const insertBook = async (req, res) => {
//     try {
//         const newBook = new Books({title,author,price,stock}); // Create a new book instance
//        await newBook.save(); // Save the book to the database
//         res.status(201).json(newBook);// Send the saved book as response
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while inserting the book." });
//     }
// };

// // Get all books
// const getAllBooks = async (req, res) => {
//     try {
//         const books = await Books.find(); // Fetch all books from the database
//         res.status(200).json(books); // Send the list of books as response
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while fetching the books." });
//     }
// };

// // Get books by author
// const getBooksByAuthor = async (req, res) => {
//     try {
//         const books = await Books.find({ author: req.params.author }); // Find books by author
//         if (books.length === 0) {
//             return res.status(404).send({ error: "No books found for the given author." });
//         }
//         res.status(200).json(books); // Send the books as response
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while fetching the books by author." });
//     }
// };

// // Update a book by title
// const updateBook = async (req, res) => {
//     try {
//         const result = await Books.updateOne(
//             { title: req.params.title }, // Find the book by title
//             { $set: req.body } // Update the book with the new data
//         );
//         if (result.matchedCount === 0) {
//             return res.status(404).send({ error: "Book not found." });
//         }
//         res.status(200).json(result); // Send the result of the update operation
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while updating the book." });
//     }
// };

// // Delete a book by title
// const deleteBook = async (req, res) => {
//     try {
//         const result = await Books.deleteOne({ title: req.params.title }); // Delete the book by title
//         if (result.deletedCount === 0) {
//             return res.status(404).send({ error: "Book not found." });
//         }
//         res.status(200).json(result); // Send the result of the delete operation
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred while deleting the book." });
//     }
// };

// module.exports = {
//     insertBook,
//     getAllBooks,
//     getBooksByAuthor,
//     updateBook,
//     deleteBook,
// };


const Books = require("../model/bookModel");

// Insert a new book
const insertBook = async (req, res) => {
    try {
        const { title, author, price, stock } = req.body;

        // Validate required fields
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

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while fetching the books: ${error.message}` });
    }
};

// Get books by author
const getBooksByAuthor = async (req, res) => {
    try {
        const authorName = new RegExp(req.params.author, "i"); // Case-insensitive search
        const books = await Books.find({ author: authorName });
        if (books.length === 0) {
            return res.status(404).send({ error: "No books found for the given author." });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while fetching the books by author: ${error.message}` });
    }
};

// Update a book by title
const updateBook = async (req, res) => {
    try {
        const updatedBook = await Books.findOneAndUpdate(
            { title: req.params.title },
            { $set: req.body },
            { new: true } // Return the updated document
        );
        if (!updatedBook) {
            return res.status(404).send({ error: "Book not found." });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).send({ error: `An error occurred while updating the book: ${error.message}` });
    }
};

// Delete a book by title
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