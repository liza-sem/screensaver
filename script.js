<style>
#screensaver-background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
}

#screensaver, #time-date {
  position: absolute;
  z-index: 99999;
}

#screensaver {
  width:50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
}

#time-date {
  color: white;
  font-size: 2em;
  text-align: center;
}
</style>

<div id="screensaver-background">
  <div id="screensaver"></div>
  <div id="time-date"></div>
</div>

<script>
// Configurable settings
var config = {
  imageSource: 'https://www.freeiconspng.com/uploads/dvd-logo-png-23.png',
  idleTime: 5, // in seconds
  velocity: {
    x: Math.max(1, window.innerWidth / 500), // Adjust the divisor as needed for balance
    y: Math.max(1, window.innerHeight / 500) // Adjust the divisor as needed for balance
  },
  backgroundColor: 'black',
  screensaverName: 'faviconBounce', // or 'faviconBounce'
  animation: true, // true for bounce effect, false for no movement
};

var mousetimeout;
var screensaver_active = false;
var screenSize = { width: window.innerWidth, height: window.innerHeight };

$(document).mousemove(function() {
  clearTimeout(mousetimeout);
  if (screensaver_active) {
    stop_screensaver();
  }
  mousetimeout = setTimeout(function() {
    show_screensaver();
  }, 1000 * config.idleTime);
});

function show_screensaver() {
  $("#screensaver-background").css('background', config.backgroundColor).fadeIn();
  screensaver_active = true;

  // Determine which screensaver to show
  if (config.screensaverName === 'timeDate') {
    $("#time-date").show();
    timeDateScreensaver();
  } else if (config.screensaverName === 'faviconBounce') {
    $("#screensaver").css('background-image', 'url(' + getImageSource() + ')').show();
  }

  // Apply bounce animation if enabled
  if (config.animation) {
    bounceAnimation(config.screensaverName === 'timeDate' ? "#time-date" : "#screensaver");
  }
}

function bounceAnimation(selector) {
  if (screensaver_active) {
    var pos = $(selector).position();
    var newX = pos.left + config.velocity.x;
    var newY = pos.top + config.velocity.y;

    if (newX <= 0 || newX + $(selector).width() >= screenSize.width) {
      config.velocity.x *= -1;
    }
    if (newY <= 0 || newY + $(selector).height() >= screenSize.height) {
      config.velocity.y *= -1;
    }

    $(selector).css({
      left: newX + 'px',
      top: newY + 'px'
    });

    requestAnimationFrame(function() { bounceAnimation(selector); });
  }
}

function timeDateScreensaver() {
  updateTimeDate();
}

function updateTimeDate() {
  if (screensaver_active) {
    var now = new Date();
    var time = now.toLocaleTimeString();
    var date = now.toLocaleDateString();
    $("#time-date").html(time + "<br>" + date);
    setTimeout(updateTimeDate, 1000); // Update every second
  }
}

function stop_screensaver() {
  $("#screensaver-background").fadeOut();
  screensaver_active = false;
}

function getImageSource() {
  if (config.imageSource === 'default') {
    var favicon = $("link[rel='icon']").attr("href");
    return favicon ? favicon : 'https://assets.squarespace.com/universal/default-favicon.ico';
  } else {
    return config.imageSource;
  }
}
  // Update screenSize on window resize
$(window).resize(function() {
  screenSize.width = window.innerWidth;
  screenSize.height = window.innerHeight;

  // Optional: Adjust screensaver elements if necessary
  if (screensaver_active) {
    // For example, re-center the time-date screensaver
    if (config.screensaverName === 'timeDate' && !config.animation) {
      $("#time-date").css({
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      });
    }
    // If the animation is active, you might want to reset or adjust the animation
    // to ensure it respects the new window bounds. This could involve recalculating
    // the current position or simply restarting the animation.
    if (config.animation) {
      // This is a simple approach: restart the animation to ensure it stays within bounds
      // For a more sophisticated approach, you might adjust positions without restarting.
      bounceAnimation(config.screensaverName === 'timeDate' ? "#time-date" : "#screensaver");
    }
  }
});

</script>
