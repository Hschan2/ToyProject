<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");

	$filtered = array(
		'name' => mysqli_real_escape_string($conn, $_POST['name']),
		'pass' => mysqli_real_escape_string($conn, $_POST['pass']),
		'title' => mysqli_real_escape_string($conn, $_POST['subject']),
		'comment' => mysqli_real_escape_string($conn, $_POST['content'])
	);

	$query = "INSERT INTO freeboard (name, pass, title, comment, wdate, view) VALUES ('{$filtered['name']}', '{$filtered['pass']}', '{$filtered['title']}', '{$filtered['comment']}', NOW(), 0)";

	mysqli_query($conn, $query);

	echo "<script>
			window.alert(\"등록완료 되었습니다.\");
			window.location.href='freeboard.php';
		</script>";

?>
