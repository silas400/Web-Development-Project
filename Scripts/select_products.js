"use strict"; // Operate in strict mode

var count = 0

function addProduct() {
	
	addName(); // Add the file name/location of the clicked product into local storage
	
	updateCart(); // Update the counter of the cart
	
	updateTotal(); // Update the running total of the products the user has clicked
}


function addName() {
	
	//Input: None
	/*Processing: This function sets the value of the local storage holding product name to the current clicked product
				   or it concatenates to an existing product*/
	/*Output: The name of the clicked product will either be set as the value of local storage for product names or concatenated
			  to an existing product name depending on the condition of the local storage */
			  

	var name = event.target.name
	
	// If the storage is empty, add in the name of the prodoct that the user just clicked.
	if (localStorage.getItem("products") === null) {
		localStorage.setItem("products", event.target.id);
	}
	
	// If the storage is not empty, add in the product the user just clicked AFTER the product name that is already set in local storage
	else {
		console.log(event.target.name);
		localStorage.setItem("products", localStorage.getItem("products") + "&" + event.target.id);
	}
	
}

function updateCart() {
	
	// Input: None
	// Processing: This function will take the current number of the cart counter from user's local storage and increment it by 1
	// Output: The result will be updated onto the page and will also be stored in user's local storage
	
	console.log("21. >>Entering updateCart function...");
	
	count = parseInt(localStorage.getItem("count")) //Stores the integer value of the count in a variable
	
	count += 1 //Increment the count by 1
	document.getElementById("counter").textContent = count
	
	localStorage.setItem("count", count);
	
	console.log("22. <<Leaving updateCart function...");
}

function updateTotal() {
	
	// Input: The price of the clicked product
	// Processing: This function will take the price of the product of the product that has been clicked and update the running total
	// Output: Result goes into user's local storage
	
	console.log("19. >>Entering updateTotal function...");
	
	var price = '0'; // Intalize the price variable
	
	//Figure out whether its a drawing or charm to set the correct price
	if (event.target.classList.contains('drawing')) {
		
		price = '10';
	}
	
	else {
		price = '15';
	} 
	
	console.log(price);
	
	//If the storage is empty, set it to the price of the clicked product
	if (localStorage.getItem("total") === null) {
		localStorage.setItem("total", price);
	}
	
	//If the storage is not empty, add the current price of the clicked product to the running total from user's local storage
	else {
		price = parseInt(price);
		localStorage.setItem("total", parseInt(localStorage.getItem("total")) + price); // Update local storage
	}
	
	console.log("20. <<Leaving updateTotal function...");
}

// createEventListeners is open to be used for all pages
function createEventListeners() {
	
	//Input: none
	//Processing: This function creates all the necessary event listeners for the images on the page
	//Output: none
	
	console.log("7. >>Entering createEventListeners function...");
	
	var allImages = document.getElementsByClassName("gallery__img");
	
	for (var i = 0; i < allImages.length; i++) { // Create a For loop with the conditon (while i is less than ssnFields.length). i increments by 1
		
		// Create an event listener for allImages[i] (The current image on the page) that activates upon input
		if (allImages[i].addEventListener) {
			
			console.log("8. For loop entered: Adding Mouse Over event listener to allImages[i]");
			allImages[i].addEventListener("click", addProduct, false);
			
			
		} // END ADD EVENT LISTENER
		
		// Create an event listener for allImages[i] (The current image on the page) that activates upon input - This one is for older browsers
		else if (allImages[i].attachEvent) {
			
			console.log("9. For loop entered: Adding Mouse Over event listener to allImages[i]");
			allImages[i].attachEvent("onclick", addProduct);
			
				
		} // END ATTACH EVENT LISTENER
		
		
	} // END For Loop
	
	console.log("9. <<Leaving createEventListeners function...");
}
	
function init() {
	
	// Input:		none
	// Processing:	calls other functions necessary for script initialization
	// Output:		none
	
	console.log("15. >>Entering init function...");
	updateProducts();
	createEventListeners();
	
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
	
	
	