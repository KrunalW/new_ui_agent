$("#dialerInput").keypress(function (e) {
  // alert("Hi");
  var charCode = (e.which) ? e.which : event.keyCode
  if (String.fromCharCode(charCode).match(/[^0-9]/g))
    return false;
});

$(".number").click(function (event) {
  let text = $(this).text();
  var val = $('#dialerInput').val();
  if (val.length < 10) {
    $("#dialerInput").val(val + text).focus();
  }
});

function phoneValidation() {
  var val = $('#dialerInput').val();
  if (val.length < 10) {
    notification("#msg", "Please enter valid number", "alert-danger");
  } else {
    notification("#msg", "Connenting...", "alert-warning");
    $(".keypad-content, #agentDailerImgBox").hide();
    $(".call-connection").show();
    $(".sip-phone").removeClass("dialer-box");
    $(".sip-phone").addClass("call-connent buzzing");
    $(".dialed-number").html(val);
    $("#crmFrom").slideDown();
    $("#dialerInput").val("");

    setTimeout(function () {
      $(".connection-time").html('Connected <span class="minute-box">00</span>: <span class="second-box">00</span>');
      $('.sip-phone').removeClass("buzzing");
      $('.sip-phone-action-btns-container').removeClass("disabled");
      notification("#msg", "Call connected", "alert-success");
    }, 5000);
  }
}

$("#dialerInput").keypress(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    phoneValidation();
  }
});

function callDialedNumber() {
  phoneValidation();
}

$(".remove-btn").click(function () {
  var val = $('#dialerInput').val();
  var tmp = val.slice(0, -1);
  $("#dialerInput").val(tmp).focus();
});

// Timer 
let counter = 0;
let seconds = "00";
let minutes = "00";
const getTimerMinutes = (counter) => {
  let minuteCounter = Math.floor(counter / 60);
  return minuteCounter < 10 ? `0${minuteCounter}` : `${minuteCounter}`;
};

