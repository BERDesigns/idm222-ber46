function skipSplash() {

  document.getElementById("splash").classList.add("skip-splash");
}

function openMainMenu() {
  document.getElementById("main-menu").classList.add("push-right");
  document.getElementById("main-menu").classList.remove("pop-left");
  document.getElementById("bear-logo-red").classList.add("slit-in");
  document.getElementById("bear-logo-red").classList.remove("slit-out");
  document.getElementById("exit-btn-img").classList.add("swirl-in");
  document.getElementById("exit-btn-img").classList.remove("swirl-out");
  document.getElementById("social-icons").classList.add("slit-in");
  document.getElementById("social-icons").classList.remove("slit-out");
}

function closeMainMenu() {
  document.getElementById("main-menu").classList.add("pop-left");
  document.getElementById("main-menu").classList.remove("push-right");
  document.getElementById("bear-logo-red").classList.add("slit-out");
  document.getElementById("bear-logo-red").classList.remove("slit-in");
  document.getElementById("exit-btn-img").classList.add("swirl-out");
  document.getElementById("exit-btn-img").classList.remove("swirl-in");
  document.getElementById("social-icons").classList.add("slit-out");
  document.getElementById("social-icons").classList.remove("slit-in");
  //Returns all menu items to the center of the div when the menu is closed.
  //Reminder to self: put these in a Promise for animationEnd.
  var menuItems = document.getElementsByClassName("menu-item");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("pop-menu-left");
  }
  var socialMenuItems = document.getElementsByClassName("menu-item-social");
  for (var i = 0; i < socialMenuItems.length; i++) {
    socialMenuItems[i].classList.remove("pop-menu-left-social");
  }
  document.getElementById("social-icons").classList.remove("pop-menu-left");
}

function explore() {
  let root = document.documentElement;
  root.style.setProperty("--main-bg-color", "#cf0f58");
  var pics = document.getElementsByClassName("red-img");
  for (var i = 0; i < pics.length; i++) {
    pics[i].style.filter = "hue-rotate(-25deg) brightness(80%)";
  }
}

function popMenuLeft(linkEl) {
  var menuItems = document.getElementsByClassName("menu-item");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add("pop-menu-left");
  }
  var socialMenuItems = document.getElementsByClassName("menu-item-social");
  for (var i = 0; i < socialMenuItems.length; i++) {
    socialMenuItems[i].classList.add("pop-menu-left-social");
  }
  document.getElementById("social-icons").classList.add("pop-menu-left");
  if (linkEl === "about") {
    console.log(linkEl);
  }
}

function animatedText(target, texts, changeInterval, updateInterval, onTextChanged) {
  var currentText=parseInt(Math.random()*texts.length);
  var areaText=texts[0];
  this.t1=setInterval(function(){
    var c=parseInt(Math.random()*Math.max(texts[currentText].length,
      areaText.length));
    var s=texts[currentText][c];
    if(typeof s == "undefined") {
      s=" ";
    }
    while(areaText.length<c) {
      areaText+=" ";
    }
    var newText=(areaText.slice(0,c)+s+areaText.slice(c+1)).trim();
    var diff=!(newText==areaText);
    areaText=newText;
    if(onTextChanged && diff) {
      onTextChanged();
    }
    target.innerHTML=areaText.length==0?"&nbsp;":areaText;
  }.bind(this),updateInterval?updateInterval:50);
  this.t2=setInterval(function(){
    currentText=parseInt(Math.random()*texts.length);
  }.bind(this),changeInterval?changeInterval:4000);
}
animatedText.prototype={
  constructor:animatedText,
  stop:function(){clearInterval(this.t1);clearInterval(this.t2);}
};

setTimeout(function(){
  new animatedText(document.getElementById("ber"),
    ["BER", "BEST", "COOLEST", "NEWEST", "LATEST", "SHARPEST", "SLICKEST", "SMOOTHEST", "PUREST", "HIPPEST"])
    ;}, 8000);

document.getElementById("skip-btn").addEventListener("click", skipSplash, false);

document.getElementById("explore-btn").addEventListener("click", explore, false);

document.getElementById("hamburger").addEventListener("click", openMainMenu, false);
document.getElementById("exit-btn").addEventListener("click", closeMainMenu, false);
document.getElementById("twitter").addEventListener("click", closeMainMenu, false);
document.getElementById("linkedin").addEventListener("click", closeMainMenu, false);
document.getElementById("gmail").addEventListener("click", closeMainMenu, false);

document.getElementById("about").addEventListener("click", function(){
  popMenuLeft("about");
}, false);
document.getElementById("contact").addEventListener("click", function(){
  popMenuLeft("contact");
}, false);
