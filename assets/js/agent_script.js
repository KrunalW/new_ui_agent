var inablecalls = 'f'; // this variable identify agent have active call 

// Auther 			: 	Ashish Vishwakarma
// Date_created 	: 	02-Nov-2021
// description 		: 	agent releted all js scritps are here.

$(document).ready(function() {
    loaderhide(); // hide loader
    // check user sip register status every second
    AgentLoginStatus();
});


// this function is send data by ajax.
function send_data_by_ajax(urls, datastring, callbackfn)
{
	$.ajax({
		url: urls,
		type: 'POST',	   
		crossDomain: true,
		data: datastring,
		success: function(responsedata) {            
			callbackfn(responsedata);
			
		}
	});
	
} 

// this function user to show vaani loader
function loadershow()
{
	$('#LoadingBox').css('display','flex');
}

// this function user to hide the loader of vaani
function loaderhide()
{
	$('#LoadingBox').css('display','none'); 
}

// this variable just check the sip connection stabalish with server. 
var siploginsych = 0;
var sipregister  = 1;
// This function check user sip is synch with server
function AgentLoginStatus()
{
    let urls = "../ajax_agent.php";
    var datastring = 'action=agentsiplogin&sipregister='+sipregister;	
    send_data_by_ajax(urls,datastring, message => {
        if(message == 'success')
        {
            siploginsych = 0;
            sipregister  = 2;
            if(inablecalls == 'f')
            {
                inboundCall();
            }
            else if(inablecalls == 'i')
            {

            }
            
            // setTimeout(function(){ AgentLoginStatus(); }, 1000);            
        }
        else if(message =='empty_campaign')
        {
            // setTimeout(function(){ AgentLoginStatus(); }, 1000);    
        }
        else
        {	
            // if its get fail status 10 time than logout the session
            if(siploginsych==10)
            {
                notification("#msg", "Your sip is not synch with server.", "alert-danger");
                setTimeout(function(){
							// window.location.href='../logout.php';
						  },3000);
            }					
            siploginsych++;
            console.log('siploginsych:'+siploginsych);
        }
      }
    );
    
}

// this function use to check inbound call for agent
function inboundCall()
{  
    let urls = "../ajax_agent.php";
    var datastring = 'action=inboundCall';	
    send_data_by_ajax(urls,datastring, message => {
        if(message=='incall')
        {
            inablecalls = 'i'; // indicate incall
            enableCRM();
            
        }
      }
    );
}

// this function use to check user have dispose this call
function CheckHangupByAgent()
{
    let urls = "../ajax_agent.php";
    var datastring = 'action=AgentHangupCall';	
    send_data_by_ajax(urls,datastring, message => {
        if(message=='hangup')
        {
            inablecalls = 'f'; // indicate incall
            disableCRM();            
        }
      }
    );
}

// this function is use to Display the calling CRM
function enableCRM()
{
    // $('.customer-info').css('display','');
    // $('.dashboard-content').css('display','none');
}

// this function is use to Disable the calling CRM
function disableCRM()
{
    // $('.customer-info').css('display','none');
    // $('.dashboard-content').css('display','');
}

function outboundCall()
{

}


// this function record all the activity log of user
function agent_activity_update(obj)
{   
    // if ($("#about").hasClass("opened")
    if (!$(obj).hasClass("disabled"))
    {
        $('.vaani_action').removeClass('vaani_disabled');
        $(obj).addClass("vaani_disabled");
        let objval      = $(obj).val()  ;
        let objid       = $(obj).attr('id');
        let urls        = "../ajax_agent.php";
        var datastring  = 'action=AgentActivityUpdate&attr_val='+objval+'&attr_id='+objid;	
        send_data_by_ajax(urls,datastring, message => {
            console.log(message);
            if(message=='success')
            {

            }
            else
            {
                notification("#msg", "Action not completed.", "alert-warning");
            }
        }
        );
    }    
}


// hide campaignlistmodal.
function viewDashboard() {
    var cams = $("#campaignList").val();
    if (cams == "") {
      notification("#msg", "Please select campaign", "alert-danger");
    }else{
        let urls = "../ajax_agent.php";
        let datastring = "action=AgentCampSelect&camp="+encodeURIComponent(cams);
        send_data_by_ajax(urls,datastring, message => {
                if(message=='success')
                {
                    notification("#msg", "User Campaign login registerd successfully", "alert-success");
                    $("#modalCampaign").remove();
                    setTimeout(function(){
						window.location.reload();
						},1700);
                }
                else
                {
                    notification("#msg", "Invalid Campaign found", "alert-warning");
                    setTimeout(function(){
						window.location.reload();
						},1700);
                }
            }
        );

    }
  }
// **********************************************************************************************
      // 25-Oct-2021: Krunal
      function notification(id, alertText, nClass) {
        var cs = $(`${id}`).addClass(`${nClass}`);
        $(`${id}`).fadeIn(1000).delay(1500).fadeOut(1000).cs;
        $(`${id}`).html(alertText);

        cs.delay(100).queue(function () {
          $(this).removeClass(`${nClass}`).dequeue();
        });
      }