const getTimerSeconds = (counter) => {
  let secondCounter = counter % 60;
  $(".second-box").html(secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`)
  return secondCounter < 10 ? `0${secondCounter}` : `${secondCounter}`;
};
const setCount = () => {
  console.log("here");
  seconds = getTimerSeconds(counter);
  minutes = getTimerMinutes(counter);

  $(".minute-box").html(seconds);
  counter = counter + 1;
};

var intervalId = window.setInterval(function () {
  seconds = getTimerSeconds(counter);
  minutes = getTimerMinutes(counter);
  $(".minute-box").html(minutes);
  $(".second-box").html(seconds);
  counter = counter + 1;
}, 1000);


function addContact() {
  $(".keypad-content").hide();
  $(".add-contact-box").show();
}
$("#keypadBtn").click(function () {
  $(".keypad-content").show();
  $(".add-contact-box").hide();
  $('#dialerInput').focus();
});
$("#keypadConntectBtn").click(function () {
  $(".keypad-content").show();
  $(".call-connection").hide();
  $(".sip-phone").addClass("dialer-box");
  $(".sip-phone").removeClass("call-connent");
  $(".connected-client-box").show();
  $('#dialerInput').focus();
});
$("#transferBtn").click(function () {
  $(".add-contact-box").show();
  $(".keypad-content, .call-connection").hide();
  $(".sip-phone").addClass("dialer-box");
  $(".sip-phone").removeClass("call-connent");
  $(".connected-client-box").show();
  $('#dialerInput').focus();
});

$(".connected-client-box").click(function () {
  $(".call-connection").show();
  $(".sip-phone").removeClass("dialer-box");
  $(".sip-phone").addClass("call-connent");
  $(".connected-client-box, .keypad-content, .add-contact-box").hide();
});

$(".sip-phoneBtn").click(function () {
  $(this).toggleClass("active");
  var text = $(this).parent().find(".sip-phone-text");
  if (text.text() === "Mute") {
    text.text("Unmute");
  }
  else if (text.text() === "Unmute") {
    text.text("Mute");
  }

  if (text.text() === "Hold") {
    text.text("Unhold");
  }
  else if (text.text() === "Unhold") {
    text.text("Hold");
  }
});

$("#notReadyCall").click(function () {
  $(".not-ready-reason-container").show();
  $(".keypad-content").hide();
  $("#call-action-btn").html("I'm <span class='text-danger'>not ready</span> <span class='line-1 anim-typewriter'>  to take a call. Click Ready Button.</span>");
  $("#call-action-btn").addClass("mt-3");
});

$("#readyCall").click(function () {
  $(".not-ready-reason-container").hide();
  $(".keypad-content").show();
  $("#call-action-btn").html("<span class='line-1 anim-typewriter font-lg'>I'm <span class='text-success'>ready</span> to take a call.</span>");
  $("#call-action-btn").removeClass("mt-3");
});


// Consult call 

// $("#consultCall").click(function () {
  $(document).on("click", "#consultCall", function () {
    var text = $(this).parent().find(".sip-phone-text");
    if (text.text() === "Consult") {
      text.text("End Consult");
  
      $(".add-contact-box").attr('id', 'consultNow').show();
      if ($(".add-contact-box").attr('id', 'consultNow')) {
        $(".keypad-content, .call-connection").hide();
        $(".sip-phone").addClass("dialer-box");
        $(".sip-phone").removeClass("call-connent");
        $(".connected-client-box").show();
        $('#dialerInput').focus();
  
        $(document).on("click", "#consultNow li", function () {
          $(".add-contact-box").attr('id', '').hide();
          $(".call-connection").show();
          $(".sip-phone").removeClass("dialer-box");
          $(".sip-phone").addClass("call-connent buzzing");
          $(".connected-client-box").addClass("active-on-hold");
          $(".fa-arrow-left").hide();
          var contact = $(this).text();
          $(".call-connection .dialed-number").html(contact);
          $(".connected-client-box .connection-time").html("On Hold");
  
          setTimeout(function () {
            $('.sip-phone').removeClass("buzzing");
            notification("#msg", "your consult is on call", "alert-success");
          }, 5000);
        });
  
        $(document).on("click", ".connected-client-box", function () {
          text.text("Consult");
          $(".sip-phoneBtn").removeClass("active");
        });
      }
    }
    else if (text.text() === "End Consult") {
      text.text("Consult");
      $(".connected-client-box").removeClass("active-on-hold").hide();
      var val = $(".connected-client-box .dialed-number").text();
      $(".call-connection .dialed-number").html(val);
      $(".fa-arrow-left").show();
      $(".connected-client-box .connection-time").html('Connected <span class="minute-box">00</span>: <span class="second-box">00</span>');
    }
  });


  // Conference call 
  $(document).on("click", "#conferenceBtn", function () {
  // $("#conferenceBtn").click(function(){
    var conferencebtn = $(this);
    // alert("Conference Call");

    // var html = '<div class="conference-call"> Connecting to <div class="con-call-box"> <div class="con-call-number"> </div> </div>  </div>';
    var html = '<div class="text-center"><div class="connecting-to-text">Connecting to...</div><div class="conference-number">4848484</div>  </div>';
    var text = conferencebtn.parent().find(".sip-phone-text");
    conferencebtn.toggleClass("active");
    if (text.text() === "Conference") {
      text.text("End Conference");
      $(".sip-phone-text").css({"width": "95px", "display": "inline-block"});

      $(".add-contact-box").attr('id', 'conferenceCall').show();
      if ($(".add-contact-box").attr('id', 'conferenceCall')) {
        $(".keypad-content, .call-connection").hide();
        $(".sip-phone").addClass("dialer-box");
        $(".sip-phone").removeClass("call-connent");
        $(".connected-client-box").show();
        $('#dialerInput').focus();

        $(document).on("click", "#conferenceCall li", function () {
          $(".add-contact-box").attr('id', '').hide();
          $("#conferenceCallBox, .call-connection").show();
          $(".connected-client-box").hide();
          $(".sip-phone").removeClass("dialer-box");
          $(".sip-phone").addClass("call-connent buzzing");
          $(".sip-phone-action-btns-box").parent().addClass("disabled");
          $(conferencebtn).parent().removeClass("disabled");
          
          $("#conferenceCallBox").html(html);
          var contact = $(this).text();
          $(".conference-number").html(contact);
          $(".dialed-number").hide();
          setTimeout(function () {
            $('.sip-phone').removeClass("buzzing");
            $(".call-connection").hide();
            $(".sip-phone").addClass("dialer-box");
            $(".sip-phone").removeClass("call-connent");
            $(".dialed-number, .conference-call-container").show();
            
            
            notification("#msg", "Conference call added successfully", "alert-success");
          }, 5000);
        });

        $("#customerHangUp").click(function (){
          // alert("Hi");
          $(".dialed-number, .connecting-to-text").hide();
          $(".call-connection").show();
          $(".sip-phone").removeClass("dialer-box");
          $(".sip-phone").addClass("call-connent");
          $(".sip-phone-action-btns-box").parent().removeClass("disabled");
          text.text("Conference");
          conferencebtn.removeClass("active");
        });
        $("#participantHangUp").click(function(){
          $("#conferenceCallBox").hide();
          $(".call-connection").show();
          $(".sip-phone").removeClass("dialer-box");
          $(".sip-phone").addClass("call-connent");
          $(".sip-phone-action-btns-box").parent().removeClass("disabled");
          text.text("Conference");
          conferencebtn.removeClass("active");
        });
      }
    }
    else if (text.text() === "End Conference") {
      // alert("End Conference");
      text.text("Conference");
      $(".sip-phone-text").css({"width": "auto", "display": "inline-block"});
      $(".conference-call").remove();
      $(".sip-phone-action-btns-box").parent().removeClass("disabled");
    }
  });
  