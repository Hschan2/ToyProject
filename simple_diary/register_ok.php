<?php
	$conn = mysqli_connect('localhost', 'root', '111111', 'diary');
	
	include "./password.php";

	$filtered = array(
		'reg_name' => mysqli_real_escape_string($conn, $_POST['reg_name']),
		'reg_id' => mysqli_real_escape_string($conn, $_POST['reg_id']),
		'reg_password' => mysqli_real_escape_string($conn, $_POST['reg_password']),
	);

	$pwhash = password_hash($filtered['reg_password'], PASSWORD_BCRYPT, array('cost' >= 10));

	$reg_query = "select * from user where user_id ='{$filtered['reg_id']}'";
	$reg = mysqli_query($conn, $reg_query);
	$reg_row = mysqli_fetch_assoc($reg);

	if ($reg_row > 0) {
		echo "<script>
			window.alert(\"이미 계정이 있습니다 !\");
			window.history.back();
		</script>";
	} else {
		$query = "INSERT INTO user (user_id, user_name, user_password) VALUES ('{$filtered['reg_id']}', '{$filtered['reg_name']}', '$pwhash')";
		mysqli_query($conn, $query);
		echo "<script>
				window.alert(\"가입 완료 !\");
				window.location.href='login.php';
			</script>";
	}
?>
