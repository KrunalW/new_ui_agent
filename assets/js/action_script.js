
var bck_role ='';
var bck_camp = '';
$(document).ready(function() {
	
	// ******************************************************************************************
	// 08-Oct-2021: Ashish
	// submit 
	$('#login').on('click',function (e) { 
		
	   e.preventDefault();
		let chk = false;
		$('#loginfrm [required]').each(function() {
			if ($(this).is(':invalid')) {
				$(this).css('border', '1px solid red');
				chk = true;
			}
		})

		if(chk==false)
		{
			let urls ="ajax_action.php";
			var datastring = $("#loginfrm").serialize()+ '&action=' + 'login';			
			send_data_by_ajax(urls,datastring, message => {
					if(message=='success')
					{
						
						// notification("#msg", 'Action completed successfully!', "alert-success");
						// setTimeout(function(){
							window.location.href='components/dashboard.php';
						//   },1700);
					}
					else
					{						
						// notification("#msg", message, "alert-danger");	
						alert(message);				
					}
				  }
				);

		}
		else
		{
			notification("#msg", 'Please inter the correct information in required fields!', "alert-warning");
					
		}
	});    
// **********************************************************************************************

// **********************************************************************************************
	// 08-Oct-2021: Ashish
	// submit 
	$('.submit_campaign_form').on('click',function (e) { 
		var chkid = $('#Campaign_id').val();
		console.log(chkid,campaign_chk_id);
		if(campaign_chk_id!='' && campaign_chk_id!=chkid)
		{
			notification("#msg", 'System not found valid campaign!', "alert-warning");						
			return false;
		} 
	   e.preventDefault();
		let chk = false;
		$('#new_campaign_form [required]').each(function() {
			if ($(this).is(':invalid')) {
				$(this).css('border', '1px solid red');
				chk = true;
			}
		})

		if(chk==false)
		{
			let urls ="../ajax_action.php";
			var datastring = $("#new_campaign_form").serialize()+ '&action=' + 'add_campaign';			
			send_data_by_ajax(urls,datastring, message => {
					if(message=='complete')
					{
						notification("#msg", 'Action completed successfully!', "alert-success");
						setTimeout(function(){
							window.location.reload();
						  },1700);
					}
					else
					{
						notification("#msg", message, "alert-danger");
					}
				  }
				);

		}
		else
		{
			notification("#msg", 'Please inter the correct information in required fields!', "alert-warning");
		}
	});    
// **********************************************************************************************
	// 08-Oct-2021: Ashish
	// submit 
	$('.dni_submit').on('click',function (e) {  
		
		var chkid = $('#DNI_ID').val();
		console.log(chkid,dni_chk_id);
		if(dni_chk_id!='' && dni_chk_id!=chkid)
		{
			notification("#msg", 'System not found valid DNI!', "alert-warning");						
			return false;
		}
	   e.preventDefault();
		let chk = false;
		$('#dni [required]').each(function() {
			if ($(this).is(':invalid')) {
				$(this).css('border', '1px solid red');
				chk = true;
			}
		})

		if(chk==false)
		{
			let urls ="../ajax_action.php";
			var datastring = $("#dni").serialize()+ '&action=' + 'add_dni';			
			send_data_by_ajax(urls,datastring, message => {
					if(message=='success' || message=='complete')
					{
						notification("#msg", 'Action completed Successfully', "alert-success");
						setTimeout(function(){
							window.location.href='dni_list.php';
						  },1700);
					}
					else
					{
						notification("#msg", message, "alert-danger");
					}
				  }
				);

		}
		else
		{
			notification("#msg", 'Please inter the correct information in required fields!', "alert-warning");
		}
	});    
// **********************************************************************************************
// **********************************************************************************************
	$('#addRoleBtn').on('click',function(e){
		e.preventDefault();
		let chk = false;
		$('#addrole [required]').each(function() {
			if ($(this).is(':invalid')) {
				$(this).css('border', '1px solid red');
				chk = true;
			}
		})

		if(chk==false)
		{
			let urls ="../ajax_action.php";
			var datastring = $("#addrole").serialize()+ '&action=' + 'add_role';			
			send_data_by_ajax(urls,datastring, message => {
					if(message=='success')
					{
						
						notification("#msg", 'Action completed successfully!', "alert-success");
						setTimeout(function(){
							window.location.reload();
						  },1700);
					}
					else
					{
						// alert(message);
						notification("#msg", message, "alert-warning");

					}
				  }
				);

		}
		else
		{
			// alert('Please inter the correct information in required fields!');
			notification("#msg", 'Please inter the correct information in required fields!', "alert-warning");
		}
	});
// **********************************************************************************************
 
$('.client_submit').on('click',function(){
	var name = $('#Client_name').val().trim();
	if(name.length>2)
	{
	 $('#client').attr('action','../ajax_action.php');
	 $('#client').submit();
	}
	else
	{
		notification("#msg", 'Enter Valid Name!', "alert-warning");
	}
});

// **********************************************************************************************

$('.add_user_submit').on('click',function(e){
	$(this).attr("disabled", "disabled");
	 e.preventDefault();
		let chk = false;
		$('#user_submit [required]').each(function() {
			if ($(this).is(':invalid')) {
				$(this).css('border', '1px solid red');
				chk = true;
			}
		})
		if($('#new_user_id').attr('data-check')=='false')
		{
			$('#new_user_id').css('border', '1px solid red');
			chk==true;
		}
		if(chk==false)
		{
			let urls ="../ajax_user.php";
			var datastring = $("#user_submit").serialize()+ '&action=add_user';			
			send_data_by_ajax(urls,datastring, message => {
					if(message=='complete')
					{
						notification("#msg", 'Action completed successfully!', "alert-success");
						setTimeout(function(){
							window.location.href='users.php';
						  },1700);
						
					}
					else
					{
						$(this).removeAttr("disabled");
						notification("#msg", 'Something went wrong, Please try after some time!', "alert-danger");
					}
				  }
				);

		}
		else
		{
			// alert('Please inter the correct information in required fields!');
			notification("#msg", 'Please inter the correct information in required fields!', "alert-warning");
			$(this).removeAttr("disabled");
		}
});	
// **********************************************************************************************

$('#usercapaignlist').on('click', function(){
	let ref = $(this).attr('data-ref');
	console.log(ref);
});
// **********************************************************************************************

	//01-10-2021: Ashish
	// cancel edit process mapping
	$('#canceledit').on('click', function(e) {
	   window.location.reload(); 
	});
});
// *********************************************************************************************
// on key up check user id already exist or not.

