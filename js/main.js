// Initializing global variables
var projTop = [0, 100, 200, 300, 400]; // The top value (in %) of each of the project divs.
var projTopTablet = [10, 110, 210, 310, 410]; // The top value (in %) of each of the project divs on Tablet / Mobile.
var tabletWatch = window.matchMedia("screen and (max-aspect-ratio: 1/1)");
var phoneWatch = window.matchMedia("screen and (max-aspect-ratio: 2/1)");

// Changing out picutres depending on if the user is on a Tablet / Mobile.
if (tabletWatch.matches) {
  document.getElementById("bear-logo").src = "img/logo/bear_red.svg";
}

// Function: Skip the splash screen.
function skipSplash() {
  document.getElementById("splash").classList.add("skip-splash");
}

// Function: Open up the main menu.
function openMainMenu() {
  undoMenuPop();
  setTimeout(function(){
    document.getElementById("main-menu").style.opacity = "1";
  }, 10);
  // If the user is on Tablet / Mobile, the menu slides opened downward. Otherwise, it slides rightwards.
  if (tabletWatch.matches) {
    document.getElementById("main-menu").classList.add("push-down");
    document.getElementById("main-menu").classList.remove("pop-up");
  }
  else {
    document.getElementById("main-menu").classList.add("push-right");
    document.getElementById("main-menu").classList.remove("pop-left");
  }
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


// Function: Close the main menu.
function closeMainMenu() {
  undoMenuPop();
  document.getElementById("vl").classList.remove("fade-in");
  // If the user is on Tablet / Mobile, the menu slides closed upward. Otherwise, it slides leftwards.
  if (tabletWatch.matches) {
    document.getElementById("main-menu").classList.add("pop-up");
    document.getElementById("main-menu").classList.remove("push-down");
    console.log("this shit works!");
  }
  else {
    document.getElementById("main-menu").classList.add("pop-left");
    document.getElementById("main-menu").classList.remove("push-right");
  }
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

// Function: When the user goes from a project to Home, revert
// all the variables and styles back to their original properties.
function revertExplore() {
  document.getElementById("title-card").style.opacity = 1;
  projTop = [0, 100, 200, 300, 400];
  projTopTablet = [10, 110, 210, 310, 410];
  document.getElementById("cur").innerHTML = "1";
  document.getElementById("ma-project").style.top = "100%";
  document.getElementById("dp-project").style.top = "200%";
  document.getElementById("cc-project").style.top = "300%";
  document.getElementById("nw-project").style.top = "400%";
  document.getElementById("abol-project").style.top = "500%";
  var projScrollItems = document.getElementsByClassName("sidenav-proj-scroll");
  for (var i = 0; i < projScrollItems.length; i++) {
    projScrollItems[i].style.opacity = "1";
    projScrollItems[i].classList.add("fade-out");
    projScrollItems[i].classList.remove("fade-in");
  }
  setTimeout(function(){
    let root = document.documentElement;
    root.style.setProperty("--main-bg-color", "#ff3939");
    var pics = document.getElementsByClassName("red-img");
    for (var i = 0; i < pics.length; i++) {
      pics[i].style.filter = "";
    }
  }, 250);
  setTimeout(function(){
    for (var i = 0; i < projScrollItems.length; i++) {
      projScrollItems[i].style.display = "none";
    }
  }, 10);
}

// Function: When the user clicks "EXPLORE", bring all the tabs upward.
function explore() {
  pushProj(false, true); // Push all the projects upward in the browser.
  var projScrollItems = document.getElementsByClassName("sidenav-proj-scroll");
  for (var i = 0; i < projScrollItems.length; i++) {
    projScrollItems[i].style.opacity = "0";
    projScrollItems[i].style.display = "block";
    projScrollItems[i].classList.remove("fade-out");
    projScrollItems[i].classList.add("fade-in");
  }

  setTimeout(function(){
    document.getElementById("title-card").style.opacity = 0;
  }, 500);
}


// Function: Push all the project divs upward. IsUp is a bool for if the user is
// clicks the up arrow or down arrow. IsFromExplore is just a bool to check if
// this funtion is being called from the explore() function.
function pushProj(isUp, isFromExplore) {
  var curProj = document.getElementById("cur");
  var curNum = parseInt(curProj.innerHTML);
  var closeAllProjs = false;
  var hexStr = "";
  var hueDegStr = "";
  var brightStr = "";
  var grayStr = "";
  // If the users presses the up arrow and the current viewed project is the
  // first one, return the user to the Home page.
  if (isUp == true && curNum == 1) {
    revertExplore();
    closeAllProjs = true;
  }
  // Else, if the user presses up, return the user to the previous Project div
  // in the list of Projects.
  else if (isUp == true) {
    curNum -= 1;
    for (var i = 0; i < projTop.length ; i++) {
      projTop[i] = projTop[i]+100;
      projTopTablet[i] = projTopTablet[i]+100;
    }
  }
  // Else, if the user clicks the down arrow and is not on the final project,
  // bring them to the next Project div.
  else if (isUp == false && curNum < 5 && isFromExplore == false) {
    curNum += 1;
    for (var i = 0; i < projTop.length ; i++) {
      projTop[i] = projTop[i]-100;
      projTopTablet[i] = projTopTablet[i]-100;
    }
  }
  console.log(projTop);
  // If the user is on a Tablet or Phone, move the divs accordingly.
  if(tabletWatch.matches) {
    document.getElementById("ma-project").style.top = `${projTopTablet[0]}%`;
    document.getElementById("dp-project").style.top = `${projTopTablet[1]}%`;
    document.getElementById("cc-project").style.top = `${projTopTablet[2]}%`;
    document.getElementById("nw-project").style.top = `${projTopTablet[3]}%`;
    document.getElementById("abol-project").style.top = `${projTopTablet[4]}%`;
  }
  // Else, move the divs as if the user is on the desktop.
  else {
    document.getElementById("ma-project").style.top = `${projTop[0]}%`;
    document.getElementById("dp-project").style.top = `${projTop[1]}%`;
    document.getElementById("cc-project").style.top = `${projTop[2]}%`;
    document.getElementById("nw-project").style.top = `${projTop[3]}%`;
    document.getElementById("abol-project").style.top = `${projTop[4]}%`;
  }
  // Set the UI elements to match the colors of the current Project div.
  if (curNum == 1) {
    hexStr = "#cf0f58";
    hueDegStr = "-25";
    brightStr = "80";
    grayStr = "0";
  }
  else if (curNum == 2) {
    hexStr = "#8b8b8b";
    hueDegStr = "-25";
    brightStr = "150";
    grayStr = "100";
  }
  else if (curNum == 3) {
    hexStr = "#81368c";
    hueDegStr = "-70";
    brightStr = "70";
    grayStr = "0";
  }
  else if (curNum == 4) {
    hexStr = "#0083ab";
    hueDegStr = "200";
    brightStr = "105";
    grayStr = "0";
  }
  else {
    hexStr = "#864a42";
    hueDegStr = "30";
    brightStr = "65";
    grayStr = "30";
  }
  setTimeout(function(){
    let root = document.documentElement;
    root.style.setProperty("--main-bg-color", hexStr);
    var pics = document.getElementsByClassName("red-img");
    for (var i = 0; i < pics.length; i++) {
      pics[i].style.filter = `hue-rotate(${hueDegStr}deg) brightness(${brightStr}%) grayscale(${grayStr}%)`;
    }
  }, 250);
  // Set the counter viewable on the page to the correct #.
  curProj.innerHTML = curNum;
  // If the user goes back to the Home page, recall revertExplore.
  // This matches LN 134 - 137, but is necessary to make sure everything looks
  // as intended.
  if (isUp == true && curNum == 1 && closeAllProjs == true) {
    revertExplore();
  }
}

// Function: Pop the menu items inside the main menu leftward if the user
// clicks the "About" or "Contact" section.
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

// Function: On menu close, revert all of the menu items back to their
// original positions.
function undoMenuPop() {
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

// Function: Some text animation to add flare to the project.
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
  }.bind(this),updateInterval?updateInterval:25);
  this.t2=setInterval(function(){
    currentText=parseInt(Math.random()*texts.length);
  }.bind(this),changeInterval?changeInterval:4000); // How long is takes (max) for the string to change.
}
animatedText.prototype={
  constructor:animatedText,
  stop:function(){clearInterval(this.t1);clearInterval(this.t2);}
};

