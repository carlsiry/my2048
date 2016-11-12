function getPosTop (i, j) {
     return 20 + i*120; 
}

function getPosLeft (i, j) {
     return 20 + j*120; 
}

function getNumberBackgroundColor (number) {
     switch (number) {
        case 2:
            return "#eee4de";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return 'black';
}

function getNumberColor (number) {
     if (number <= 4) {
          return '#776e65';
      } 
      return 'white';
}

// 查询是否有空位置， 有
function havespace (board) {

     for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
     } 
     return false;
}


// 判断数字单元格是否可以向左移动
function canMoveLeft (board) {

    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveRight (board) {
     for(let i = 0; i < 4; i++) {
        for(let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
                    return true;
                }
            }
        }
     }

    return false;
}

function canMoveUp (board) {
     for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                if (board[j-1][i] == 0 || board[j-1][i] == board[j][i]) {
                    return true;
                }
            }
        }
     }

     return false;
}

function canMoveDown (board) {
     for(let i = 0; i < 4; i++) {
        for(let j = 2; j >= 0; j--) {
            if (board[j][i] != 0) {
                if (board[j+1][i] == 0 || board[j+1][i] ==board[j][i]) {
                    return true
                }
            }
        }
     } 

     return false;
}

// 检索是否有障碍物
function noBlockHorizontal (row, col1, col2, board) {
    for(let i = col1+1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical (col, row1, row2, board) {
    for(let i = row1+1; i < row2; i++) {
        if (board[i][col] != 0) {
            console.log("垂直方向 有 障碍");
            return false;
        }
    }

    console.log("垂直方向 没 障碍");
    return true;
}