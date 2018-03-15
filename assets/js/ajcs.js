var ajcs_start = function (isTest){
  result = "";
  
  // Account information
  account = [

    { username : $("username").val() , password: $("#password").val()},


  ];

  // Minor error handler
  if( !$("#username").val() || !$("#password").val()){
    console.log("error")
    return false;
  }

  // Process
  $(account).each(function(index, value){

      login = false;

      //Login Credentials
      $form = $('<form name="frm"></form>');
      $form.append('<input type="text" name="username" class="form-control" placeholder="Username" maxlength="15" value="'+ value.username +'">');
      $form.append('<input type="password" name="password" class="form-control" placeholder="Password" maxlength="15" value="'+ value.password +'">');


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

      if(!isTest){
        //Flags
        view_ads = false;
        ads_list = '';

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
                    ads_list = data;
                    console.log("VIEW ADS SUCESS");
                }		
            });

        }


        if(ads_list){
            $form_view_ads = $(ads_list).find('form[name=frm]')
            $(ads_list).find('.showback button').each( function(index2, value2){
                jQuery.ajaxSetup({async:false});	

                view = false; 
                view_result = false;

                console.log("ONCLICK EVENT: " + $(value2).attr("onclick") );

                if ( $(value2).attr("onclick") ) {

                    eval($(value2).attr("onclick").replace("javascript: document.frm.ctr.value","ctr"));	

                    //Login Credentials
                    $form_view_ads.append('<input type="text" name="ctr" value="'+ ctr +'">');




                    while(!view){
                        $.ajax({
                            type: "POST",
                            url: "http://www.mineraview.com/dashboard/res_view_ads_pay.php",
                            data:  $form_view_ads.serialize(),
                            error: function(xhr){
                                console.log("PAY FAILED");
                            },
                            success: function(data){
                                view = true;
                                console.log( value.username + " PAY SUCESS");
                            }		
                        });
                    }

                    while(!view_result){
                        $.ajax({
                            url: "http://www.mineraview.com/dashboard/res_view_ads_process.php",
                            error: function(xhr){
                                console.log("PROCESS FAILED");
                            },
                            success: function(data){
                                view_result = true;
                                console.log( value.username + " PROCESS SUCCESS");
                            }		
                        });		
                    }

                }	
                return index2<25;
            });
        }
      }
    
      ads_status = false;

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
                  result = " [ " + value.username + " ] DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text();
                  console.log( " [ " + value.username + " ] DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text());
              }		
          });

      }

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
  });
  
  alert(result);

}