$('#new_user_id').on('keyup', function(){
	var tmp_user_id = $(this).val().trim();
	var tmp_len = tmp_user_id.length;
	if(tmp_len>2)
	{
		var urls = '../ajax_action.php';
		var datastring ='user_id='+tmp_user_id+'&action=' + 'check_user_id';	
		send_data_by_ajax(urls,datastring, message => {
					if(message=='true')
					{
						$(this).css('border', '1px solid green');
						$(this).attr('data-check','true');
					}
					else
					{
						$(this).css('border', '1px solid red');
						$(this).attr('data-check','false');
					}
				  }
				  );
	}
	else if(tmp_len>=1 && tmp_len<=2)
	{
		$(this).css('border', '1px solid red');
		$(this).attr('data-check','false');
	}
	else
	{
		$(this).removeAttr('style');
		$(this).removeAttr('data-check');
	}

});
// **********************************************************************************************
$('#user_client').on('change', function(){
	var tmp_data = $('select#user_client').val();
	
	var urls = '../ajax_action.php';
	var datastring ='data='+tmp_data+'&action=' + 'get_gampaign';	
	send_data_by_ajax(urls,datastring, message => {
						var html = '<option value="">--Select--</option>';	
						var role = '<option value="">--Select--</option>';
						if(message.length)
						{
							
							var data = jQuery.parseJSON(message);
							console.log(data);
							if(data.campaign!='')
							{
								$.each(data.campaign, function (key, val) {
									let selc = '';
									if(bck_camp!='' && bck_camp!=null && bck_camp[val.campaign_id]) // bck_camp define in add_new_user.php file.
									{
										selc = 'selected';
									}
									html+='<option value="'+val.campaign_id+'" '+selc+'>'+val.campaign_name+'</option>';
									
								});	
								$('.id_camp_txt').text('');
							}
							else
							{	
								$('.id_camp_txt').text('No Campaign Found');	
							}

							if(data.roles)
							{		
								
													
								$.each(data.roles, function (key, val) {
									let selc = '';
									if(bck_role!='' &&val.role_id==bck_role) // bck_role define in add_new_user.php file.
									{
										selc = 'selected';
									}
									role+='<option value="'+val.role_id+'" '+selc+'>'+val.role_name+'</option>';
									
								});
							}
						}
						
							$('#user_campaign').html(html);
							$('#Role').html(role);				
					}
	);
	
	
});
// **********************************************************************************************
$('#user_campaign').on('change', function(){
	var cam_data = $('select#user_campaign').val();
	var cln_data = $('select#user_client').val();
	var urls = '../ajax_action.php';
	var datastring ='campaign='+cam_data+'&client='+cln_data+'&action=' + 'get_roles';	
	send_data_by_ajax(urls,datastring, message => {
						var html = '<option value="">----</option>';	
						if(message.length)
						{							
							var data = jQuery.parseJSON(message);
							$.each(data.role, function (key, val) {

								html+='<option value="'+val.role_id+'">'+val.role_name+'</option>';
								
							});	
						}
						$('#Role').html(html);				
					}
	);
	
	
});
// ********************************************************************************************** 
$('#Role').on('change', function(){
	var cam_data 	= $('select#user_campaign').val();
	var role 		= $('select#Role').val();
	var urls 		= '../ajax_action.php';
	var datastring 	= 'campaign='+cam_data+'&role='+role+'&action=' + 'check_user_role';	
	send_data_by_ajax(urls,datastring, message => {							
						if(message.length)
						{							
							$('#id_role_txt').text("Selected role is not mapped with "+message+" Campaign.");	
						}
						else
						{
							$('#id_role_txt').text();
						}								
					}
	);
	
	
});

