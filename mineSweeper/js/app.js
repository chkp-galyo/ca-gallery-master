'use strict'

var gSize = 4;
var gBoard = buildBoard(gSize);
var gBOMB = '💣';
var gFlag = '🚩';
var gDEAD = '💩';
var gWON = '😎';
var gNumOfBombs = 2;
var gGameOver = false;
var gMarked = 0;
var cellsOpend = 0;
var gTime = 0;
var gameTimeStart;
var startGame = false;
var gBestScoreBeginer = 0;
var gBestScoreMedium = 0;
var gBestScoreExpert = 0;


function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        var rows = [];
        for (var j = 0; j < size; j++) {
            rows[j] = { pos: { i, j }, bomb: false, neighborBombCount: 0, isOpen: false };
        }
        board[i] = rows;
    }
    console.table(board);
    return board;
}

function initGame(size) {
    renderBoard(gBoard);
    document.oncontextmenu = function () {
        return false;
    }
}

function renderBoard(board) {
    var gameBoard = document.querySelector('.game-board');
    var strHTML = `<tr><td class="timer">0</td> <td colspan="${gSize - 2}" class="smile">😊</td><td class="score">99</td></tr>`;
    document.querySelector('.best-score').innerHTML = '';
    for (var i = 0; i < gSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gSize; j++) {
            var id = i.toString() + j.toString();
            strHTML += `<td class="cell-${i}-${j}"><button class="btn-${i}-${j}" onmousedown="cellClicked(this, ${i}, ${j}, event)"></button></td>`;
        }
        strHTML += '</tr>';
    }
    gameBoard.innerHTML = strHTML;

    switch (gSize) {
        case 4:
            if (gBestScoreBeginer > 0) document.querySelector('.best-score').innerHTML = 'Best score for this level is: ' + gBestScoreBeginer;
            break;
        case 6:
            if (gBestScoreMedium > 0) document.querySelector('.best-score').innerHTML = 'Best score for this level is: ' + gBestScoreMedium;
            break;
        case 8:
            if (gBestScoreExpert > 0) document.querySelector('.best-score').innerHTML = 'Best score for this level is: ' + gBestScoreExpert;
            break;
    }

}


function rndBombPos(size, firstCell) {
    // debugger;
    switch (size) {
        case 4: gNumOfBombs = 2;
            break;

        case 6: gNumOfBombs = 5;
            break;

        case 8: gNumOfBombs = 15;
    }
    for (var cellIdx = 0; cellIdx < gNumOfBombs; cellIdx++) {
        var i = Math.floor(Math.random() * (size - 1) + 1);
        var j = Math.floor(Math.random() * (size - 1) + 1);
        if (i === firstCell.i && j === firstCell.j){
            cellIdx = cellIdx - 1;
            continue;
        }
        if (!gBoard[i][j].bomb) {
            var currCell = document.querySelector(`.cell-${i}-${j}`);
            gBoard[i][j].bomb = true;
            currCell.classList.add('bomb');
            for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
                for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
                    if (iIdx >= 0 && iIdx < size && jIdx >= 0 && jIdx < size) {
                        var currCell = document.querySelector(`.cell-${iIdx}-${jIdx}`);
                        gBoard[iIdx][jIdx].neighborBombCount++;
                    }
                }
            }
        } else {
            cellIdx = cellIdx - 1;
            continue;
        }
    }
}


