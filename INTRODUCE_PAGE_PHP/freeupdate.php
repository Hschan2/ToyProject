<!DOCTYPE HTML>
					<?php 
						//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
						$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
						$id = $_GET['id'];
						session_start();
						
						$query = "select id, title, pass, name, comment from freeboard where id = $id";
						$result = $conn->query($query);
						$rows = mysqli_fetch_assoc($result);
					?>
<html>
	<head>
		<title><?php echo $rows['title'] ?></title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,700,500,900' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
 
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
 
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/skel-panels.min.js"></script>
		<script src="js/init.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
	</head>
	<body>

	<!-- Header -->
		<div id="header">
			<div id="nav-wrapper"> 
				<!-- Nav -->
				<nav id="nav">
					<ul>
						<li class="active"><a href="index.html">홈으로</a></li>
						<li><a href="freeboard.php">게시판</a></li>
						<li><a href="project.html">프로젝트</a></li>
						<li><a href="gallary.html">갤러리</a></li>
					</ul>
				</nav>
			</div>
			<div class="container"> 
				
				<!-- Logo -->
				<div id="logo">
					<h1><a href="index.html">Seongchan's Homepage</a></h1>
					<img style="
						border: 3px solid white;
						border-radius: 70px;
						-moz-border-radius: 70px;
						-khtml-border-radius: 70px;
						-webkit-border-radius: 70px;
						width: 150px;
						height: 150px;
						margin-top: 30px;
						"
						src="images/profile.jpg" />
				</div>
			</div>
		</div>
	<!-- Header --> 

	<!-- Main -->
		<div id="main">
			<div class="container">
				<div class="row">

					<!-- Sidebar -->
					<div id="sidebar" class="4u">
						<section>
							<header>
								<h2>게시판</h2>
							</header>
							<div class="row">
								<section class="6u">
									<ul class="default">
										<li><a href="freeboard.php">자유게시판</a></li>
									</ul>
								</section>
							</div>
						</section>
					</div>
					
					<!-- Content -->
					<div id="content" class="8u skel-cell-important">
						
				    <header>
						<h2><?php echo $rows['title'] ?></h2>
					</header>

					<form action="freeupdateok.php?id=<?=$id?>" method="POST">
			        <table class="table table-bordered">
					<tr><td>
						<input type="text" name="name" value="<?php echo $rows['name'] ?>" class="form-control"/>
					</td></tr>
		        	<tr><td>
		            	<input type="text" placeholder="<?php echo $rows['pass'] ?>" name="pass" class="form-control"/>
		            </td></tr>
	                <tr><td>
	                	<input type="text" name="subject" value="<?php echo $rows['title'] ?>" class="form-control"/>
	                </td></tr>
		            <tr><td>
 	                	<textarea cols="20" rows="10" name="content" class="form-control"><?php echo $rows['comment'] ?></textarea>
 	                </td></tr>
  		           <tr>
               	   <td colspan="2">
                    <input type="submit" class="buttonright" value="수정" class="pull-right"/>
                    <input type="button" class="buttonleft" value="이전으로" class="pull-left" onclick="history.back(-1)" />
                	</td>
           			</tr>
           			</table>
           			</form>
						</div>
					</div>
				</div>
			</div>
	<!-- /Main -->

	<!-- Copyright -->
		<div id="copyright">
			<div class="container">
				hong's page
			</div>
		</div>

	</body>
</html>