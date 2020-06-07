var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET users listing. */
router.get('/', function (req, res, next) {
  fs.readFile('Users.json', (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);

    res.send(users);
  })
});

router.post('/newuser', function (req, res, next) {
  fs.readFile('./Users.json', (err, data) => {
    if (err) throw err;
    let newUser = req.body;
    var users = [];

    users.push(JSON.parse(data));
    console.log(users);

    users.push(newUser);

    var saveUser = JSON.stringify(users, null, 2);


    fs.writeFile('./Users.json', saveUser, (err, data) => {
      if (err) throw err;
    })
    res.send("ny användarde skapad");



  })
});

router.post('/login', function (req, res, next) {
  fs.readFile('./Users.json', (err, data) => {
    if (err) throw err;
    let newUser = req.body;
    var users = [];

    users = JSON.parse(data);
    console.log(users);

    users.forEach(element => {
      if (element.username === newUser.username && element.password === newUser.password) {
        res.send(element);
      }



    });

  })
});

router.put("/:id", (req, res) => {
  let reqId = req.body.id;

  console.log(req.body);
  fs.readFile('Users.json', (err, dataRead) => {
    var users = JSON.parse(dataRead);
    var filterData = users.find((a) => a.id == reqId);

    filterData.newsletter = req.body.newsletter;
    console.log(filterData);
    if (err) throw err;


    ;
    var saveUser = JSON.stringify(users, null, 2);

    fs.writeFile('./Users.json', saveUser, (err, data) => {
      if (err) throw err;
    })
    res.send("kuken står");
  })
});
/*
router.put("/:id", (req, res) => {
  let userId = req.body.id;

  fs.readFile("Users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);

    var userFromDB = users.find((u) => u.id == userId);

    userFromDB.newsletter = req.body.newsletter;

    let updateUser = JSON.stringify(users, null, 2);

    fs.writeFile("./Users.json", updateUser, (err) => {
      if (err) throw err;
    });

    res.send("Newsletter Updated!");
  });
});
*/
module.exports = router;