<?php
	$conn = mysqli_connect('localhost', 'root', '111111', 'diary');

	$id_check = $_GET["id_check"];

	$query = "select * from user where user_id ='$id_check'";

	$member = mysqli_query($conn, $query);

	$row = mysqli_fetch_assoc($member);

	if ($row > 0) {
		echo "<script>
			window.alert(\"이미 계정이 있습니다 !\");
			window.history.back();
		</script>";
	} else {
		echo "<script>
			window.alert(\"사용 가능한 계정입니다 !\");
			window.history.back();
		</script>";
	}
?>
