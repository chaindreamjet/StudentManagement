var mysql = require('mysql')

exports.connection = mysql.createConnection({
    host: '47.106.250.185',
    port: '3306',
    user: 'root',
    password: 'liuqian77',
    database: 'bdcc'

})//.connect(//()=>{
    //console.log('conneced success')
//}
//);       

