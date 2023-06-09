///////////////////////////////
//Graphics Part
///////////////////////////////
var gl;
var canvas;

var program;
var x = 0.0;
var y = 0.0;
var vBuffer;
var cBuffer;
var vPosition;
var vColor;
var playerBuffer;

var vertices=[
    vec2(  0.9, 0.9),
	vec2( -0.9, 0.9),
	vec2( -0.9,-0.9),
    vec2(  0.9, 0.9),
    vec2( -0.9,-0.9),
    vec2(  0.9,-0.9),

    vec2( -0.1, 0.7),
    vec2( -0.7, 0.7),
    vec2( -0.7, 0.4),
    vec2( -0.1, 0.7),
    vec2( -0.7, 0.4),
    vec2( -0.1, 0.4),

    vec2(  0.7, 0.7),
    vec2(  0.1, 0.7),
    vec2(  0.1, 0.4),
    vec2(  0.7, 0.7),
    vec2(  0.1, 0.4),
    vec2(  0.7, 0.4),

    vec2( -0.5, 0.2),
    vec2( -0.7, 0.2),
    vec2( -0.7,-0.2),
    vec2( -0.5, 0.2),
    vec2( -0.7,-0.2),
    vec2( -0.5,-0.2),

    vec2(  0.7, 0.2),
    vec2(  0.5, 0.2),
    vec2(  0.5,-0.2),
    vec2(  0.7, 0.2),
    vec2(  0.5,-0.2),
    vec2(  0.7,-0.2),

    vec2( -0.1,-0.4),
    vec2( -0.7,-0.4),
    vec2( -0.7,-0.7),
    vec2( -0.1,-0.4),
    vec2( -0.7,-0.7),
    vec2( -0.1,-0.7),

    vec2(  0.7,-0.4),
    vec2(  0.1,-0.4),
    vec2(  0.1,-0.7),
    vec2(  0.7,-0.4),
    vec2(  0.1,-0.7),
    vec2(  0.7,-0.7),

    vec2( -0.1, 0.2),
    vec2( -0.1,-0.2),
    vec2(  0.1,-0.2),
    vec2(  0.1, 0.2),
    vec2( -0.1, 0.2)
];

var colors=[
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),

    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),

    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),

    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),

    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    vec3(0.28235294, 0.54117647, 0.20392157),
    
    vec3(0.25098039, 0.2745098, 0.56078431),
    vec3(0.25098039, 0.2745098, 0.56078431),
    vec3(0.25098039, 0.2745098, 0.56078431),
    vec3(0.25098039, 0.2745098, 0.56078431),
    vec3(0.25098039, 0.2745098, 0.56078431)
];

window.onload = function init(){
    setUpMaze();
    canvas = document.getElementById("gl-canvas");

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = pixelRatio * canvas.clientWidth;
    canvas.height = pixelRatio * canvas.clientHeight;

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl){
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.453125, 0.453125, 0.453125, 1);
    gl.lineWidth(1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    vBuffer = gl.createBuffer();    
    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition");
    vColor = gl.getAttribLocation( program, "color");

    cBuffer = gl.createBuffer();
    binder();

    render();
};

function render() {
    console.log("started render");
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);   
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition );
    
    gl.clear(gl.COLOR_BUFFER_BIT); 
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawArrays(gl.TRIANGLES, 6, 6);
    gl.drawArrays(gl.TRIANGLES,12, 6);
    gl.drawArrays(gl.TRIANGLES,18, 6);
    gl.drawArrays(gl.TRIANGLES,24, 6);
    gl.drawArrays(gl.TRIANGLES,30, 6);
    gl.drawArrays(gl.TRIANGLES,36, 6);
    gl.drawArrays(gl.LINE_STRIP, 42, 5);

    drawUser();
    drawGhosts();

    window.requestAnimationFrame(render);
    console.log("end of render()");
}

