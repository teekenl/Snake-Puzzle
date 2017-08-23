var snake_x=snake_y=10,
    grid_size=tc=20,
    apple_x=apple_y=15,
    x_move=y_move=0,
    trail=[],
    tail=5,
    canv, ctx;

window.onload = function(){
    canv = document.getElementById('gc');
    ctx = canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game, 2000/15);
};

// Start a game
function game(){
    snake_x+=x_move;
    snake_y+=y_move;

    // Snake shows up on other side if it moves beyond the wall.
    if(snake_x<0) {
        snake_x = tc-1;
    }
    if(snake_x>tc-1){
        snake_x = 0;
    }
    if(snake_y>tc-1){
        snake_y = 0;
    }
    if(snake_y<0) {
        snake_y = tc-1;
    }

    // Draw a gaming area.
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);


    // Draw a snake.
    ctx.fillStyle="lime";
    for(var i = 0; i<trail.length;i++) {
        ctx.fillRect(trail[i].x*grid_size,trail[i].y*grid_size,grid_size-2,grid_size-2);
        if(trail[i].x===snake_x && trail[i].y===snake_y){
            tail = 5;
        }
    }

    // Eliminate the extra part of snake.
    trail.push({x:snake_x,y:snake_y});
    while(trail.length>tail) {
        trail.shift();
    }

    // Lengthen the snake if it hits apple.
    if(apple_x===snake_x && apple_y===snake_y) {
        tail++;
        apple_x = Math.floor(Math.random()*tc);
        apple_y = Math.floor(Math.random()*tc);
    }

    ctx.fillStyle="red";
    ctx.fillRect(apple_x*grid_size,apple_y*grid_size,grid_size-2,grid_size-2);
}

// Keydown event handler
function keyPush(e) {
    switch (e.keyCode) {
        case 37:
            x_move -= 1;
            y_move = 0;
            break;
        case 38:
            x_move = 0;
            y_move -= 1;
            break;
        case 39:
            x_move = 1;
            y_move = 0;
            break;
        case 40:
            x_move = 0;
            y_move = 1;
            break;
    }
}