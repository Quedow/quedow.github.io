var greenBarW = window.innerWidth;
var height = window.innerHeight; 

// -----------------------------------------MOVING-BUTTON-------------------------------------------

var movingBtn = document.getElementById("movingBtn");
var translateBtn = false;

movingBtn.onmouseover = function(){
	fleeMouse(movingBtn); 
};

function fleeMouse(element) {
	translateBtn = !translateBtn;
	var margin = 15;

	if(translateBtn){
		element.style.left = document.getElementById("main").clientWidth - element.clientWidth - margin + 'px';
	}else{
		element.style.left = 0 + margin + 'px';
	}
}

// -----------------------------------------ADS-------------------------------------------

function openPopupAds(){
	openPopup('popupCB', 'popupCbTitle', 'Ads based on your data', 'popupCbText', 'See more ads of this type?');
	document.getElementById("errorSound").play();
}

// -----------------------------------------POPUP-------------------------------------------

function openPopup(id, titleId, title, textId, text){
	if(title != null && text != null){
		document.getElementById(titleId).textContent = title;
		document.getElementById(textId).textContent = text;
	}
	document.getElementById(id).classList.toggle("active");
}

function closePopup(id){
	document.getElementById(id).classList.toggle("active");
	loadPage();
}

// ---------------------------------CHECK-BOX-POPUP-------------------------------------------

document.getElementById("confirmPopupCB").onclick = function(){
	if(document.getElementById("confirmCB").checked){
		document.getElementById("popupCB").classList.toggle("active");
		document.getElementById("confirmCB").checked = false;
	}
	loadPage();
}

// ---------------------------------COOKIES-POPUP-------------------------------------------

/*function openCookies(){ // display cookies popup panel
	document.getElementById("cookiePopup").classList.add("active");
}*/

document.getElementById("confirmCookies").onclick = function(){
	if(document.getElementById("noCookies").checked){
		window.location.href = "error.html";
	}else{
		document.getElementById("cookiePopup").classList.toggle("active");
		loadPage();
	}
}

// ---------------------------------CAPTCHA-POPUP-------------------------------------------

var captchaSize = 5;
var captchaText;

function openCaptcha(){
	resetCaptcha();
	document.getElementById("captcha").classList.toggle("active");

	document.addEventListener('keydown', (event) => {
		if(event.key.toLowerCase() == 'enter'){
			if(document.getElementById("textField").value == captchaText){
				document.getElementById("textField").value = "Enter to verify";
				document.getElementById("captcha").classList.toggle("active");
				document.getElementById("textField").style.color = 'grey';
				loadPage();
			}else{
				document.getElementById("textField").style.color = 'red';
			}
		}
	}, false);
}

document.getElementById("refreshCaptcha").onclick = function(){
	if(captchaSize < 20){
		captchaSize++;
	}
	captchaText = randomizeText(captchaSize);
}

function randomizeText(size){
	var captchaText = "";
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < size; i++) {
		captchaText += characters.charAt(Math.random() * characters.length);
	}
	document.getElementById("randomText").textContent = captchaText;
	return captchaText;
}

function resetCaptcha(){
	captchaSize = 5;
	captchaText = randomizeText(captchaSize);
	document.getElementById("textField").style.color = 'grey';
}

// ---------------------------------ALERT-------------------------------------------

function openAlert(text){
	document.getElementById("notificationSound").play();
	alert(text);
}

// ---------------------------------CURSOR-------------------------------------------

document.addEventListener("mousemove", function(){
	document.getElementById("cursor").style.left = event.clientX - 15 + 'px';
	document.getElementById("cursor").style.top = event.clientY - 15 + 'px';
}); 

document.addEventListener("click", function(){
	playAudio();
});

function playAudio() { 
	document.getElementById("cursorSound").play(); 
}

// ---------------------------------LOADING-PAGE---------------------------------------

/*document.addEventListener("click", function(){ // display loading page each time, left click on mouse is done
	loadPage();
});*/

function loadPage(){
	document.getElementById("loadingPage").style.display = "block";

	setTimeout(function(){
		document.getElementById("loadingPage").style.display = "none";
	}, Math.random() * 4000); 
}

// -----------------------------------DATE-------------------------------------------

setInterval(function(){
	document.getElementById("dateTime").textContent = new Date();
}, 1000);

// -----------------------------------DATA-COLLECT-------------------------------------

var nbOfClick = 0;

document.addEventListener("click", function(){
	nbOfClick++;
	document.getElementById("nbOfClickText").textContent = "Number of click: " + nbOfClick;
});

var products = document.getElementsByClassName("product");
var pdTimeTexts = document.getElementsByClassName("timeOverProduct");
var timeOver;

window.onload = (event) => {
	document.getElementById("cookiePopup").classList.toggle("active");
	
	for (let i = 0; i < products.length; i++) {
		pdTimeTexts[i].textContent = products[i].getElementsByTagName("h3")[0].innerHTML + ': 0 s';
	}
};