function drawUser(){
    var mazeX = player.maze_x;
    var mazeY = player.maze_y;
    var coord = map[mazeX][mazeY];
    var coordx = coord.x;
    var coordy = coord.y;

    console.log("pushing player vertices");
    vertices.push(vec2(coordx, coordy + 0.05));
    vertices.push(vec2(coordx - 0.04, coordy - 0.03));
    vertices.push(vec2(coordx + 0.04, coordy - 0.03));

    console.log("pushing player colors");
    colors.push(vec3(0.17647059, 0.22745098, 0.6));
    colors.push(vec3(0.17647059, 0.22745098, 0.6));
    colors.push(vec3(0.17647059, 0.22745098, 0.6));

    binder();
    
    console.log("drawing player");
    gl.drawArrays(gl.TRIANGLES, (vertices.length - 3), 3);

    console.log("popping player vertices");
    for(var i = 1; i <= 3; i++){
        vertices.pop();
        colors.pop();    
    }
    console.log("finished popping");
    
    binder();
}

function drawGhosts(){
    var ghost1x = ghost1.maze_x;
    var ghost1y = ghost1.maze_y;
    var ghost1Coord = map[ghost1x][ghost1y];
    var ghost1Coordx = ghost1Coord.x;
    var ghost1Coordy = ghost1Coord.y;
    var ghost2x = ghost2.maze_x;
    var ghost2y = ghost2.maze_y;
    var ghost2Coord = map[ghost2x][ghost2y];
    var ghost2Coordx = ghost2Coord.x;
    var ghost2Coordy = ghost2Coord.y;

    console.log("pushing ghost 1 vertices");
    vertices.push(vec2(ghost1Coordx + 0.05, ghost1Coordy + 0.05));
    vertices.push(vec2(ghost1Coordx - 0.05, ghost1Coordy + 0.05));
    vertices.push(vec2(ghost1Coordx - 0.05, ghost1Coordy - 0.05));
    vertices.push(vec2(ghost1Coordx + 0.05, ghost1Coordy + 0.05));
    vertices.push(vec2(ghost1Coordx - 0.05, ghost1Coordy - 0.05));
    vertices.push(vec2(ghost1Coordx + 0.05, ghost1Coordy - 0.05));

    console.log("pushing ghost 2 vertices");
    vertices.push(vec2(ghost2Coordx + 0.05, ghost2Coordy + 0.05));
    vertices.push(vec2(ghost2Coordx - 0.05, ghost2Coordy + 0.05));
    vertices.push(vec2(ghost2Coordx - 0.05, ghost2Coordy - 0.05));
    vertices.push(vec2(ghost2Coordx + 0.05, ghost2Coordy + 0.05));
    vertices.push(vec2(ghost2Coordx - 0.05, ghost2Coordy - 0.05));
    vertices.push(vec2(ghost2Coordx + 0.05, ghost2Coordy - 0.05));
    
    console.log("pushing ghost 1 colors");
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    colors.push(vec3(0.83529412, 0.34901961, 0.3254902));
    
    console.log("pushing ghost 2 colors");
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    colors.push(vec3(0.44313725, 0.78823529, 0.80392157));
    
    
    binder();
    
    console.log("drawing ghosts");
    gl.drawArrays(gl.TRIANGLES, (vertices.length - 12), 6);
    gl.drawArrays(gl.TRIANGLES, (vertices.length - 6), 6);

    console.log("popping vertices");
    for(var i = 1; i <=12; i++){
        vertices.pop();
        colors.pop();    
    }

    console.log("finished popping");
    binder();
}

function binder(){
    console.log("Enter binder");
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition );

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor );
}

///////////////////////////////
//Logic Part
///////////////////////////////
let map = [];
const row = 10;
const col = 9;
var time;
var score;
var timerInterval;
const UP = 1;
const LEFT = 2;
const DOWN = 3;
const RIGHT = 4;
var gameStarted = false;
var gameOver;
var ghost1;
var ghost2;
var player;
var numOfTreat;

class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.isGhost = false;
        this.isObstacle = false;
        this.isPlayer = false;
        this.hasTreat = true;
        this.isCentre = false;
    }
}

class Maze{
    constructor(){
        let height = 0.8;
        for(var i = 0; i < row; i++){
            let width = -0.8;
            map[i] = []
            for(var j = 0; j < col; j++){
                map[i][j] = new Position(width, height);
                width += 0.2;
            }
            if(i == 1 || i == 7){
                height -= 0.1;
            }
            else{
                height -= 0.2;
            }
        }
    }
}

