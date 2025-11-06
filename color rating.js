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
    var thestart = document.querySelectorAll("article.thumbnail");
    for (var i = 0, max = thestart.length; i < max; i++) {
      var div = document.createElement("div");
      div.className = "flex-container";
      if (thestart[i].getAttribute("data-file-ext") == 'webm' || thestart[i].getAttribute("data-tags").search(/\banimated\b/) >= 0){
        if (thestart[i].getAttribute("data-tags").includes('animated')) { var awtype = 'ANIM' }
        if (thestart[i].getAttribute("data-file-ext") == 'webm') {        var awtype = 'WEBM' }
        div.innerHTML += `<span class="mod_type-badge mod_${awtype.toLowerCase()}">${awtype}</span>`;
      }
    //}
    //for (var i = 0, max = thestart.length; i < max; i++) {
      if (thestart[i].getAttribute("data-rating") == 's') {var ratingtag = 'SAFE';}
      if (thestart[i].getAttribute("data-rating") == 'q') {var ratingtag = 'QUESTIONABLE';}
      if (thestart[i].getAttribute("data-rating") == 'e') {var ratingtag = 'EXPLICIT';}
      div.innerHTML += `<span class="mod_rating mod_${ratingtag.toLowerCase()}">${ratingtag}</span>`;
    //}
    //for (var i = 0, max = thestart.length; i < max; i++) {
      //var hm = thestart[i].childNodes[0].childNodes[0].childNodes[2]

      //console.log(ComputedStyle(hm, ['border-top-color','border-right-color','border-left-color','border-bottom-color']))
      if (thestart[i].className.includes('flagged')) {      div.innerHTML += inline('FLAGGED') }
      if (thestart[i].className.includes('pending')) {      div.innerHTML += inline('PENDING') }
      if (thestart[i].className.includes('has-parent')) {   div.innerHTML += inline('HAS-PARENT') }
      if (thestart[i].className.includes('has-children')) { div.innerHTML += inline('HAS-CHILDREN') }
      if (thestart[i].className.includes('deleted')) {      div.innerHTML += inline('DELETED') }
      thestart[i].childNodes[1].appendChild(div);
    }
  }
  var stylecode1 = `
.mod_webm, .mod_anim{  background: #1f3c67}
.mod_safe{         background: #3e9e49}
.mod_questionable{ background: #e4e150}
.mod_explicit{     background: #e45f5f}
.mod_pending{      background: #0000ff}
.mod_has-parent{   background: #cccc00}
.mod_has-children{ background: #00ff00}
.mod_deleted{      background: #000000}
.mod_flagged{      background: #4d0000}

.flex-container{
  display: flex;
  flex-direction: column;
  align-Items: flex-start;
  position: absolute;
  top: 10px;
}
.mod_outline, .mod_type-badge, .mod_rating{
  z-index: 5;
  color:#fff;
  text-align: center;
  border-radius: 5px;
  padding: 0px 5px;
  font-size: 60%;
  font-weight: 700;
  border: 1px solid #fff;
}
article.thumbnail[data-file-ext='webm'] > a::after,
article.thumbnail[data-tags~='animated'] > a::after {
  display:none;
}`
  addGlobalStyle(stylecode1)
}
load()
function inline(outline){ return `<span class="mod_outline mod_${outline.toLowerCase()}">${outline}</span>`; }
