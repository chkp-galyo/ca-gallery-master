'use strict'

var projs = returnGprojs();

function init() {
    createProjs();
    clearForm();
}


function createProjs() {
    createProj('mineSweeper', 'Mine sweeper', 'This is a mine sweeper game',
     'This is probably the best MineSweeper game in the world! Come enjoy an amazing and most exciting experience, running through fileds with countless mines trying to blow you up! Think you are up to it?!', ['game', 'mineSweeper']);
    createProj('calc', 'Calculator', 'An exciting calculator',
     'Are you tierd of breaking your brain over complicated calculations? This is exactly why I have created this amazing tool to help you solve all of your problems! Just let my calculator do all the hard math for you, and keep your mind busy on the important things!', ['math', 'calculator']);
    renderProjs();
}




function renderProjs() {
    var strHtml = '';
    for (var i = 0; i < projs.length; i++) {
        strHtml += `       
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="renderModal('${projs[i].id}')">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid img-proj" src="img/portfolio/${projs[i].id}.jpg" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${projs[i].name}</h4>
        <p class="text-muted">${projs[i].title}</p>
        </div>
        </div>`;
    }

    $('.projs').html(strHtml);
}

function filterById(projId) {
    var currProj = projs.filter(function (proj) {
        return proj.id === projId;
    })
    return currProj;
}

function renderModal(projId) {
    // debugger
    var currProj = filterById(projId);
    console.log(currProj)
    $('.modal-header').html(currProj[0].name);
    $('.item-intro').html(currProj[0].title);
    $('.img-modal').html(`<img class="img-fluid d-block mx-auto" src="img/portfolio/${currProj[0].id}.jpg">`);
    $('.modal-desc').html(currProj[0].desc);
    $('.modal-href').html(`<a target="_blank" href="${currProj[0].url}">Go to this project!</a>`);
    $('.modal-date').html('Date published: ' + currProj[0].publishedAt);
    $('.modal-lables').html(`<span class="badge badge-info">${currProj[0].labels[0]}</span>  <span class="badge badge-info">${currProj[0].labels[1]}</span>`)
}


function getDate() {
    return Date();
}

function sendEmail(){
    var sbj = $('.msg-sbj').val();
    var msg = $('.msg-body').val();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=galyogev5@gmail.com&su=${sbj}&body=${msg}`, '_blank');
}

function clearForm(){
    $('.msg-email').val('');
    $('.msg-sbj').val('');
    $('.msg-body').val('');
}