<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	
	$id = $_GET['id'];
	
	$filtered = array(
		'pass' => mysqli_real_escape_string($conn, $_POST['pass'])
	);

	$query = "select pass from freeboard where id = $id";
	$result = $conn->query($query);
	$rows = mysqli_fetch_assoc($result);

	if ($filtered['pass'] == $rows['pass']) {
		echo "<script>
			window.location.href='freeupdate.php?id=$id';
		</script>";
	} else {
		echo "<script>
			window.alert(\"비밀번호가 틀립니다.\");
			history.back();
		</script>";
	}
?>