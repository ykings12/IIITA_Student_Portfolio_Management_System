// const connectToDb = require("./database/db");
var express = require("express");
// import exphbs from "express-handlebars"
const port = 5100;

const hbs = require("hbs");
const path = require("path");

var app = express();

var session = require("express-session");
// var flash = require("connect-flash");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// const dotenv = require("dotenv");
// dotenv.config({ path: ".env" });
const { constants } = require("buffer");
// const passport = require("passport");
const { profile } = require("console");
// const flush=

//path set up
const staticpath = path.join(__dirname, "../public");
// const partialpath = path.join(__dirname, "../templates/partials");
const templatepath = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
// hbs.registerPartials(partialpath);

var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "se",
});

db.connect(function (err) {
  if (err) {
    console.log("some error ");
  } else {
    console.log("connected");
  }
});

// module.exports=db;

// connectToDb();

app.get("/main", (req, res) => {
  res.render("main");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/delete_student", (req, res) => {
  res.render("delete_student");
});

app.post("/register",async(req, res) => {
 

//app.use(express.json())

var name = req.body.name;
var enroll = req.body.enroll;
var email = req.body.email;
var password = req.body.password;
var nickname = req.body.nickname;




try {
  //passwrod and confirm password should match
  // here we can simply find the user with the payload and finally update the passwrod
  //always hash the password;
  // const payload = jwt.verify(token, secret);

  // console.log("hello");

 var sql = `INSERT INTO student VALUES ("${name}","${enroll}", "${email}", "${password}", "${nickname}");`;
 db.query(sql, function (err, result) {
   if (err) {
    throw err
     res.redirect("register");
   } else {
     // console.log(id,' ',name,' ',email,' ',message,'\n');
     console.log("succesfully registered");
    
     res.render("main");
   }
 });
} catch (err) {
  console.log(err.message);
  res.send(err.message);
}
});







app.post("/main", async(req, res) => {
  // console.log(userkiId);
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  // var email = req.body.email;
  if (email.length == 0) 
  {
    // req.flash("message", "please enter Email ID");
    res.redirect("main");
  } 
  else 
  {
    var password = req.body.password;
    console.log(email + " " + password);

    var sql = `select password from student where email="${email}"`;

    db.query(sql, function (err, result) 
    {
      if (err) 
      {
        console.log(err);

        console.log("username and/or password does not matched");
        // req.flash("message", "username and/or password does not match");
        res.redirect("main");
      } 
      else 
      {
        if (result.length == 0) 
        {
          // req.flash("message", "please enter valid password");
          res.redirect("main");
        } 
        else 
        {
          console.log(result[0].password);
          let gg = result[0].password;
          console.log(gg);
          if (gg.localeCompare(password) == 0) 
          {
            var kk = result[0].fname;
            gname = kk;
            // res.redirect("templates\views\student_profile.hbs");
            // res.redirect("/templates/views/student_profile");
            // app.post('/main', function(req, res) {
              // perform login logic here
              // ...
            
              // render the student_profile view and send it to the client
              res.render('student_profile');
            // });
            

          } 
          else 
          {
            console.log("username or password doesnot matched");
            // req.flash("message", "username and password does not match");
            res.redirect("main");
          }
        }
      }
    });
  }
});


// ADMIN 

app.get("/main_admin", (req, res) => {
  res.render("main_admin");
});
app.get("/register_admin", (req, res) => {
  res.render("register_admin");
});


app.post("/register_admin",async(req, res) => {
 

  //app.use(express.json())
  
  var name = req.body.name;
  var adminid = req.body.adminid;
  var email = req.body.email;
  var password = req.body.password;
 
  
  
  
  
  try {
    //passwrod and confirm password should match
    // here we can simply find the user with the payload and finally update the passwrod
    //always hash the password;
    // const payload = jwt.verify(token, secret);
  
    // console.log("hello");
  
   var sql = `INSERT INTO admin VALUES ("${name}","${adminid}", "${email}", "${password}");`;
   db.query(sql, function (err, result) {
     if (err) {
      throw err
       res.redirect("register_admin");
     } else {
       // console.log(id,' ',name,' ',email,' ',message,'\n');
       console.log("succesfully registered");
      
       res.render("main_admin");
     }
   });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
  });
  

app.post("/main_admin", async(req, res) => {
  // console.log(userkiId);
  var adminid = req.body.adminid;
  var password = req.body.password;
  console.log(adminid);
  // var email = req.body.email;
  if (adminid.length == 0) 
  {
    // req.flash("message", "please enter Email ID");
    res.redirect("main_admin");
  } 
  else 
  {
    var password = req.body.password;
    console.log(adminid + " " + password);

    var sql = `select password from admin where adminid="${adminid}"`;

    db.query(sql, function (err, result) 
    {
      if (err) 
      {
        console.log(err);

        console.log("Admin ID and/or password does not matched");
        // req.flash("message", "username and/or password does not match");
        res.redirect("main_admin");
      } 
      else 
      {
        if (result.length == 0) 
        {
          // req.flash("message", "please enter valid password");
          res.redirect("main_admin");
        } 
        else 
        {
          console.log(result[0].password);
          let gg = result[0].password;
          console.log(gg);
          if (gg.localeCompare(password) == 0) 
          {
            var kk = result[0].fname;
            gname = kk;
            // res.redirect("templates\views\student_profile.hbs");
            // res.redirect("/templates/views/student_profile");
            // app.post('/main', function(req, res) {
              // perform login logic here
              // ...
            
              // render the student_profile view and send it to the client
              res.render('admin_profile');
            // });
            

          } 
          else 
          {
            console.log("username or password doesnot matched");
            // req.flash("message", "username and password does not match");
            res.redirect("main_admin");
          }
        }
      }
    });
  }
});



// parse incoming requests with JSON payloads
app.use(bodyParser.json());

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// handle GET requests to the admin_profile route
app.post('/admin_profile', (req, res) => {
  // const enroll = req.body.enroll;
  var name = req.body.name;
  var enroll = req.body.enroll;
  var email = req.body.email;
  var password = req.body.password;
  var nickname = req.body.nickname;
  
  // check if the enrollment_number parameter is present
  if(!enroll) {
      console.log('Enrollment number parameter missing');
      return res.status(400).send('Enrollment number parameter missing');
  }

  // query the database to find student information
  db.query('SELECT * FROM student WHERE enroll = ?', [enroll], (err, result) => {
      if(err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
      }
      
      if(result.length === 0) {
          console.log(`No student found with enrollment number: ${enroll}`);
          return res.status(404).send('Student not found');
      }

      // render the student information HTML template with the result from the database
      const studentInfo = {
        name: result[0].name,
        enroll: result[0].enroll,
        email: result[0].email,
        nickname: result[0].nickname
      };
      res.render('admin_profile', studentInfo);
  });
});












// app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  res.sendFile(__dirname + '/delete_student');
});

app.post('/delete_student', (req, res) => {
  const enroll = req.body.delete;
  const sql = `DELETE FROM student WHERE enroll='${enroll}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Student information deleted successfully');
  });
});



app.listen(5100, () => {
  console.log('connected');
});
