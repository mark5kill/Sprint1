'use strict'

const MINE = '🎇';
const FLAG = '📍';
const EMPTY = '';
var gLives = 3;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
}


function init() {
    console.log('hello')
    gLevel.SIZE = createBoard();
    console.log('GAME BOARD:', gLevel.SIZE);
    // renderBoard(gBoard);
}

// Creates the board with chosen size 

function createBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: EMPTY,
                isShown: true,
                isMine: true,
                isMarked: false
            };
            board[i][j].minesAroundCount = getMinesCountNearCell(i, j);
            
        }
    }
    return board;
}

function getMinesCountNearCell(celI, celJ) {
    var mineCounter = 0;
    for (var i = celI - 1; i <= celI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue;
        for (var j = celJ - 1; j <= celJ + 1; j++) {
            if (j < 0 || j >= gLevel.SIZE) continue;
            if (i === celI && j === celJ) continue;
            if (gLevel.SIZE[i][j].isMine) counter++;
        }
    }
    
    return mineCounter;
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


function renderBoard() {
    var strHTML = '';

    for (var i = 0; i < gLevel.size; i++) {
        strHTML += "\n<tr>";
        for (var j = 0; j < gLevel.size; j++) {
            var className = `cell cell-${i}-${j}`;
            strHTML += `\t<td onclick="cellClicked(this)" class="${className}">${currCell}</td>\n`;
        }
        strHTML += "</tr>\n";
    }

    var elContainer = document.querySelector(".board");
    elContainer.innerHTML = strHTML;
}
// }
// function renderBoard(board) {
    //     var strHTML = '<>';
    //     for (var i = 0; i < board.length; i++) {
        //         strHTML += '<tr>';
        //         for (var j = 0; j < board.length; j++) {
            //             var cell = board[i][j];
            //             var className = 'cell cell' + i + '-' + j;
            //             strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
            //         }
            //         strHTML += '</tr>'
            //     }
            //     strHTML += '</tbody></table>';
            //     var elContainer = document.querySelector(selector);
            //     elContainer.innerHTML = strHTML;
            
            // }
            
            // function getCells(board){
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board.length; j++) {
//             board[i][j] = setMinesNegsCount(i,j,gBoard);
//             if (board[i][j].type === MINE) return
//             if (board[i][j] === 0)
//                 board[i][j] = { isShown: false, type: empty };
//             if (board[i][j] > 0)
//                 board[i][j] = { isShown: true, type: 'withNabors', minesAroundCount: board[i][j] };
//         }

//     }
//     return board
// }

// function setMinesNegsCount(cellI, cellJ, board) {

//     var minesCount = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= board.length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (board[i][j] === MINE); {
//                 minesCount++;

//             }
//         }
//         // if (mat[i][j]) neighborsCount++;
//     }
//     console.log('mines', minesCount);
//     return minesCount;
// }


// function renderBoard(board) {
//     var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < board.length; j++) {
//             var cell = board[i][j];
//             var className = 'cell cell' + i + '-' + j;
//             strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;

// }

// function renderBoard(gSize) {
//     var strHTML = '';
//     for (var i = 0; i < gSize; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < gSize; j++) {
//             strHTML = `<td data-i="${i}" data-j="${j}"></td>`
//         }
//         strHTML += '</tr>'
//     }
//     console.log('str', strHTML);
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = strHTML;

// }

// var board = []
// var minePosition = getMinePosition(boardSize, numOfMines)
// for (var i = 0; i < boardSize; i++) {
//     board.push([]);
//     for (var j = 0; j < boardSize; j++) {

//     }

// }