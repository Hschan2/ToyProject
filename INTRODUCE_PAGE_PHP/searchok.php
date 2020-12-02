<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");

	$filtered = array(
		'search' => mysqli_real_escape_string($conn, $_POST['search'])
	);

	$query = "select id,name,title,date_format(wdate, '%Y/%m/%d') as date, view from freeboard WHERE title LIKE '%{$filtered['search']}%' order by id desc";
	
	$result = $conn->query($query);
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>자유게시판</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,700,500,900' rel='stylesheet' type='text/css'>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/skel-panels.min.js"></script>
		<script src="js/init.js"></script>
		<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
		<script type="text/javascript">
			function enter(e){
				if (e.keyCode == 13) {
					searchform.submit();
				}
			}

			function searchCheck() {
			    var searchform = document.forms['searchform'];
			    if( searchform['search'].value.length < 1) {
			        swal( '한 글자 이상 입력해 주세요.');
			        return false;
			    }
			    return true;
			}
		</script>
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
					<div id="totalboard" class="8u skel-cell-important">
						<h1>자유게시판</h1><p>
						<table class="board" align="center" summary="게시판의 글제목 리스트">
							<caption style="margin-bottom: 20px; color: black;">게시판 리스트</caption>
							<tr class="boardtr">
							    <td width="110" style="color: black;">
							        번호
							    </td>
							    <td width="500" style="color: black;">
							        제 목
							    </td>
							    <td width="100" style="color: black;">
							        글쓴이
							    </td>
							    <td width="150" style="color: black;">
							        날 짜
							    </td>
							    <td width="90" style="color: black;">
							        조회수
							    </td>
							</tr>
							<?php 
								while ($row = mysqli_fetch_assoc($result)) {
							?>
							<tr>
							    <!-- 번호 -->
							    <td width="110" align = "center" style="color: black;">
							        <?php echo $row['id']?>
							    </td>
							    <!-- 번호 끝 -->
							    <!-- 제목 -->
							    <td width="500" style="color: black;">
							       <a href="readfreeboard.php?id=<?php echo $row['id']?>"><?php echo $row['title']?></a>
							    </td>
							    <!-- 제목 끝 -->
							    <!-- 이름 -->
							    <td width="100" align = "center" style="color: black;">
							            <?php echo $row['name']?>
							    </td>
							    <!-- 이름 끝 -->
							    <!-- 날짜 -->
							    <td width="150" style="color: black;">
									<?php echo $row['date']?>
							    </td>
							    <!-- 날짜 끝 -->
							    <!-- 조회수 -->
							    <td width="50" align = "center" style="color: black;">
							        <?php echo $row['view']?>
							    </td>
							    <!-- 조회수 끝 -->
							</tr>
							<?php 
								}
							?>
							</table>
							<a href="freeboardwrite.html"><button type="button" class="button">글쓰기</button></a>

							<form action="searchok.php" method="POST" name="searchform" onsubmit="return searchCheck()">
								<input class="searchBar" type="text" name="search" placeholder="검색할 단어" value="<?= $filtered['search'] ?>"/>
								<input class="searchBtn" type="submit" value="검색"/>
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