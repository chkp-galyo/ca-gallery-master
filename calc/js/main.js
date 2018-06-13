'use strict'
var gNum1 = null;
var gNum2 = null;
var screen = document.querySelector('th').innerText;
var calcBtnPressed = false;
var gRes = null;
var gOp = '';
var gMemoryNum = null;

function setOp(op){

    switch(op){
        case 'sum':
            gOp = 'sum';
            sumNum();
            break;
        case 'MC':
            gOp = 'MC';
            memoryClear();
            break;
        case 'MR':
            gOp = 'MR';
            memoryRecall();
            break;
        case 'MS':
            gOp = 'MS';
            memoryStore();
            break;
        case 'mAdd':
            gOp = 'mAdd';
            memoryAdd();
            break;   
        case 'C':
            gOp = 'C';
            clearScreen();
            break;     
        case 'CE':
            gOp = 'CE';
            clearAll();
            break;         
    }

    // if (op === 'sum'){
    //     gOp = 'sum';
    //     sumNum();
    // }
}

function memoryClear(){
    gMemoryNum = null;
    console.log('gmemory ', gMemoryNum);
}

function memoryStore(){
    gMemoryNum = screen;
    console.log('gmemory ', gMemoryNum);
}

function memoryRecall(){
    if (gMemoryNum !== null) gNum2 = gMemoryNum;
    console.log('num2', gNum2)
    // switch (gOp){
    //     case 'sum':
            gRes = +gNum1 + +gNum2;
            console.log('sum >', gRes);
            gNum1 = gRes;
            gNum2 = 0;
            document.querySelector('th').innerText = gRes;
    // }
}

function memoryAdd(){
    calcBtnPressed = true;
    gMemoryNum = +gMemoryNum + +screen;
    gRes = gMemoryNum;
    document.querySelector('th').innerText = gRes;
    refreshScreen()
    console.log('gmemory ', gMemoryNum);
}

function clearScreen(){
    document.querySelector('th').innerText = '';
    refreshScreen();
}

function clearAll(){
    document.querySelector('th').innerText = '';
    gNum1 = null;
    gNum2 = null;
    memoryClear()
    refreshScreen();
}


function addDigit(digit){
    if (calcBtnPressed) {
        document.querySelector('th').innerText = '';
        calcBtnPressed = false;
    } 
    if (gNum1 !== null) gNum2 = screen + digit;
    refreshScreen();
    console.log(digit)
    var print = document.querySelector('th').innerText += digit;
    refreshScreen();
    if (gOp === 'sum'){
        gRes = +gNum1 + +screen;
        console.log('digit changed, res is ', gRes);
    }
    return print;
}

function sumNum(){
    calcBtnPressed = true;
    if (gNum1 === null){
        gNum1 = screen;
        console.log('gnum1', gNum1, 'screen', screen);
    } else {
        gNum2 = screen;
        gRes = +gNum1 + +gNum2;
        console.log('sum >', gRes);
        gNum1 = gRes;
        gNum2 = 0;
        document.querySelector('th').innerText = gRes;
    }
    refreshScreen();
}

function prntRes(res) {
    document.querySelector('th').innerText = res;
    console.log('resss', gRes)
    refreshScreen();
    gNum1 = null;
    gNum2 = null;
}

function refreshScreen(){
    screen = document.querySelector('th').innerText;
}