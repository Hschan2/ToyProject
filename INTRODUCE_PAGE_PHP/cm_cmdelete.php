<?php 
	$cm_cmid = $_GET['cm_cmid'];
?>
<!DOCTYPE html>
<html>
<head>
	<title>삭제</title>
	<link rel="stylesheet" href="css/popup.css" />
	<script type="text/javascript">
		function enter(e){
			if (e.keyCode == 13) {
				cm_cmdelete.submit();
			}
		}
	</script>
</head>
<body>
	<h3>삭제하기 위한 비밀번호를 입력</h3>
	<form action="cm_cmdeleteok.php?cm_cmid=<?=$cm_cmid?>" method="post" name="cm_cmdelete">
		<input class="popupbox" type="password" name="cm_cmpass" placeholder="비밀번호 입력" />
		<input class="popupbtn" type="submit" value="확인" />
	</form>
</body>
</html>