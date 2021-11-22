"use strict"; // Operate in strict mode

function updateQuantities(quantities) {
	var quantityElms;
	var index = 0;
	quantities = quantities.split(':');
	console.log(quantities);
	
	quantityElms = document.getElementsByClassName('quantities');
	
	quantityElms[0].textContent = quantities[0];
	
	for (var x = 0; x < quantityElms.length; x++) {
		quantityElms[x].textContent = quantities[x];
	}
	
	
}

function updateProducts() {
	var productQuantities = [];
	
	var ajaxRequest; // The variable that makes the AJAX magic possible!
	
		try{
			
			// REAL BROWSERS
			ajaxRequest = new XMLHttpRequest();
			
		} catch (e) {
			
			// Internet Exploder Browsers
			try{
				
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
				
			} catch (e) {
				
				try{
					
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
					
				} catch (e) {
					
					// something went wrong
					alert("Oops! Your browser cannot handle AJAX.");
					return false;
					
				} // Ends something went wrong
				
			} // Ends old Microsoft Trap
			
		} // Ends Microsoft Trap
		
		ajaxRequest.onreadystatechange = function(){
			
			if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {

				productQuantities = ajaxRequest.responseText;
				console.log(productQuantities);
				updateQuantities(productQuantities);
				
		
				
			} // End IF READY STATE
		} //END AJAX REQUEST
		
		ajaxRequest.open("GET", "Scripts/get_quantities.php", true);
		ajaxRequest.send(null);
		console.log("201. <<Leaving ajaxFunction...");
		
	}  // END AJAX Function
	
// Create an event listener that calls the init function on load.
if (window.addEventListener) {
	
	console.log("17. > Adding TC39 Event Listener..."); // Place a console.log upon entering this IF EVENT LISTENER
	
	window.addEventListener("load", updateProducts, false);
	
} //END ADD EVENT LISTENER


// Create an event listener that calls the init function on load. (For older browsers)
else if (window.attachEvent) {
	
	console.log("18. > Adding MS Event Listener..."); // Place a console.log upon enterin this IF ATTACH EVENT
	
	window.attachEvent("onload", updateProducts);
	
} // END ATTACH EVENT LISTENER