class Ghost{
    constructor(maze_x, maze_y){
        this.maze_x = maze_x;
        this.maze_y = maze_y;
        this.last_move = 0;
    }
    makeMove(){
        console.log("ghost makeMove");
        var move = Math.floor(Math.random() * 4) + 1;
        if(move === UP){
            x = this.maze_x - 1;
            y = this.maze_y;
        }
        else if(move === DOWN){
            x = this.maze_x + 1;
            y = this.maze_y;
        }
        else if(move === LEFT){
            x = this.maze_x;
            y = this.maze_y - 1;
        }
        else{
            x = this.maze_x;
            y = this.maze_y + 1;
        }
        while(!this.validMove(x, y)){
            move = Math.floor(Math.random * 4) + 1;
        }
        switch(move){
            case UP:
                map[this.maze_x][this.maze_y].isGhost = false;
                this.maze_x -= 1;
                map[this.maze_x][this.maze_y].isGhost = true;
                break;
            
            case DOWN:
                map[this.maze_x][this.maze_y].isGhost = false;
                this.maze_x += 1;
                map[this.maze_x][this.maze_y].isGhost = true;
                break;

            case LEFT:
                map[this.maze_x][this.maze_y].isGhost = false;
                this.maze_y -= 1;
                map[this.maze_x][this.maze_y].isGhost = true;
                break;

            case RIGHT:
                map[this.maze_x][this.maze_y].isGhost = false;
                this.maze_y += 1;
                map[this.maze_x][this.maze_y].isGhost = true;
                break;
        }
        if(map[this.maze_x][this.maze_y].isPlayer){
            score -= 500;
        }
        checkLose();
    }
    validMove(x, y){
        console.log("ghost valid move");
        if((x >= 0 && x <= 9)
        && (y >= 0 && y <= 8)
        && !(map[x][y].isObstacle)){
            return true;
        }
        return false;
    }
}

class Player{
    constructor(x, y){
        this.maze_x = x;
        this.maze_y = y;
    }
    moveUp(){
        if(this.validMove(this.maze_x - 1, this.maze_y)){
            console.log("Move up");
            map[this.maze_x][this.maze_y].isPlayer = false;
            this.maze_x -= 1;
            map[this.maze_x][this.maze_y].isPlayer = true;
            if(map[this.maze_x][this.maze_y].hasTreat){
                score += 100;
                numOfTreat--;
                map[this.maze_x][this.maze_y].hasTreat = false;
            }
            checkWin();
        }
        else{
            console.log("Move unsucceed");
        }
    }
    moveLeft(){
        if(this.validMove(this.maze_x, this.maze_y - 1)){
            console.log("Move left");
            map[this.maze_x][this.maze_y].isPlayer = false;
            this.maze_y -= 1;
            map[this.maze_x][this.maze_y].isPlayer = true;
            if(map[this.maze_x][this.maze_y].isPlayer.hasTreat){
                score += 100;
                numOfTreat--;
                map[this.maze_x][this.maze_y].hasTreat = false;
            }
            checkWin();
        }
        else{
            console.log("Move unsucceed");
        }        
    }
    moveDown(){
        if(this.validMove(this.maze_x + 1, this.maze_y)){
            console.log("Move Down");
            map[this.maze_x][this.maze_y].isPlayer = false;
            this.maze_x += 1;
            map[this.maze_x][this.maze_y].isPlayer = true;
            if(map[this.maze_x][this.maze_y].isPlayer.hasTreat){
                score += 100;
                numOfTreat--;
                map[this.maze_x][this.maze_y].hasTreat = false;
            }
            checkWin();
        }
        else{
            console.log("Move unsucceed");
        }
    }
    moveRight(){
        if(this.validMove(this.maze_x, this.maze_y + 1)){
            console.log("Move Right");
            map[this.maze_x][this.maze_y].isPlayer = false;
            this.maze_y += 1;
            map[this.maze_x][this.maze_y].isPlayer = true;
            if(map[this.maze_x][this.maze_y].isPlayer.hasTreat){
                score += 100;
                numOfTreat--;
                map[this.maze_x][this.maze_y].hasTreat = false;
            }
            checkWin();
        }
        else{
            console.log("Move unsucceed");
        }
    }
    validMove(x, y){
        console.log("player valid move");
        if((x >= 0 && x <= 9)
            && (y >= 0 && y <= 8)
            && !(map[x][y].isObstacle)
            && !(map[x][y].isCentre)){
                console.log("Valid move");
                return true;
        }
        console.log("Invalid move");
        return false;
    }
}

