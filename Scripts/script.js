function checkStorage() {
	
	//Set the counter of the cart to 0 if the storage is empty
	if (localStorage.getItem("count") === null) {
		localStorage.setItem("count", 0);
		document.getElementById("counter").textContent = 0 // Update the counter on the page
		return;
	}
	
	//If the storage is not empty, set the cart counter to the count that is stored in the user's local storage
	else {
		
		document.getElementById("counter").textContent = localStorage.getItem("count");
		return;
	}
	
}

function insertCopyright()
{
	 // Input: none
	 // Processing: Calculates current year
	 // Output: Places current year in footer after copyright symbol
	 
	console.log("1. >>Entering insertCopyright")

	var currentYear = new Date().getFullYear();
	var dateContainer = document.getElementById("copyright");
	dateContainer.innerHTML = currentYear;
	
	console.log("2. << Leaving insertCopyright")
} // end FUNCTION insertCopyright()


function main() {
	checkStorage();
	insertCopyright();
}


// Create an event listener that calls the init function on load.
if (window.addEventListener) {
	
	console.log("17. > Adding TC39 Event Listener..."); // Place a console.log upon entering this IF EVENT LISTENER
	
	window.addEventListener("load", main, false);
	
} //END ADD EVENT LISTENER


// Create an event listener that calls the init function on load. (For older browsers)
else if (window.attachEvent) {
	
	console.log("18. > Adding MS Event Listener..."); // Place a console.log upon enterin this IF ATTACH EVENT
	
	window.attachEvent("onload", main);
	
} // END ATTACH EVENT LISTENER