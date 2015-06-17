sizes=[];

real_free=_free;
real_malloc=_malloc;


_free=function(x){
  debugger;
  console.log("Address: "+x+", Freed "+sizes[x]);
  var start=x;
  var fin=x+sizes[x];
  for(var i=start;i<fin;i++){
    HEAPU8[i]=0;
  }
  return real_free(x);
}

_malloc=function(x){
  debugger;
  var ptr=real_malloc(x);
  console.log("Address: "+ptr+", Allocated "+x);
  sizes[ptr]=x;
  return ptr ;
}
