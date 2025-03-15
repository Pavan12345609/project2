var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    $loveHeart = $("#loveHeart");
    var offsetX = $loveHeart.width() / 2;
    var offsetY = $loveHeart.height() / 2 - 55;

    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);

    // Countdown Timer Initialization
    var startTime = new Date(2024, 7, 29, 11, 0, 0); // August 29, 2024, at 11:00 AM

    timeElapse(startTime); // First call to display immediately
    setInterval(function () {
        timeElapse(startTime);
    }, 1000); // Update every second
});

function timeElapse(startTime) {
    var now = new Date();
    var seconds = Math.floor((now - startTime) / 1000);

    var days = Math.floor(seconds / (3600 * 24));
    seconds %= (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Ensure double digits format
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Update the countdown timer in the page
    var timeString = `<span class="digit">${days}</span> days 
                      <span class="digit">${hours}</span> hours 
                      <span class="digit">${minutes}</span> mins 
                      <span class="digit">${seconds}</span> seconds`;

    document.getElementById("elapseClock").innerHTML = timeString;
}