// Every 12 seconds, switch "BER" in "THE BER DESIGNS" with one of the words in the string, chosen randomly.
setTimeout(function(){
  new animatedText(document.getElementById("ber"),
    ["BER", "BEST", "COOLEST", "NEWEST", "LATEST", "SHARPEST", "SLICKEST", "SMOOTHEST", "PUREST"])
    ;}, 12000);

// All of the Event Listeners for buttons and such on the HTML.
document.getElementById("skip-btn").addEventListener("click", skipSplash, false);

document.getElementById("explore-btn").addEventListener("click", explore, false);

document.getElementById("hamburger").addEventListener("click", openMainMenu, false);
document.getElementById("exit-btn").addEventListener("click", closeMainMenu, false);
document.getElementById("twitter").addEventListener("click", closeMainMenu, false);
document.getElementById("linkedin").addEventListener("click", closeMainMenu, false);
document.getElementById("gmail").addEventListener("click", closeMainMenu, false);

document.getElementById("mobile-logo").addEventListener("click", function(){
  closeMainMenu();
  revertExplore();
}, false);
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
document.getElementById("dp-link").addEventListener("click", function(){
  revertExplore();
}, false);
document.getElementById("cc-link").addEventListener("click", function(){
  revertExplore();
}, false);
document.getElementById("nw-link").addEventListener("click", function(){
  revertExplore();
}, false);
document.getElementById("abol-link").addEventListener("click", function(){
  revertExplore();
}, false);

document.getElementById("proj-up").addEventListener("click", function(){
  pushProj(true, false);
}, false);
document.getElementById("proj-down").addEventListener("click", function(){
  pushProj(false, false);
}, false);
