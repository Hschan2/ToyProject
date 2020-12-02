<?php
	$link_id = $_GET['link_id'];
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="diary.css">
	<title>Diary</title>
	<script type="text/javascript">
		var loadFile = function(event) {
		    var reader = new FileReader();
		    reader.onload = function(){
		      var output = document.getElementById('imagesection');
		      output.src = reader.result;
		    };
			reader.readAsDataURL(event.target.files[0]);
		};

		function title_len(){
		  var title = document.insertForm.title;
		  if(title.value.length > 40){
		       alert("250자 이내로 입력해 주세요.");
		       title.value = title.value.substring(0,40);
		       title.focus();
		  }
		}
		function content_len(){
		  var content = document.insertForm.content;
		  if(content.value.length > 250){
		       alert("250자 이내로 입력해 주세요.");
		       content.value = content.value.substring(0,250);
		       content.focus();
		  }
		}
		function imageCheck() {
			var form = document.forms['insertForm'];
			var title_form = document.forms['insertForm']['title'];
			var title_check = document.forms['insertForm']['title'].value;
			var content_form = document.forms['insertForm']['content'];
			var content_check = document.forms['insertForm']['content'].value;
			var image_check = document.forms['insertForm']['img_insert'].value;

			if (title_check == null || title_check == "") {
				alert("제목을 입력해주세요.");
				title_form.focus();
				return false;
			} else if (content_check == null || content_check == "") {
				alert("내용을 입력해주세요.");
				content_form.focus();
				return false;
			} else if(image_check == null || image_check == "") {
				alert("파일을 첨부해주세요.");
				image_check.focus();
				return false;
			} else {
				return form.submit();
			}
		}
	</script>
</head>
<body>
	<div class="main">
		<div class="menu">
			<div class="logo" style="margin-right: 20px;"><a href="diary.php"><img src="img/DIARY.png"/></a></div>
			<div class="back"><a href="javascript:history.back()"><img src="img/back.png" /></a></div>
		</div>
	</div>

	<form action="insert_ok.php?link_id=<?=$link_id?>" method="POST" name="insertForm" id="insertForm" enctype="multipart/form-data">
		<div class="i_major">
			<div class="i_picture">
				<img src="img/basedon.jpg" id="imagesection" name="pic" width="350" height="350" />
			</div>
			<div class="inputfile">
				<label for="img_insert">첨부</label>
				<input type="file" name="img_insert" id="img_insert" class="img_btn" accept="image/*, video/*" onchange="loadFile(event)"/>
			</div>
			<div class="i_title">
				<input type="text" name="title" id="title" placeholder="제목을 입력하세요.(40자 이내)" maxlength="40" class="titlebox" onkeyup="title_len()"/>
			</div>
			<div class="i_content">
				<textarea class="contentbox" name="content" id="content" placeholder="내용을 입력하세요.(250자 이내)"  onkeyup="content_len()"></textarea>
			</div>
			<input type="button" name="insert_btn" value="기록" class="insert_btn" onclick="imageCheck()">
		</div>
	</form>
</body>
</html>