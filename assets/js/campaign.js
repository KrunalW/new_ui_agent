// Campaign Run Time's pop up 
var text = '<div class="modal-backdrop"></div>';
$('#viewMore').click(function () {
  // alert('Hi');
  setTimeout(function(){
    $('.offcanvas').addClass('show');
  }, 200);
  $(".offcanvas").addClass("showing").delay(1000).queue(function(next){
    $(this).removeClass("showing");
    next();
  });
  $('body').append(text);
});
function close() {
  $(".offcanvas").addClass("showing").delay(1000).queue(function(next){
    $(this).removeClass("showing");
    next();
  });
  $('.offcanvas').removeClass('show');
  $('.modal-backdrop').remove();
}
$(document).on('click', ".modal-backdrop", function () {
  close();
});
$('#closeOffCanvasBtn').click(function () {
  close();
});

$('#addCampaignBtn').click(function () {
  $('#campaignList').hide();
  $('#tabsSection').show();
});
$('#backCampaignBtn').click(function () {
  $('#campaignList').show();
  $('#tabsSection').hide();
});
$('#backCampaignBtn, #backRecordingBtn').click(function () {
  $('#campaignList').show();
  $('#tabsSection').hide();
});

$(function () {
  $('.select2').select2();

  var donutData = {
    labels: [
      'English',
      'Hindi',
      'Marathi',
      'Gujrati',
      'Tamil',
      'Telgu',
    ],
    datasets: [
      {
        data: [10, 15, 4, 6, 3, 1],
        backgroundColor: ['#cd84f1', '#18dcff', '#ff4d4d', '#ffaf40', '#fffa65', '#32ff7e'],
      }
    ]
  }
  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
  var pieData = donutData;
  var pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  new Chart(pieChartCanvas, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  });
});

$('#addSkillBtn').click(function () {
  // alert('Hi');
  $("#addSkillForm").show();
  $("#skillList").hide();
});

$('#backSkillBtn').click(function () {
  $("#campaignList").show();
  $("#tabsSection").hide();
});

$('#addQueuesBtn').click(function () {
  $("#addQueuesForm").show();
  $("#queuesList").hide();
});

$('#backQueuesBtn').click(function () {
  $("#tabsSection").hide();
  $("#campaignList").show();
});

$("document").ready(function () {
  $("#sliderUserWeight").rangeslider();
});
$.fn.rangeslider = function (options) {
  this.each(function (i, elem) {
    var obj = $(elem); // input element
    var defautValue = obj.attr("value");

    var slider_max = (obj.attr("max"));
    var slider_min = (obj.attr("min"));
    var slider_step = (obj.attr("step"));
    var slider_stop = (slider_max - slider_min) / slider_step;
    var step_percentage = 100 / slider_stop;

    // console.log(step_percentage);

    var color = "";
    var classlist = obj.attr("class").split(/\s+/);
    $.each(classlist, function (index, item) {
      if (item.startsWith('slider-')) {
        color = item;
      }
    });

    if (color == "") {
      color = "slider-blue";
    }

    if (slider_stop <= 30) {
      var i;
      var dots = "";
      for (i = 1; i < slider_stop; i++) {
        dots += "<div class='dot' id='" + i + "' style='left:" + step_percentage * i + "%;'></div>";
      }
    }
    else {
      var dots = "";
    }

    obj.wrap("<span class='slider " + color + "'></span>");
    obj.after("<span class='slider-container " + color + "'><span class='bar'><span></span>" + dots + "</span><span class='bar-btn'><span>Default</span></span></span>");
    obj.attr("oninput", "updateSlider(this)");
    updateSlider(this);
    return obj;
  });
};

function updateSlider(passObj) {
  var obj = $(passObj);
  var value = obj.val();
  var min = obj.attr("min");
  var max = obj.attr("max");
  var range = Math.round(max - min);
  var percentage = Math.round((value - min) * 100 / range);
  var nextObj = obj.next();

  var btn = nextObj.find("span.bar-btn");

  if (value == min) {
    nextObj.find("span.bar-btn").css("left", percentage + "%");
  }
  else if (value == max) {
    nextObj.find("span.bar-btn").css("left", "calc(" + percentage + "% - " + btn.width() + "px)");
  }
  else {
    nextObj.find("span.bar-btn").css("left", "calc(" + percentage + "% - " + btn.width() / 2 + "px)");
  }
  
  nextObj.find("span.bar > span").css("width", percentage + "%");

  if (value == 0) {
    nextObj.find("span.bar-btn > span").text("Default");
  }
  // else if (value == 1) {
  //   nextObj.find("span.bar-btn > span").text("Low");
  // }
  else if (value == 1) {
    nextObj.find("span.bar-btn > span").text("Medium");
  }
  else if (value == 2) {
    nextObj.find("span.bar-btn > span").text("High");
  }
};

$('#addAgentBtn').click(function () {
  $("#addAgentForm").show();
  $("#agentList").hide();
});

