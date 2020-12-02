<?php
	session_start();

	$conn = mysqli_connect("localhost", "root", "111111", "diary") or die("connect fail");
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="diary.css">
	<title>Diary</title>
	<script>
		function content_delete(id) {
			if(confirm("정말 삭제하시겠습니까?") == true) {
				location.href = "delete.php?id="+id;
			} else {
				return false;
			}
		}
	</script>
</head>
<body>
	<div class="main">
		<div class="menu">
			<div class="logo"><a href="diary.php"><img src="img/DIARY.png"/></a></div>
			<?php
			if (isset($_SESSION['user_id'])) {
				$user_id = $_SESSION['user_id'];

				$login_check = "select * from user where user_id= '$user_id'";
				$login_result = mysqli_query($conn, $login_check);
				while($row = mysqli_fetch_assoc($login_result)) {
					$link_id = $row['user_number'];
					echo "<div class='insert'><a href='insert.php?link_id=$link_id'><img src='img/insert.png' /></a></div>";
					echo "<div class='login'>".$row['user_name']."님<p></p><a href='login_out.php'>(로그아웃)</a></div>";
				}
			} else {
				echo "<div class='login'><a href='register.php'>회원가입</a></div>";
				echo "<div class='login'><a href='login.php'>로그인</a></div>";
			}
			?>
		</div>
	</div>

	<?php
		if (isset($_SESSION['user_id'])) {
			$user_id = $_SESSION['user_id'];
			$display_check = "select * from user where user_id= '$user_id'";
			$display_result = mysqli_query($conn, $display_check);
			$display = mysqli_fetch_array($display_result);

			$check_id = $display['user_number'];

			$query = "select * from diarys where link_id = '$check_id'";

			$result = mysqli_query($conn, $query);
			while ($row = mysqli_fetch_array($result)) {
	?>
	<div class="major">
		<?php
			if (substr($row['image'], -3) == "jpg" || substr($row['image'], -3) == "png") {
		?>
		<div class="picture">
			<img src="images/<?php echo $row['image']?>">
		</div>
		<?php
		} else if (substr($row['image'], -3) == "mp4" || substr($row['image'], -3) == "avi") {
		?>
		<div class="picture">
			<video muted playsinline autoplay loop>
				<source src='images/<?php echo $row['image']?>' type='video/mp4'>
				<source src='images/<?php echo $row['image']?>' type='video/ogg'>
				<source src='images/<?php echo $row['image']?>' type='video/webm'>
			</video>
		</div>
		<?php
		}
		?>
		<div class="date">
			<?php echo $row['now_date']?>
		</div>
		<div class="delete">
			<input type="button" class="img_btn" onclick="content_delete(<?= $row['id'] ?>)">
		</div>
		<Br>
		<div class="title">
			<b><?php echo $row['title']?></b>
		</div>
		<div class="content">
			<?php echo $row['content']?>
		</div>
	</div>
	<?php
		}
	} else {
	?>
	<div class="not_login">
	</div>
	<?php
	}
	?>
</body>
</html>