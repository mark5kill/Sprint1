function renderBoard(board) {
    var strHTML = ''
    for (let i = 0; i < board[0].length; i++) {
        var row = board[i];
        strHTML += '<tr>'
        for (let j = 0; j < row.length; j++) {
            var value = ''
            if (board[i][j].isShown) {
                if (board[i][j].isMine) {
                    value = MINE;

                }
                else if (board[i][j].cell.minesAroundCount !== 0) {
                    value = board[i][j].minesAroundCount;
                }
                else value = EMPTY;
            }
            strHTML += '<td class="cell main-border"' +
                'oncontextmenu="cellMarked(event,this,' + i + ',' + j + ')"' +
                'onclick="cellClicked(event,this,' + i + ',' + j + ')" data-i="' + i + '" data-j="' + j + '" >' + value + '</td>'
        }
        strHTML += '</tr>'
    }

    boardEl.innerHTML = strHTML
}
// function renderBoard(board) {
//     var strHTML = ''
//     for (let i = 0; i < board[0].length; i++) {
//         var row = board[i];
//         strHTML += '<div>'
//         for (let j = 0; j < row.length; j++) {
//             strHTML += '<div class="cell main-border"' +
//                 'oncontextmenu="cellMarked(event,this' + ',' + i + ',' + j + ')"' +
//                 'onclick="cellClicked(event,this' + ',' + i + ',' + j + ')" data-i="' + i + '" data-j="' + j + '" ></div>'
//         }
//         strHTML += '</div>'
//     }

//     boardEl.innerHTML = strHTML
// }