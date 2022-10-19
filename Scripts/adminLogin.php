<!DOCTYPE html>

<html lang="en" id="loginPageHTML">
<head>
  <meta charset="utf-8">

  <title>Login</title>
  <meta name="description" content="Leslie Zavala">
	
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  
<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	
	if ($username !== 'testUsername' | $password !== 'testPassword') {
		echo '<p style="margin:auto; padding-top:100px; text-align:center;">Login failed.';
	}
	else if ($username == 'testUsername' & $password == 'testPassword') {
		//open the database (if does not exist, create the file)
		class MyDB extends SQLite3 {
			function __construct() {
				$this->open('data/ordersDB.sqlite');
			}
		}

		//create a variable to represent a SQLite3 object
		$db = new MyDB();
		
		try {
			//try and SELECT * from the table
			$results = $db->query('SELECT * FROM customerOrdersDB');
			
			//HTML to begin layout for table
			echo '
			<table>
				<tr>
					<th>Order ID</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Message</th>
					<th>Time</th>
					<th>Products</th>
				</tr>';
			//Loop to input each element into an HTML array
			while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
				$id = $row['address'];
				echo '<tr>
					<td>'.$row['id'].'</th>
					<td>'.$row['address'].'</th>
					<td>'.$row['phone'].'</th>
					<td>'.$row['email'].'</th>
					<td>'.$row['message'].'</th>
					<td>'.$row['time'].'</th>
					<td>'.$row['products'].'</th>
				<style>
					table, th, td, tr {
						border:1px solid black;
					}
					th, td, tr {
						padding: 10px;
					}
					td {
						font-weight: normal;
					}
					table {
						max-width: 90%;
					}
				</style>
				</tr>';
			}
			//ending table for html table
			echo '</table>';
		} catch (Exception $e) {
			echo 'Caught exception: ' . $e->getMessage();
		}
	}
	
	
	
	
?>
</html>