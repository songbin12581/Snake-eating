var game = new Game();
game.timer = null;
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();

    createFood();

    //键盘事件，控制蛇的走向
    document.onkeydown = function (ev) {
        // console.log(ev.key);
        if (ev.key == 'a' && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        }else if (ev.key == 'w' && snake.direction != directionNum.bottom) {
            snake.direction = directionNum.top;
        }else if (ev.key == 'd' && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        }else if (ev.key == 's' && snake.direction != directionNum.top) {
            snake.direction = directionNum.bottom;
        }
    }

    var btn = document.getElementById('btn');
    btn.onclick = function () {
        game.start();
    }
}

game.init();

game.start = function () {
    this.timer = setInterval(function () {
        snake.getCollideSquare();
    }, intervalTime);
}

game.over = function () {
    clearInterval(this.timer);
    alert(`您共获得了${this.score}分，再接再厉哦！`);
}

function createFood() {
    var x = null;
    var y = null;

    var flag = true;
    while (flag) {
        //食物不能出现在围墙身上
        /* 1 - 28
        1 - 28 */
        x = Math.floor(Math.random() * 27 + 1);
        y = Math.floor(Math.random() * 27 + 1);

        var ok = true;    //停止for循环
        for (var node = snake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                //这个条件成立说明生成的坐标在蛇的身上
                ok = false;
                break;
            }
        }

        if (ok) {
            flag = false;
        }
    }

    //创建食物
    var food = SquareFactory.create('Food', x, y, 'red');
    ground.remove(food.x, food.y);
    ground.append(food);
}

