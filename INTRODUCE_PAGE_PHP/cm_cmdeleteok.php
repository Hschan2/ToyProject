<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	
	$cm_cmid = $_GET['cm_cmid'];
	
	$filtered = array(
		'cm_cmpass' => mysqli_real_escape_string($conn, $_POST['cm_cmpass'])
	);

	$query = "select cm_link_id, cm_comment_id, cm_comment_pass from cm_comment where cm_comment_id = $cm_cmid";
	$result = $conn->query($query);
	$rows = mysqli_fetch_assoc($result);

	if ($filtered['cm_cmpass'] == $rows['cm_comment_pass']) {
		$conndelete = "DELETE from cm_comment WHERE cm_comment_id = $cm_cmid";
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