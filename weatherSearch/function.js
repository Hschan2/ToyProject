"use strict";

// 날씨 정의
var Weather = function () { };

Weather.prototype.setDate = function () {
    var d = new Date();
    var n = d.toDateString();
    $("#date").text(n);
};

Weather.prototype.getLocation = function () {
    // IP 주소로 위치 가져오기
    var res = {
        "city": "Buenos Aires",
        "country": "Argentina",
        "countryCode": "AR",
        "query": "200.61.38.44",
        "regionName": "Buenos Aires F.D.",
        "status": "success"
    };

    if (res.status === "success") {
        document.getElementById("location").value = res.city + ", " + res.countryCode;
        this.location = res.city + ", " + res.countryCode;
        this.currentWeather();
        this.forecast();
    }
};

Weather.prototype.setLocation = function () {
    // 입력으로 위치 가져오기
    $("#f_locator").on("submit", function (e) {
        e.preventDefault();
        this.location = $("#location").val();
        this.currentWeather();
        this.forecast();
        this.loadAnimation();
    }.bind(this));
};

Weather.prototype.getWeatherIcon = function (wId, sunrise, sunset) {
    // API 아이디로 날씨 아이콘 애니메이션 가져오기
    if (wId) {
        var icon = {};
        icon.name = "na";
        icon.animation = "wi-scale";

        function between(min, max, group, animation) {
            if (wId >= min && wId < max) {
                icon.name = group ? group : "na";
                icon.animation = animation ? animation : "wi-scale";
            }
        }

        between(200, 300, "thunderstorm", "wi-fade");
        between(300, 400, "showers", "wi-moveY");
        between(500, 600, "rain", "wi-moveY");
        between(600, 700, "snow", "wi-moveY");
        between(700, 800, "na", "wi-fade");
        between(801, 900, "cloudy", "wi-moveX");
        between(900, 1000, "na");
        var cond = {
            200: "storm-showers",
            201: "storm-showers",
            202: "thunderstorm",
            500: "rain-mix",
            501: "rain-mix",
            502: "rain",
            511: "sleet",
            520: "rain-mix",
            521: "rain-mix",
            600: "snow",
            611: "sleet",
            701: "fog",
            741: "fog",
            905: "windy",
            906: "hail"
        };
        var neutralCond = {
            711: "smoke",
            731: "sandstorm",
            761: "dust",
            762: "volcano",
            781: "tornado",
            900: "tornado",
            902: "hurricane",
            903: "snowflake-cold",
            904: "hot",
            958: "gale-warning",
            959: "gale-warning",
            960: "storm-warning",
            961: "storm-warning",
            962: "hurricane"
        };
        var dayCond = {
            721: "haze",
            800: "sunny"
        };
        var nightCond = {
            800: "clear",
            701: "fog",
            741: "fog"
        };
        icon.name = cond[wId] ? cond[wId] : icon.name;
        icon.name = neutralCond[wId] ? neutralCond[wId] : icon.name;
        icon.name = dayCond[wId] ? dayCond[wId] : icon.name;
        var time = "day";

        if (sunrise && sunset) {
            var now = Date.now() / 1000;
            var srDate = new Date(sunrise * 1000);

            if (srDate.getDate() == new Date().getDate()) {
                if (now <= sunrise && now >= sunset) {
                    time = nightCond[wId] ? "night" : "night-alt";
                    icon.name = nightCond[wId] ? nightCond[wId] : icon.name;
                }
            } else {
                time = nightCond[wId] ? "night" : "night-alt";
                icon.name = nightCond[wId] ? nightCond[wId] : icon.name;
            }
        }

        if (icon.name != "na" && !neutralCond[wId]) {
            icon.name = "wi-" + time + "-" + icon.name;
        } else {
            icon.name = "wi-" + icon.name;
        }

        icon.animation = icon.name == "wi-day-sunny" ? "wi-rotate" : icon.animation;
        return icon;
    }
};

// 날씨 아이콘 출력
Weather.prototype.displayWeatherIcon = function (selector, icon) {
    //display weather icon. first arg is where to display. Second arg is what returned from getWeatherIcon method.
    if (selector && typeof icon == "object") {
        if (icon.name != "na") {
            $(selector).addClass(icon.name);
            animate(selector, icon.animation, 2000, 0, "linear", "infinite");
        }
    }
};

// 최신 날씨 정보 출력
Weather.prototype.currentWeather = function () {
    // 최신 날씨 정보 가져오기
    if (this.location) {
        function setMain(res) {
            if (res.main) {
                $("#temperature").text(Math.round(res.main.temp) + "°");
                $("#description").text(res.weather[0].description);

                if (res.main.humidity) {
                    $("#humidity").text(res.main.humidity);
                } else {
                    $("#humidity").text("0");
                }
            }
        }

        $.getJSON("https://api.openweathermap.org/data/2.5/weather", {
            q: this.location,
            units: "metric",
            appid: "bc1301b0b23fe6ef52032a7e5bb70820"
        }, function (json) {
            var wId = json.weather[0].id;

            if (wId) {
                var icon = this.getWeatherIcon(wId, json.sys.sunrise, json.sys.sunset);
                this.displayWeatherIcon("#wicon-main", icon);
            }

            setMain(json);
        }.bind(this));
    }
};

