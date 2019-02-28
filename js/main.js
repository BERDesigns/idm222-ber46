function skipSplash() {

  document.getElementById("splash").classList.add("skip-splash");
}

function openMainMenu() {
  undoMenuPop();
  setTimeout(function(){
    document.getElementById("main-menu").style.opacity = "1";
  }, 10);
  document.getElementById("main-menu").classList.add("push-right");
  document.getElementById("main-menu").classList.remove("pop-left");
  var menuItems = document.getElementsByClassName("menu-item");
  for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add("slit-in");
    menuItems[i].classList.remove("slit-out");
  }
  document.getElementById("bear-logo-red").classList.add("slit-in");
  document.getElementById("bear-logo-red").classList.remove("slit-out");
  document.getElementById("exit-btn-img").classList.add("swirl-in");
  document.getElementById("exit-btn-img").classList.remove("swirl-out");
  document.getElementById("social-icons").classList.add("slit-in");
  document.getElementById("social-icons").classList.remove("slit-out");
}

function closeMainMenu() {
  undoMenuPop();
  document.getElementById("vl").classList.remove("fade-in");
  document.getElementById("main-menu").classList.add("pop-left");
  document.getElementById("main-menu").classList.remove("push-right");
  var menuItems = document.getElementsByClassName("menu-item");
  for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add("slit-out");
    menuItems[i].classList.remove("slit-in");
  }
  document.getElementById("bear-logo-red").classList.add("slit-out");
  document.getElementById("bear-logo-red").classList.remove("slit-in");
  document.getElementById("exit-btn-img").classList.add("swirl-out");
  document.getElementById("exit-btn-img").classList.remove("swirl-in");
  document.getElementById("social-icons").classList.add("slit-out");
  document.getElementById("social-icons").classList.remove("slit-in");
  setTimeout(function(){
    document.getElementById("main-menu").style.opacity = "0";
  }, 499);
}

function revertExplore() {
  document.getElementById("ma-project").style.top = "100%";
  setTimeout(function(){
    let root = document.documentElement;
    root.style.setProperty("--main-bg-color", "#ff3939");
    var pics = document.getElementsByClassName("red-img");
    for (var i = 0; i < pics.length; i++) {
      pics[i].style.filter = "";
    }
  }, 250);
}

function explore() {
  document.getElementById("ma-project").style.top = "0%";
  setTimeout(function(){
    let root = document.documentElement;
    root.style.setProperty("--main-bg-color", "#cf0f58");
    var pics = document.getElementsByClassName("red-img");
    for (var i = 0; i < pics.length; i++) {
      pics[i].style.filter = "hue-rotate(-25deg) brightness(80%)";
    }
  }, 250);
}

function popMenuLeft(linkEl) {
  var menuItems = document.getElementsByClassName("menu-item");
  for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("slit-out");
    menuItems[i].classList.remove("slit-in");
  }
  var menuItems = document.getElementsByClassName("menu-item");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add("pop-menu-left");
  }
  var socialMenuItems = document.getElementsByClassName("menu-item-social");
  for (var i = 0; i < socialMenuItems.length; i++) {
    socialMenuItems[i].classList.add("pop-menu-left-social");
  }
  document.getElementById("social-icons").classList.add("pop-menu-left");
  document.getElementById("vl").classList.add("fade-in");
  if (linkEl === "about") {
    document.getElementById("about-desc").classList.add("fade-in");
  }
  else if (linkEl === "contact") {
    document.getElementById("contact-desc").classList.add("fade-in");
  }
}

function undoMenuPop() {
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
  document.getElementById("about-desc").classList.remove("fade-in");
  document.getElementById("contact-desc").classList.remove("fade-in");
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
    ["BER", "BEST", "COOLEST", "NEWEST", "LATEST", "SHARPEST", "SLICKEST", "SMOOTHEST", "PUREST"])
    ;}, 8000);

document.getElementById("skip-btn").addEventListener("click", skipSplash, false);

document.getElementById("explore-btn").addEventListener("click", explore, false);

document.getElementById("hamburger").addEventListener("click", openMainMenu, false);
document.getElementById("exit-btn").addEventListener("click", closeMainMenu, false);
document.getElementById("twitter").addEventListener("click", closeMainMenu, false);
document.getElementById("linkedin").addEventListener("click", closeMainMenu, false);
document.getElementById("gmail").addEventListener("click", closeMainMenu, false);

document.getElementById("logo").addEventListener("click", function(){
  closeMainMenu();
  revertExplore();
}, false);
document.getElementById("logo-red").addEventListener("click", function(){
  closeMainMenu();
  revertExplore();
}, false);

document.getElementById("home").addEventListener("click", function(){
  closeMainMenu();
  revertExplore();
}, false);
document.getElementById("about").addEventListener("click", function(){
  undoMenuPop();
  popMenuLeft("about");
}, false);
document.getElementById("work").addEventListener("click", function(){
  closeMainMenu();
  explore();
}, false);
document.getElementById("contact").addEventListener("click", function(){
  undoMenuPop();
  popMenuLeft("contact");
}, false);

document.getElementById("contact-frm-abt-link").addEventListener("click", function(){
  undoMenuPop();
  popMenuLeft("contact");
}, false);

document.getElementById("ma-link").addEventListener("click", function(){
  revertExplore();
}, false);
