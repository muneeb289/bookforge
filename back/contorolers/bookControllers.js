const BookModels = require("../models/bookModel")


const getAllBooks = async (req, res) => {
    try {
        const AllBooks = await BookModels.findAll()
        return res.status(200).json(AllBooks)
    } catch (error) {
        return res.status(500).json({ error: error.message, errorRoutes: "getAllBook" })
    }
};

const addBook = async (req, res) => {
    // console.log(req.body)
    try {
        const Book = await BookModels.create({
            book_title: req.body.book_title,
            book_author: req.body.book_author,
            book_description: req.body.book_description,
            book_Published_Date: req.body.book_Published_Date,
            book_Language: req.body.book_Language,
        });

        res.status(200).json({ status: true, data: [Book] })
    } catch (error) {
        // console.log(error.message)
        res.status(500).json({ status: false, error: error.message, errorRoutes: "addBook" })
    }
};

const getOneBook = async (req, res) => {
    try {
        const OneBooks = await BookModels.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(OneBooks)
    } catch (error) {
        res.status(500).json({ error: error.message, errorRoutes: "getOneBook" })
    }
};

const deleteBook = async (req, res) => {
    // console.log(req)
    try {
        const deletedBook = await BookModels.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ status: true, data: deletedBook })
    } catch (error) {
        res.status(500).json({ status: false, error: error.message, errorRoutes: "deleteBook" })
    }
};

const editBook = async (req, res) => {
    console.log(req.body)
    try {
        var updatedData = req.body;
        const EditedBook = await BookModels.update(updatedData, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ status: true, data: EditedBook })
    } catch (error) {
        res.status(500).json({status: false,  error: error.message, errorRoutes: "editBook" })
    }
};


module.exports = {
    addBook,
    getAllBooks,
    getOneBook,
    deleteBook,
    editBook
}