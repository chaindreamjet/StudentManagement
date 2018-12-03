// index.js

class Student {
    constructor(sname = 'default', sgender = 'male', snum = '-1',
                sschool = '', smajor = '', sclass = '', stime = '2000-09-01') {
        this.sname = sname;
        this.sgender = sgender;
        this.snum = snum;
        this.sschool = sschool;
        this.smajor = smajor;
        this.sclass = sclass;
        this.stime = stime;
    }
}

function ajax1(method, url, data = '') {
    return new Promise(function (resolve, reject) {

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = function () {

            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlRequest.status === 200) {
                    resolve(xmlRequest.responseText);

                } else {
                    reject(new Error("请求错误编号: " + xmlRequest.status));
                }
            }
        };


        if (method === 'GET') {
            xmlRequest.open(method, url, false);
            xmlRequest.send(null);
        }
        if (method === 'POST') {
            xmlRequest.open(method, url, true);
            xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlRequest.send(data);

            console.log(data);
        }
    });
}

function serialize(form) {
    var
        parts = [],
        field = null,
        option,
        optValue;

    for (let i = 0, len = form.elements.length; i < len; ++ i) {
        field = form.elements[i];

        console.log(field.toString());
        switch (field) {

            case 'select':
                if (field.name.length) {
                    for (let j = 0, optLen = field.options.length; j < optLen; ++ j) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = '';
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ?
                                                option.value : option.text);
                            } else {
                                optValue = (options.attributes["value"].specified ?
                                                option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined:
            case 'file':
            case 'submit':
            case 'reset':
            case 'button':
                break;

            case 'fieldset':
                break;

            case 'radio':
                break;
            case 'checkbox':
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    if (field.type === 'radio') {
                        if (!field.checked) {
                            break;
                        }
                    }

                    parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
                }
        }
    }

    return parts.join('&');
}

function refresh(data) {

    var students = JSON.parse(data);

    for (let s of students) {
        let flag = false;
        globalStudents.forEach((ele) => {
            if (s.snum === ele.snum) {
                flag = true;
                return false;
            }
        });
        if (flag) {
            continue;
        } else {
            let stu = new Student(s.sname, s.sgender, s.snum, s.sschool, s.smajor, s.sclass, s.stime);
            globalStudents.push(stu);
        }
    }
}


window.addEventListener('load', function () {

    ajax1('GET', 'http://localhost:3000/students').then(function (data) {
        //console.log(data)
        refresh(data);

    }).catch(function (error) {
        console.log(error);
    });

});

function addStu(event) {
    event.preventDefault();
    var form = document.querySelector('#stuInfo');
    var enForm  = serialize(form);
    //console.log(typeof form)

    // ajax1('POST', 'http://localhost:3000/add_stu', enForm)
    //     .then(function (data) {
    //         ajax1('GET', 'http://localhost:3000/add_stu')
    //             .then(refresh(data))
    //             .catch(function (err) {
    //             console.log(err);
    //         });

    //     }).catch(function () {

    //         alert('添加失败');
    //     });

    
}

function add() {
    
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:3000/add_stu",
        data: $('#stuInfo').serialize(),
        success: (result) => {
            console.log('success');
            //refresh(result)
            window.location.replace("http://localhost:3000")
        },
        error: () => {
            console.log('err');
        }
    })
    
}
var data_del;
function update_data(data){
    data_del=data;
}
function changestu(){
    var data_init = $('#modifyStu').serialize()+"&searchnum="+$('#delete_num').text();
    console.log(data_init)
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:3000/change_stu",
        data:  data_init,
        success: (result) => {
            console.log('success');
            //refresh(result)
           window.location.replace("http://localhost:3000")
        },
        error: () => {
            console.log('err');
        }
    })
    
}
function removestu(){
    var data_0 = $('delete_num').text()
    var data_1;
    for(var key in data_0){
        data_1=key;
    }
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://localhost:3000/delete_stu",
        data: $('#delete_num').text(),
        success: (result) => {
            console.log('success');
            //refresh(result)
            window.location.replace("http://localhost:3000")
        },
        error: () => {
            console.log('err');
        }
    })
    
}
var globalStudents = [];

var stuList = new Vue({
    el: '#stu-list',
    data: {
        students: globalStudents
    },
    methods: {
        modifyStu: function (index) {
            ajax1('PUT', '/')
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        removeStu: function (index) {
            ajax1('GET', 'http://localhost:3000/delete_stu')
                .then(function (data) {
                    console.log(data);
                    refresh(data)
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
})