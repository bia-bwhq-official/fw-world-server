// Danielius Paulavičius
// Created by SgtDiscordWorld
// Created in 2021-10-09
// Updated 9/2/2024 by Epicbvll999
// sgtelement.js
// Animated Function Style Innovaction Tool - The Code

// version v1.2.0 Alpha

"use strict"

function sgt(){
	console.warn('No function executed. Please enter ".prototype." first.\nExample: "sgt.prototype.zap(double quote elements)"')
	
	this.prototype.rotate = function(a){
		var eee1 = 0; setInterval(function(){
			document.getElementById(a).style.transform = "rotate(" + eee1 + "deg)";eee1++;
		}, 20)
		}
		
	this.prototype.shake = function(a){
		setInterval(function(){
			document.getElementById(a).style.transform = "scale(" + Math.floor(Math.random()*6) + ", " + Math.floor(Math.random()*6) + ")";
		}, 1);
		}
		
	this.prototype.zap = function(a){
		var colorzap = ['cyan','blue','yellow','transparent'];
		setInterval(function(){document.getElementById(a).style.background = colorzap[Math.floor(Math.random()*colorzap.length)]; document.getElementById(a).style.color = colorzap[Math.floor(Math.random()*colorzap.length)]}, 600);
		}
		
	this.prototype.waitingMouse = function(){
		var x, i;   x = document.querySelectorAll("*");   for (i = 0; i < x.length; i++) {x[i].style.cursor = "wait"}
		}
		
	this.prototype.waitingMouseRestore = function(){
		var x, i;   x = document.querySelectorAll("*");   for (i = 0; i < x.length; i++) {x[i].style.cursor = "auto"}
		}
		
	this.prototype.disable = function(a){
		var ea1 = document.getElementById(a)
		ea1.disabled = "true";
		}
		
	this.prototype.enable = function(a){
		var ea1 = document.getElementById(a)
		ea1.disabled = "false";
		}
		
	this.prototype.popup = function(a){
		var eee1 = 0;
		var eee3 = 0;
		var eee2 = setInterval(function(){document.getElementById(a).style.transform = "scale(" + eee1 + ")";document.getElementById(a).style.opacity = eee3 + "%";eee1++/100;eee3++;eee3++;eee3++;eee3++;eee3++;eee3++;eee3++;eee3++;eee3++;eee3++;}, 20);
		setTimeout(function(){clearInterval(eee2);document.getElementById(a).style.transform = "scale(1)";document.getElementById(a).style.opacity = "100%"}, 130);
		}
	
	this.prototype.disableGray = function(a){
		var eee1 = 0;
		var eeee1 = setInterval(function(){document.getElementById(a).style.filter = "grayscale(" + eee1 + "%)";eee1++;}, 1);
		setTimeout(function(){clearInterval(eeee1);var ea1 = document.getElementById(a);ea1.disabled = "true";}, 1000)
		}
		
	this.prototype.cameraShot = function(a){
		document.getElementById(a).style.background = "white";
		document.getElementById(a).style.filter = "blur(4px)";
		document.getElementById(a).style.transition = "1s";
		setTimeout(function(){document.getElementById(a).style.background = "transparent";document.getElementById(a).style.filter = "blur(0px)";}, 500);
		setTimeout(function(){document.getElementById(a).style.transition = "0s";}, 2000);
		}
		
	this.prototype.blurInappropriate = function(a){
		var eee1 = 0;
		document.getElementById(a).style.transition = "1s";
		var eeee1 = setInterval(function(){document.getElementById(a).style.filter = "blur(" + eee1 + "px)";eee1++;}, 200);
		setTimeout(function(){clearInterval(eeee1);var ea1 = document.getElementById(a);ea1.disabled = "true";}, 1000)
		}
		
	this.prototype.banInappropriate = function(a){
		var eee1 = 0;
		document.getElementById(a).style.transition = "1s";
		var eeee1 = setInterval(function(){document.getElementById(a).style.filter = "blur(" + eee1 + "px)";eee1++;}, 200);
		setTimeout(function(){clearInterval(eeee1);var ea1 = document.getElementById(a);ea1.onclick = function() { alert('You\'re not allowed to see NSFW in this page, disabling element'); ea1.innerHTML = "<p id='ban' style='color:white;background:red;'>BANNED ELEMENT!!!</p>"; document.getElementById(a).style.filter = "blur(0px)"};}, 1000)
		}
		
	this.prototype.warnInappropriate = function(a){
		var eee1 = 0;
		document.getElementById(a).style.transition = "1s";
		var eeee1 = setInterval(function(){document.getElementById(a).style.filter = "blur(" + eee1 + "px)";eee1++;}, 200);
		setTimeout(function(){clearInterval(eeee1);var ea1 = document.getElementById(a);ea1.onclick = function() { var conddd = confirm('This element/image contains NSFW. Proceed anyway?'); if(conddd===true){document.getElementById(a).style.filter = "blur(0px)"} else {null;} }}, 1000)
		}
		
	this.prototype.pop = function(a){
		var eee1 = 0;
		var eee4 = 90;
		document.getElementById(a).style.transition = "1s";
		var eeee1 = setInterval(function(){document.getElementById(a).style.transform = "scale(" + eee1 + ")";document.getElementById(a).style.opacity = "0." + eee4;eee1++;eee4--;}, 20);
		setTimeout(function(){clearInterval(eeee1);var ea1 = document.getElementById(a);ea1.remove()}, 1000)
		}
		
	this.prototype.squash = function(a,b){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.transform = "scaleY(" + b + ")";
		}
		
	this.prototype.squeeze = function(a,b){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.transform = "scaleX(" + b + ")";
		}
		
	this.prototype.flop = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.transform = "scaleX(-1)";
		}
		
	this.prototype.waitForget = function(a){
		var colorzap2 = ['silver','grey','white','transparent','linen'];
		document.getElementById(a).style.transition = "0.2s";
		var dedede = setInterval(function(){document.getElementById(a).style.background = colorzap2[Math.floor(Math.random()*colorzap2.length)];}, 150);
		setTimeout(function(){clearInterval(dedede);var kekeke = document.getElementById(a); kekeke.focus(); document.getElementById(a).style.background = "transparent";}, 1500);
		}
	
	this.prototype.error = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.border = "5px solid red";
		}
		
	this.prototype.success = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.border = "5px solid lime";
		}
		
	this.prototype.info = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.border = "5px solid blue";
		}
		
	this.prototype.okay = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.border = "5px solid orange";
		}
		
	this.prototype.normal = function(a){
		document.getElementById(a).style.transition = "1s";
		document.getElementById(a).style.border = "0px solid transparent";
		}
		
	this.prototype.clickSim = function(a){
		document.getElementById(a).style.transition = "0.1s";
		document.getElementById(a).style.border = "3px groove black";
		setTimeout(function(){document.getElementById(a).style.border = "0px groove black";}, 500);
		var dede = document.getElementById(a); dede.click();
		}
		
	this.prototype.magicDelete = function(a){
		var dede = document.getElementById(a); dede.remove();
		console.warn("Removed " + a)
		}
		
	this.prototype.fullscreen = function(a){
		var dede = document.getElementById(a); dede.requestFullscreen();
		}
}


	
// end of script