$('#backAgentBtn').click(function () {
  $("#tabsSection").hide();
  $("#campaignList").show();
});

$('#adddialerBtn').click(function () {
  $("#adddialerForm").show();
  $("#dialerList").hide();
});

$('#backdialerBtn').click(function () {
  $("#tabsSection").hide();
  $("#campaignList").show();
});

// Unassigned Agent Table
$("#unassignedAgentTable").on('click', '.moveUnassignAgent', function () {
  var currentRow = $(this).closest("tr");
  var col1 = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
  var col2 = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
  var col3 = currentRow.find("td:eq(2)").html(); // get current row 3rd table cell TD value
  var col4 = currentRow.find("td:eq(3)").html(); // get current row 4th table cell TD value
  var col5 = currentRow.find("td:eq(4)").html(); // get current row 5th table cell TD value
  $('#assignedAgentTable').prepend('<tr><td>' + col1 + '</td><td>' + col2 + '</td><td>' + col3 + '</td><td>' + col4 + '</td><td>' + col5 + '</td><td><a href="#" class="moveAssignAgent" title="Unassign" aria-label="Unassign" data-pjax="0"><i class="fas fa-chevron-left"></i> Unassign</a></td></tr>');
  currentRow.remove();
  $('#noData').remove();
  var tablebody = $('#unassignedAgentTable tbody');
  if (tablebody.children().length == 0) {
    tablebody.html("<tr id='noData'><td colspan='6' class='text-center'>No Data</td></tr>");
    $('#fetchLeftToRightAll').attr("disabled", true);
    $('#fetchRightToLeftAll').attr("disabled", false);
  }
  $('#fetchRightToLeftAll').attr("disabled", false);
});

// Assigned Agent Table
$("#assignedAgentTable").on('click', '.moveAssignAgent', function () {
  var currentRow = $(this).closest("tr");
  var col1 = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
  var col2 = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value
  var col3 = currentRow.find("td:eq(2)").html(); // get current row 3rd table cell TD value
  var col4 = currentRow.find("td:eq(3)").html(); // get current row 4th table cell TD value
  var col5 = currentRow.find("td:eq(4)").html(); // get current row 5th table cell TD value
  $('#unassignedAgentTable').prepend('<tr><td>' + col1 + '</td><td>' + col2 + '</td><td>' + col3 + '</td><td>' + col4 + '</td><td>' + col5+ '</td><td><a href="#" class="moveUnassignAgent" title="Assign" aria-label="Assign" data-pjax="0">Assign <i class="fas fa-chevron-right"></i></a></td></tr>');
  currentRow.remove();
  $('#noData').remove();
  var tablebody = $('#assignedAgentTable tbody');
  if (tablebody.children().length == 0) {
    tablebody.html("<tr id='noData'><td colspan='6' class='text-center'>No Data</td></tr>");
    $('#fetchLeftToRightAll').attr("disabled", false);
    $('#fetchRightToLeftAll').attr("disabled", true);
  }
  $('#fetchLeftToRightAll').attr("disabled", false);
});

$(document).on('click', '#fetchLeftToRightAll', function () {
  // alert("Hi");
  var text = $("#unassignedAgentTable").find('tbody tr').prepend();
  $('#assignedAgentTable tbody').prepend(text);
  var last_td = '<a href="#" class="moveAssignAgent" title="Unassign" aria-label="Unassign" data-pjax="0"><i class="fas fa-chevron-left"></i> Unassign</a>';
  $( "#assignedAgentTable tbody tr td:last-child" ).html(last_td);
  $("#unassignedAgentTable").find('tbody tr').remove();
  var tablebody = $('#unassignedAgentTable tbody');
  if (tablebody.children().length == 0) {
    tablebody.html("<tr id='noData'><td colspan='7' class='text-center'>No Data</td></tr>");
    $('#fetchLeftToRightAll').attr("disabled", true);
    $('#fetchRightToLeftAll').attr("disabled", false);
  }
  $('#assignedAgentTable #noData').remove();
});

$(document).on('click', '#fetchRightToLeftAll', function () {
  // alert("Hi");
  var text = $("#assignedAgentTable").find('tbody tr').prepend();
  $('#unassignedAgentTable tbody').prepend(text);
  var last_td = '<a href="#" class="moveUnassignAgent" title="Assign" aria-label="Assign" data-pjax="0">Assign <i class="fas fa-chevron-right"></i></a>';
  $( "#unassignedAgentTable tbody tr td:last-child" ).html(last_td);
  $("#assignedAgentTable").find('tbody tr').remove();
  var tablebody = $('#assignedAgentTable tbody');
  if (tablebody.children().length == 0) {
    tablebody.html("<tr id='noData'><td colspan='7' class='text-center'>No Data</td></tr>");
  }
  $('#unassignedAgentTable #noData').remove();

  $('#fetchLeftToRightAll').attr("disabled", false);
  $('#fetchRightToLeftAll').attr("disabled", true);
});

