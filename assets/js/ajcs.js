
account = [

{ username : '',password:'' },


];

account_index = 0;
account_length = account.length;
username = '';

var ajcs_login = function(username,password){

	login = false;

	//Login Credentials
	$form = $('<form name="frm"></form>');
	$form.append('<input type="text" name="username" class="form-control" placeholder="Username" maxlength="15" value="'+ username +'">');
	$form.append('<input type="password" name="password" class="form-control" placeholder="Password" maxlength="15" value="'+ password +'">');
	$form.append('<input type="hidden" name="allow_update" value="NO">');


	//Ajax Login
	while(!login){
		jQuery.ajaxSetup({async:false});
		$.ajax({
			type: "POST",
			url: "http://www.mineraview.com/login_process.php",
			data:  $form.serialize(),
			error: function(xhr){
		    	console.log( "LOGIN FAIL");
			},
			success: function(data){
				console.log( "LOGIN SUCCESS");
				login = true;
			}		
		});
	}
}


var ajcs_logout = function(){
	logout = false;

	// Ajax Logout
	while(!logout){
		jQuery.ajaxSetup({async:false});
		$.ajax({
			url: "http://www.mineraview.com/dashboard/logoff.php",
			error: function(xhr){
		    	console.log( "LOGOFF FAIL");
			},
			success: function(data){
				logout = true;
				console.log( "LOGOFF SUCCESS");
			}		
		});
	}
}

var ajcs_getAdsView = function(){

	//Flags
	view_ads = false;

	// Ajax ViewAds
	while(!view_ads){
		jQuery.ajaxSetup({async:false});
		$.ajax({
			url: "http://www.mineraview.com/dashboard/res_view_ads.php",
			error: function(xhr){
		    	console.log( "VIEW ADS FAIL");
			},
			success: function(data){
				view_ads = true;
				view_list = data;
				console.log("VIEW ADS SUCESS");
			}		
		});
		
	}

	return view_list;
}

var ajcs_subpostViewAds = function(item){
	view = false; 

	eval($(item).attr("onclick").replace("javascript: document.frm.ctr.value","ctr"));	
	
	//Login Credentials
	$form_view_ads.append('<input type="text" name="ctr" value="'+ ctr +'">');
	

	while(!view){
		$.ajax({
			type: "POST",
			url: "http://www.mineraview.com/dashboard/res_view_ads_pay.php",
			data:  $form_view_ads.serialize(),
			error: function(xhr){
				console.log( username + " view request failed.");
			},
			success: function(data){
				view = true;
				console.log( (new Date()).toLocaleTimeString() + ' ' + username + ' is now viewing ads ' + ctr + '...');
			}		
		});
	}

	return true;
}

var ajcs_postAdsView = function(view_list,view_count = 0,view_index = 0){

	if(view_list){
		$form_view_ads = $(view_list).find('form[name=frm]')

		view_count = view_count;
		view_button_index = view_index;
		view_button_items = $(view_list).find('.showback button');

		if ( $(view_button_items[view_button_index]).attr("onclick") ) {
			ajcs_subpostViewAds(view_button_items[view_button_index]);
		}

		// Set view timer
		var view_engine = setTimeout( function(){ 
			view_result = false;

			while(!view_result){
				$.ajax({
					url: "http://www.mineraview.com/dashboard/res_view_ads_process.php",
					error: function(xhr){
						console.log("PROCESS FAILED");
					},
					success: function(data){
						view_result = true;
						console.log( (new Date()).toLocaleTimeString() + ' Finished viewing ads...');
					}		
				});		
			} 

			view_count++;
			view_button_index++;

			if(view_count >= view_button_items.length){
				view_engine = null;
				ajcs_getAdsStatus();
				ajcs_logout();

				// move to next account;
				account_index++;

				if(account_index < account_length){
					ajcs_init(account_index);
				}
				
			} else {
				view_engine = null;
				ajcs_postAdsView(view_list,view_count,view_button_index);
			}

		},600000);

	}

}

var ajcs_getAdsStatus = function(){
	ads_status = false;
	ads_complete = false;

	// Ajax ViewAds
	while(!ads_status){
		jQuery.ajaxSetup({async:false});
		$.ajax({
			url: "http://www.mineraview.com/dashboard/res_user.php",
			error: function(xhr){
		    	console.log( "DASHBOARD FAIL");
			},
			success: function(data){
				ads_status = true;
				dashboard_data = data;
				ads_complete = $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text().indexOf("50.00 50.00") >= 1;
				console.log( " DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text());
			}		
		});
		
	}

	return ads_complete;

}

var ajcs_unlock= function(index){
	username = account[index].username;
	ajcs_login(account[index].username,account[index].password);
	ajcs_logout();
}

var ajcs_init = function(index){
	username = account[index].username;
	ajcs_login(account[index].username,account[index].password);

	if(!ajcs_getAdsStatus()){
		view_list = ajcs_getAdsView();
		ajcs_postAdsView(view_list);		
	} else {
		console.log('VIEW ALREADY COMPLETE!')
		ajcs_logout();

		// move to next account;
		account_index++;

		if(account_index < account_length){
			ajcs_init(account_index);
		}
	}
}
