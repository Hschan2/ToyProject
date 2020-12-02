<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");

	$id = $_GET['id'];

	$filtered = array(
		'cmname' => mysqli_real_escape_string($conn, $_POST['cmname']),
		'cmpass' => mysqli_real_escape_string($conn, $_POST['cmpass']),
		'cmcontent' => mysqli_real_escape_string($conn, $_POST['cmcontent'])
	);

	$query = "INSERT INTO comment (link_id, comment_name, comment_pass, comment_content) VALUES ('$id', '{$filtered['cmname']}', '{$filtered['cmpass']}', '{$filtered['cmcontent']}')";

	mysqli_query($conn, $query);

	echo "<script>
			window.alert(\"등록완료 되었습니다.\");
			window.location.href='readfreeboard.php?id=$id';
		</script>";

?>
