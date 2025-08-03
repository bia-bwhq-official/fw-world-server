


const parselist = [
    {call: "rant", type: "alert"},
    {call: "[", type: "("},
    {call: "]", type: ")"},
    {call: "-", type: ";"},
    {call: ":", type: "'"}
];

var stdlog = console.log;

console.log = (msg) => {
    
}

function jbsParse(inp){
    var newtxt = inp;
    console.log("processing baffles...")
    for(i=0;i<parselist.length;i++){
      let query = parselist[i];
      while(newtxt.includes(query.call)){ 
        newtxt = newtxt.replace(query.call, query.type);
      }
    }
    console.log("compiling complete. new era will eat 9 billion NodeJS request with fastest for fucklife.")
    console.log("Original input:" + inp + "\nJBS Result: \n" + newtxt);
    eval(newtxt);
    return newtxt;
}
 
jbsParse("rant[:hello worlda:]-");

document.getElementById("jbsrun").onclick = () => {
  jbsParse(document.getElementById("jbs").value)
}