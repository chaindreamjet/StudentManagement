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
app.use(express.static('public'));
app.get('/index.html',(req,res)=>{
    res.sendFile(__dirname+'/'+'index.html')
})
app.post('/add_stu',(req,res)=>{//For home page's router; 
    
    var stu_info ={
        'add_info':    req.body.jsonData_0,
        'update_info': req.body.jsonData_1    
    }
    var querysentence = 'insert into student1 values ('
    for(var key in stu_info.add_info) 
        querysentence +=stu_info.add_info[key]+','; 
        while(key == 'stime') 
            querysentence -= ','
            querysentence += ');'
    
    add_sql(querysentence);
    //console.log('insert success.')
    res.end()
})

app.post('/delete_stu',(req,res)=>{
    
    var sname = req.body.sname;
    var querysentence = 'delete from student1 where sname='+sname+';';
    add_sql(querysentence)

    res.end();
})

app.post('/search_stu',(req,res)=>{
    var sname = req.body.sname 
    var querysentence = "select * from student1 where sname="+sname+";"
    add_sql(querysentence).then((ans)=>{
        res.send(ans[0]);
    })
})


app.get('/serch',(req,res)=>{//For the function of searchingl

})
// for test demo
//query_sql.queryName('select * from manager1;').then((ans)=>{

//    console.log(ans);
//})

//res.end('test')
const hostname = 'localhost'
app.listen(3000,hostname,()=>{
    console.log("connecting to port 3000...")
    //query_0.query.queryName('gggg')
    

})
/*
(function(){
})()
*/