"use strict"; // Operate in strict mode

function checkStorageCart() {
	if (localStorage.getItem("products") === null) {
		document.getElementById("counter").textContent = 0
		document.getElementById("cart_head").innerHTML = "Your Cart Is Empty...";
		document.getElementById("cart_head2").innerHTML = "";
		return false;
	}
	
	else {
		console.log(localStorage.getItem("count"));
		document.getElementById("counter").textContent = localStorage.getItem("count");
		createElements();
		return true;
	}
	
}

function createElements() {
	
	// Input: Product Names and Running Total from Local Storage
	// Processing: Grabs information from user's Local Storage and creates elements for the Cart Page
	// Output: Product Information is display on the page
	
	// Setup element variables
	var gallery = document.getElementsByClassName("cart_gallery");
	var figure = '';
	var img = ''
	
	var products = getProductNames();
	
	//Create Image Elements inside gallery based off product's location in the directory
	for (var i = 0; i < products.length; i++) {
	
		//Create images 
		img = document.createElement('img');
		img.src = products[i];
		img.className = "cart_img";
		
		
		gallery[0].appendChild(img);
		
	}
	
}

function getProductNames() {
	
	var products = localStorage.getItem("products"); // Get the string of product names from local storage
	
	var productList = products.split("&"); // Split up the string of products into a list/array
	
	document.getElementsByName("products")[0].value = products; // Access the hidden "products" field and input the string of products
	
	document.getElementById("itemCount").innerHTML = productList.length; // Display the count(amount of products being ordered) on the page
	
	document.getElementById("total").innerHTML = localStorage.getItem("total"); // Display the running total from local storage on the page
	
	return productList; // Return the list of products
	
}

function clear() {
	
	localStorage.clear();
	document.getElementById("cart_head").innerHTML = "Your Cart Is Empty...";
	document.getElementById("cart_head2").innerHTML = "";
	document.getElementById("counter").textContent = 0
		
	while (document.getElementsByClassName('cart_img')[0]) {
        document.getElementsByClassName('cart_img')[0].remove();
    }
	
}

function createEventListener() {
	if (document.getElementById('clear').addEventListener) {
			
			console.log("8. For loop entered: Adding Mouse Over event listener to allImages[i]");
			document.getElementById('clear').addEventListener("click", clear, false);
			
			
		} // END ADD EVENT LISTENER
		
		// Create an event listener for allImages[i] (The current image on the page) that activates upon input - This one is for older browsers
		else if (document.getElementById('clear').attachEvent) {
			
			console.log("9. For loop entered: Adding Mouse Over event listener to allImages[i]");
			document.getElementById('clear').attachEvent("onclick", clear);
			
				
		} // END ATTACH EVENT LISTENER
	
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


function init() {
	
	// Input:		none
	// Processing:	calls other functions necessary for script initialization
	// Output:		none
	
	console.log("15. >>Entering init function...");
	createEventListener();
	checkStorageCart();
	insertCopyright();
	
	console.log("16. <<Leaving init function...");
	
}



// Create an event listener that calls the init function on load.
if (window.addEventListener) {
	
	console.log("17. > Adding TC39 Event Listener..."); // Place a console.log upon entering this IF EVENT LISTENER
	
	window.addEventListener("load", init, false);
	
} //END ADD EVENT LISTENER


// Create an event listener that calls the init function on load. (For older browsers)
else if (window.attachEvent) {
	
	console.log("18. > Adding MS Event Listener..."); // Place a console.log upon enterin this IF ATTACH EVENT
	
	window.attachEvent("onload", init);
	
} // END ATTACH EVENT LISTENER