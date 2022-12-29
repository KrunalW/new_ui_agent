// Global variables
let leadId = '';

function svgPath(points, command) {
    // build the d attributes by looping over the points
    return points.reduce((acc, point, i, a) => i === 0
        // if first point
        ? `M ${point[0]},${point[1]}`
        // else
        : `${acc} ${command(point, i, a)}`
        , '')
    // return `<path d="${d}" fill="none" stroke="grey" />`
}

function line(pointA, pointB) {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

function controlPoint(current, previous, next, reverse) {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current
    const n = next || current
    // The smoothing ratio
    const smoothing = 0.2
    // Properties of the opposed-line
    const o = line(p, n)
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

function bezierCommand(point, i, a) {
    // start control point
    const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
    // end control point
    const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
}

function getDispositions() {
    let query = "server_ip=" + server_ip + "&session_name=" + session_name +
        "&ACTION=BarChartShow&format=text&user=" + user + "&pass=" + pass + "&conf_exten=" + session_id +
        "&extension=" + extension + "&protocol=" + protocol + "&disable_alter_custphone=" +
        disable_alter_custphone + "&campaign=" + campaign;

    fetch('bar_chart.php', {
        method: 'POST',
        body: encodeURI(query),
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(jsonData => {
            let calllbackset = 0, NIset = 0, saleSet = 0, otherDispos = 0;

            for(const status of jsonData){
                if (status.status == 'CA6') calllbackset += parseInt(status.count)
                else if (status.status == 'CBO') calllbackset += parseInt(status.count)
                else if (status.status == 'CBK') calllbackset += parseInt(status.count)
                else if (status.status == 'NI') NIset += parseInt(status.count)
                else if (status.status == 'NIBH') NIset += parseInt(status.count)
                else if (status.status == 'NICA') NIset += parseInt(status.count)
                else if (status.status == 'NIJE') NIset += parseInt(status.count)
                else if (status.status == 'NIMAB') NIset += parseInt(status.count)
                else if (status.status == 'NINR') NIset += parseInt(status.count)
                else if (status.status == 'NIOP') NIset += parseInt(status.count)
                else if (status.status == 'NIOPWT') NIset += parseInt(status.count)
                else if (status.status == 'CONV') saleSet += parseInt(status.count)
                else if (status.status == 'CBOP') saleSet += parseInt(status.count)
                else otherDispos += parseInt(status.count)
            }
            pieChart.updateSeries([parseInt(calllbackset), parseInt(NIset), parseInt(saleSet), parseInt(otherDispos)]);
            // $('#callback-count').text(calllbackset);
            $('#ni-count').text(NIset);
            $('#lead-count').text(saleSet);
        })
}

// Open Manual Dialer
$('.open-dialer').click(function () {
    $('.dialer-wrap').toggleClass('active');
    $('.dialer-display').focus();
})

// Insert Manual Dial Number Using Numpad
$('.dialer-wrap .number').click(function () {
    $('.dialer-display').val($('.dialer-display').val() + $(this).text());
})

// Dial Manual
$('.dialer-wrap .call-icon').click(function () {
    NeWManuaLDiaLCalLSubmiT('NOW', 'YES');
    $('.open-dialer').click();
})

$('.dialer-wrap .dialer-display').keyup(function (event) {
    if (event.keyCode === 13) {
        $('.dialer-wrap .call-icon').click();
    }
})

// Set Call Summary in Dashboard
function setCallSummary() {
    let fetchURL = `revamp/api/apiDashboard.php?callSummary=${user}`;
    fetch(fetchURL)
        .then(res => res.json())
        .then(callSummary => {
            $('.data-v .summary').removeClass('red').removeClass('yellow').removeClass('green');

            for (const property in callSummary) {
                if (callSummary[property] == null) {
                    callSummary[property] = '00:00:00';
                }
            }

            $('#total-login').text(callSummary.loginTime).addClass(setCallThreshhold(callSummary.loginTime, 'login'));
            $('#total-break').text(callSummary.breakDuration).addClass(setCallThreshhold(callSummary.breakDuration, 'break'));
            $('#talk-time').text(callSummary.talkDuration).addClass(setCallThreshhold(callSummary.talkDuration, 'talk'));
            $('#wrap-time').text(callSummary.wrapDuration).addClass(setCallThreshhold(callSummary.wrapDuration, 'wrap'));
            $('#hold-time').text(callSummary.holdDuration).addClass(setCallThreshhold(callSummary.holdDuration, 'hold'));

            getAHT();
        })
}

// Set Call Threshhold
function setCallThreshhold(time, timeType) {
    if (time === null) return '';
    let hours = parseInt(time.substring(0, 2));
    let minutes = parseInt(time.substring(3, 5));

    switch (timeType) {
        case 'login': {
            if (hours >= 9 && minutes >= 0) return 'green';
            else if (hours < 5) return 'red';
            else return 'yellow';
        }
        case 'break': {
            if (hours == 0 && minutes <= 30) return 'green';
            else if (hours > 0) return 'red';
            else return 'yellow';
        }
        case 'talk': {
            return 'green';
        }
        case 'wrap': {
            if (hours == 0 && minutes <= 30) return 'green';
            else if (hours > 0) return 'red';
            else return 'yellow';
        }
        case 'hold': {
            if (hours == 0 && minutes <= 30) return 'green';
            else return 'red';
        }
    }

    return '';
}

// Fetch Total Calls for the day
function getTotalCalls() {
    let fetchURL = `revamp/api/apiDashboard.php?totalCalls=${user}`;
    fetch(fetchURL)
        .then(res => res.json())
        .then(callCount => {
            // console.log(callCount);
            $('#total-call-count').text(callCount.calls_today);
            setCallSummary();
        })
        .catch(error => {
            console.error(error);
        })
}

// Fetch Total AHT for the day
function getAHT() {
    let talkDuration = convertHHMMSS($('#talk-time').text());
    let wrapDuration = convertHHMMSS($('#wrap-time').text());
    let holdDuration = convertHHMMSS($('#hold-time').text());
    let totalCalls = parseInt($('#total-call-count').text());
    if (totalCalls == 0) {
        totalCalls++;
    }

    let aht = (talkDuration + wrapDuration + holdDuration) / totalCalls;

    $('#aht-count .count').text(aht ? Math.round(aht) : 0);
}

// 
function convertHHMMSS(HHMMSSS) {
    return HHMMSSS.split(':').reduce((acc, time) => (60 * acc) + +time);
}

function setBarChart(dataArray) {
    const sum = dataArray.reduce((a, b) => a + b);
    const maxHeight = 280;

    const barsPolygon = document.querySelectorAll('.bar-svg polygon');
    const barsAnimate = document.querySelectorAll('.bar-svg polygon animate');
    const barsPercentage = document.querySelectorAll('.bar-svg .percentages text');
    const barsPercentageAnimate = document.querySelectorAll('.bar-svg .percentages animate');
    const barsPointCircle = document.querySelectorAll('.bar-svg .line circle');

    const percArray = dataArray.map(value => !value && !sum ? 0 : value / sum * 100);
    const lengthArray = percArray.map(value => !value ? 0 : value * maxHeight / 100);
    const linePointsArray = lengthArray.map((value, index) => [index * 60 + 25, 330 - value - 65])

    for (let i = 0, j = 0; i < dataArray.length; i++, j += 60) {
        barsAnimate[i].setAttribute('to', `${j} 0 ${j} ${Math.round(lengthArray[i])} ${j + 25} ${Math.round(lengthArray[i]) + 25} ${j + 50} ${Math.round(lengthArray[i])} ${j + 50} 0 ${j} 0`);
        barsPercentageAnimate[i].setAttribute('to', 330 - Math.round(lengthArray[i]) - 35);
        barsPercentage[i].innerHTML = `${Math.round(percArray[i])}%`;
        barsAnimate[i].beginElement();
        barsPercentageAnimate[i].beginElement();
        barsPointCircle[i].setAttribute('cx', linePointsArray[i][0]);
        barsPointCircle[i].setAttribute('cy', linePointsArray[i][1]);
    }

    setTimeout(() => {
        for (let i = 0, j = 0; i < dataArray.length; i++, j += 60) {
            barsPolygon[i].setAttribute('points', `${j} 0 ${j} ${Math.round(lengthArray[i])} ${j + 25} ${Math.round(lengthArray[i]) + 25} ${j + 50} ${Math.round(lengthArray[i])} ${j + 50} 0 ${j} 0`);
            barsPercentage[i].setAttribute('y', 330 - Math.round(lengthArray[i]) - 35);
        }
    }, 1000)

    document.querySelector('.bar-svg path').setAttribute('d', svgPath(linePointsArray, bezierCommand));
}

// Convert Data into percentage for Pie chart
function setPieChart(dataArray) {
    const sum = dataArray.reduce((a, b) => a + b);

    const percArray = dataArray.map(value => !value && !sum ? 25 : (value / sum * 100));
    const slices = document.querySelectorAll('.pie-svg circle');
    const sliceKeyItems = document.querySelectorAll('.pie-wrap .pie-key-item');
    const sliceKeyValues = document.querySelectorAll('.pie-wrap .pie-key-value');
    const sliceTitles = ['Callback', 'Not Interested', 'Sales', 'Other'];

    for (let i = 0, j = 0; i < dataArray.length; i++, j += percArray[i - 1]) {
        slices[i].setAttribute('stroke-dasharray', `${percArray[i] * 31.4 / 100} 31.4`);
        slices[i].setAttribute('data-pieData', `${sliceTitles[i]}: ${dataArray[i]}`);
        const rotate = 1.8 * percArray[i] + (j * 3.60);
        sliceKeyItems[i].style.transform = `rotate(${rotate}deg)`;
        sliceKeyValues[i].style.transform = `translate(-50%) rotate(-${rotate}deg)`;
        if (percArray[i] == 0) {
            sliceKeyItems[i].style.display = 'none';
        } else {
            sliceKeyItems[i].style.display = 'block';
        }
        if (i === 0) continue;
        slices[i].setAttribute('stroke-dashoffset', `-${j * 31.4 / 100}`);
    }
}

// Pie Chart Tooltip
function circleHover() {
    const tooltip = document.querySelector('.tooltip');
    if (event.target.localName === "circle") {
        tooltip.classList.add('active');
        tooltip.style = `left: ${event.layerX}px; top: ${event.layerY}px`;
        tooltip.innerHTML = event.target.getAttribute('data-pieData');
    } else {
        tooltip.classList.remove('active');
    }
}

// Displays the call status as live, hang or off
function displayCallStatus(callStatus) {
    const callStatusElement = $('.display-panel .call-status');
    callStatusElement.removeClass('live').removeClass('hang');
    switch (callStatus) {
        case 'live':
            callStatusElement.addClass('live'); break;
        case 'hang':
            callStatusElement.addClass('hang');
            dialedcall_send_hangup('NO', '', '', '', 'YES');
            break;
        case 'off':
            $('.display-panel .call-length').removeClass('active');
    }
}

// Displays the call length
function displayCallLength(seconds) {
    if (seconds == 0) {
        $('.display-panel .call-length').removeClass('active');
    } else {
        $('.display-panel .call-length').addClass('active');
        $('.display-panel .call-length b').text(seconds);
    }
}

// Displays if the call is a previous callback
function displayPreviousCallback(flag) {
    if (flag) {
        $('.display-panel .callback-status').addClass('active');
    } else {
        $('.display-panel .callback-status').removeClass('active');
    }
}

function setParkCall(clickAttribute, parkType) {
    const button = $('.call-action.park-call');
    if (parkType == 'FROMParK') {
        button.attr('src', 'revamp/assets/img/park-call-off.png');
    } else if (parkType == 'ParK') {
        button.attr('src', 'revamp/assets/img/park-call.png');
    }
    button.attr('onclick', clickAttribute);
}

function setDialControl(dialFunction1, dialFunction2 = '') {
    $('.call-actions-wrap').removeClass('manual-dial');
    $('.call-actions-wrap').removeClass('manual-dial-ready');
    $('.call-actions-wrap').removeClass('manual-dial-pause');
    $('.resume-call').attr('onclick', '');
    $('.pause-call').attr('onclick', '');

    if (dialFunction1.search("ManualDialNext") == 0) {
        if (!$('.call-actions-wrap').hasClass('live-call')) {
            $('.call-actions-wrap').addClass('manual-dial');
            $('.next-call').attr('onclick', dialFunction1);
        }
    } else if (dialFunction1.search("VDADready") > 0) {
        $('.call-actions-wrap').removeClass('ready');
        $('.resume-call').attr('onclick', dialFunction1);
        if (dialFunction2.search("ManualDialNext") == 0) {
            $('.call-actions-wrap').addClass('manual-dial-pause');
            $('.next-call').attr('onclick', dialFunction2);
        }
    } else if (dialFunction1.search("VDADpause") > 0) {
        $('.call-actions-wrap').addClass('ready');
        $('.pause-call').attr('onclick', dialFunction1);
        if (dialFunction2.search("ManualDialNext") == 0) {
            $('.call-actions-wrap').addClass('manual-dial-ready');
            $('.next-call').attr('onclick', dialFunction2);
        }
    }
}

// Display Pause Time
let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;
let pauseTime = $('.pause-display .pause-time');
function displayPauseTime(pauseCode) {

    const startTimer = () => {
        if (stoptime) {
            stoptime = false;
            timerCycle();
        }
    }
    const stopTimer = () => {
        if (!stoptime) {
            stoptime = true;
        }
    }

    const timerCycle = () => {
        if (!stoptime) {
            sec = parseInt(sec);
            min = parseInt(min);
            hr = parseInt(hr);

            sec = sec + 1;

            if (sec == 60) {
                min = min + 1;
                sec = 0;
            }
            if (min == 60) {
                hr = hr + 1;
                min = 0;
                sec = 0;
            }
            if (sec < 10 || sec == 0) {
                sec = '0' + sec;
            }
            if (min < 10 || min == 0) {
                min = '0' + min;
            }
            if (hr < 10 || hr == 0) {
                hr = '0' + hr;
            }

            pauseTime.text(hr + ':' + min + ':' + sec);

            setTimeout(timerCycle, 1000);
        }
    }
    const resetTimer = () => {
        pauseTime.text('00:00:00');
        hr = 0; min = 0; sec = 0;
    }

    if (pauseCode != '') {
        $('.pause-display').addClass('active');
        $('.pause-display .pause-code').text(pauseCode);
        startTimer();
    } else {
        stopTimer();
        resetTimer();
        $('.pause-display').removeClass('active');
        $('.pause-display .pause-code').text(pauseCode);
    }
}

// Display Notification
$('.notification').click(() => {
    $('.notification-wrap').toggleClass('open');
})

// Display Old Display Panel
function displayOldPanel() {
    $('.display-panel').toggle();
    $('span').toggle();
}

// Manual hangup
function manualHangup() {
    dialedcall_send_hangup('NO', '', '', '', 'YES');
    $('.call-actions-wrap').removeClass('live-call');
}

function updateDashboard() {
    getTotalCalls();
    getDispositions();
}

var pieOptions = {
    chart: {
        type: 'donut',
        width: '100%'
    },
    colors: ['#d32a2a', '#4a28c6', '#005408', '#af6104'],
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '12px',
        markers: {
            width: 10,
            height: 10,
        },
        itemMargin: {
            horizontal: 0,
            vertical: 8
        },
        labels: {
            colors: '#000'
        },
        tooltipHoverFormatter: function (seriesName) {
            return seriesName;
        }
    },
    plotOptions: {
        pie: {
            // customScale: 1.5,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '26px',
                        fontFamily: 'Inter, sans-serif',
                        color: undefined,
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '30px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#272b41',
                        offsetY: 16
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        color: '#272b41',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce(function (a, b) {
                                return a + b
                            }, 0)
                        }
                    }
                }
            }
        }
    },
    responsive: [{
        breakpoint: 1024,
        options: {
            plotOptions: {
                pie: {
                    donut: {
                        size: '90%'
                    }
                }
            }
        }
    }],
    stroke: {
        show: true,
        width: 5,
        colors: '#fff'
    },
    series: [],
    labels: ['Callback', 'Not Interested', 'Sales', 'Other'],
    noData: {
        text: 'Loading...'
    }
}

