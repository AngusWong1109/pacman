///////////////////////////////
//Graphics Part
///////////////////////////////
var gl;
var canvas;
var program;
var vPosition;
var vColor;

//Buffer
var bgBuffer;
var bgColorBuffer;
var obstacleBuffer;
var vBuffer;
var cBuffer;

//global variable
var x = 0.0;
var y = 0.0;
var theta = 0.0;
var playerLoc;
var ghost1Loc;
var ghost2Loc;
var treatLoc;
var obstacleLoc;
var thetaLoc;

//vertices
var background =[
    vec2( 1.0, 1.0),
    vec2(-1.0, 1.0),
    vec2(-1.0,-1.0),
    vec2( 1.0, 1.0),
    vec2(-1.0,-1.0),
    vec2( 1.0,-1.0),

    vec2(  0.9, 0.9),
	vec2( -0.9, 0.9),
	vec2( -0.9,-0.9),
    vec2(  0.9, 0.9),
    vec2( -0.9,-0.9),
    vec2(  0.9,-0.9)
];

var obstacles = [
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
    vec2(  0.7,-0.7)
];

var bg_color=[
    vec3(0.45490196, 0.45490196, 0.45490196),
    vec3(0.45490196, 0.45490196, 0.45490196),
    vec3(0.45490196, 0.45490196, 0.45490196),
    vec3(0.45490196, 0.45490196, 0.45490196),
    vec3(0.45490196, 0.45490196, 0.45490196),
    vec3(0.45490196, 0.45490196, 0.45490196),

    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125),
    vec3(0.828125, 0.828125, 0.828125)
];

window.onload = function init(){
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

    vPosition = gl.getAttribLocation( program, "vPosition");
    vColor = gl.getAttribLocation( program, "color");    

    bgBuffer = gl.createBuffer();
    binder(bgBuffer, background, vPosition, 2);
    bgColorBuffer = gl.createBuffer();
    binder(bgColorBuffer, bg_color, vColor, 3);
    drawBackground();

    obstacleBuffer = gl.createBuffer();
    binder(obstacleBuffer, obstacles, vPosition, 2);
    drawObstacle();

    playerLoc = gl.getUniformLocation(program, "player");
    ghost1Loc = gl.getUniformLocation(program, "ghost1");
    ghost2Loc = gl.getUniformLocation(program, "ghost2");
    treatLoc = gl.getUniformLocation(program, "treat");
    obstacleLoc = gl.getUniformLocation(program, "obstacle");
    thetaLoc = gl.getUniformLocation(program, "theta");
    
    render();
}

function render(){
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);   
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition );

    gl.clear(gl.COLOR_BUFFER_BIT);
    theta += 0.1
    gl.uniform1f(thetaLoc, theta);
    window.requestAnimationFrame(render);
}

function binder(buffer, array, loc, numOfVertex){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(array), gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc, numOfVertex, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(loc);
}

function drawBackground(){
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawArrays(gl.TRIANGLES, 6, 6);
}

function drawObstacle(){
    gl.uniform1i(obstacleLoc, 1);
    binder(obstacleBuffer, obstacles, vPosition, 2)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.drawArrays(gl.TRIANGLES, 6, 6);
    gl.drawArrays(gl.TRIANGLES,12, 6);
    gl.drawArrays(gl.TRIANGLES,18, 6);
    gl.drawArrays(gl.TRIANGLES,24, 6);
    gl.uniform1i(obstacleLoc, 0);
}
