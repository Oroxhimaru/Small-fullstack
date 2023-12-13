import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

//middleware for allowing our backend to connect with frontend
app.use(cors());

//middleware for data transfering body or from client side ..
app.use(express.json());


//database
const db = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"databasepassword1!",
     database:"test"
});


app.get('/', (req,res) => {
    res.json("hello this is backend!")
});

//connecting with books table
app.get('/books', (req,res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err,data) => {
        if (err) {
            console.log(err);
            return res.json(err);
          }
          return res.json(data);
    })
});

//use this if there is a authentication problem
//ALTER USER 'your_username'@'your_host' IDENTIFIED WITH 'mysql_native_password' BY 'new_password';

//check with postman
app.post("/books", (req,res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,  
    ]

    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("book has been made")
    })
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


   app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}); 

//port info
app.listen(8800, () => {
    console.log("Connected to Backend!")
});