// 4일 간 날씨 정보 출력
Weather.prototype.forecast = function () {
    // 4일 간 날씨 정보 가져오기
    function setForecast(res) {
        this.daily = [];
        var list = res.list;

        for (var i = 0, len = list.length; i < len; i++) {
            this.daily[i] = this.daily[i] ? this.daily[i] : {};
            this.daily[i].maxTemp = Math.round(list[i].temp.max);
            this.daily[i].minTemp = Math.round(list[i].temp.min);
            this.daily[i].day = new Date(list[i].dt * 1000).getDay();
            var iconId = list[i].weather[0].id;
            this.daily[i].icon = this.getWeatherIcon(iconId);
        }
    }

    function displayForecast() {
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            _this = this;

        $(".days-box").children(".col-xs-3").each(function (index) {
            $(this).children('.day').text(days[_this.daily[index].day]);
            $(this).find('.d-min-temp').text(_this.daily[index].minTemp + "°");
            $(this).find('.d-max-temp').text(_this.daily[index].maxTemp + "°");
            $(this).find('.wi').addClass(_this.daily[index].icon.name);
        });
    }

    $.getJSON("https://api.openweathermap.org/data/2.5/forecast/daily", {
        q: this.location,
        cnt: 4,
        units: "metric",
        appid: "bc1301b0b23fe6ef52032a7e5bb70820"
    }, function (json) {
        setForecast.call(this, json);
        displayForecast.call(this);
    }.bind(this));
};

// 온도 변환 출력
Weather.prototype.setUnit = function () {
    // 화씨, 섭씨 변환 설정
    var prevUnit = "C";
    $("#unit-switch").on("click", function () {
        var newUnit = prevUnit == "C" ? "F" : "C";
        $("span:contains('°')").each(function (index, el) {
            var temp_current = parseFloat($(el).text());

            if (newUnit == "F") {
                var temp_new = Math.round(temp_current * 1.8 + 32);
            } else if (newUnit == "C") {
                var temp_new = Math.round((temp_current - 32) / 1.8);
            }

            $(el).text(temp_new + "°");
            animate(el, "fadeIn", 400, 0, "ease-out");
        });
        prevUnit = newUnit;
    });
};

// 애니메이션 불러오기
Weather.prototype.loadAnimation = function () {
    $(".loading").css("display", "block");
    var countAjax = 0;
    $(document).ajaxComplete(function () {
        countAjax++;

        if (countAjax == 2) {
            $(".loading").fadeOut();
            loadTooltips();
            animate(".days-box", "scale", 400, 500, "ease-out");
            var delayAnim = 1300;
            $(".days-box").children(".col-xs-3").each(function () {
                animate(this, "fadeIn", 350, delayAnim, "ease-out");
                delayAnim += 350;
            });
        }
    });
};

// 애니메이션 함수
function animate(selector, keyFrameName, duration, delay = 0, timing = "ease", iteration = 1) {
    //jQuery selector; CSS keyframes name; duration in ms; delay in ms;
    $(selector).css({
        "visibility": "hidden"
    });
    setTimeout(function () {
        $(selector).css({
            "visibility": "visible"
        });
        $(selector).css({
            "animation": keyFrameName + " " + duration + "ms " + timing + " " + iteration
        });
    }, delay);

    if (iteration != "infinite") {
        setTimeout(function () {
            $(selector).css({
                "animation": ""
            });
        }, (delay + duration) * iteration);
    }
};

// 툴팁 가져오기 함수
function loadTooltips() {
    // 검색으로 툴팁 메세지 요소를 가져오고 출력하기
    $("[data-tooltip]").each(function () {
        var tag = $(this)[0].tagName.toLowerCase();
        var tooltip = $(this).attr("data-tooltip");
        var tooltipParentH = $(this).outerHeight();
        var parentPosition = $(this).position();
        $(tooltip).insertAfter(this);
        $(tooltip).css({
            "max-width": document.body.clientWidth - parentPosition.left - 5 + "px",
            "transition": "opacity 0.3s"
        });

        function showTooltip() {
            $(tooltip).css({
                "visibility": "visible",
                "opacity": 1,
                "top": parentPosition.top + tooltipParentH + 10 + "px",
                "left": parentPosition.left + "px"
            });
        }

        function hideTooltip() {
            $(tooltip).on("mouseenter", stopTimerHide);

            function stopTimerHide() {
                clearTimeout(timerHide);
                $(tooltip).on("mouseleave", hideTooltip);
            }

            var timerHide = setTimeout(function () {
                $(tooltip).css({
                    "visibility": "hidden",
                    "opacity": 0
                });
            }, 100);
        }

        var _this = $(this);

        if (tag == "input") {
            $(this).on("focus", function () {
                showTooltip();

                _this.off("mouseleave", hideTooltip);
            });
            $(this).on("blur", function () {
                hideTooltip();

                _this.on("mouseleave", hideTooltip);
            });
            $(this).on("mouseenter", showTooltip);
            $(this).on("mouseleave", hideTooltip);
        } else {
            $(this).on("mouseenter", showTooltip);
            $(this).on("mouseleave", hideTooltip);
        }
    });
}

// 전체 함수 사용해 날씨 출력
var weather = new Weather();
$(document).ready(function () {
    $("#unit-switch").prop('checked', true);
    weather.loadAnimation();
    weather.setDate();
    weather.getLocation();
    weather.setLocation();
    weather.setUnit();
});