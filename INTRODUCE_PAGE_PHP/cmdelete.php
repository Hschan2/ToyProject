<?php 
	$cm_id = $_GET['cm_id'];
?>
<!DOCTYPE html>
<html>
<head>
	<title>삭제</title>
	<link rel="stylesheet" href="css/popup.css" />
	<script type="text/javascript">
		function enter(e){
			if (e.keyCode == 13) {
				cmdelete.submit();
			}
		}
	</script>
</head>
<body>
	<h3>삭제하기 위한 비밀번호를 입력</h3>
	<form action="cmdeleteok.php?cm_id=<?=$cm_id?>" method="post" name="cmdelete">
		<input class="popupbox" type="password" name="cmpass" placeholder="비밀번호 입력" />
		<input class="popupbtn" type="submit" value="확인" />
	</form>
</body>
</html>