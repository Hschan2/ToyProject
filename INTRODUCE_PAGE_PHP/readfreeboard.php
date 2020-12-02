 <!DOCTYPE HTML>
					<?php 
						//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
						$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
						$id = $_GET['id'];
						session_start();
						$view = "UPDATE freeboard SET view = view + 1 WHERE id = $id";
						$conn->query($view);

						$query = "select id,title,name,comment,view from freeboard where id = $id";
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
		<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
		<script type="text/javascript">
			function cm_check() {
				var cmregister = document.forms['cmregister'];
			    if( cmregister['cmname'].value.length < 1) {
			        swal( '댓글 닉네임을 입력해 주세요.');
			        return false;
			    }
			    if( cmregister['cmpass'].value.length < 1) {
			        swal( '비밀번호를 입력해 주세요.');
			        return false;
			    }
			    if( cmregister['cmcontent'].value.length < 1) {
			        swal( '댓글 내용을 입력해 주세요.');
			        return false;
			    }
			    return true;
			}

			function cm_cmcheck() {
				var cm_cmregister = document.forms['cm_cmregister'];
			    if( cm_cmregister['cm_cmname'].value.length < 1) {
			        swal( '댓글 닉네임을 입력해 주세요.');
			        return false;
			    }
			    if( cm_cmregister['cm_cmpass'].value.length < 1) {
			        swal( '비밀번호를 입력해 주세요.');
			        return false;
			    }
			    if( cm_cmregister['cm_cmcontent'].value.length < 1) {
			        swal( '댓글 내용을 입력해 주세요.');
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
					<div id="content" class="8u skel-cell-important">
						
				    <header>
						<h2><?php echo $rows['title'] ?></h2>
					</header>

			        <table class="table table-bordered">
		            <tr>
		            	<td width="50">이름</td>
		            	<td><?php echo $rows['name'] ?></td>
					</tr>
		        	<tr>
		        		<td width="50">제목</td>
		        		<td><?php echo $rows['title'] ?></td>
		        	</tr>
	                <tr>
	                	<td width="50" height="150">내용</td>
	                	<td height="150"><?php echo $rows['comment'] ?></td>
	                </tr>
  		           <tr>
               	   <td colspan="2">
                    <input type="button" class="buttonright" value="삭제" class="pull-right" onclick="location.href='./freedelete.php?id=<?=$id?>'" />
                    <input type="button" class="buttonright" value="수정" class="pull-right" onclick="location.href='./updatepasscheck.php?id=<?=$id?>'" />
                    <input type="button" class="buttonleft" value="목록으로" class="pull-left" onclick="location.href='./freeboard.php'" />
                	</td>
           			</tr>
           			</table>

					<form action="cminsert.php?id=<?=$id?>" method="POST" name="cmregister" onsubmit="return cm_check();">
					<table class="table table-bordered">

		            <tr>
		            	<td>
							<input type="text" placeholder="댓글 닉네임" name="cmname" class="form-control"/>
						</td>
						<td>
		            		<input type="password" placeholder="비밀번호" name="cmpass" class="form-control"/>
		            	</td>
					</tr>
		            <tr>
		            	<td colspan="2">
 	                		<textarea cols="20" rows="5" placeholder="댓글 내용" name="cmcontent" class="form-control"></textarea>
 	                	</td>
 	            	</tr>
 	            	
  		            <tr>
               	   		<td colspan="2">
                    		<input type="submit" class="buttonright" value="등록" class="pull-right"/>
                		</td>
           			</tr>

           			</table>
        			</form>

					<header style="margin-top: 50px;">
						<h2 style="font-size: 20px;">댓글</h2>
					</header>
					<?php
						$cmquery = "select link_id, comment_id, comment_name, comment_content from comment where link_id = $id";
						$cmresult = $conn->query($cmquery);

						

						while ($cmrows = mysqli_fetch_assoc($cmresult)) {
							if ($cmrows['comment_name'] == "") {
								$cmrows['comment_name'] = "이름없음";
							}
							$cmid = $cmrows['comment_id'];

							$cm_cmnumber = $conn->query("select count(*) as total from cm_comment where cm_link_id = $cmid");
							$cm_cmcount = mysqli_fetch_assoc($cm_cmnumber);

							if ($cm_cmcount['total'] == 0) {
								$cm_cmcount['total'] = "";
							}
					?>

					<script type="text/javascript">
						function doDisplay(id){
						    var con = document.getElementById(id);
						    if(con.style.display=='none'){
						        con.style.display = 'block';
						    }else{
						        con.style.display = 'none';
					    	}
						}

						function cm_romote(cm_id){
							var popupX = (window.screen.width / 2) - (200 / 2);
							var popupY= (window.screen.height /2) - (300 / 2);

							window.open("cmdelete.php?cm_id="+cm_id, "삭제", 'status=no, height=300, width=250, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
						}

						function cm_cmremote(cm_cmid){
							var popupX = (window.screen.width / 2) - (200 / 2);
							var popupY= (window.screen.height /2) - (300 / 2);

							window.open("cm_cmdelete.php?cm_cmid="+cm_cmid, "삭제", 'status=no, height=300, width=250, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
						}
					</script>

					<table class="table table-bordered" style="background-color: #F6F6F6; margin: 0;">

		            <tr style="border-top: 1px solid black;">
		            	<td width="20%" style="border-style: none;">
							<?php echo $cmrows['comment_name']?>
						</td>
						<td width="65%" style="border-style: none;">
		            		<?php echo $cmrows['comment_content']?>
		            		<div id="<?php echo $cmrows['comment_id']?>" style="display: none; color: black; width: 100%; margin-top: 10px; ">

                    			<form action="cm_cminsert.php?id=<?=$id?>&cmid=<?=$cmid?>" method="POST" name="cm_cmregister" onsubmit="return cm_cmcheck()">
									<table class="table table-bordered">
							            <tr>
							            	<td>
												<input type="text" placeholder="댓글 닉네임" name="cm_cmname" class="form-control"/>
											</td>
											<td>
							            		<input type="password" placeholder="비밀번호" name="cm_cmpass" class="form-control"/>
							            	</td>
										</tr>
							            <tr>
							            	<td colspan="2">
					 	                		<textarea cols="20" rows="5" placeholder="댓글 내용" name="cm_cmcontent" class="form-control"></textarea>
					 	                	</td>
					 	            	</tr>
					 	            	
					  		            <tr>
					               	   		<td colspan="2">
					                    		<input type="submit" class="buttonright" value="등록" class="pull-right"/>
					                		</td>
					           			</tr>
				           			</table>
        						</form>

        						<?php
									$cm_cmquery = "select * from cm_comment where cm_link_id = $cmid";
									$cm_cmresult = $conn->query($cm_cmquery);


									while ($cm_cmrows = mysqli_fetch_assoc($cm_cmresult)) {
										if ($cm_cmrows['cm_comment_name'] == "") {
											$cm_cmrows['cm_comment_name'] = "이름없음";
										}
								?>

								<table class="table table-bordered" style="background-color: #FFFFFF; margin: 0;">
						            <tr style="border-top: 1px solid #F15F5F;">
						            	<td width="20%" style="border-style: none;">
											<?php echo $cm_cmrows['cm_comment_name']?>
										</td>
										<td width="65%" style="border-style: none;">
						            		<?php echo $cm_cmrows['cm_comment_content']?>
										</td>
										<td width="5%" style="border-style: none;">
                    						<input type="button" class="cmdelete" value="삭제" onclick="cm_cmremote(<?php echo $cm_cmrows['cm_comment_id']?>);" />
                						</td>
                					</tr>
                				</table>
                				<?php
                				}
                				?>
                    		</div>
		            	</td>
		            	<td width="5%" style="border-style: none;">
                    		<input type="button" class="cmdelete" value="답글 <?php echo $cm_cmcount['total']?> " onclick="javascript:doDisplay('<?php echo $cmrows['comment_id']?>')" />
                		</td>
                		
		            	<td width="5%" style="border-style: none;">
                    		<input type="button" class="cmdelete" value="삭제" onclick="javascript:cm_romote(<?php echo $cmrows['comment_id']?>);" />
                		</td>
					</tr>
					<?php
 	            	}
 	            	?>
           			</table>

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