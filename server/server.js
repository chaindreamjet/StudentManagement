var db = require('./databaseServer/database');
var query_0 = require('./databaseServer/query');
var adddb = require('./databaseServer/addData');
db.connection.connect();

var express = require('express');
var app = express();

var query_sql = query_0.query;
var add_sql = adddb.addDB;

//console.log(query_sql)

//console.log(adddb)
//console.log(add_sql)
/*
app.get('/login_page',(req,res)=>{//For login's page router;
    res.send('bibi');
})
*/

app.get('/home_page',(req,res)=>{//For home page's router; 
    let stu_info ={
        'add_info':    req.body.jsonData_0,
        'update_info': req.body.jsonData_1    
    }
    var querysentence = 'insert into student1 values('
    for(let key in stu_info.add_info) 
        querysentence +=stu_info.add_info[key]+','; 
        while(key == 'stime') 
            querysentence -= ','
            querysentence += ');'
    
    add_sql(querysentence);
})

app.get('/serch',(req,res)=>{//For the function of searchingl

})

query_sql.queryName('show tables;').then((ans)=>{

    console.log(typeof ans);
})

app.listen(3000,()=>{
    console.log("connecting to port 3000...")
    //query_0.query.queryName('gggg')
    

})
/*
(function(){
})()
*/