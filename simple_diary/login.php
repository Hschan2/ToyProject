<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="diary.css">
	<title>Diary</title>
	<script src="//code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript">
		function loginCheck() {
			var form = document.forms['login'];
			var id_form = document.forms['login']['user_id'];
			var id_check = document.forms['login']['user_id'].value;
			var pass_form = document.forms['login']['user_pass'];
			var pass_check = document.forms['login']['user_pass'].value;

			if (id_check == null || id_check == "") {
				alert("아이디를 입력해주세요.");
				id_form.focus();
				return false;
			} else if (pass_check == null || pass_check == "") {
				alert("비밀번호를 입력해주세요.");
				pass_form.focus();
				return false;
			} else {
				return form.submit();
			}
		}
		function enterkey() {
			if (window.event.keyCode == 13) {
				// 엔터키가 눌렸을 때 실행할 내용
				loginCheck();
			}
		}
	</script>
</head>
<body>
	<div class="main">
		<div class="menu">
			<div class="logo" style="margin-right: 20px;"><a href="diary.php"><img src="img/DIARY.png"/></a></div>
			<div class="back"><a href="javascript:history.back()"><img src="img/back.png" /></a></div>
		</div>
	</div>

	<form action="login_ok.php" method="POST" name="login" id="login">
		<table class="login_table">
			<tr>
				<td><input type="text" class="box" name="user_id" id="user_id" placeholder="아이디를 입력하세요" onkeypress="enterkey()"></td>
			</tr>
			<tr>
				<td><input type="password" class="box" name="user_pass" id="user_pass" placeholder="비밀번호를 입력하세요" onkeypress="enterkey()"></td>
			</tr>
			<tr>
				<td><input type="button" class="login_button" value="로그인" onclick="loginCheck()"></td>
			</tr>
			<tr>
				<td><input type="button" class="regi_go_button" value="회원가입" onclick="javascript:window.location.href='register.php';"></td>
			</tr>
		</table>
	</form>
</body>
</html>