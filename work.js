const express = require("express");
const app = express();
const session = require("express-session");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let loggedin=false

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
  })
);


app.use((req, res, next) => {

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });


let cred = {
  name: "rahul",
  password: "123",
};

app.get("/", (req, res) => {
    if(loggedin==true){
        res.redirect("/home")
    }else
  res.render("login", { error: "" });
});

app.post("/", (req, res) => {
  if (req.body.email === cred.name && req.body.password === cred.password) {
    req.session.username = cred.name;
    loggedin=true


    res.redirect("/home");
  } else {
    res.render("login", { error: "Invalid the username and password" });
  }
});



app.get("/home", (req, res) => {
  if (req.session.username) {
    res.render("home", { username: req.session.username });
  } else {
    res.redirect("/");
  }
});

app.post("/logout",(req,res)=>{
    loggedin=false
    req.session.destroy();
    res.render("login", { error: "Logout successfully" });
})




app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


