/*
var add_module ={ 
  author: 'Shicript',
  date: '11/28/2018',
  time: '14:00'
}
*/
var mysql = require('mysql')
var db = require('./database');
//var db_init = db.connection.connect();

//db_init;

var addData = (dbSentence,addData)=>{
    db.connection.query(dbSentence,addData,(er,res,feilds)=>{
        if(er) throw er;
        console('have been inserted.')
    })
}

exports.addDB = addData;