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

var addData = (dbSentence)=>{
  return new Promise((resolve,reject)=>{
    db.connection.query(dbSentence,(er,res,feilds)=>{
        if(er)  reject(er);
        resolve(res);
        //console('have been inserted.')
    })
  })
}

exports.addDB = addData;