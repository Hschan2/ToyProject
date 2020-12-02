// 슬라이드1
$(document).ready(function() {
    var imgs;
    var img_count;
    var img_position = 1;

    imgs = $(".slide1 ul");
    img_count = imgs.children().length;

    $('#back1').click(function() {
      back();
    });
    $('#next1').click(function() {
      next();
    });

    function back() {
      if (1 < img_position) {
        imgs.animate({
          left : '+=400px'
        });
        img_position--;
      }
    }

    function next() {
      if (img_count > img_position) {
        imgs.animate({
          left : '-=400px'
        });
        img_position++;
      }
    }
  });

// 슬라이드2

$(document).ready(function() {
    var imgs;
    var img_count;
    var img_position = 1;

    imgs = $(".slide2 ul");
    img_count = imgs.children().length;

    $('#back2').click(function() {
      back();
    });
    $('#next2').click(function() {
      next();
    });

    function back() {
      if (1 < img_position) {
        imgs.animate({
          left : '+=400px'
        });
        img_position--;
      }
    }

    function next() {
      if (img_count > img_position) {
        imgs.animate({
          left : '-=400px'
        });
        img_position++;
      }
    }
  });

// 슬라이드 3

$(document).ready(function() {
    var imgs;
    var img_count;
    var img_position = 1;

    imgs = $(".slide3 ul");
    img_count = imgs.children().length;

    $('#back3').click(function() {
      back();
    });
    $('#next3').click(function() {
      next();
    });

    function back() {
      if (1 < img_position) {
        imgs.animate({
          left : '+=400px'
        });
        img_position--;
      }
    }

    function next() {
      if (img_count > img_position) {
        imgs.animate({
          left : '-=400px'
        });
        img_position++;
      }
    }
  });