// **********************************************************************************************
var b_action_type = '';
var b_action_id   = '';
// open confirmation modal
function opendeletemodal(type,id)
{   
	// if need to delete record on multiple id data concate the id by using use seprate key and send. example:  var id1 = '123', var id2 ='456'  id='123 ~ 456' 
	$('#deleteModal').show();
	b_action_type = type;
	b_action_id   = id;
}


// **********************************************************************************************
// trigger delete type action
function trash()
{
	if(b_action_type!=''&& b_action_id!='')
	{
		b_action_id = encodeURIComponent(b_action_id);
		let urls ="../ajax_action.php";
		var datastring ='action=action_'+b_action_type+'&ID='+b_action_id; 
		send_data_by_ajax(urls,datastring, message => {
				if(message=='success')
				{
					$('.modal').hide();	
					notification("#msg", 'Action completed successfully!', "alert-success");
						setTimeout(function(){
							window.location.reload();
						  },1700);				
				}
				else
				{
					$('.modal').hide();	
					notification("#msg", message, "alert-danger");
					setTimeout(function(){
						window.location.reload();
						},1700);				
					
				}
			  }
			);
	}
}


// **********************************************************************************************
//call edit event
function openEditmodal(type,id)
{
	console.log(type);
	if(type!=''&& id!='')
	{
		let urls        = "ajax_action.php";
		var datastring  = 'action=action_'+type+'&ID='+id;        
		console.log(datastring);
		var html        = '';
		send_data_by_ajax(urls,datastring, message => {
			eval(`${type}(${message})`); 
			  }
			);
	}
}


// **********************************************************************************************
//change role status
function changeroleaction(obj,role)
{	
	var chek = '2';
	if($(obj).is(':checked'))
	{
		chek = '1';
	}
	let urls        = "../ajax_action.php";
	var datastring  = 'action=change_role_status&ID='+role+'&chk='+chek; 
	var html        = '';
	send_data_by_ajax(urls,datastring, message => {
			if(message=='success')
			{
				notification("#msg", "Record updated successfully", "alert-success");
			}
			else
			{
				notification("#msg", message, "alert-warning");
			}
		}
	);	
}


// **********************************************************************************************
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
// **********************************************************************************************
var pre_active_call 	= 0;
var pre_active_channel 	= 0;
var pre_call_process 	= 0;
// **********************************************************************************************
function dashboard_status_live()
{
	let urls ="../APIs/dashboard_active_status.php";
	var datastring = 'action=' + 'dashboard_status';
	
	// console.log(datastring);
	send_data_by_ajax(urls,datastring, message => {
			var data = jQuery.parseJSON(message);
			console.log(data);
			var active_call = data['activity']['active calls'];
			if(data['activity']['active calls']==undefined)
			{
				active_call = data['activity']['active call'];
			}

			var active_channel = data['activity']['active channels'];
			if(data['activity']['active channels']==undefined)
			{
				active_channel = data['activity']['active channel'];
			}
			var call_process = data['activity']['calls processed'];

			if(active_call!=pre_active_call || active_channel!=pre_active_channel || call_process!=pre_call_process)
			{
				pre_active_call 	= active_call;
				pre_active_channel 	= active_channel;
				pre_call_process 	= call_process;
				// progressbar(active_call,active_channel,call_process); 
				progressbar(active_call,active_call,call_process); 
			}
			if(data['sip_html']==undefined)
			{
				data['sip_html']='<tr><td colspan=4> no record</td></tr>';
			}
			console.log(data['sip_html']);
			$('#channel_html').html(data['sip_html']);
		  }
		);
}  
// **********************************************************************************************
function loadershow()
{
	$('#LoadingBox').css('display','flex');
}
// **********************************************************************************************
function loaderhide()
{
	$('#LoadingBox').css('display','none'); 
}

