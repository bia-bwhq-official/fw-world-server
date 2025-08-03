const botname = "monky.downsyndromeversion";
let io = require("socket.io-client");
const fs = require("fs");
var logs = 0;
var msgs = require("./msg");
let params = {
  temperature: 0, //floating point from 0 to 1
  maxLength:2
}
function stringErr(str1, str2) {
    str1 = String(str1 || '');
    str2 = String(str2 || '');
    
    if (str1 === str2) {
        return {
            difference: 0,
            similarity: 1,
            match: true
        };
    }
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }
    
    // Fill the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,    
                    matrix[i][j - 1] + 1,    
                    matrix[i - 1][j - 1] + 1 
                );
            }
        }
    }
    
    const distance = matrix[len1][len2];
    const maxLength = Math.max(len1, len2);
    const similarity = maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
    
    return similarity;
}
var bot = () => {
  logs++;
  var thislog = logs;
  const socket = io("https://bonzi.gay",{
  rejectUnauthorized: false,
  });
  ////
  socket.emit("login", { name: botname, room: "" });
  var users = {}
   socket.on("updateAll", (data) => {
    users = {};
    let userlist = Object.keys(data);
    userlist.forEach(user => {
      users[user] = data.usersPublic[user];
    });
   });
             
    socket.on("update", (data) => {
      let userlist = Object.keys(users);
      users[data.guid] = data.userPublic;
    });
  var q = 0;
  var time = 0;
  socket.on("talk", (data) => {
    let tolog = "(empty)";
    if (users[data.guid] == undefined) {
      return;
    }
    if (users[data.guid].name !== botname) {
      q++;
      if (q > 1) {
        var writ = "module.exports = [\n";
        for (i = 0; i < msgs.length; i++) {
          writ += '`' + msgs[i] + '`,\n';
        }
        writ += "];";
        while(writ.includes("&apos;")){
          writ.replace("&apos;","")
        }
        fs.writeFileSync("msg.js", writ, (err) => {
          if (err) console.log(err);
          else {
            console.log("messages saved (messages: " + msgs.length + ")");
          }
        });
        q = 0;
      }
      if (
        !msgs.includes(data.text) &&
        !msgs.includes("STOP STOP STOP STOP STOP") &&
        data.text.length < 80
      ) {
        msgs = [
          ...msgs, 
          data.text.replaceAll(`\\`,``)
          .replaceAll("grounded","")
          .replaceAll("Grounded","")
          .replaceAll("GROUNDED","")
          .replaceAll("kiko","")
        ];
      }
      //if(msgs.length > 100){
      //msgs = [];
      //}
      if (data.text.length < 120) {
        setTimeout(
          () => {
            if (users[data.guid] !== undefined) {
              let newmsg = msgs[Math.floor(Math.random() * msgs.length)];
              let wordData = data.text.split(" ");
              let commonWor = ["and","some","but","for","the"];
              let msgpool = [];
              msgs.forEach(mesg => {
                wordData.forEach(dataWor => {
                  if(
                    !commonWor.some(r => dataWor.toLowerCase() == r)
                     && mesg !== data.text 
                     && mesg.includes(dataWor)
                     && !mesg.includes("[[")
                     && !mesg.includes("]]")
                  )msgpool = [...msgpool,{cont:mesg,score:stringErr(mesg,data.text)}];
                });
              });
              newmsg = msgs[Math.floor(Math.random() * msgs.length)]
              if(msgpool.length > 0){
              msgpool.sort((a,b)=>{return b.score-a.score;});
              msgpool = msgpool.slice(0,4+Math.floor(params.maxLength/2));
              newmsg = msgpool[Math.floor(Math.random() * msgpool.length)].cont;
              }
              let c = Math.random();
              if(typeof newmsg == "object")newmsg = newmsg.cont;
              else newmsg = msgs[Math.floor(Math.random() * msgs.length)];
              let junct = [" and"," also"," and also"," but"," then"," because",", "];
              if(msgpool.length > 1){
                for(let i=0;i<msgpool.length;i++){
                  let c = Math.random();
                  let thist = msgpool[i].cont;
                  if(c > (0.8-(params.maxLength/10)) && !newmsg.includes(thist)){
                    newmsg+=junct[Math.floor(Math.random() * junct.length)]+" "+msgpool[i].cont;
                  }
                }
              }
              if(c > 0.65 || data.text.toLowerCase().includes("monky")){
                tolog = newmsg;
                socket.emit("talk", {text: newmsg,quote:{name:users[data.guid].name,text:data.text}});
              }
              else tolog = "(empty)"
             msgpool = [];
            }
          },
          Math.floor(Math.random() * (3000 - 1400)) + 1400,
        );
      }
    }
    
    if (thislog === 1) {
        time = 0;
      console.log(users[data.guid].name + ": " + data.text);
      if(tolog !== "(empty)")console.log(" MONKY - "+tolog);
    }
  });
  
socket.on('connect', () => {
  console.log('Successfully connected to the server! ('+thislog+')');
  console.log('Connection status ('+thislog+') :', socket.connected); 
});

socket.on('connect_error', (err) => {
  console.error('Connection error  ('+thislog+'):', err.message);
  console.log('Connection status ('+thislog+'):', socket.connected);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:  ('+thislog+')', reason);
  console.log('Connection status:  ('+thislog+')', socket.connected); 
});

setTimeout(() => {
  console.log(`Connection status after timeout (${thislog}): ${socket.connected}`);
  
  if (!socket.connected) {
    console.log('Still not connected. Trying to reconnect... ('+thislog+')');
    socket.connect();
  }
}, 5000);

setTimeout(() => {
  console.log(`Final Connection Status (${thislog}): ${socket.connected}`);
}, 15000);
  ///
};



bot();
