'use strict'

var gProjs = [];


function createProj(id, name, title, desc, labels) {
    gProjs.push({
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: `./${id}/index.html`,
        publishedAt: getDate(),
        labels: labels
    })
}

function returnGprojs(){
    return gProjs;
}