function checkWin(){
    console.log("check win");
    if(numOfTreat === 0){
        pauseGame();
        score += time * 100;
        showAlertMessage();
    }
}

function checkLose(){
    console.log("check lose");
    if(score < 0){
        pauseGame();
        showAlertMessage();
        gameOver = true;
    }
}

function setUpMaze(){
    time = 60;
    score = 0;
    numOfTreat = 59;
    gameOver = false;
    var maze = new Maze();
    setUpEventListener();
    document.getElementById("timer").innerHTML = time;
    setObstacleInMaze();
    setGhostInMaze();
    setPlayerInMaze();
    setCentre();
    ghost1 = new Ghost(4, 4);
    ghost2 = new Ghost(5, 4);
    player = new Player(9, 4);
}

function setObstacleInMaze(){
    setObstacle(1, 1);
    setObstacle(1, 2);
    setObstacle(1, 3);
    setObstacle(2, 1);
    setObstacle(2, 2);
    setObstacle(2, 3);
    setObstacle(1, 5);
    setObstacle(1, 6);
    setObstacle(1, 7);
    setObstacle(2, 5);
    setObstacle(2, 6);
    setObstacle(2, 7);
    setObstacle(4, 1);
    setObstacle(5, 1);
    setObstacle(4, 7);
    setObstacle(5, 7);
    setObstacle(7, 1);
    setObstacle(7, 2);
    setObstacle(7, 3);
    setObstacle(8, 1);
    setObstacle(8, 2);
    setObstacle(8, 3);
    setObstacle(7, 5);
    setObstacle(7, 6);
    setObstacle(7, 7);
    setObstacle(8, 5);
    setObstacle(8, 6);
    setObstacle(8, 7);
}

function setCentre(){
    map[4][4].isCentre = true;
    map[5][4].isCentre = true;
}

function setGhostInMaze(){
    map[4][4].isGhost = true;
    map[4][4].hasTreat = false;
    map[5][4].isGhost = true;
    map[5][4].hasTreat = false;
}

function setPlayerInMaze(){
    map[9][4].isPlayer = true;
    map[9][4].hasTreat = false;
}

function setObstacle(x, y){
    map[x][y].isObstacle = true;
    map[x][y].hasTreat = false;
}

function setUpEventListener(){
    window.addEventListener("keydown", getKey, false);
}

function getKey(event) {
    const key = event.keyCode;
    const shiftKey = event.shiftKey;
  
    if (key === 82 && shiftKey) {
        console.log("shift + r");
        restartGame();
        console.log("restart game");
    }
    else if (key === 38 && gameStarted) {
        console.log("Up arrow");
        player.moveUp();
    }
    else if (key === 40 && gameStarted) {
        console.log("Down arrow");
        player.moveDown();
    }
    else if (key === 37 && gameStarted) {
        console.log("Left arrow");
        player.moveLeft();
    }
    else if (key === 39 && gameStarted) {
        console.log("Right arrow")
        player.moveRight();
    }
    else if (key === 83 && !gameStarted) {
        console.log("s")
        startGame();
        console.log("start game");
    }
    else if (key === 82) {
        console.log("r");
        startGame();
        console.log("resume game");
    }
    else if (key === 80) {
        console.log("p");
        pauseGame();
        console.log("pause game");
    }
  }

function startGame(){
    console.log("start game");
    if(!gameOver){
        timerInterval = setInterval(updateTimer, 1000);
        gameStarted = true;
    }
}

function pauseGame(){
    console.log("pause game");
    clearInterval(timerInterval);
    gameStarted = false;
}

function restartGame(){
    console.log("restart game");
    setUpMaze();
    clearInterval(timerInterval);
}

function updateTimer(){
    console.log("update timer");
    time--;
    document.getElementById("timer").innerHTML = time;
    ghost1.makeMove();
    ghost2.makeMove();
    if(time === 0){
        clearInterval(timerInterval);
        gameStarted = false;
        showAlertMessage();
    }
}

function showAlertMessage(){
    console.log("show alert message");
    gameOver = true;
    alert("Game ended!\nYour score is " + score);
}