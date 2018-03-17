var ajcs_start = function (view_counter){


      
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
                                console.log( "PAY SUCESS");
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
                                console.log( "PROCESS SUCCESS");
                            }		
                        });		
                    }

                }	
                return index2<view_counter;
            });
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
                  result = " DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text();
                  console.log( " DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text());
              }		
          });

      }
  
  alert(result);

}

var ajcs_status = function(){
      result = "";
  
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
                  result = " DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text();
                  console.log( " DASHBOARD : " + $(dashboard_data).find(".row.mt").children(".col-md-6.col-sm-6.mb").find("h1").text());
              }		
          });

      }
  
    alert(result);
}

var ajcs_logout = function(){
  
}


var ajcs_bank = function(bank_ctr,acctno,acctname,branch,verbose){
          
      $form = $('<form class="form-horizontal style-form" method="post" name="frm"></form>');
      $form.append('<input name="bank_ctr" type="text" id="bank_acctno" class="form-control" value="4">');
      $form.append('<input name="bank_acctno" type="text" id="bank_acctno" class="form-control" value="' + acctno + '">');
      $form.append('<input name="bank_acctname" type="text" id="bank_acctname" class="form-control" value="' + acctname + '">');
      $form.append('<input name="bank_branch" type="text" id="bank_branch" class="form-control" value="' + branch + '">');
      $form.append('<input name="bank_swift" type="text" id="bank_swift" class="form-control" value="NA">');
      $form.append('<input type="hidden" name="allow" value="YES">');
  

      bank_update = false;
                   
      //Ajax Login
      while(!bank_update){
          jQuery.ajaxSetup({async:false});
          $.ajax({
              type: "POST",
              url: "http://www.mineraview.com/dashboard/res_bank.php",
              data:  $form.serialize(),
              error: function(xhr){
                  console.log( "BANK UPDATE FAILED");
              },
              success: function(data){
                  console.log( "BANK UPDATE SUCCESS");
                  console.log(data)
                  bank_update = true;
              }		
          });
      }
  // ajcs_bank(4,'Clarisa Rodriguez','004830372403','CAVITE - IMUS AGUINALDO HIGHWAY',1)
}