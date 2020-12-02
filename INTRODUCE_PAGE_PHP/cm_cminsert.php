<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");

	$id = $_GET['id'];
	$cmid = $_GET['cmid'];

	$filtered = array(
		'cm_cmname' => mysqli_real_escape_string($conn, $_POST['cm_cmname']),
		'cm_cmpass' => mysqli_real_escape_string($conn, $_POST['cm_cmpass']),
		'cm_cmcontent' => mysqli_real_escape_string($conn, $_POST['cm_cmcontent'])
	);

	$query = "INSERT INTO cm_comment (cm_link_id, cm_comment_name, cm_comment_pass, cm_comment_content) VALUES ('$cmid', '{$filtered['cm_cmname']}', '{$filtered['cm_cmpass']}', '{$filtered['cm_cmcontent']}')";

	mysqli_query($conn, $query);

	echo "<script>
			window.alert(\"등록완료 되었습니다.\");
			window.location.href='readfreeboard.php?id=$id';
		</script>";

?>
