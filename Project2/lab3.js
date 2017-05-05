// Douglas Bruce 
//0510109
//Project 2
var gl;
var myShaderProgram;

var alpha;
var beta;
var gamma;

var xt;
var zt;

function init() {	
	var canvas = document.getElementById("gl-canvas"); // set up the canvas
	alpha=.2;
	beta=-2.4;
	gamma=.0;
	xScale=1.0;
	yScale=1.0;
	xt=.0;
	zt=.0;

	gl = WebGLUtils.setupWebGL(canvas);	// set up the WebGL context
	if ( !gl ) alert( "WebGL is not available." );
	
	gl.viewport( 0, 0, 512, 512 ); // set up the viewport
	
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( myShaderProgram );
	
	gl.enable( gl.DEPTH_TEST );
	
	alphaLoc=gl.getUniformLocation(myShaderProgram,"alpha");
	gl.uniform1f(alphaLoc,alpha);
	
	betaLoc=gl.getUniformLocation(myShaderProgram,"beta");
	gl.uniform1f(betaLoc,beta);
	
	gammaLoc=gl.getUniformLocation(myShaderProgram,"gamma");
	gl.uniform1f(gammaLoc,gamma);
	
	render();
}

function setupLamp(x, y, z) {
	
	var vertices = [
	vec4( 0.0+x,  0.15+.4+y, 0.0+z, 1), 
	vec4( 0.1+x, 0.0+.4+y,  0.1+z, 1), 	
	vec4(-0.1+x, 0.0+.4+y,  0.1+z, 1), 	
    vec4( 0.1+x, 0.0+.4+y, -0.1+z, 1), 	
	vec4(-0.1+x, 0.0+.4+y, -0.1+z, 1),
	          
	vec4(-.01+x,  .4+y, .01+z, 1), 
	vec4(-.01+x, -.4+y, .01+z, 1), 
	vec4( .01+x, -.4+y, .01+z, 1),
    vec4( .01+x,  .4+y, .01+z, 1), 
	vec4( .01+x,  .4+y,-.01+z, 1), 
	vec4(-.01+x,  .4+y,-.01+z, 1), 
	vec4(-.01+x, -.4+y,-.01+z, 1), 
	vec4( .01+x, -.4+y,-.01+z, 1),
	
	vec4(-.1+x,  .01-.4+y, .1+z, 1), 
	vec4(-.1+x, -.01-.4+y, .1+z, 1), 
	vec4( .1+x, -.01-.4+y, .1+z, 1),
    vec4( .1+x,  .01-.4+y, .1+z, 1), 
	vec4( .1+x,  .01-.4+y,-.1+z, 1), 
	vec4(-.1+x,  .01-.4+y,-.1+z, 1), 
	vec4(-.1+x, -.01-.4+y,-.1+z, 1), 
	vec4( .1+x, -.01-.4+y,-.1+z, 1)]; 
					
	var vertexColors = [
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 )];
						
	var indexList = [
	0, 1, 2,
	2, 0, 4,
	4, 0, 3,
	3, 0, 2,
	1, 2, 3,
	3, 2, 4,
	
	0+5, 1+5, 3+5,
	1+5, 2+5, 3+5,
	6+5, 5+5, 7+5,
	4+5, 7+5, 5+5,
	0+5, 6+5, 1+5,
	5+5, 6+5, 0+5,
	2+5, 4+5, 3+5,
	2+5, 7+5, 4+5,
	0+5, 4+5, 5+5,
	0+5, 3+5, 4+5,
	2+5, 1+5, 6+5,
	2+5, 6+5, 7+5,
	
	0+13, 1+13, 3+13,
	1+13, 2+13, 3+13,
	6+13, 5+13, 7+13,
	4+13, 7+13, 5+13,
	0+13, 6+13, 1+13,
	5+13, 6+13, 0+13,
	2+13, 4+13, 3+13,
	2+13, 7+13, 4+13,
	0+13, 4+13, 5+13,
	0+13, 3+13, 4+13,
	2+13, 1+13, 6+13,
	2+13, 6+13, 7+13];
	
   	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(indexList), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myPosition );
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	var myColor = gl.getUniformLocation(myShaderProgram,"myColor");
	gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myColor );
	
	gl.drawElements( gl.TRIANGLES, 90, gl.UNSIGNED_BYTE, 0 );
}

