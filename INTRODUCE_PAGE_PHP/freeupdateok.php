<?php 
	//$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	$conn = mysqli_connect("localhost", "root", "111111", "board") or die("connect fail");
	
	$id = $_GET['id'];
	
	$filtered = array(
		'pass' => mysqli_real_escape_string($conn, $_POST['pass']),
		'name' => mysqli_real_escape_string($conn, $_POST['name']),
		'subject' => mysqli_real_escape_string($conn, $_POST['subject']),
		'content' => mysqli_real_escape_string($conn, $_POST['content'])
	);

	$query = "UPDATE freeboard SET name='{$filtered['name']}', title='{$filtered['subject']}', comment='{$filtered['content']}' WHERE id = $id";
	$conn->query($query);
	
	echo "<script>
		window.alert(\"수정되었습니다.\");
		window.location.href='readfreeboard.php?id=$id';
		</script>";
	
?>