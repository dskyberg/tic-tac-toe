
export function printFormattedBoard(board) {
    let formattedString = '';
    board.forEach((cell, index) => {
        formattedString += cell ? ` ${cell} |` : '   |';
        if ((index + 1) % 3 === 0) {
            formattedString = formattedString.slice(0, -1);
            if (index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
        }
    });
    console.log('%c' + formattedString, 'color: #6d4e42;font-size:16px');
}

export function isEmpty(board) {
    return board.every(cell => !cell);
}
export function isFull(board) {
    return board.every(cell => cell);
}

export function isTerminal(board) {
    //Return False if board in empty
    if (isEmpty(board)) return false;
    //Checking Horizontal Wins
    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
        return { 'winner': board[0], 'direction': 'H', 'row': 0, cells: [0, 1, 2] };
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
        return { 'winner': board[3], 'direction': 'H', 'row': 1, cells: [3, 4, 5] };
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
        return { 'winner': board[6], 'direction': 'H', 'row': 2, cells: [6, 7, 8] };
    }
    //Checking Vertical Wins
    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
        return { 'winner': board[0], 'direction': 'V', 'row': 0, cells: [0, 3, 6] };
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
        return { 'winner': board[1], 'direction': 'V', 'row': 1, cells: [1, 4, 7] };
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
        return { 'winner': board[2], 'direction': 'V', 'row': 2, cells: [2, 5, 8] };
    }
    //Checking Diagonal Wins
    if (board[0] === board[4] && board[0] === board[8] && board[0]) {
        return { 'winner': board[0], 'direction': 'D', 'row': 0, cells: [0, 4, 8] };
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2]) {
        return { 'winner': board[2], 'direction': 'D', 'row': 2, cells: [2, 4, 6] };
    }
    //If no winner but the board is full, then it's a draw
    if (isFull(board)) {
        return { 'winner': 'draw' };
    }

    //return false otherwise
    return false;
}

export function insert(board, symbol, position) {
    if (position > 8 || board[position]) return false; //Cell is either occupied or does not exist
    board[position] = symbol;
    return true;
}

export function getAvailableMoves(board) {
    const moves = [];
    board.forEach((cell, index) => {
        if (!cell) moves.push(index);
    });
    return moves;
}