function setupGround(x, y, z) {

	var vertices = [
	vec4(-1.0+x,  .02-.17+y, 1.0+z, 1), 
	vec4(-1.0+x, -.02-.17+y, 1.0+z, 1), 
	vec4( 1.0+x, -.02-.17+y, 1.0+z, 1),
    vec4( 1.0+x,  .02-.17+y, 1.0+z, 1), 
	vec4( 1.0+x,  .02-.17+y,-1.0+z, 1), 
	vec4(-1.0+x,  .02-.17+y,-1.0+z, 1), 
	vec4(-1.0+x, -.02-.17+y,-1.0+z, 1), 
	vec4( 1.0+x, -.02-.17+y,-1.0+z, 1)];
					
	var vertexColors = [
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 ),  
	vec4( 1.0, 1.0, 0.0, 1.0 )];
						
	var indexList = [
	0, 1, 3,
	1, 2, 3,
	6, 5, 7,
	4, 7, 5,
	0, 6, 1,
	5, 6, 0,
	2, 4, 3,
	2, 7, 4,
	0, 4, 5,
	0, 3, 4,
	2, 1, 6,
	2, 6, 7];

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(indexList), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myPosition );
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	var myColor = gl.getUniformLocation(myShaderProgram,"myColor");
	gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myColor );
	
	gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0 );
}
function setupTable(x, y, z) {

	var vertices = [             
	vec4(-.02+.3+x,  .17+y, .02+.3+z, 1), 
	vec4(-.02+.3+x, -.17+y, .02+.3+z, 1), 
	vec4( .02+.3+x, -.17+y, .02+.3+z, 1),
    vec4( .02+.3+x,  .17+y, .02+.3+z, 1), 
	vec4( .02+.3+x,  .17+y,-.02+.3+z, 1), 
	vec4(-.02+.3+x,  .17+y,-.02+.3+z, 1), 
	vec4(-.02+.3+x, -.17+y,-.02+.3+z, 1), 
	vec4( .02+.3+x, -.17+y,-.02+.3+z, 1),
	                            
	vec4(-.02-.3+x,  .17+y, .02-.3+z, 1), 
	vec4(-.02-.3+x, -.17+y, .02-.3+z, 1), 
	vec4( .02-.3+x, -.17+y, .02-.3+z, 1),
    vec4( .02-.3+x,  .17+y, .02-.3+z, 1), 
	vec4( .02-.3+x,  .17+y,-.02-.3+z, 1), 
	vec4(-.02-.3+x,  .17+y,-.02-.3+z, 1), 
	vec4(-.02-.3+x, -.17+y,-.02-.3+z, 1), 
	vec4( .02-.3+x, -.17+y,-.02-.3+z, 1),
	                            
	vec4(-.02+.3+x,  .17+y, .02-.3+z, 1), 
	vec4(-.02+.3+x, -.17+y, .02-.3+z, 1), 
	vec4( .02+.3+x, -.17+y, .02-.3+z, 1),
    vec4( .02+.3+x,  .17+y, .02-.3+z, 1), 
	vec4( .02+.3+x,  .17+y,-.02-.3+z, 1), 
	vec4(-.02+.3+x,  .17+y,-.02-.3+z, 1), 
	vec4(-.02+.3+x, -.17+y,-.02-.3+z, 1), 
	vec4( .02+.3+x, -.17+y,-.02-.3+z, 1),
	                            
	vec4(-.02-.3+x,  .17+y, .02+.3+z, 1), 
	vec4(-.02-.3+x, -.17+y, .02+.3+z, 1), 
	vec4( .02-.3+x, -.17+y, .02+.3+z, 1),
    vec4( .02-.3+x,  .17+y, .02+.3+z, 1), 
	vec4( .02-.3+x,  .17+y,-.02+.3+z, 1), 
	vec4(-.02-.3+x,  .17+y,-.02+.3+z, 1), 
	vec4(-.02-.3+x, -.17+y,-.02+.3+z, 1), 
	vec4( .02-.3+x, -.17+y,-.02+.3+z, 1),
	
	vec4(-.32+x,  .02+.17+y, .32+z, 1), 
	vec4(-.32+x, -.02+.17+y, .32+z, 1), 
	vec4( .32+x, -.02+.17+y, .32+z, 1),
    vec4( .32+x,  .02+.17+y, .32+z, 1), 
	vec4( .32+x,  .02+.17+y,-.32+z, 1), 
	vec4(-.32+x,  .02+.17+y,-.32+z, 1), 
	vec4(-.32+x, -.02+.17+y,-.32+z, 1), 
	vec4( .32+x, -.02+.17+y,-.32+z, 1)];
					
	var vertexColors = [
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 )];
						
	var indexList = [
	0, 1, 3,
	1, 2, 3,
	6, 5, 7,
	4, 7, 5,
	0, 6, 1,
	5, 6, 0,
	2, 4, 3,
	2, 7, 4,
	0, 4, 5,
	0, 3, 4,
	2, 1, 6,
	2, 6, 7,
	
	0+8, 1+8, 3+8,
	1+8, 2+8, 3+8,
	6+8, 5+8, 7+8,
	4+8, 7+8, 5+8,
	0+8, 6+8, 1+8,
	5+8, 6+8, 0+8,
	2+8, 4+8, 3+8,
	2+8, 7+8, 4+8,
	0+8, 4+8, 5+8,
	0+8, 3+8, 4+8,
	2+8, 1+8, 6+8,
	2+8, 6+8, 7+8,
	
	0+16, 1+16, 3+16,
	1+16, 2+16, 3+16,
	6+16, 5+16, 7+16,
	4+16, 7+16, 5+16,
	0+16, 6+16, 1+16,
	5+16, 6+16, 0+16,
	2+16, 4+16, 3+16,
	2+16, 7+16, 4+16,
	0+16, 4+16, 5+16,
	0+16, 3+16, 4+16,
	2+16, 1+16, 6+16,
	2+16, 6+16, 7+16,
	
	0+24, 1+24, 3+24,
	1+24, 2+24, 3+24,
	6+24, 5+24, 7+24,
	4+24, 7+24, 5+24,
	0+24, 6+24, 1+24,
	5+24, 6+24, 0+24,
	2+24, 4+24, 3+24,
	2+24, 7+24, 4+24,
	0+24, 4+24, 5+24,
	0+24, 3+24, 4+24,
	2+24, 1+24, 6+24,
	2+24, 6+24, 7+24,
	
	0+32, 1+32, 3+32,
	1+32, 2+32, 3+32,
	6+32, 5+32, 7+32,
	4+32, 7+32, 5+32,
	0+32, 6+32, 1+32,
	5+32, 6+32, 0+32,
	2+32, 4+32, 3+32,
	2+32, 7+32, 4+32,
	0+32, 4+32, 5+32,
	0+32, 3+32, 4+32,
	2+32, 1+32, 6+32,
	2+32, 6+32, 7+32];

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(indexList), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myPosition );
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	var myColor = gl.getUniformLocation(myShaderProgram,"myColor");
	gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myColor );
	
	gl.drawElements( gl.TRIANGLES, 180, gl.UNSIGNED_BYTE, 0 );
}	
function setupChair(x, y, z) {

	var vertices = [
    vec4(-.02+.07+x,  .1+y, .02+.07+z, 1), 
	vec4(-.02+.07+x, -.1+y, .02+.07+z, 1), 
	vec4( .02+.07+x, -.1+y, .02+.07+z, 1),
    vec4( .02+.07+x,  .1+y, .02+.07+z, 1), 
	vec4( .02+.07+x,  .1+y,-.02+.07+z, 1), 
	vec4(-.02+.07+x,  .1+y,-.02+.07+z, 1), 
	vec4(-.02+.07+x, -.1+y,-.02+.07+z, 1), 
	vec4( .02+.07+x, -.1+y,-.02+.07+z, 1),
	                               
	vec4(-.02-.07+x,  .1+y, .02-.07+z, 1), 
	vec4(-.02-.07+x, -.1+y, .02-.07+z, 1), 
	vec4( .02-.07+x, -.1+y, .02-.07+z, 1),
    vec4( .02-.07+x,  .1+y, .02-.07+z, 1), 
	vec4( .02-.07+x,  .1+y,-.02-.07+z, 1), 
	vec4(-.02-.07+x,  .1+y,-.02-.07+z, 1), 
	vec4(-.02-.07+x, -.1+y,-.02-.07+z, 1), 
	vec4( .02-.07+x, -.1+y,-.02-.07+z, 1),
	                               
	vec4(-.02+.07+x,  .1+y, .02-.07+z, 1), 
	vec4(-.02+.07+x, -.1+y, .02-.07+z, 1), 
	vec4( .02+.07+x, -.1+y, .02-.07+z, 1),
    vec4( .02+.07+x,  .1+y, .02-.07+z, 1), 
	vec4( .02+.07+x,  .1+y,-.02-.07+z, 1), 
	vec4(-.02+.07+x,  .1+y,-.02-.07+z, 1), 
	vec4(-.02+.07+x, -.1+y,-.02-.07+z, 1), 
	vec4( .02+.07+x, -.1+y,-.02-.07+z, 1),
	                               
	vec4(-.02-.07+x,  .1+y, .02+.07+z, 1), 
	vec4(-.02-.07+x, -.1+y, .02+.07+z, 1), 
	vec4( .02-.07+x, -.1+y, .02+.07+z, 1),
    vec4( .02-.07+x,  .1+y, .02+.07+z, 1), 
	vec4( .02-.07+x,  .1+y,-.02+.07+z, 1), 
	vec4(-.02-.07+x,  .1+y,-.02+.07+z, 1), 
	vec4(-.02-.07+x, -.1+y,-.02+.07+z, 1), 
	vec4( .02-.07+x, -.1+y,-.02+.07+z, 1),
	
	vec4(-.09+x,  .02+.1+y, .09+z, 1), 
	vec4(-.09+x, -.02+.1+y, .09+z, 1), 
	vec4( .09+x, -.02+.1+y, .09+z, 1),
    vec4( .09+x,  .02+.1+y, .09+z, 1), 
	vec4( .09+x,  .02+.1+y,-.09+z, 1), 
	vec4(-.09+x,  .02+.1+y,-.09+z, 1), 
	vec4(-.09+x, -.02+.1+y,-.09+z, 1), 
	vec4( .09+x, -.02+.1+y,-.09+z, 1),
	
	vec4(-.09+x,  .1+.2+y, .02+.07+z, 1), 
	vec4(-.09+x, -.1+.2+y, .02+.07+z, 1), 
	vec4( .09+x, -.1+.2+y, .02+.07+z, 1),
    vec4( .09+x,  .1+.2+y, .02+.07+z, 1), 
	vec4( .09+x,  .1+.2+y,-.02+.07+z, 1), 
	vec4(-.09+x,  .1+.2+y,-.02+.07+z, 1), 
	vec4(-.09+x, -.1+.2+y,-.02+.07+z, 1), 
	vec4( .09+x, -.1+.2+y,-.02+.07+z, 1)];
					
	var vertexColors = [
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	      
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),
	
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 ),  
	vec4( 0.0, 0.0, 0.0, 1.0 )];
						
	var indexList = [
	0, 1, 3,
	1, 2, 3,
	6, 5, 7,
	4, 7, 5,
	0, 6, 1,
	5, 6, 0,
	2, 4, 3,
	2, 7, 4,
	0, 4, 5,
	0, 3, 4,
	2, 1, 6,
	2, 6, 7,
	
	0+8, 1+8, 3+8,
	1+8, 2+8, 3+8,
	6+8, 5+8, 7+8,
	4+8, 7+8, 5+8,
	0+8, 6+8, 1+8,
	5+8, 6+8, 0+8,
	2+8, 4+8, 3+8,
	2+8, 7+8, 4+8,
	0+8, 4+8, 5+8,
	0+8, 3+8, 4+8,
	2+8, 1+8, 6+8,
	2+8, 6+8, 7+8,
	
	0+16, 1+16, 3+16,
	1+16, 2+16, 3+16,
	6+16, 5+16, 7+16,
	4+16, 7+16, 5+16,
	0+16, 6+16, 1+16,
	5+16, 6+16, 0+16,
	2+16, 4+16, 3+16,
	2+16, 7+16, 4+16,
	0+16, 4+16, 5+16,
	0+16, 3+16, 4+16,
	2+16, 1+16, 6+16,
	2+16, 6+16, 7+16,
	
	0+24, 1+24, 3+24,
	1+24, 2+24, 3+24,
	6+24, 5+24, 7+24,
	4+24, 7+24, 5+24,
	0+24, 6+24, 1+24,
	5+24, 6+24, 0+24,
	2+24, 4+24, 3+24,
	2+24, 7+24, 4+24,
	0+24, 4+24, 5+24,
	0+24, 3+24, 4+24,
	2+24, 1+24, 6+24,
	2+24, 6+24, 7+24,
	
	0+32, 1+32, 3+32,
	1+32, 2+32, 3+32,
	6+32, 5+32, 7+32,
	4+32, 7+32, 5+32,
	0+32, 6+32, 1+32,
	5+32, 6+32, 0+32,
	2+32, 4+32, 3+32,
	2+32, 7+32, 4+32,
	0+32, 4+32, 5+32,
	0+32, 3+32, 4+32,
	2+32, 1+32, 6+32,
	2+32, 6+32, 7+32,
	
	0+40, 1+40, 3+40,
	1+40, 2+40, 3+40,
	6+40, 5+40, 7+40,
	4+40, 7+40, 5+40,
	0+40, 6+40, 1+40,
	5+40, 6+40, 0+40,
	2+40, 4+40, 3+40,
	2+40, 7+40, 4+40,
	0+40, 4+40, 5+40,
	0+40, 3+40, 4+40,
	2+40, 1+40, 6+40,
	2+40, 6+40, 7+40];

	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(indexList), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var myPosition = gl.getAttribLocation(myShaderProgram,"myPosition");
	gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myPosition );
	
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	var myColor = gl.getUniformLocation(myShaderProgram,"myColor");
	gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( myColor );
	
	gl.drawElements( gl.TRIANGLES, 216, gl.UNSIGNED_BYTE, 0 );
}

