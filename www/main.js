            var activity = new Object;
            var serAct = ''; 
            var results =new Array;
            var serializedArr ='';
            var i=0;
            var cmd ='';
            var t=0;
            var timerId;
            var pr='';
            var pr_send=0;


function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
           
 function results_from_cookie()         
{
            serializedArr=getCookie('results');               
            serAct=getCookie('activity');
            //alert(serAct);
            if (serAct!=undefined)
            {
            activity = JSON.parse(serAct);
            }
            else
            {
                del_activity();
            }
            //
            if (activity.S2_must==null) {del_activity();}
            
            //alert(serializedArr);
            if ((serializedArr!=undefined) && (serializedArr!=''))
            { 
            results = JSON.parse(serializedArr);
            i=results.length;           
            
            //alert(i);
            //alert(serAct);
            $('#save').show();
            //$('#del').show();
            }
            else
            {
                $('#save').hide();
                //$('#del').hide();
            }
}          

function results_to_cookie()  
{
    serializedArr = JSON.stringify(results);
    //alert(serializedArr);
    setCookie('results',serializedArr);   
}
           
function del_activity()
{
            activity.S1_must=0;
            activity.S2_must=0;
            activity.S3_must=0;
            activity.D1_must=0;
            activity.D2_must=0;
            activity.D3_must=0;
            activity.D4_must=0;
            activity.D5_must=0;
            activity.D6_must=0;
            
            activity.S1_fact=0;
            activity.S2_fact=0;
            activity.S3_fact=0;
            activity.D1_fact=0;
            activity.D2_fact=0;
            activity.D3_fact=0;
            activity.D4_fact=0;
            activity.D5_fact=0;
            activity.D6_fact=0;
            
            serAct = JSON.stringify(activity);
              //alert(serializedArr);
            setCookie('activity',serAct);  
            //alert('Куки очищены');
            }
            
function activity_time(min, sec)
{
                
            sec=$('#sec').val();
            min=$('#min').val();    
            
            t1=parseInt(min)*60+parseInt(sec);
            
            //alert(cmd +' - '+activity.S2+' - '+t1);
            
            if (cmd=='S1') {activity.S1_must=activity.S1_must+t1;}
            if (cmd=='S2') {activity.S2_must=activity.S2_must+t1;}
            if (cmd=='S3') {activity.S3_must=activity.S3_must+t1;}
            if (cmd=='D1') {activity.D1_must=activity.D1_must+t1;}
            if (cmd=='D2') {activity.D2_must=activity.D2_must+t1;}
            if (cmd=='D3') {activity.D3_must=activity.D3_must+t1;}
            if (cmd=='D4') {activity.D4_must=activity.D4_must+t1;}
            if (cmd=='D5') {activity.D5_must=activity.D5_must+t1;}            
            if (cmd=='D6') {activity.D6_must=activity.D6_must+t1;}  
            
            serAct = JSON.stringify(activity);
              //alert(serAct);
            setCookie('activity',serAct);
            }
          
function del()
{
    serializedArr='';
    setCookie('results','');  
    results = []; //JSON.parse(serializedArr);

    del_activity();
    //show_time_all();

    i=0;
    $('#save').hide();
    show_time_all();                       
}
          
