<?php

// Define PDO
		$pdo = new PDO('sqlite:Products.db');
		
		//Construct a statement to select everything from the row that has a particular name
		$statement = $pdo->query("SELECT * FROM Products");
		
		//Run the statement to retrive the row data
		$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		$x = 1;
		
		$quantities = $rows[0]['Quantity'];
		
		while ($x < count($rows)) {
		
			$quantities .= ':'.$rows[$x]['Quantity'];
		
			$x += 1;
		}
	
	$responseText = $quantities;

echo "$responseText";
?>