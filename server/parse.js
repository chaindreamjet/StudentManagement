var db = require('./databaseServer/database')

//var querysentence = "insert into student1 () values ('U101517143','shixing_','male','sse','1506','se','2015-09-01','0');"
var querysentence_2 = "select * from student1 where sname='shixing_';";
var result= {}
//result='asd'
//console.log(result)


db.connection.query(querysentence_2,(er,res)=>{
    if(er) throw er;
    console.log(typeof res)
    console.log(JSON.stringify(res))
    for (var key in res){

        
    }

})


