
var express = require('express');
var router = express.Router();
var fs =require('fs');
/* GET users listing. */
router.post('/', function(req, res, next) {
  fs.readFile('./Users.json',(err,data)=>
  {
       if(err) throw err;
      
       let id= 0;
       let currentUsers =  JSON.parse(data);
       currentUsers.forEach(element => {
              id++;
      });
      req.body.id=id+1;
      let newUser = req.body;
      

       currentUsers.push(newUser);
       var saveUser = JSON.stringify(currentUsers,null,2);
      

      fs.writeFile('./Users.json',saveUser,(err,data)=>
      {
        if(err) throw err;
      })
      res.send(saveUser);



  })
 });
module.exports = router;
