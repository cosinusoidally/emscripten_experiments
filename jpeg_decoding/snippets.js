/*

This file is loaded from index.html . It provides some handy utility functions.

There are lots of hard coded assumptions in this file. Quite a few implicit ones too.

See the cmd file in this directory to see how these utility functions are used.

*/



/*

  setup_canvas create a canvas and append it to the DOM.
               Makes a 1024x512 canvas and appends it to the DOM 

*/

setup_canvas=function(){
  can=document.createElement("canvas");
  can.width=1024;
  can.height=512;
  ctx=can.getContext("2d");
  img=ctx.getImageData(0,0,1024,512);
  document.body.appendChild(can);
}

/*

  up_scn copies all data from the heap on to an ImageData buffer and then uses putImageData to
         paint it on the screen

*/

up_scn=function(){
  var inp=img;
  for(var i=0;i<1024*512;i++){
    io=i*3;
    oo=i*4;

    inp.data[oo]=HEAPU8[io];
    inp.data[oo+1]=HEAPU8[io+1];
    inp.data[oo+2]=HEAPU8[io+2];

    inp.data[oo+3]=255;
  };
  ctx.putImageData(inp,0,0);
}

/*

  get_lenna Fetch the Lenna.jpg using binary xhr. 
            Puts the data in a global variable called byteArray

  Note that this does not run a use supplied callback when ready. You just wait a little while.
*/

function get_lenna(){
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "Lenna.jpg", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
  var arrayBuffer = oReq.response; // Note: not oReq.responseText
  if (arrayBuffer) {
    byteArray = new Uint8Array(arrayBuffer);
    console.log("got lenna"); 
    }
  };

  oReq.send(null);
}

/*

  mkbuf takes an array and copies the data onto the Emscripten stack
        It returns a pointer to the data.

*/

function mkbuf(buf){
  return allocate(buf, 'i8', ALLOC_STACK);
}

/*

  mkbuf_heap write array to heap. Returns pointer to that array
 
*/

function mkbuf_heap(buf){
  var ptr=_malloc(buf.length);
  for(var i=0;i<buf.length;i++){
     HEAPU8[i+ptr]=buf[i];
  }
/*
 buf.forEach(function(x,i){HEAPU8[i+ptr]=x});
*/
  return ptr;
}

/*

  put_img takes the address pointed to by raw and paints it on the canvas.
          Note that it does not modify the Emscripten heap.

*/


function put_img(){
  var c=ctx.createImageData(256,256);
  for(var i=0;i<256*256;i++){
    var io=3*i+raw;
    var oo=4*i;
    c.data[oo]=HEAPU8[io];
    c.data[oo+1]=HEAPU8[io+1];
    c.data[oo+2]=HEAPU8[io+2];
    c.data[oo+3]=255;
  }

  ctx.putImageData(c,0,0);
}


/*

 load load a script

*/


function load(src){

  var script=document.createElement("script");
  script.src=src;
  document.body.appendChild(script);

}




