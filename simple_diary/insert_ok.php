<?php
	$conn = mysqli_connect('localhost', 'root', '111111', 'diary');

	$img_insert = $_FILES['img_insert']['name'];

	$link_id = $_GET['link_id'];

	$filtered = array(
		'title' => mysqli_real_escape_string($conn, $_POST['title']),
		'content' => mysqli_real_escape_string($conn, $_POST['content'])
	);

	$target = "images/".basename($img_insert);

	$query = "INSERT INTO diarys (link_id, title, content, now_date, image) VALUES ('$link_id', '{$filtered['title']}', '{$filtered['content']}', date_format(NOW(), '%Y-%m-%d %H:%i:%s') , '$img_insert')";

	mysqli_query($conn, $query);

	if (move_uploaded_file($_FILES['img_insert']['tmp_name'], $target)) {
  		$msg = "Image uploaded successfully";
  	}else{
  		$msg = "Failed to upload image";
  	}

	echo "<script>
			window.location.href='diary.php';
		</script>";

?>