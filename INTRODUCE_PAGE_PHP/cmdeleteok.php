<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	
	$cm_id = $_GET['cm_id'];
	
	$filtered = array(
		'cmpass' => mysqli_real_escape_string($conn, $_POST['cmpass'])
	);

	$query = "select link_id, comment_id, comment_pass from comment where comment_id = $cm_id";
	$result = $conn->query($query);
	$rows = mysqli_fetch_assoc($result);

	if ($filtered['cmpass'] == $rows['comment_pass']) {
		$conndelete = "DELETE from comment WHERE comment_id = $cm_id";
		$conn->query($conndelete);
		echo "<script>
			window.alert(\"삭제되었습니다.\");
			opener.parent.location.reload();
			window.close();
		</script>";
	} else {
		echo "<script>
			window.alert(\"비밀번호가 틀립니다.\");
			history.back();
		</script>";
	}
?>