
document.getElementById("rantsnippet").innerHTML = document.getElementById("rantsnippet").innerHTML.replace(/era/g, '<span style="color:rgb(0, 145, 255);">era</span>');
document.getElementById("rantsnippet").innerHTML = document.getElementById("rantsnippet").innerHTML.replace(/newfunction/g, '<span style="color:rgb(255, 191, 0);">newfunction</span>');

var stdlog = console.log;

console.log = (msg,color) => {
    stdlog(msg);
    const consoleDOM = document.getElementById("console");
    
    if(color){ consoleDOM.innerHTML+="<br><p style='color:"+color+"'>" + msg + "</p>"; } else consoleDOM.innerHTML+="<br><p>" + msg + "</p>";
}

var importantRant = (msg, color) => console.log("Hypercompiler: " + msg,color+";font-weight:bold;font-style:italic;");


const parselist = [
    {call: "rant", type: "alert", case: false},
    {call: "[", type: "(", case: false},
    {call: "]", type: ")", case: false},
    {call: "-", type: ";", case: false},
    {call: ":", type: "'", case: false},
    {call: "newuser", type: "var", case: true},
    {call: "<", type: "{", case: false},
    {call: ">", type: "}", case: false},
    {call: "gooduser", type: "true", case: false},
    {call: "baduser", type: "false", case: false},
    {call: "era", type: "function", case: false},
    {call: "is having equivalents to", type: "="},
    {call: "user behaviors", type: "["},
    {call: "user behavior are terminate", type: "]"},
    {call: "another user here", type: ","},
    {call: "confront user", type: "console.log"},
    {call: "less than", type: "<"},
    {call: "greater than", type: ">"},
    {call: "community post allude from IUS", type: "return"},
    {call: "detect on name call", type: "if"},
    {call: "create anonymous hacker socket into OnuteWORLD ##",}
];

var privatevars = [];

function jbsParse(inp,rantorno){
    var newtxt = inp;
    console.log("/////////////////")
    if(rantorno == true){
      console.log("processing baffles...");
    }
    for(i=0;i<parselist.length;i++){
      let query = parselist[i];
      while(newtxt.includes(query.call)){ 
        newtxt = newtxt.replace(query.call, query.type);
      }
    }
    eval(newtxt);
}
 
jbsParse("rant[:hello worlda:]-",true);
