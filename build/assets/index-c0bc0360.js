(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const styles="",app=document.getElementById("root");app&&(app.innerHTML="Eval Sandbox");const world={},UUID=()=>Math.random().toString(36).substring(2,15),sendMessage=o=>(console.log("Message sent to parent",o),new Promise(t=>{world[o.requestId]={resolve:t,response:null},window.parent.postMessage(o,"*")})),makeRequest=async({url:o,method:r,headers:t,data:n})=>{const e=await sendMessage({requestId:UUID(),origin:"eval-sandbox",command:"makeRequest",params:[{url:o,method:r,headers:t,data:n}]});return console.log("send message res",e),e};console.log("hello from eval-sandbox",typeof makeRequest);const messageHandler=event=>{const message=event.data;console.log("Message received from parent",event.data),message.origin==="igor"&&(message.command==="eval"?eval(message.code):message.command==="response"&&(console.log("Response received from parent",message.response,message.requestId),world[message.requestId].response=message.response,world[message.requestId].resolve(message.response)))};window.addEventListener("message",messageHandler,!1);
