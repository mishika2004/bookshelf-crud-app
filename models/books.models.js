const mongoose = require('mongoose')
const booksSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    publishedYear: {
      type: Number,
      required: true
    },
    genre: {
      type: [String],
      required: true
    },
    language: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10
    },
    summary: {
      type: String,
      required: true
    },
    coverImageUrl: {
      type: String
    }

  },
  {
    timestamps: true
}) 

const Book =  mongoose.model("Book", booksSchema)
module.exports = Book;