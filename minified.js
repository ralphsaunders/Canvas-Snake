$(document).ready(function(){var a=function(){var f=document.getElementById("canvas");var l=f.getContext("2d");var u=new Array();u=j();var q=new Array();var p=20;var c=true;var o=[[87,38],[37,65],[40,83],[39,68]];var y="right";var s=new Array();s.push("1");var m=100;var e=false;var g=new Array();function h(z){if(c){if(z.which==o[0][0]||z.which==o[0][1]){y="up"}else{if(z.which==o[1][0]||z.which==o[1][1]){y="left"}else{if(z.which==o[2][0]||z.which==o[2][1]){y="down"}else{if(z.which==o[3][0]||z.which==o[3][1]){y="right"}}}}c=false}}function r(){q.push([u[0],u[1]]);if(q.length>s.length){q.splice(0,1)}}function d(z){r();if(y=="up"){z[1]-=p}else{if(y=="left"){z[0]-=p}else{if(y=="down"){z[1]+=p}else{if(y=="right"){z[0]+=p}}}}if(z[0]<0){z[0]=f.width-p}else{if(z[0]+p>f.width){z[0]=0}}if(z[1]<0){z[1]=f.height-p}else{if(z[1]+p>f.height){z[1]=0}}}function b(z){l.fillStyle="rgb( 20, 151, 245)";l.fillRect(z[0],z[1],20,20);for(i=0;i<s.length;i++){if(i<5){l.fillStyle="rgba( 20, 151, 245, 0."+(i+3)+" )"}else{l.fillStyle="rgba( 20, 151, 245, 0.7 )"}l.fillRect(q[i][0],q[i][1],20,20)}}function n(B,A){var C=B[0]<A[0]?B:A;var z=B[0]<A[0]?A:B;return C[1]>z[0]||C[0]===z[0]?true:false}function w(){if(!e){g=j();e=true}l.fillStyle="green";l.fillRect(g[0],g[1],20,20);var D=[[u[0],u[0]+20],[u[1],u[1]+20]];var B=[[g[0],g[0]+20],[g[1],g[1]+20]];var A=n(D[0],B[0]);var z=n(D[1],B[1]);var C=A&&z;if(C){l.clearRect(g[0],g[1],20,20);l.fillStyle="rgb( 20, 151, 245)";l.fillRect(g[0],g[1],20,20);e=false;s.push(toString(s.length+1));if(m>40){m-=10}}}function j(){var z=Math.round(Math.floor(Math.random()*(f.width-19))/20)*20;var A=Math.round(Math.floor(Math.random()*(f.height-19))/20)*20;return[z,A]}function k(){var D=[[u[0],u[0]+20],[u[1],u[1]+20]];for(i=0;i<s.length-1;i++){var B=[[q[i][0],q[i][0]+20],[q[i][1],q[i][1]+20]];var A=n(D[0],B[0]);var z=n(D[1],B[1]);var C=A&&z;if(C){x()}}}function t(){return m}function x(){alert("Game Over");s.splice(1,s.length-1);q.splice(1,q.length-1);m=100;var z=j();u=z}function v(){c=true;l.clearRect(0,0,f.width,f.height);$(document).keydown(function(z){h(z)});d(u);b(u);w();k();setTimeout(function(){v()},t())}return{init:function(){v()}}}();a.init()});