// 存储棋盘
var board = new Array();
// 存储游戏分数
var score = 0;

// 页面加载完立即初始化游戏
$(document).ready(function() {
    newgame();
});

// 初始化游戏函数
function newgame () {
     // 初始化棋盘格
     init();
     // 再随机俩个格子的生成数字 
     generateOneNumber();
     generateOneNumber();
}

function init() {
    for(var i = 0; i < 4; i++) {

        board[i] = new Array();

        for(var j = 0; j < 4; j++) {

            board[i][j] = 0;

            var $gridCell = $("#grid-cell-"+i+"-"+j);
            $gridCell.css('top', getPosTop(i, j));
            $gridCell.css('left', getPosLeft(i, j));
        }
    }

    updateBoardView();
}

// 跟新视图函数
function updateBoardView () {

     $(".number-cell").remove();
     for(var i = 0; i < 4; i++) {

        for(var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+ i + '-' + j + '"></div>');
            var $numberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                $numberCell.css('width', '0px');
                $numberCell.css('height', '0px');
                $numberCell.css('top', getPosTop(i, j) + 50);
                $numberCell.css('left', getPosLeft(i, j) + 50); 
            } else {
                $numberCell.css('width', '100px');
                $numberCell.css('height', '100px');
                $numberCell.css('top', getPosTop(i,j));
                $numberCell.css('left', getPosLeft(i,j));
                $numberCell.css('background-color', getNumberBackgroundColor( board[i][j] ) );
                $numberCell.css('color', getNumberColor(board[i][j]));
                $numberCell.text(board[i][j]);
                
            }
        }

     }
}

function generateOneNumber () {
    if ( !havespace(board) ) {
        return false;
    }

    // 随机一个位置
    var randx = parseInt( Math.floor(Math.random() * 4) );
    var randy = parseInt( Math.floor(Math.random() * 4) );    

    // 判断位置是否可用
    while (true) { 
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机生成一个数字  2 || 4
    var randNumber = Math.random() < 0.7 ? 2 : 4;

    // 在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: // left
            if (moveLeft()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 38: // up
            if (moveUp()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 39: // right
            if (moveRight()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 40: // down
            if (moveDown()) {
                generateOneNumber();
                isgameover();
            }
            break;
        default:
            break;
    } 
});

function isgameover () {
     // body...  
}

function moveLeft () {

    // 首先判断是否可以向左移动
    if (!canMoveLeft(board)) {
        return false;
    } 

    // moveLeft
    for(let i = 0; i < 4; i++) {

        for(let j = 1; j < 4; j++) {
            if(board[i][j] != 0) {

                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } 
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }

            }
        }

    }

    setTimeout("updateBoardView()", 200);
    return true;
}


// 向右移动
function moveRight () {

    // 查询是否可以向右移动
    if (!canMoveRight(board)) {
        return false;
    }

    // 向右移动
    for(let i = 0; i < 4; i++) {
        for(let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for(let k = 3; k >j; k--) {

                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;    
}

function moveUp () {

    // 1. 查询是否可以向上移动
    if (!canMoveUp(board)) {
        console.log('不可以向上移动');
       return false; 
    }
    console.log("可以移动");
    // 2. 移动
    for(let i = 0; i < 4; i++) {
        for(let j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                for(let k = 0; k < j; k++) {
                    if (board[k][i] == 0 && noBlockVertical(i, k, j, board)) {
                        console.log('正在移动');
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue; 
                    }

                    if (board[k][i] == board[j][i] && noBlockVertical(i, k, j, board)) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;  
                        continue; 
                    }

                }
            }
        }
    }


    setTimeout("updateBoardView()", 200);
    return true;    
}

function moveDown () {

    // 1. 查询是否可以向下移动
    if (!canMoveDown(board)) {
        return false;
    }
    // 2. 移动
    for(let i = 0; i < 4; i++) {
        for(let j = 2; j >= 0; j--) {
            if (board[j][i] != 0) {
                for(let k = 3; k > j; k--) {
                    if (board[k][i] == 0 && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue; 
                    }
                    if (board[k][i] == board[j][i] && noBlockVertical(i, j, k, board)) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;  
                        continue; 
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
