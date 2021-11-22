"use strict"; // Operate in strict mode

var userName;
var userAddress;
var userCity;
var userState;
var userPostal;
var userPhone;
var userEmail;
var userMessage;
//variable for hidden errorMessage <p> element
var errorMessage = document.getElementById("errorMessage");

/*
  This function calls all other functions and returns false
  to cancel the order submission if there are any issues.
*/
function checkForm() {
	//variables to hold contents of user input
	userName = document.getElementById("userName").value;
	userAddress = document.getElementById("userAddress").value;
	userCity = document.getElementById("userCity").value;
	userState = document.getElementById("userState").value;
	userPostal = document.getElementById("userPostal").value;
	userPhone = document.getElementById("userPhone").value;
	userEmail = document.getElementById("userEmail").value;
	userMessage = document.getElementById("userMessage").value;
	//escape arrow chars
	escapeHTMLCharacters();
	//check email, cancel submission if invalid
	if (!checkEmail()){
		return false;
	}
	//if email is valid, proceed with submission
	return true;
}

//This function escapes arrow characters to help prevent code injection and accidental user use.
function escapeHTMLCharacters() {
	userName.replace("<","&lt;");
	userName.replace(">","&gt;");
	userAddress.replace("<","&lt;");
	userAddress.replace(">","&gt;");
	userCity.replace("<","&lt;");
	userCity.replace(">","&gt;");
	userState.replace("<","&lt;");
	userState.replace(">","&gt;");
	userPostal.replace("<","&lt;");
	userPostal.replace(">","&gt;");
	userEmail.replace("<","&lt;");
	userEmail.replace(">","&gt;");
	userPhone.replace("<","&lt;");
	userPhone.replace(">","&gt;");
	if (userMessage !== "") {
		userMessage.replace("<","&lt;");
		userMessage.replace(">","&gt;");
	}
}

//check the email used to ensure it is in a proper format (contains @, and a period).
function checkEmail() {
	//check to see if "@" or "." character is in a non-empty email string. If so, valid
	if (!(userEmail === "") && ((userEmail.includes("@")) && (userEmail.includes(".")))) {
		return true;
	//If lacking @ & . it will reject email.
	} else {
		errorMessage.innerHTML = "ERROR: Your email address is invalid. Please check and try again.";
		return false;
	}
}