function cellClicked(elCell, i, j, event) {
    if (gGameOver) return;
    if (!startGame) {
        var firstClickedCell = {i: i, j: j};
        rndBombPos(gSize, firstClickedCell); // set places of bombs if this is the first click
        gameTimeStart = setInterval(printTime, 1000);
        startGame = true;
    }
    // debugger;
    var currBtn = document.querySelector(`.btn-${i}-${j}`);
    if (event.button === 2) {
        if (cellMarked(currBtn)) return;
        checkGameOver();
    } else {
        if (currBtn.classList.contains('marked')) return;
        if (checkCellForBomb(i, j)) return;
        currBtn.classList.add('hidden');
        document.querySelector(`.cell-${i}-${j}`).classList.add('open');
        if (gBoard[i][j].neighborBombCount > 0) {
            var clickedCell = document.querySelector(`.cell-${i}-${j}`);
            clickedCell.innerText = gBoard[i][j].neighborBombCount;
            checkGameOver();
            return;
        }
        for (var iIdx = i - 2; iIdx <= i + 2; iIdx++) {
            for (var jIdx = j - 2; jIdx <= j + 2; jIdx++) {
                var currCell = document.querySelector(`.cell-${iIdx}-${jIdx}`);
                var currNeighborBtn = document.querySelector(`.btn-${iIdx}-${jIdx}`);
                if (iIdx >= 0 && iIdx <= gBoard.length - 1 && jIdx >= 0 && jIdx <= gBoard.length - 1) {
                    if (currNeighborBtn !== null && gBoard[iIdx][jIdx].bomb === false && !currNeighborBtn.classList.contains('marked')) {
                        currNeighborBtn.classList.add('hidden');
                        currCell.classList.add('open');
                        if (gBoard[iIdx][jIdx].neighborBombCount > 0) {
                            currCell.innerHTML = gBoard[iIdx][jIdx].neighborBombCount;
                        }
                        elCell.innerHTML = gBoard[i][j].neighborBombCount;
                    }
                }
            }
        }
        checkGameOver();
    }
}

function checkCellForBomb(i, j) {
    var currCell = document.querySelector(`.cell-${i}-${j}`);
    var currBtn = document.querySelector(`.btn-${i}-${j}`);

    if (gBoard[i][j].bomb) {
        currCell.innerHTML = gBOMB;
        currBtn.classList.add('.hidden');
        document.querySelector('.smile').innerHTML = gDEAD;
        document.querySelector('.restart').classList.remove('hidden');
        clearInterval(gameTimeStart);
        gGameOver = true;
        return true;
    }
    return false;
}


function cellMarked(currBtn) {
    if (currBtn.classList.contains('marked')) {
        currBtn.classList.remove('marked');
        currBtn.innerHTML = '';
        gMarked--;
        return true;
    } else {
        gMarked++;
        currBtn.classList.add('marked');
        currBtn.innerHTML = gFlag;
        return false;
    }
}

function checkGameOver() {
    cellsOpend = document.querySelectorAll('.open');

    if (gMarked === gNumOfBombs && cellsOpend.length === gSize * gSize - gNumOfBombs) {
        gGameOver = true;
        clearInterval(gameTimeStart);
        document.querySelector('.restart').classList.remove('hidden');
        document.querySelector('.score').innerHTML = 99 - gTime;
        document.querySelector('.smile').innerHTML = gWON;
        var currScore = document.querySelector('.score').innerHTML;

        switch (gSize) {
            case 4:
                if (currScore > gBestScoreBeginer) {
                    gBestScoreBeginer = currScore;
                    document.querySelector('.best-score').innerHTML = 'A new high score! ' + gBestScoreBeginer;
                }
                break;
            case 6:
                if (currScore > gBestScoreMedium) {
                    gBestScoreMedium = currScore;
                    document.querySelector('.best-score').innerHTML = 'A new high score! ' + gBestScoreMedium;
                }
                break;
            case 8:
                if (currScore > gBestScoreExpert) {
                    gBestScoreExpert = currScore;
                    document.querySelector('.best-score').innerHTML = 'A new high score! ' + gBestScoreExpert;
                }
                break;
        }


    }
}

function restart(size) {
    gGameOver = false;
    startGame = false;
    gSize = size;
    gBoard = buildBoard(size)
    renderBoard(gBoard)
    clearInterval(gameTimeStart);
    gTime = 0;
    document.querySelector('.restart').classList.add('hidden');
    document.querySelector('.score').innerHTML = '99';
    gMarked = 0;
}

function printTime() {
    var timer = document.querySelector('.timer');
    gTime++;
    timer.innerText = gTime;
}