// if($('#unassignedAgentTable').children("tbody tr").find().attr('id', 'noData')){
//   $('#fetchLeftToRightAll').attr("disabled", true);
// }
// if($('#assignedAgentTable').children("tbody tr").find().attr('id')){
//   $('#fetchRightToLeftAll').attr("disabled", true);
// }

//Elements:
var $source = $("#audiotrack")[0],
  $track = $("#track"),
  $progress = $("#progress"),
  $play = $("#play"),
  $pause = $("#pause"),
  $playPause = $("#play, #pause"),
  $stop = $("#stop"),
  $mute = $("#mute"),
  $volume = $("#volume"),
  $level = $("#level");

//Vars:
var totalTime,
  timeBar,
  newTime,
  volumeBar,
  newVolume,
  cursorX;

var interval = null;

$(document).ready(function () {
  //===================
  //===================
  //Track:
  //===================
  //===================

  //Progress bar:
  function barState() {
    if (!$source.ended) {
      var totalTime = parseInt($source.currentTime / $source.duration * 100);
      $progress.css({ "width": totalTime + 1 + "%" });
    }
    else if ($source.ended) {
      $play.show();
      $pause.hide();
      clearInterval(interval);
    };
    console.log("playing...");
  };

  //Event trigger:
  $track.click(function (e) {
    if (!$source.paused) {
      var timeBar = $track.width();
      var cursorX = e.pageX - $track.offset().left;
      var newTime = cursorX * $source.duration / timeBar;
      $source.currentTime = newTime;
      $progress.css({ "width": cursorX + "%" });
    };
  });

  //===================
  //===================
  //Button (Play-Pause):
  //===================
  //===================

  $("#pause").hide();

  function playPause() {
    if ($source.paused) {
      $source.play();
      $pause.show();
      $play.hide();
      interval = setInterval(barState, 50); //Active progress bar.
      console.log("play");
    }
    else {
      $source.pause();
      $play.show();
      $pause.hide();
      clearInterval(interval);
      console.log("pause");
    };
  };

  $playPause.click(function () {
    playPause();
  });
  function stop() {
    $source.pause();
    $source.currentTime = 0;
    $progress.css({ "width": "0%" });
    $play.show();
    $pause.hide();
    clearInterval(interval);
  };

  $stop.click(function () {
    stop();
  });

  function mute() {
    if ($source.muted) {
      $source.muted = false;
      $mute.removeClass("mute");
      console.log("soundOFF");
    }
    else {
      $source.muted = true;
      $mute.addClass("mute");
      console.log("soundON");
    };
  };

  $mute.click(function () {
    mute();
  });

  //===================
  //===================
  //Volume bar:
  //===================
  //===================
  $volume.click(function (e) {
    var volumeBar = $volume.width();
    var cursorX = e.pageX - $volume.offset().left;
    var newVolume = cursorX / volumeBar;
    $source.volume = newVolume;
    $level.css({ "width": cursorX + "px" });
    $source.muted = false;
    $mute.removeClass("mute");
  });

}); //Document ready end.

$("#select_audio").change(function () {
  var text = $(this).find(":selected").text();
  // alert(text);
  var btn = $(this).parent().siblings().children('button').attr("data-target", "#preview_audio");
  $(btn).attr("disabled", false);
});

$("#audioDropDown").click(function (ev) {
  $(".dropdown-content").toggle();
  ev.stopPropagation();
  $(this).siblings().children().children().find("h")
});

$(".dropdown-list h6").click(function () {
  var text = $(this).text();
  // alert(text);
  $("#audioText").text(text);
  $(".dropdown-content").hide();
});

window.onclick = function (event) {
  var $target = $(event.target);
  if (!$target.closest('.dropdown-content').length &&
    $('.dropdown-content').is(":visible")) {
    $('.dropdown-content').hide();
  }
}

$('input[type="file"]').change(function (e) {
  var fileName = e.target.files[0].name;
  var title = $(this).parents(".dropdown-container").children('.dropdown-content').find("h6");
  $(title).text(fileName);
  $("#audioText").text(fileName);
});

$('.myTable').DataTable({
  select: {
      style: 'multi'
  },
  "paging": true,
  "autoWidth": true,
  "buttons": [
    'colvis',
    'copyHtml5',
    'csvHtml5',
    'excelHtml5',
    'pdfHtml5',
    'print'
  ]
});

$('#unassignedAgentTable').DataTable({
  select: {
      style: 'multi'
  },
  "paging": true,
  "autoWidth": true,
  "buttons": [
    'colvis',
    'copyHtml5',
    'csvHtml5',
    'excelHtml5',
    'pdfHtml5',
    'print'
  ]
});

$('#assignedAgentTable').DataTable({
  select: {
      style: 'multi'
  },
  "paging": true,
  "autoWidth": true,
  "buttons": [
    'colvis',
    'copyHtml5',
    'csvHtml5',
    'excelHtml5',
    'pdfHtml5',
    'print'
  ]
});