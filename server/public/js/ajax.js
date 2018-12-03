function ajax(url) {
    return new Promise(function (resolve, reject) {

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                resolve(xmlRequest.responseText);
            } else {
                reject(new Error("请求错误编号: " + xmlRequest.status));
            }
        };

        xmlRequest.open("GET", url);
        xmlRequest.send(null);
    });
}