function show_time_all()
{
                //alert(cmd);
                if (cmd=='S1') {t1=activity.S1_must;}
                if (cmd=='S2') {t1=activity.S2_must;}
                if (cmd=='S3') {t1=activity.S3_must;}
                if (cmd=='D1') {t1=activity.D1_must;}
                if (cmd=='D2') {t1=activity.D2_must;}
                if (cmd=='D3') {t1=activity.D3_must;}
                if (cmd=='D4') {t1=activity.D4_must;}
                if (cmd=='D5') {t1=activity.D5_must;} 
                if (cmd=='D6') {t1=activity.D6_must;} 
                
                //alert(t1);
                if (t1==undefined) {t1=0;}
                if (t1==NaN) {t1=0;}
                
                minall=Math.floor(t1 / 60);
                secall=t1-minall*60;
                    
                $('#timeleft').html(minall+' мин '+secall+' сек ');  
                
                var timestr='<table>';
                timestr=timestr+'<tr><td>Активность</td><td>Время</td><td>Факт</td>';
                timestr=timestr+'<td><a id="del" onclick="del();" style="float: right;" class="delall" title="Удалить все на хрен!">Удалить все</a>'+'</td></tr>';
                
                style_green='background-color:green;color:yellow;text-align:center';
                style_red='background-color:red;color:yellow;text-align:center';
                style_yell='background-color:yellow;color:black;text-align:center';
                
                if (activity.S1_must==0) {style1='';} 
                else if ((activity.S1_must-activity.S1_fact)>1) {style1=style_yell;} 
                else if (activity.S1_must<activity.S1_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>S1 Стоит</td><td style="'+style1+'">'+activity.S1_must+'</td><td style="'+style1+'">'+activity.S1_fact+'</td><td><a activity="S1" class="delact">Удалить</a></td></tr>';                                                               
                
                if (activity.S2_must==0) {style1='';} 
                else if ((activity.S2_must-activity.S2_fact)>1) {style1=style_yell;} 
                else if (activity.S2_must<activity.S2_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>S2 Сидит</td><td style="'+style1+'">'+activity.S2_must+'</td><td style="'+style1+'">'+activity.S2_fact+'</td><td><a activity="S2" class="delact">Удалить</a></td></tr>';
                
                if (activity.S3_must==0) {style1='';} 
                else if ((activity.S3_must-activity.S3_fact)>1) {style1=style_yell;} 
                else if (activity.S3_must<activity.S3_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>S3 Лежит</td><td style="'+style1+'">'+activity.S3_must+'</td><td style="'+style1+'">'+activity.S3_fact+'</td><td><a activity="S3" class="delact">Удалить</a></td></tr>';
                
                if (activity.D1_must==0) {style1='';} 
                else if ((activity.D1_must-activity.D1_fact)>1) {style1=style_yell;} 
                else if (activity.D1_must<activity.D1_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D1 Идет</td><td style="'+style1+'">'+activity.D1_must+'</td><td style="'+style1+'">'+activity.D1_fact+'</td><td><a activity="D1" class="delact">Удалить</a></td></tr>';
                
                if (activity.D2_must==0) {style1='';} 
                else if ((activity.D2_must-activity.D2_fact)>1) {style1=style_yell;} 
                else if (activity.D2_must<activity.D2_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D2 Бежит</td><td style="'+style1+'">'+activity.D2_must+'</td><td style="'+style1+'">'+activity.D2_fact+'</td><td><a activity="D2" class="delact">Удалить</a></td></tr>';
                
                if (activity.D3_must==0) {style1='';} 
                else if ((activity.D3_must-activity.D3_fact)>1) {style1=style_yell;} 
                else if (activity.D3_must<activity.D3_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D3 Подъем по лестнице</td><td style="'+style1+'">'+activity.D3_must+'</td><td style="'+style1+'">'+activity.D3_fact+'</td><td><a activity="D3" class="delact">Удалить</a></td></tr>';
                
                if (activity.D4_must==0) {style1='';} 
                else if ((activity.D4_must-activity.D4_fact)>1) {style1=style_yell;} 
                else if (activity.D4_must<activity.D4_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D4 Спуск по лестнице</td><td style="'+style1+'">'+activity.D4_must+'</td><td style="'+style1+'">'+activity.D4_fact+'</td><td><a activity="D4" class="delact">Удалить</a></td></tr>';
                
                if (activity.D5_must==0) {style1='';} 
                else if ((activity.D5_must-activity.D5_fact)>1) {style1=style_yell;} 
                else if (activity.D5_must<activity.D5_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D5 Подъем на лифте</td><td style="'+style1+'">'+activity.D5_must+'</td><td style="'+style1+'">'+activity.D5_fact+'</td><td><a activity="D5" class="delact">Удалить</a></td></tr>';
                
                if (activity.D6_must==0) {style1='';} 
                else if ((activity.D6_must-activity.D6_fact)>1) {style1=style_yell;} 
                else if (activity.D6_must<activity.D6_fact) {style1=style_green;}
                
                timestr=timestr+'<tr><td>D6 Спуск на лифте</td><td style="'+style1+'">'+activity.D6_must+'</td><td style="'+style1+'">'+activity.D6_fact+'</td><td><a activity="D6" class="delact">Удалить</a></td></tr>';
                
                timestr=timestr+'</table>';  
                
               
                                   
                                   
                var tab = $('#tabs').tabs('getTab',1);  // get selected panel
                
                $('#layres').html(timestr);
                
                $('.delact').linkbutton({
                     iconCls: 'icon-remove'
                });
                
                $('.delall').linkbutton({
                     iconCls: 'icon-cancel'
                });
                         
                $('#mmm').html(serializedArr);
                //alert(z);
}
                  
function debug(istr)
{    
//alert(istr);
}
    
function check()
{
              //alert(serializedArr);
              pr_send=0;
              setCookie('pr_send',pr_send);
                          
              var id_exp=$('#id_exp').val();            
              var url2=PATH+'/ajax_func.php?func=check_data_integrity&id_exp='+id_exp;
              //alert(url2);
              $.post(url2, {json_data: serializedArr})
                .done(function( data1 ) 
                {
                      //data=data1[0];
                      //alert(data1);
                      data2=JSON.parse(data1);
                      
                      
                      $.each( data2, function( key, data ) {
                           //alert(data.cmd);
                      if (data!=null)
                      {                                                                
                        pr_send=1;
                        s12 = JSON.stringify(data);
                        //alert(JSON.stringify(data.D3));
                        if (data.cmd=='S1') {activity.S1_fact=data.fact;}
                        if (data.cmd=='S2') {activity.S2_fact=data.fact;}
                        if (data.cmd=='S3') {activity.S3_fact=data.fact;}
                        if (data.cmd=='D1') {activity.D1_fact=data.fact;}
                        if (data.cmd=='D2') {activity.D2_fact=data.fact;}
                        if (data.cmd=='D3') {activity.D3_fact=data.fact;}
                        if (data.cmd=='D4') {activity.D4_fact=data.fact;}
                        if (data.cmd=='D5') {activity.D5_fact=data.fact;}  
                        if (data.cmd=='D6') {activity.D6_fact=data.fact;}  
                        
                        serAct = JSON.stringify(activity);
                          //alert('sa'+serializedArr);
                        setCookie('activity',serAct);
                        show_time_all();
                      //alert('ok');
                      }
                else 
                    {
                        pr_send=0;
                        setCookie('pr_send',pr_send);
                        alert('На сервере пусто, попробуйте позже.');
                    }
                      });
                      
                      //data=data2[0];
                      
                }
                );
                
                pr_send=getCookie('pr_send');
                if (pr_send==1)
                {
                
                
                }   
            
                  

                
                    
                    
              
        }    
            
function stopTest() 
{
    if (pr=='end')
    {
              clearInterval(timerId);
              
              min=0; 
              sec=0;
              $('#sec').html(sec);
              $('#min').html(min);
              
              //alert(i);
              
              results[i].stop=Date.now();
              i=i+1;
              results_to_cookie();
              
              //alert(activity);
              activity_time(min, sec)
            
              show_time_all();
              
              //$.get(PATH+'/mobile.php?id='+id_user+'&act=stop&test='+current_test);  
              //$('#sec').val(sec);
              //alert(sec);
              var audio = new Audio();
              audio.preload = 'auto';
              audio.src = 'mp3/1.mp3';
              audio.play();
              
              
               
                    
              $('#bstart').show();
              $('#bstop').hide();  
              pr='';
    }
}            
//==============================================            
$( document ).ready(function() 
{
    alert('hhh');    
});  
        
        