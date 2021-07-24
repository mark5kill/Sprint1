'use strict'
const MINE = '🎇';
const FLAG = '📍';
const EMPTY = '';

var boardEl = document.querySelector('.board');

// GLOBALS
var gMarkedMines = 0;
var gMinesClicked = 0;
var gBoard = null;
// SET as default level;
var gLevel = {
    SIZE: 5,
    MINES: 4
};
var gScore = 0;
var gGame;
var gLives;
var gFlags;
// Functions
function initGame() {
    buildBoard()
    renderBoard(gBoard)
    gLives = 3;
    gFlags = gLevel.MINES;
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        gFirstClick: true
    }

    var elScore = document.querySelector('span');
    elScore.innerHTML = gGame.shownCount;
    var elH1 = document.querySelector('h1')
    elH1.innerText = 'Lives Left!'
    var elLives = document.querySelector('.lives-left')
    elLives.innerText = '💙💙💙';
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
        gGame.isOn = true;
        console.log(gGame);
        gGame.gFirstClick = false;
        addMines(i, j)
        setMinesNegsCount(gBoard)
    }

    // console.log({ elCell, i, j })


    var cell = gBoard[i][j]
    while (cell.isShown !== true && gGame.isOn === true) {
        elCell.classList.remove('main-border')
        elCell.classList.add('main-border-inverted')


        if (cell.isMine) {
            // console.log(elCell)
            elCell.innerText = MINE;
            gMinesClicked++;
            updateLives();
        }
        else if (cell.minesAroundCount !== 0) {
            elCell.innerHTML = cell.minesAroundCount;
            // updateScore();

        } else {
            elCell.innerHTML = EMPTY;
            openEmptyCells(cell);
            // updateScore();

        }
        // console.log('Mines clicked', gMinesClicked)

        cell.isShown = true;
        updateScore();
        checkGameWon(gBoard[i][j]);

    }

}
function openEmptyCells(cell) {
    var cellsAround = findAdjacentCells(cell)
    for (var i = 0; i < cellsAround.length; i++) {
        if (cellsAround[i].isMine || cellsAround[i].isShown) continue;
        cellsAround[i].isShown = true;
        var elCell = document.querySelector(`[data-i="${cellsAround[i].i}"][data-j="${cellsAround[i].j}"]`);
        elCell.classList.remove('main-border')
        elCell.classList.add('main-border-inverted')
        if (cellsAround[i].minesAroundCount !== 0) {
            elCell.innerHTML = cellsAround[i].minesAroundCount;

        } else {
            elCell.innerHTML = EMPTY;
        }
    }
    console.log(cellsAround);


}
// on contextmenu (right click)
function cellMarked(e, elCell, i, j) {
    e.preventDefault()

    var cell = gBoard[i][j]
    if (cell.isShown) return

    cell.isMarked = !cell.isMarked



    if (cell.isMarked) {
        gFlags -= 1;
        gGame.markedCount++;
        elCell.innerHTML = FLAG;
    } else {
        elCell.innerHTML = EMPTY;
        gGame.markedCount--;
        gFlags += 1;
    }

    console.log('flags amount:', gFlags, 'marked flags amount', gGame.markedCount);
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
                var elCell = document.querySelector(`[data-i="${board[i][j].i}"][data-j="${board[i][j].j}"]`);
                elCell.classList.remove('main-border')
                elCell.classList.add('main-border-inverted')
                board[i][j].isShown = true;
                elCell.innerHTML= MINE;

            }

        }
    }
    console.log('updated board', board);
    return board;
}
function checkGameOver() {
    showMines(gBoard);
    if (gLives === 0) {
        gGame.isOn = false;
    }
}
function checkGameWon(cell) {
    if (cell.innerText === '📍' && cell.isMine === true) {
        gMarkedMines++
        console.log('Marked mines counter', gMarkedMines);
        if (gMarkedMines == gLevel.MINES - gMinesClicked) {
            var elEmoji = document.querySelector('.game-button')
            elEmoji.innerText = '😎'
            var elH1 = document.querySelector('h1')
            elH1.innerText = 'GG YOU HAVE WON!'
            gGame.isOn = false;
        }
    }
}
/**
 * When user clicks a cell with no mines around, we need to open
 * not only that cell, but also its neighbors. 
 * @param {*} board 
 * @param {*} elCell 
 * @param {*} i 
 * @param {*} j 
 */

// function checkGameWon(){
//     var cell = gBoard[i][j];
//     var minesMarkedCounter = 0;
//     if (cell.isMarked === true && cell.isMine === true) {
//         minesMarkedCounter++
//         if (minesMarkedCounter == gLevel.MINES - gMinesClicked) {
//             console.log('Marked mines counter', minesMarkedCounter);
//             var elEmoji = document.querySelector('.game-button')
//             elEmoji.innerText = '😎'
//             var elH1 = document.querySelector('h1')
//             elH1.innerText = 'GG YOU HAVE WON!'
//             gGame.isOn = false;
//         }
//     }
// }
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
function updateScore() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine === true) continue
            if (gBoard[i][j].isShown === true) {
                count++;
            }
        }
    } gGame.shownCount = count;
    var elScore = document.querySelector('span');
    elScore.innerHTML = gGame.shownCount;
    console.log('Score count:', gGame.shownCount);
}
function chooseLevel(elLevelBtn) {
    var elLevels = document.querySelectorAll('.levels div');
    for (var i = 0; i < elLevels.length; i++) {
    }
    switch (elLevelBtn.innerText) {
        case 'Easy':
            gLevel.SIZE = 5;
            gLevel.MINES = 4;



            break;
        case 'Medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;

            break;
        case 'Hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;


            break;
    }
    initGame();
}
function restartGame(elBtn) {
    if (elBtn.innerHTML = '🙂') {

        initGame();
        // gGame.isOn=true;
    }
}