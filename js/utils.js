//createBoard function with random objects in the cells

// function createBoard() {
//     var board = [];
//     for (var i = 0; i < 8; i++) {
//         board.push([])
//         for (var j = 0; j < 8; j++) {
//             board[i][j] = (Math.random() > 0.5) ? LIFE : ''
//         }
//     }
//     return board;
// }

// function renderBoard(board) {
//     var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < board[0].length; j++) {
//             // var className = (board[i][j]) ? 'occupied' : '';
//             strHTML += `<td data-i="${i}" data-j="${j}"
//             onclick="cellClicked(this , ${i} , ${j})">
//              ${board[i][j]}</td>`
//         }
//         strHTML += '</tr>';
//     }
//     // console.log('strHTML', strHTML)
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = strHTML
// }


// function countNeighbors(cellI, cellJ, mat) {
//     var neighborsCount = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= mat[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
//             // if (mat[i][j]) neighborsCount++;
//         }
//     }
//     return neighborsCount;
// }

// function init() {
//     console.log('hello')
//     gBoard = buildBoard()
//     createPacman(gBoard);
//     createGhosts(gBoard);
//     printMat(gBoard, '.board-container');
//     gGame.isOn = true;
// }



// function getRandomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }