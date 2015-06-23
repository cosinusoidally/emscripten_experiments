
old_stack=STACKTOP;
mk_off=8e5;

_free=function(){};
_malloc=function(x){var ptr=mk_off;mk_off=mk_off+x;return ptr;};
heap2=new Uint8Array(HEAPU8);


reset_heap=function (){mk_off=7e5;STACKTOP=old_stack;for(var i=0;i<HEAPU8.length;i++){HEAPU8[i]=heap2[i]}}

symbols.forEach(function(x){instrument(x[0],"count++;if(count>stopat){count=0;throw 'end'}","")})

run_until=function(x){try{count=0;stopat=x;reset_heap();raw=_stbi_load_from_memory(b,w,h,0,3)}catch(e){};up_scn();}
// Remember STACKTOP
