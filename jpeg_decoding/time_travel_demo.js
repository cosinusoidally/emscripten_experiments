function prep(){
  setup_canvas();
  up_scn();
  get_lenna();
}

function prep2(){
  b=mkbuf_heap(byteArray);
  up_scn();
  w=mkbuf(1);
  h=mkbuf(1);
}

function load1(){
  load("instrument_stb.js");
}

function load2(){
  load("time_travel_test.js");
}
function anim(){
  blah=0;
  tt=setInterval(function(){
    blah=blah+100;  
    run_until(blah);
  },0);
}

function stop(){
  clearInterval(tt);
}
