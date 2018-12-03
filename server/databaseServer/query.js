/*
var query_module ={ 
  author: 'Shicript',
  date: '11/28/2018',
  time: '13:55'
}
*/
var mysql = require('mysql')
var db = require('./database');
//var db_init = db.connection.connect();

//db_init;

var queryData = {
    queryResult: new Array(),
    
    queryName:function(query_sentence){//query by Name  
        db.connection.query(query_sentence,(er,result,feild)=>{
            if(er) throw er;
            console.log(result); //print queryings' result in terminal.
            this.queryResult.push(result) //push queryings' result in a varable.
        })
    },

    queryMajor:function(){//query by Major
        db.connection.query(query_sentence,(er,result,feild)=>{
            if(er) throw er;
            console.log(result); //print queryings' result in terminal.
            this.queryResult.push(result); //push queryings' result in a varable.
        })
    },

    queryNumber:function(){//query by students number
        db.connection.query(query_sentence,(er,result,feild)=>{
            if(er) throw er;
            console.log(result); //print queryings' result in terminal.
            this.queryResult.push(result); //push queryings' result in a varable.
        })
    }

}

exports.query = queryData;