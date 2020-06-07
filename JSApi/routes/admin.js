var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/a', function (req, res, next) {

    fs.readFile('Users.json', (err, data) => {
        if (err) throw err;
        var users = JSON.parse(data);
        let html = '';
        let mailadresses;
        let admin = false;
        users.forEach(element => {
            if (element.newsletter === true) {

                mailadresses += ", " + element.email;

            }
        });
        //"Name: <input type='text'  id ='userName'> Password: <input type='password' id = 'passWord'><button id= 'login' > logga in</button> " +
        html =
            "<html>" +
            "<head>" +
            "<meta charset='utf-8' />" +
            "<meta name='viewport' content='width=device-width, initial-scale=1.0' />" +
            "<link rel='stylesheet' href='/stylesheets/admin.css'/>" +
            "<title>Kuken står</title>" +
            "</head>" +
            "<header>" +
            "<nav id= 'navbargrey'class=' header navbargrey' >" +
           "<a>"+mailadresses+"</a>"+
            "</nav>" +
            "</header>" +
            "<body>" +
            "<div class='main'>" +
            "<div class='sidenav'>" +
            "<a type='button' class='sideButton-button'  >Rent Movie</a>" +
            "<a type='button' class='sideButton-button'  >My Movies</a>" +
            "<a type= 'button' class='sideButton-button'  >Add Studio</a>" +
            "</div>" +
            '<div>';
        html += '<table id="t01">' +
            '<tr>' +
            '<th>Namn</th>' +
            '<th>Email</th>' +
            '</tr>' +
            '<tr>';
        users.forEach(element => {
            html += '<tr>';
            html += '<td>' + element.username + '</td>';
            html += '<td>' + element.email + '</td>';
            html += '</tr>';
        });

        html += '</table>' +
            '<h5><' + mailadresses + '</h5>' +
            '</h5>' +
            "</main>" +
            "</body>" +
            "</html>";
        console.log(mailadresses);
        res.send(html);
    })

});



function Login(req, res, next) {
    console.log("kuken står");
    fs.readFile('./Users.json', (err, data) => {
        var getUser = document.getElementById("userName").value;
        var getPassword = document.getElementById("passWord").value;

        if (err) throw err;
        let newUser = req.body;
        var users = [];

        users = JSON.parse(data);
        console.log(users);

        users.forEach(element => {
            if (element.username === getUser && element.password === getPassword) {
                res.send(element);
            }
        })

    });

};
router.get('/', function (req, res, next) {
    fs.readFile('Users.json', (err, data) => {
        if (err) throw err;
        var users = JSON.parse(data);

        for (let i = 0; i < users.length; i++) {
            console.log(users[i].username + "kuken står");
        };





        res.send(users);
    })
});










module.exports = router;