var db = require('./databaseServer/database');
var query_0 = require('./databaseServer/query');
var adddb = require('./databaseServer/addData');
var bparse= require('body-parser')


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
app.use(bparse.urlencoded({extended:true}))
app.use(express.static('public'));
app.get('/index.html',(req,res)=>{
    res.sendFile(__dirname+'/'+'index.html')
})

app.get('/students',(req,res)=>{
    var querysentence = 'select * from student1;';
    add_sql(querysentence).then((ans)=>{
        //console.log(ans)
        res.send(JSON.stringify(ans))
    });
})
app.post('/add_stu',(req,res)=>{//For home page's router; 
    
    var stu_info ={
       'add_info':    req.body
    }
    console.log(stu_info.add_info)
    //console.log(req)
    var querysentence = 'insert into student1'
    var values = "('"
    var keys = '('
    for(var key in stu_info.add_info) {
       // console.log(key)
        keys += key
        values += stu_info.add_info[key]
        // querysentence += "'" + stu_info.add_info[key] + "'"; 
        if(key === 'stime'){ 
            keys += ')'
            values += "')"
            
        } else {
            keys += ','
            values += "','"
        }
        //console.log(querysentence)
    }

    querysentence += keys + ' values' + values + ';' 

    var querysentence_2 = 'select * from student1'
    console.log(querysentence)      
    add_sql(querysentence).then(()=>{
        add_sql(querysentence_2).then((ans)=>{
            //console.log(ans)
            res.send(JSON.stringify(ans))
        })
    });
    //console.log(querysentence)
    //console.log('insert success.')
    
})
app.post('/search_stu',(req,res)=>{
    var querysentence="select * from student1 where sname='"+req.body+"':"
    console.log(querysentence)
    add_sql(querysentence).then((ans)=>{
        
            console.log(ans)
            res.send(JSON.stringify(ans))
        
    })
})
app.post('/delete_stu',(req,res)=>{
    
    var snum = req.body;
    var snum_0;
    //console.log(JSON.stringify(snum))
     for(var key in snum){
    //     //console.log(key)
         snum_0=key;
     }
    console.log(snum_0)
    //console.log(snum);
    var querysentence_2 = 'select * from student1'
    var querysentence = "delete from student1 where snum='"+snum_0+"';";
    console.log(querysentence)
    add_sql(querysentence).then((ans)=>{
        add_sql(querysentence_2).then((ans)=>{
           // console.log(ans)
            res.send(JSON.stringify(ans))
        })
    })

    //res.end();
})

app.post('/change_stu',(req,res)=>{
    var sname_0 = req.body 
    var querysentence_2 = 'select * from student1'
    //console.log(sname);
    var querysentence = "update student1 set sname='"+sname_0.sname+"',snum='"+sname_0.snum+"',sschool='"+sname_0.sschool+"',sclass='"+sname_0.sclass+"',sgender='"+sname_0.sgender+"',smajor='"+sname_0.smajor+"' where snum='"+sname_0.searchnum+"';"
    console.log(querysentence)
    add_sql(querysentence).then((ans)=>{
        add_sql(querysentence_2).then((ans)=>{
            //console.log(ans)
            res.send(JSON.stringify(ans))
        })
    })
})


//app.get('/serch',(req,res)=>{//For the function of searchingl

//})
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