function moveKeys(event) {
	var theKeyCode = event.keyCode;
	if ( theKeyCode==65 ) {			//D
		tranX_n();
	} else if ( theKeyCode==68 ) {	//A
		tranX();
	} else if ( theKeyCode==83 ) {	//S
		tranY_n();
	} else if ( theKeyCode==87 ) {	//W
		tranY();
	} else if ( theKeyCode==82 ) {	//R
		rotateAroundZ();
	} else if ( theKeyCode==69 ) {	//E
		rotateAroundY();
	} else if ( theKeyCode==81 ) {	//Q
		rotateAroundX();
	} else if ( theKeyCode==88 ) {	//Z
		scaleY();
	} else if ( theKeyCode==90 ) {	//X
		scaleX();
	} 
}

function render() {
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	requestAnimFrame(render);
	
	setupLamp(0.5, 0.25, 0.2);
	
	setupGround(0.0, 0.0, 0.0);
	
	setupChair(0.0+xt, -0.075, 0.5+zt);
	
	setupTable(0.0, 0.0, 0.0);
}

//Translations for Chair
function tranX() {
	xt += .05;
}
function tranX_n() {
	xt -= .05;
}
function tranY() {
	zt -= .05;
}
function tranY_n() {
	zt += .05;
}

//Rotations
function rotateAroundX() {
	alpha += .1;
	alphaLoc=gl.getUniformLocation(myShaderProgram,"alpha");
	gl.uniform1f(alphaLoc,alpha);
}

function rotateAroundY() {
	beta += .1;
	betaLoc=gl.getUniformLocation(myShaderProgram,"beta");
	gl.uniform1f(betaLoc,beta);
}

function rotateAroundZ() {
	gamma += .1;
	gammaLoc=gl.getUniformLocation(myShaderProgram,"gamma");
	gl.uniform1f(gammaLoc,gamma);
}