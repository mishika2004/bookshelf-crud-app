const express = require('express')
const initializeDatabase = require('./db/db.connect')
const Book= require("./models/books.models")
const app = express()

app.use(express.json())
initializeDatabase()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function createBooks (newBook){
    try{  
        const book = new Book(newBook)
        const saveBook = await book.save()
        console.log("New Book Data", saveBook)
        return saveBook
    }
    catch(error){
        throw error
    }
}

app.post("/books", async(req, res) =>{
    try{
        const book = await createBooks(req.body)
       res.status(200).json({message: "Books data added Successfully!", book:book})
    }
    catch(error){
        res.status(500).json({message: "Failed to add books data to database", error: error.message})
    }
})

//2.Run your API and create another book data in the db.

// {
//   "title": "Shoe Dog",
//   "author": "Phil Knight",
//   "publishedYear": 2016,
//   "genre": ["Autobiography", "Business"],
//   "language": "English",
//   "country": "United States",
//   "rating": 4.5,
//   "summary": "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
//   "coverImageUrl": "https://example.com/shoe_dog.jpg"
// };


//. Create an API to get all the books in the database as response. Make sure to do error handling.
app.get("/books", async(req,res) => {
    const books = await Book.find()
    try{
        if(books.length===0){
            res.status(200).json({error: "No books found in databse"})
        }
        else{
            res.status(200).json(books)
        }
        
    }
    catch(error){
        res.status(500).json({error:"Failed to fetch data from database."})
    }
})

// 4. Create an API to get a book's detail by its title. Make sure to do error handling.
app.get("/books/:title", async(req,res) => {
    const booksTitle = await Book.findOne({title: req.params.title})

    try{
        if(!booksTitle){
          res.status(404).json({error: "No data dound."})
        }
        else{
        res.status(200).json({message: "Book fetched successfully!", book:booksTitle})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch data"})
    }
})

// 5. Create an API to get details of all the books by an author. Make sure to do error handling.
app.get("/books/author/:author", async(req,res) => {
    const bookAuthor = await Book.findOne({author: req.params.author});
    try{
    if(!bookAuthor){
        res.status(404).json({error:"Book not found!" })
    }
    else{
        res.status(200).json({message:"Book fetched successfully!", book:bookAuthor})
    }
  }
    catch(error){
        res.status(500).json({error: "Failed to fetch Book from database."})
    }
})

// 6. Create an API to get all the books which are of "Business" genre.
app.get("/books/genre/:genre", async(req,res) => {
    const bookGenre = await Book.find({genre: req.params.genre}) 
    try{
       if(bookGenre.length===0){
        res.status(404).json({error: "Book not found."})
       }
       else{
        res.status(200).json({message:"Books with 'business' genres fetched successfully!", book:bookGenre})
       }
    }
    catch(error){
         res.status(500).json({message:"Failed to fetch data"})
    }
})

// 7. Create an API to get all the books which was released in the year 2012.
app.get("/books/year/:year", async(req,res) => {
    const bookYear = await Book.find({publishedYear: req.params.year})
    try{
        if(bookYear.length===0){
           res.status(404).json({error: "Book not found."})
        }
        else{
          res.status(200).json({message: "Books fetched Successfully!", book:bookYear})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch data from database"})
    }
})

// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book rating: { "rating": 4.5 }

app.post("/books/rating/:id", async(req,res) => {
    
    try{
        const bookRating = await Book.findByIdAndUpdate(req.params.id , {rating: req.body.rating}, {new:true})
        if(!bookRating){
            res.status(404).json({error: "Book does not exist"})
        }
        else{
            res.status(200).json({message:"Book Updated Successfully!", book:bookRating})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch data."})
    }
})

// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
// Updated book data: { "publishedYear": 2017, "rating": 4.2 }

app.post("/books/rating/title/:title", async(req,res) => {
    try{
        const bookRating = await Book.findOneAndUpdate({title: req.params.title}, { publishedYear: 2017, rating: 4.2 }, {new:true})
        if(!bookRating){
            res.status(404).json({error: "Book does not exist"})
        }
        else{
            res.status(200).json({message: "Book updated successfully!", book:bookRating})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch data"})
    }
})

// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.
app.delete("/books/:id", async(req,res) => {
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        if(!deleteBook){
            res.status(404).json({error: "Book not found."})
        }
        else{
            res.status(200).json({message: "Book data deleted Successfully!"})
        }
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch data."})
    }
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})