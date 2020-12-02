<?php
	$conn = mysqli_connect("localhost", "root", "111111", "diary") or die("connect fail");

	$id = $_GET['id'];

	$query = "DELETE from diarys WHERE id = $id";

	$delete_query = "select image from diarys where id = $id";
	
	$delete_result = mysqli_query($conn, $delete_query);
	
	$delete_row = mysqli_fetch_assoc($delete_result);

	unlink("images/".$delete_row['image']);

	$conn->query($query);

	echo "<script>
        window.location.href='diary.php';
	</script>";

?>