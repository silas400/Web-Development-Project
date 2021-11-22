<!DOCTYPE html>

<html lang="en">
<head>
	<title>Order Submitted</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="Order Submitted" content="Your order is submitted.">
	<meta name="author" content="SitePoint">
	<link rel="stylesheet" href="../style.css">  
</head>


<div id="wrapper">
<body>
	<header>
		<img src="../Images/logo.png" width="300" height="132" alt="Leslie Diana Zavala">
	</header>
	
	<nav>
	<ul>
		<li><a href="../index.html">home</a></li>
		<li><a href="../shop.html">shop</a></li>
		<li><a href="../about.html">about</a></li>
		<li><a href="../contact.html">contact</a></li>
	</ul>
	</nav>

<?php
	// Import PHPMailer classes into the global namespace
	// These must be at the top of your script, not inside a function
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	// Load Composer's autoloader
	require 'vendor/autoload.php';
	
	// Get the values from the form
	$name = $_POST['name'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$state = $_POST['state'];
	$postalCode = $_POST['postalCode'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$time = date("m/d/Y").'<br>'.date("H:i:s").'<br>'.date_default_timezone_get();
	$products = $_POST['products'];
	$productsString = "";
	
	function main() {
		gatherFormData();
		$products = sortProducts();
		updateProductsDatabase($products);
		sendEmail($products);
		updateOrdersDatabase();
	}
	
	function gatherFormData() {

		// Get the values from the form
		$GLOBALS['address'] = $_POST['address'];
		$GLOBALS['phone'] = $_POST['phone'];
		$GLOBALS['email'] = $_POST['email'];
		$GLOBALS['products'] = $_POST['products'];
	}
		
	function sortProducts() {
		
		global $products;
		
		$products = explode("&", $products);
			
		$refinedProducts = [];
		
		$count = 0;
		
		$index = 0;
		
		$occurences = array_count_values($products);
		
		while (!empty($products)) {
			$name = $products[$index];
			$count = $occurences[$name];
			array_push($refinedProducts,$name . ':' . strval($count));
			$products = array_values(array_diff($products, [$name]));
		}
		/* Commenting out to make a cleaner page, but still useful for debugging
		foreach ($refinedProducts as $value) {
			echo $value;
		} */
		
		return $refinedProducts;
	}
		
	function sendEmail($products) {
		global $name;
		global $address;
		global $city;
		global $state;
		global $postalCode;
		global $phone;
		global $email;
		global $message;
		global $time;
		global $productsString;
		try {
			$mail = new PHPMailer(true);
			
			//intialize variables for the receiver of the email, the subject, the message, and headers
			$receiver = "thesilas600@gmail.com";
			$subject = "Just A Test";
			
			//Create the email text with all order information:
			$msg = "You have a new order!<br><br>".
			"NAME:<br>".$name."<br><br>".
			"ADDRESS:<br>".$address.", ".$city.", ".$state."<br><br>".
			"POSTAL CODE:<br>".$postalCode."<br><br>".
			"PHONE #:<br>".$phone."<br><br>".
			"EMAIL: <br>".$email."<br><br>".
			"MESSAGE: <br>".$message."<br>";
			
			//Convert products array into JSON string
			$productsString = json_encode($products, JSON_PRETTY_PRINT);
			//Include JSON of products
			$msg .= '<br><br>Product list:<br><pre>'.$productsString.'</pre><br>';
			
			$headers = "From: Leslie's beautiful art website eventually";
			
			//Add all product images so that they can be included in the email
			foreach($products as $info) {
				$info = explode(':', $info);
				$imgPath = '../'.$info[0];
				$id = str_replace('.jpg', '', $imgPath);
				$mail->AddEmbeddedImage($imgPath, $id);
				$msg .= '<img src="cid:$id">';
			}
			
			//Had to add this in for the email to send... It would not connect otherwise
			$mail->SMTPOptions = array(
			'ssl' => array(
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true
			)
			);
			//Sets up PHP mailer to have a sender, receiver, message, subject, and using the correct protocols.
			$mail->isSMTP();
			$mail->SMTPAuth = TRUE;
			$mail->SMTPSecure = 'tls';
			$mail->Host = "smtp.gmail.com";
			$mail->Port = 587;
			$mail->isHTML(true);
			$mail->Username = 'thebarnes400@gmail.com';
			$mail->Password = 'Testing4000';
			$mail->SetFrom('no-reply@yahoo.org');
			$mail->Subject = 'TEST EMAIL for SDEV265 Project';
			$mail->Body = $msg;
			$mail->AddAddress('johndoe31959@gmail.com');
			$mail->Send();
			} 	
		catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
		}
	}
	
	function updateProductsDatabase($products) {
		// Define PDO
		$pdo = new PDO('sqlite:Products.db');
		foreach ($products as $x) {
			
			$x = explode(':', $x);
			
			$name = $x[0];
			$name = str_replace('Images/', '', $name);
			$quantity = $x[1];
			
			$statement = $pdo->query("SELECT * FROM Products WHERE Name = '$name'");
			
			/* commenting out for cleaner page, but still useful for debugging
			if($statement) // will return true if successful. else it will return false
			{
				echo "First Success?";
			}
			
			else {
				echo 'First query failed';
			} */
			
			//Run the statement to retrive the row data
			$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
			
			$quantity = $rows[0]['Quantity'] - $quantity;
			
			$updateQuery = "UPDATE Products SET Quantity = :quantity WHERE Name = :name";

			$statement = $pdo->prepare($updateQuery);
			
			$statement->bindParam(':quantity', $quantity, PDO::PARAM_INT, 15);
			$statement->bindParam(':name', $name, PDO::PARAM_STR, 25);
			
			if($statement->execute()){}
			else{
			print_r($pdo->errorInfo()); // if any error is there it will be posted
			$msg=" Database problem, please contact site admin ";
			}
		}
	}
	
	function updateOrdersDatabase() {
		//open the database (if does not exist, create the file)
		class MyDB extends SQLite3 {
			function __construct() {
				$this->open('data/ordersDB.sqlite');
			}
		}

		//create a variable to represent a SQLite3 object
		$db = new MyDB();
		
		//variable to hold data if exception is caught
		$dbWriteSuccess = false;
		
		//get values from global variables
		global $name,$address,$city,$state,$postalCode,$phone,$email,$message,$time,$productsString;
		//compact name + zip into address to keep table simple
		$newAddress = $name.', '.$address.', '.$city.', '.$state.', '.$postalCode;

		//Open table for customer orders (if does not exist, create)
		try {
			$db -> exec('CREATE TABLE IF NOT EXISTS customerOrdersDB(
				id INTEGER PRIMARY KEY,
				address STRING NOT NULL,
				phone STRING NOT NULL,
				email STRING NOT NULL,
				message STRING,
				time STRING,
				products STRING)');
			
			//Use prepared statement to insert a new row into database.
			$statement = $db->prepare('INSERT INTO customerOrdersDB ("address", "phone", "email", "message", "time", "products") 
				VALUES (:uAddress, :uPhone, :uEmail, :uMessage, :time, :products)');
			$statement -> bindValue(':uAddress', $newAddress);
			$statement -> bindValue(':uPhone', $phone);
			$statement -> bindValue(':uEmail', $email);
			$statement -> bindValue(':uMessage', $message);
			$statement -> bindValue(':time', $time);
			$statement -> bindValue(':products', $productsString);
			$statement -> execute();
			
			//confirm if successful
			$dbWriteSuccess = true;
		} catch (Exception $e) {
			echo 'Caught exception: ' . $e->getMessage();
		}
		
		//close database connection
		$db->close();

		//if no errors are caught, let user know order was submitted successfully
		if ($dbWriteSuccess) {
			//HTML for a small "order confirmed" page.
			echo '<br><br><p class="explanationText">'.
			'Your order has been sent! We will be in contact shortly to '.
			'confirm all of your order details and provide you with an invoice. '.
			'Here is a copy of your order info:<br><br>';
			//Echo out this copy of the user's order
			$orderInfoCopy = "NAME:<br>".$name."<br><br>".
			"ADDRESS:<br>".$newAddress."<br><br>".
			"POSTAL CODE:<br>".$postalCode."<br><br>".
			"PHONE #:<br>".$phone."<br><br>".
			"EMAIL: <br>".$email."<br><br>".
			"MESSAGE: <br>".$message."<br>";
			echo $orderInfoCopy.'<br><br></p>';
		}			
	}
	
	main();//After the PHP code is finished, clear the localStorage to reset the user's cart.
?>
<script type="text/javascript">localStorage.clear();</script>
</div>
</body>
</html>