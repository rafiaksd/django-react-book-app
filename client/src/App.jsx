/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css"
import axios from 'axios'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0)

  const [newTitle, setNewTitle] = useState("")

  useEffect(()=>{
    fetchBooks()
  }, [])

  const fetchBooks = async() => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/")
      const data = await response.json()
      setBooks(data)
    } catch (err){
      console.log('error when fetching books: ' , err)
    }
  }

  const addBook = async() =>{
    const bookData = {
      title: title,
      release_year: releaseYear,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/books/create/', bookData);

      setBooks((prev) => [...prev, response.data]);

      setTitle('');
      setReleaseYear('');
    } catch (err){
      console.log('error when adding book: ', err)
    }
  }

  const updateTitle = async(pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year: release_year,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/books/${pk}`, bookData);

      setBooks((prev) => prev.map((book)=>{
        if (book.id === pk){
          return response.data;
        }
        else{
          return book;
        }
      }));

      setNewTitle('')
    } catch (err){
      console.log('error when adding book: ', err)
    }
  }

  const deleteBook = async(pk)=> {
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/api/books/${pk}`)

      setBooks((prev)=> prev.filter((book)=> book.id !== pk))
    }
    catch(err){
      console.log('error when deleting: ', err)
    }
  }

  return(
    <>
      <h1>Book Website</h1>

      <div>
        <input style={{ fontSize: "20px" }} type="text" placeholder="Book title..." value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <input style={{ fontSize: "20px", width: '100px' }} type="number" placeholder="Release year..." value={releaseYear} onChange={(e)=> setReleaseYear(e.target.value)}/>
        <button onClick={addBook}>Add Book</button>

        <br></br>
        <input style={{ fontSize: "20px" }} type="text" placeholder="edit title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
      </div>

      {books.map((book)=> (
        <div>
          <p>Title: {book.title} ______ Release Year: {book.release_year}</p>
          <button onClick={()=> updateTitle(book.id, book.release_year)}>Edit Title</button>
          <button onClick={()=>deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default App;