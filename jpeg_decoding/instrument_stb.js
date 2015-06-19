// We first need to pick out all global stb symbols. We extract the name and function into an array of arrays (symbols)
symbols=[];
for(var n in window){
  if(n.match("_stb")!==null){
    symbols.push([n,window[n]]);
  }
}

// put fns into associative array
old_fns={};symbols.forEach(function(x){old_fns[x[0]]=x});

function instrument(name,fn_enter,fn_exit){
 var fn=old_fns[name][1];
 var len=fn.length;
// var src=["function(\n"];
 var src=[];
 var args=[];
 for(var i=0;i<len;i++){
  args.push("$"+i);
 };
 src.push("  var name='"+fn.name+"'\n");
 src.push("  "+fn_enter+"\n");
 src.push("  var result=old_fns['"+fn.name+"'][1]("+args.join(",")+");"+"\n");
 src.push("  "+fn_exit+"\n");
 src.push("  return result"+"\n");
// src.push("}\n");
 args.push(src.join(""));
 var ins_fn=Function.apply(this,args );
 window[fn.name]=ins_fn;
  return args.join("");
}
instrument("_stbi_load_from_memory","console.log(name)")


logs=[];
symbols.forEach(function(x){instrument(x[0],"logs.push('entering: '+name)","logs.push('leaving: '+name)")})
