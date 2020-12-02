<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="diary.css">
	<title>Diary</title>
	<script type="text/javascript">
		    function reg_check() {
				var form = document.forms['register'];
				var name_check = document.forms['register']['reg_name'].value;
				var id_check = document.forms['register']['reg_id'].value;
				var pass_check = document.forms['register']['reg_password'].value;

				if (name_check == null || name_check == "") {
					alert("이름을 입력해주세요.");
					return false;
				} else if (id_check == null || id_check == "") {
					alert("아이디를 입력해주세요.");
					return false;
				} else if(pass_check == null || pass_check == "") {
					alert("비밀번호를 입력해주세요.");
					return false;
				} else {
					return form.submit();
				}
			}

		    function checkid(){
				var id_form = document.forms['register']['reg_id'];
				var id_check = document.forms['register']['reg_id'].value;
				if(id_check == "")
				{
					alert("아이디를 입력하세요");
					id_form.focus();
					return false;
				}else{
					url = "id_check.php?id_check="+id_check;
					window.open(url,"_parent","width=300,height=100");
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

	<form action="register_ok.php" method="POST" name="register" id="register">
		<table class="regi_table">
			<tr>
				<td><input type="text" class="box" name="reg_name" id="reg_name" placeholder="이름을 입력하세요"></td>
			</tr>
			<tr>
				<td><input type="text" class="box" name="reg_id" id="reg_id" placeholder="아이디를 입력하세요"></td>
				<td><input type="button" name="id_check" class="btn_check" value="중복확인" onclick="checkid()"/></td>
			</tr>
			<tr>
				<td><input type="password" class="box" name="reg_password" id="reg_password" placeholder="비밀번호를 입력하세요"></td>
			</tr>
			<tr>
				<td><input type="button" class="regi_button" value="가입" onclick="reg_check()"></td>
			</tr>
		</table>
	</form>
</body>
</html>