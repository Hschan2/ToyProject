<?php 
	session_start();

	$conn = mysqli_connect('localhost', 'root', '111111', 'diary');
	
	$user_id = $_POST['user_id'];
	$user_pass = $_POST['user_pass'];

	$query = "select * from user where user_id = '$user_id'";

	$result = mysqli_query($conn, $query);

	if ($result->num_rows == 1) {
        $row = $result -> fetch_array(MYSQLI_ASSOC);
        if (password_verify($user_pass, $row['user_password'])){
            $_SESSION['user_id'] = $user_id;
            if (isset($_SESSION['user_id'])) {
                echo "<script>
						window.location.href='diary.php';
					</script>";
            } else {
                echo "<script>
						window.alert(\"로그인 실패 !\");
						window.history(-1);
					</script>";
            }
        } else {
            echo "<script>
						window.alert(\"아이디와 비밀번호를 확인해주세요 !\");
						window.location.href='login.php';
					</script>";
        }
    } else {
        echo "<script>
						window.alert(\"아이디와 비밀번호를 확인해주세요 !\");
						window.location.href='login.php';
					</script>";
    }

?>
