<?php

	// Initialize the session
	session_start();
	
	// Check if the user is logged in, if not then redirect him to login page
	if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
		header("location: index.php");
		exit;
	}

?>
 
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Welcome</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
		
		<!-- jquery Script for Loader -->
		<script
			src="https://code.jquery.com/jquery-3.4.1.js"
			integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
			crossorigin="anonymous">
		</script>

		<!-- Custom CSS from Loader Script -->
		<link rel="stylesheet" type="text/css" href="../loader/css/style.css">

		<!-- Center the webPage via Local Stylesheet -->
		<style type="text/css">
			body{ font: 14px sans-serif!important; text-align: center!important; }
		</style>
		
	</head>
	<body>

		<div class="container">
			<!-- Header of this page -->
			<div class="page-header">
				<h1>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to our site.</h1>
			</div>
			<p>
				<a href="reset-password.php" class="btn btn-warning">Reset Your Password</a>
				<a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
			</p>
		</div>
		
		

		<!-- Loader Html -->
		<div class="loader-wrapper">
			<div class="blobs">
					<div class="blob-center"></div>
					<div class="blob"></div>
					<div class="blob"></div>
					<div class="blob"></div>
					<div class="blob"></div>
					<div class="blob"></div>
					<div class="blob"></div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
					<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
			<div class="quote">fetching your account details..</div>
		</div> 


		<!-- ========================================================== -->
		<script>
			$(window).on("load",function(){
				$(".loader-wrapper").fadeOut("slow");
			});
		</script>
	</body>
</html>