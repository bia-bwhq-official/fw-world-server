const botname = "Minimonky / ,monky {TEXT}";
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
class Minimonky {
    constructor(options){
        this.params = options;
    }
    save(){
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
    out(tex){
        let final = "";
        if (
            !msgs.includes(tex) &&  
            tex.length < 80
        ) {
            msgs = [
                ...msgs, 
                tex.replaceAll(`\\`,``)
                .replaceAll("grounded","")
                .replaceAll("Grounded","")
                .replaceAll("GROUNDED","")
                .replaceAll("kiko","")
            ];
        }

        let newmsg = msgs[Math.floor(Math.random() * msgs.length)];
        let wordData = tex.split(" ");
        let commonWor = ["and","some","but","for","the"];
        let msgpool = [];
        msgs.forEach(mesg => {
            if(typeof mesg !== "string")return;
            wordData.forEach(dataWor => {
                if(
                    !commonWor.some(r => dataWor.toLowerCase() == r)
                     && mesg !== tex 
                     && mesg.includes(dataWor)
                     && !mesg.includes("[[")
                     && !mesg.includes("]]")
                  )msgpool = [...msgpool,{cont:mesg,score:stringErr(mesg,tex)}];
                });
              });
              newmsg = msgs[Math.floor(Math.random() * msgs.length)]
              if(msgpool.length > 0){
              msgpool.sort((a,b)=>{return b.score-a.score;});
              msgpool = msgpool.slice(0,(4+Math.floor(this.params.maxLength/2))*(1+this.params.temperature));
              newmsg = msgpool[Math.floor(Math.random() * msgpool.length)].cont;
              }
              if(typeof newmsg == "object")newmsg = newmsg.cont;
              else newmsg = msgs[Math.floor(Math.random() * msgs.length)];
              let junct = [" and"," also"," and also"," but"," then"," because",", "];
        if(msgpool.length > 1){
            for(let i=0;i<msgpool.length;i++){
                let c = Math.random();
                let thist = msgpool[i].cont;
                if(c > (0.8-(this.params.maxLength/10)) && !newmsg.includes(thist)){
                    newmsg+=junct[Math.floor(Math.random() * junct.length)]+" "+msgpool[i].cont;
                }
            }
        }
        final = newmsg;
        msgpool = [];

        return final;
     
    }
   
}
let bonziMONKY = new Minimonky({temperature:0,maxLength:2});
console.log(bonziMONKY.out("hello monky the ai bot"));
