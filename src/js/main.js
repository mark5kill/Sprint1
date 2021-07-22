'use strict'
const MINE = '🎇';
const FLAG = '📍';
const EMPTY = '';

var boardEl = document.querySelector('.board');

// GLOBALS
var gBoard = null;
// SET as default level;
var gLevel = {
    SIZE: 5,
    MINES: 4
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    gFirstClick: true
}
var gLives = 3;
var gFlags = gLevel.MINES;
// Functions
function initGame() {
    buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    gBoard = [];
    /***
     *  @phase_1 build cell entitites in board
     */

    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = row[j];
            cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                i,
                j
            }
            row.push(cell);
        }
        gBoard.push(row);
    }


}
function chooseLevel(elLevelBtn) {
    var elLevels = document.querySelectorAll('.level');

    for (var i = 0; i < elLevels.length; i++) {
    }
    switch (elLevelBtn.innerText) {
        case 'Easy':
            gLevel.SIZE = 4;
            break;
        case 'Medium':
            gLevel.SIZE = 8;
            break;
        case 'Hard':
            gLevel.SIZE = 12;
            break;
    }
}

/**
 * Count mines around each cell
 * and set the cell's minesAroundCount
 * @param {*} board 
 */
function setMinesNegsCount(board) {

    for (var i = 0; i < board[0].length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var minesAroundCount = findAdjacentCells(cell)
            for (var n = 0; n < minesAroundCount.length; n++) {
                var nearByCell = minesAroundCount[n];
                if (nearByCell.isMine) {
                    cell.minesAroundCount++
                }
            }
        }
    }
}

// onclick (left click)
function cellClicked(e, elCell, i, j) {
    e.preventDefault()
    if (gGame.gFirstClick) {
        console.log('first click!')
        gGame.gFirstClick = false;
        addMines(i, j)
        setMinesNegsCount(gBoard)
    }

    console.log({ elCell, i, j })

    elCell.classList.remove('main-border')
    elCell.classList.add('main-border-inverted')

    var cell = gBoard[i][j]

    if (cell.isMine) {
        console.log(elCell)
        elCell.innerText = MINE;
        updateLives();
    }
    else if (cell.minesAroundCount !== 0) {
        elCell.innerHTML = cell.minesAroundCount;

    } else {
        elCell.innerHTML = EMPTY;
        openEmptyCells(elCell);
    }
    cell.isShown = true;
}
function openEmptyCells(cell) {
    var cellsAround = findAdjacentCells(cell)
    for (var i = 0; i < cellsAround.length; i++) {
        if (cellsAround[i].isMine) continue;
        cellsAround[i].isShown = true;

    }
    console.table(gBoard);
    return cellsAround;
}
// on contextmenu (right click)
function cellMarked(e, elCell, i, j) {
    e.preventDefault()

    var cell = gBoard[i][j]
    if (cell.isShown) return

    cell.isMarked = !cell.isMarked

    if (cell.isMarked) {
        gFlags -= 1;
        elCell.innerHTML = FLAG;
    } else {
        elCell.innerHTML = EMPTY;
        gFlags += 1;
    }

    console.log('flags amount:', gFlags);
}
//Updates lives left, ending game when no life remains.
function updateLives() {
    gLives--;
    if (gLives === 2) {
        var elLives = document.querySelector('.lives-left')
        elLives.innerText = '💙💙';
        console.log('Lives remaining:', gLives);
    }
    if (gLives === 1) {
        var elLives = document.querySelector('.lives-left')
        elLives.innerText = '💙';
        console.log('Lives remaining:', gLives);
    }
    if (gLives === 0) {
        showMines(gBoard);
        var elLives = document.querySelector('.lives-left')
        elLives.innerText = '';
        var elEmoji = document.querySelector('.game-button')
        elEmoji.innerText = '😫'
        var elH1 = document.querySelector('h1')
        elH1.innerText = 'GAME OVER!'
        checkGameOver();
    }
}
//Show all mines in board* Render is needed
function showMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) {
                board[i][j].isShown = true;
                board[i][j].innerText = MINE;

            }

        }
    }
    console.log('updated board', board);
    return board;
}
function checkGameOver() {

}

/**
 * When user clicks a cell with no mines around, we need to open
 * not only that cell, but also its neighbors. 
 * @param {*} board 
 * @param {*} elCell 
 * @param {*} i 
 * @param {*} j 
 */


function addMines(cellI, cellJ) {
    var minesToAdd = 0;

    while (minesToAdd < gLevel.MINES) {
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {
                var cell = gBoard[i][j];
                if (cell.i === cellI && cell.j === cellJ) continue
                var random = Math.random() < (1 / (gLevel.SIZE * gLevel.SIZE))
                if (random) {
                    cell.isMine = true;
                    minesToAdd++
                    if (minesToAdd === gLevel.MINES) {
                        return
                    }
                }
            }
        }
    }

}

function findAdjacentCells(cell) {
    var cellsAround = [];
    var cellI = cell.i;
    var cellJ = cell.j;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;//checks top border
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;//checks itself
            if (j < 0 || j > gBoard[0].length - 1) continue;//checks bottom border
            cellsAround.push(gBoard[i][j]);
        }
    }

    return cellsAround;
}
