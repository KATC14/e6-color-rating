// ==UserScript==
// @name          e6 color rating 6.0
// @description   rating e621 with color
// @include       https://e621.net/*
// @include       https://e926.net/*
// @include       https://e6ai.net/*
// @version       6.0
// @author        - KATC14
// @require       https://raw.githubusercontent.com/KATC14/useful/master/useful_things.js
// ==/UserScript==

function load(){
  var flexcontainer = document.querySelector(".flex-container");
  if (flexcontainer){console.log("test", flexcontainer)} else {
    var thestart = document.querySelectorAll("article.post-preview");
    for (var i = 0, max = thestart.length; i < max; i++) {
      var div = document.createElement("div");
      div.className = "flex-container";
      thestart[i].appendChild(div);
      if (thestart[i].getAttribute("data-file-ext") == 'webm' || thestart[i].getAttribute("data-tags").includes('animated')){
        if (thestart[i].getAttribute("data-tags").includes('animated')) {var awtype = 'ANIM'}
        if (thestart[i].getAttribute("data-file-ext") == 'webm') {var awtype = 'WEBM'}
        div.innerHTML += `<span class="type-badge ${awtype.toLowerCase()}">${awtype}</span>`;
      }
    //}
    //for (var i = 0, max = thestart.length; i < max; i++) {
      if (thestart[i].getAttribute("data-rating") == 's') {var ratingtag = 'SAFE';}
      if (thestart[i].getAttribute("data-rating") == 'q') {var ratingtag = 'QUESTIONABLE';}
      if (thestart[i].getAttribute("data-rating") == 'e') {var ratingtag = 'EXPLICIT';}
      if (thestart[i].childNodes[2].nodeName == '#text'){
        thestart[i].childNodes[5].innerHTML += `<span class="rating ${ratingtag.toLowerCase()}">${ratingtag}</span>`;
      }else{
        thestart[i].childNodes[2].innerHTML += `<span class="rating ${ratingtag.toLowerCase()}">${ratingtag}</span>`;
      }
    //}
    //for (var i = 0, max = thestart.length; i < max; i++) {
      //var hm = thestart[i].childNodes[0].childNodes[0].childNodes[2]

      //console.log(ComputedStyle(hm, ['border-top-color','border-right-color','border-left-color','border-bottom-color']))
      if (thestart[i].className.includes('post-status-flagged')) {
        if (thestart[i].childNodes[2].nodeName == '#text'){
          inline(thestart[i].childNodes[5], 'FLAGGED')
        }else{
          inline(thestart[i].childNodes[2], 'FLAGGED')
        }
      }
      if (thestart[i].className.includes('post-status-pending')) {
        if (thestart[i].childNodes[2].nodeName == '#text') {
          inline(thestart[i].childNodes[5], 'PENDING')
        }else{
          inline(thestart[i].childNodes[2], 'PENDING')
        }
      }
      if (thestart[i].className.includes('post-status-has-parent')) {
        if (thestart[i].childNodes[2].nodeName == '#text') {
          inline(thestart[i].childNodes[5], 'HAS-PARENT')
        }else{
          inline(thestart[i].childNodes[2], 'HAS-PARENT')
        }
      }
      if (thestart[i].className.includes('post-status-has-children')) {
        if (thestart[i].childNodes[2].nodeName == '#text') {
          inline(thestart[i].childNodes[5], 'HAS-CHILDREN')
        }else{
          inline(thestart[i].childNodes[2], 'HAS-CHILDREN')
        }
      }
      if (thestart[i].className.includes('post-status-deleted')) {
        if (thestart[i].childNodes[2].nodeName == '#text') {
          inline(thestart[i].childNodes[5], 'DELETED')
        }else{
          inline(thestart[i].childNodes[2], 'DELETED')}
      }
    }
  }
  var stylecode1 = `
.webm, .anim{  background: #1f3c67}
.safe{         background: #3e9e49}
.questionable{ background: #e4e150}
.explicit{     background: #e45f5f}
.pending{      background: #0000ff}
.has-parent{   background: #cccc00}
.has-children{ background: #00ff00}
.deleted{      background: #000000}
.flagged{      background: #4d0000}

.flex-container{
  display: flex;
  flex-direction: column;
  align-Items: flex-start;
  position: absolute;
  top: 10px;
}
.outline, .type-badge, .rating{
  z-index: 5;
  color:#fff;
  text-align: center;
  border-radius: 5px;
  padding: 0px 5px;
  font-size: 60%;
  font-weight: 700;
  border: 1px solid #fff;
}
article.post-preview[data-file-ext='webm'] > a::before,
article.post-preview[data-tags~='animated'] > a::before {
  display:none;
}`
  addGlobalStyle(stylecode1)
}
load()
function inline(origin, outline){
  origin.innerHTML += `<span class="outline ${outline.toLowerCase()}">${outline}</span>`;
}