const pieChart = new ApexCharts(document.querySelector('.pie-wrap'), pieOptions);

pieChart.render();

// Dark Mode
$('#dark-mode-checkbox').change(function () {
    if (this.checked) {
        $('html').addClass('dark-mode');
        localStorage.setItem('dark-mode', 'true');
    } else {
        $('html').removeClass('dark-mode');
        localStorage.setItem('dark-mode', 'false');
    }
})

// Document Ready
$(document).ready(function () {
    setBarChart([10, 30, 20, 50, 40, 10]);
    updateDashboard();

    // Check Browser setting for dark mode
    if (localStorage.getItem('dark-mode') == 'true') {
        $('#dark-mode-checkbox').click();
    }

    // Check if previous call was disposed properly
    let dispoUrl = "server_ip=" + server_ip + "&session_name=" + session_name + "&ACTION=Disposition_Status&format=text&user=" + user + "&pass=" + pass + "&conf_exten=" + session_id + "&extension=" + extension + "&protocol=" + protocol + "&disable_alter_custphone=" + disable_alter_custphone + "&campaign=" + campaign;
    fetch('vdc_db_query.php', {
        method: 'POST',
        body: dispoUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()).then(dispo => {
        console.log(dispo);
        if (dispo != null && dispo.vendor_lead_code !== null && dispo.status == "DISPO") {
            leadId = dispo.lead_id;
            getCRMdata(dispo.vendor_lead_code, 'dispo').then(() => {
                enableCRM('dispo');
            })
        }
    })
})

// Dispo Frame Hide
window.addEventListener('message', event => {
    if (event.data == "dispositionComplete") {
        document.querySelector('.disposition-wrap').classList.remove('active');
    }
})

$('#dropdownMenu1').click( function(event){
    $('.dropdown-menu').toggle();
    event.stopPropagation();
});

$('.tooltip').hover(function(){
  $('.tooltiptext').toggle();   
});

$('#askMe').click(function(){
    window.open('/edas_demo_agent/askme.php', 'window name', 'window settings');
    return false;
  });


//   Tab scroll 
var hidWidth;
var scrollBarWidths = 40;

var widthOfList = function(){
  var itemsWidth = 0;
  $('.list li').each(function(){
    var itemWidth = $(this).outerWidth();
    itemsWidth+=itemWidth;
  });
  return itemsWidth;
};

var widthOfHidden = function(){
  return (($('.wrapper').outerWidth())-widthOfList()-getLeftPosi())-scrollBarWidths;
};

var getLeftPosi = function(){
  return $('.list').position().left;
};

var reAdjust = function(){
  if (($('.wrapper').outerWidth()) < widthOfList()) {
    $('.scroller-right').show();
  }
  else {
    $('.scroller-right').hide();
  }
  
  if (getLeftPosi()<0) {
    $('.scroller-left').show();
  }
  else {
    $('.item').animate({left:"-="+getLeftPosi()+"px"},'slow');
  	$('.scroller-left').hide();
  }
}

reAdjust();

$(window).on('resize',function(e){  
  	reAdjust();
});

$('.scroller-right').click(function() {
  
  $('.scroller-left').fadeIn('slow');
  $('.scroller-right').fadeOut('slow');
  
  $('.list').animate({left:"+="+widthOfHidden()+"px"},'slow',function(){

  });
});

$('.scroller-left').click(function() {
  
	$('.scroller-right').fadeIn('slow');
	$('.scroller-left').fadeOut('slow');
  
  	$('.list').animate({left:"-="+getLeftPosi()+"px"},'slow',function(){
  	
  	});
});    