for (let i = 0; i < products.length; i++) {
	products[i].addEventListener("mouseenter", function(){
		timeOver = Math.round(new Date().getTime() / 1000);
	});

	products[i].addEventListener("mouseleave", function(){
		timeOver = Math.abs(timeOver - Math.round(new Date().getTime() / 1000));

		try {
			timeOver = timeOver + getTime(pdTimeTexts[i]);
		} catch (error) {
			timeOver = timeOver;
		}		

		pdTimeTexts[i].textContent = products[i].getElementsByTagName("h3")[0].innerHTML + ': ' + timeOver + ' s';
		updateFavorite();
	});
}

function updateFavorite(){
	var productTimes = new Array(products.length).fill(0);
	
	for (let i = 0; i < pdTimeTexts.length; i++) {
		pdTimeTexts[i].style.fontWeight = 'normal';
		try {
			productTimes[i] = getTime(pdTimeTexts[i]);
		} catch (error) { }
	}

	pdTimeTexts[productTimes.indexOf(Math.max(...productTimes))].style.fontWeight = 'bold';
}

function getTime(element){
	return parseInt(element.textContent.split(': ')[1].split(" ")[0])
}

var buttonClasses = ['button', 'close', 'details', 'confirmCookies', 'withoutDecoration'];
var buttons;

for (let i = 0; i < buttonClasses.length; i++) {
	
	buttons = document.getElementsByClassName(buttonClasses[i]);
	for (let j = 0; j < buttons.length; j++) {
		buttons[j].addEventListener("click", function(){
			lastButtonTime();
		});
	}
}

function lastButtonTime(){
	var date = new Date();
	document.getElementById("lastButtonText").textContent = `Last button: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// -----------------------------------------VIRUS-INSTALLATION-------------------------------------------

var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d");

var border = 15;
var loadBkgH = 50;
var loadBkgW = canvas.width-4*border;
var loadBarH = 30;
var loadBarW = canvas.width-6*border;

var counter = 0;
var drawImage = true;

drawStaticObjects("Installing the virus...");
drawDynamicImages();

function drawStaticObjects(text){
	// Canvas
	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Canvas stroke
	context.strokeStyle = '#848484';
	context.lineWidth = border;
	context.strokeRect(border/2, border/2, canvas.width-border, canvas.height-border);

	// Centered text
	context.font = "20px system-ui";
	context.textAlign = 'center';
	context.fillStyle = '#000000';
	context.fillText(text, centerX(0), canvas.height/2.4);

	// Loading bar stroke
	context.fillStyle = '#848484';
	context.fillRect(centerX(loadBkgW), centerY(loadBkgH), loadBkgW, loadBkgH);

	// Loading bar background
	context.fillStyle = '#e2e2e2';
	context.fillRect(centerX(loadBarW), centerY(loadBarH), loadBarW, loadBarH);
}

function drawDynamicImages(){
	counter+= 1;
	if(counter%100 == 0){
		drawImage = !drawImage;
	}

	if(drawImage){
		context.drawImage(document.getElementById("virus_red"), centerX(140), canvas.height/6.4, 140, 100);
		context.drawImage(document.getElementById("virus_red"), centerX(140), canvas.height/1.45, 140, 100);
	}
}

var canvasAniId = requestAnimationFrame(canvasAnimation);

var greenBarW = 1;
var greenBarWMax = 70;
var xInit = 3*border-greenBarW/2;
var xPos = 3*border-greenBarW/2;
var yPos = centerY(loadBarH);
var xSpeed = 1;

function canvasAnimation(){	
	canvasAniId = requestAnimationFrame(canvasAnimation);

	if(xPos >= canvas.width-3*border-greenBarW){
		greenBarW--;
		if(xPos >= canvas.width-3*border){
			greenBarW = 1
			xPos = 3*border-greenBarW/2;
		}
	}

	if(xPos == xInit && greenBarW < greenBarWMax){	
		greenBarW++;
	}else{
		xPos += xSpeed;
	}

	drawStaticObjects("Installing the virus...");
	drawDynamicImages();
	
	context.fillStyle =  `rgb(255, 0, 0)`;
	context.fillRect(xPos, yPos, greenBarW, loadBarH);
}

document.getElementById('virusButton').onclick = function() {
	cancelAnimationFrame(canvasAniId);

	drawStaticObjects('Successfully installed!')
	context.drawImage(document.getElementById("virus_green"), centerX(140), canvas.height/6.4, 140, 100);
	context.drawImage(document.getElementById("virus_green"), centerX(140), canvas.height/1.45, 140, 100);

	context.fillStyle = `rgb(0, 255, 0)`;
	context.fillRect(centerX(loadBarW), centerY(loadBarH), loadBarW, loadBarH);
}

function centerX(width){
	return canvas.width/2 - width/2;
}

function centerY(height){
	return canvas.height/2 - height/2;
}

// -----------------------------------OTHER-------------------------------------------

function goToHome(){
	window.location.href = "https://home.konkuk.ac.kr/~jyku/finalGallery2022.html";
}

setTimeout(goToHome, 1000*60*10);

function print(text){ console.log(text); }