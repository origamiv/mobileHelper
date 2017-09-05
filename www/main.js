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
            //var i_act=0;
            serializedArr='';
             
            debug('start');
            results_from_cookie();
            cmd='S1';
            show_time_all();
            $('#ptime').hide();
            
            t=Date.now();            
            debug('time='+t);
            //sec=0;
             /*
            timer1= setInterval(function() 
            {
             sec=sec+1;
             
             t2=Date.now(); 
             min=t2-t;
             
             //if (sec==60) {min=min+1; sec=0;}
             $('#sec').html(sec);
             $('#min').html(min);
//             $('#sec').val(sec);
//             $('#min').val(min);
//             //alert(sec);
            
            }, 1000);
            */
            
            //alert(PATH);
            //alert(t);
            
            
            //$('#mmm').html(serializedArr);  
            
            var url2=PATH+'/ajax_func.php?func=sync&t='+t;
                //alert(url2);
                $.getJSON( url2, function( data ) 
                {
                    //alert(data.delta);
                    setCookie('delta',data.delta);
                //$('#duser').html('Тесты выполняет '+data[0].fio);
                });
            
            
            var d=getCookie('delta');
            
            id_exp=getCookie('id_exp');
            if (id_exp==undefined) {id_exp=0;}
            $('#id_exp').val(id_exp);
            
            //alert(id_exp);
            
            var huser=location.hash;
            z=huser.split('#');
            huser=z[1];
            z2=huser.split('_');
            if (z2[0]=='user')
            {
                id_user=z2[1];
                $('#hiduser').val(id_user);
                
                var url2=PATH+'/ajax_func.php?func=user_by_id&id='+id_user;
                //alert(url2);
                $.getJSON( url2, function( data ) 
                {
                        $('#duser').html('Тесты выполняет '+data[0].fio);
                        //alert(data[0].id_exp);
                        if ($('#id_exp').val()==0)
                        {
                        $('#id_exp').val(data[0].id_exp);
                        id_exp=$('#id_exp').val();
                        setCookie('id_exp',id_exp);
                        }
                });
                
                debug('user='+id_user);
                
                // var id_exp=$('#id_exp').val(); 
                //url=PATH+'/ajax_func.php?path='+PATH+'&func=get_tests&id='+id_user+'&id_exp='+id_exp;
                //$('#lref').val(url);
                                
            }
            
            $('#exp').hide();
            //$('.pres').hide();
            $('#bstart').show();
            $('#bstop').hide();
              
            $('.exp1').bind("click", function()
            {   
                cmd=$(this).attr('cmd');
                
                url=PATH+'/ajax_func.php?func=trainings&cmd='+cmd;
                $.getJSON(url, function( data) {
                   param=data[0];
                
                
                
                //alert(cmd);
       //         var param=new Object;
//                    
//                    
//                    param.id = 2;
//                    param.tim = 300;
//                    param.pic='stay.jpg';
//                    param.descr='ffff';
//                    param.mp3='stay.mp3';
                    
                    
                    
                    //alert(param.pic);
                    debug('exp_click');
                    current_test=param.id;
                                        
                    //alert(param.tim);
                    $('#timetest').val(param.tim);
                    $('#exp').show();
                    $('#splash').hide();
                    
                    $('#descr').html(param.descr);               
                    $('<audio class="player" src="sound.mp3"></audio><br>').prependTo('#descr');
                    $('#img').attr('src', 'trainings/'+param.pic);
                    $('.player').attr('src', 'mp3/'+param.mp3);
                    
                    var wid=parseInt($('#descr').css('width'));
                    //alert(wid);
                    wid=0; //wid-42;
                    
                    var settings = {
                    progressbarWidth: wid+'px',
                    progressbarHeight: '5px',
                    progressbarColor: '#22ccff',
                    progressbarBGColor: '#eeeeee',
                    defaultVolume: 0.8
                    };
                
                    $(".player").player(settings);
                    
                    setCookie('cmd',param.id);
                    
                    cmd=param.id;
                    $('#ptime').show();
                    show_time_all();
                    
                    debug('exp_click_end');
                    });
                    
            });
            
            
            
            
            $("body" ).on("click",'.delact', function()
            {
                var act_for_del=$(this).attr('activity');
                for(k=0;k<results.length;k++)
                {
                   z=results[k];
                   if (z!=null)
                   {
                       if (z.cmd==act_for_del)
                       {
                           delete(results[k]);
                           if (act_for_del=='S1') {activity.S1_must=0;}
                           if (act_for_del=='S2') {activity.S2_must=0;}
                           if (act_for_del=='S3') {activity.S3_must=0;}
                           if (act_for_del=='D1') {activity.D1_must=0;}
                           if (act_for_del=='D2') {activity.D2_must=0;}
                           if (act_for_del=='D3') {activity.D3_must=0;}
                           if (act_for_del=='D4') {activity.D4_must=0;}
                           if (act_for_del=='D5') {activity.D5_must=0;}
                           if (act_for_del=='D6') {activity.D6_must=0;}
                       }
                   }
                }
                results_to_cookie();
                serAct = JSON.stringify(activity);
                setCookie('activity',serAct); 
                
                show_time_all();                
            }              
            );
        $('#tabs').tabs({
            border:true,
            onSelect:function(title){
                //alert(title+' is selected');
                if (title=='Результаты')
                {
                   //alert('ss');
                   check();
                }
            }
        });
        
        
        
        $( "#save" ).bind( "click", function()
        {
              //alert(serializedArr);
                          
              var id_exp=$('#id_exp').val();            
              $.post(PATH+'/ajax_func.php?func=send&id_exp='+id_exp, {q1: serializedArr})
                .done(function( data ) 
                {
                      //alert(data);
                      if (data=='ok')
                      {
                        var url2=PATH+'/ajax_func.php?func=user_by_id&id='+id_user;
                        $.getJSON(url2, function( data ) 
                        {
                            $('#id_exp').val(data[0].id_exp)
                        });
                    
                        serializedArr='';
                        setCookie('results','');
                        //alert(data);
                        $('#save').hide();  
                        //$('#del').hide();                                     
                      
                        del_activity();
                      }
                      else 
                      {
                          alert('На сервере что-то не так, попробуйте позже.');
                      }
                });
                
                    
            
                
                    var id_exp=$('#id_exp').val(); 
                    //var id_user=$('#id_user').val(); 
                    //url=PATH+'/ajax_func.php?path='+PATH+'&func=get_tests&id='+id_user+'&id_exp='+id_exp;
                    //alert(url);
                    //var tab = $('#tabs').tabs('getTab',1);  // get selected panel
                    //tab.panel('refresh', url);  
                    //$('#lref').val(url);
                    //$('#layres').load(url);
                    
                    
              
        });
        
       
        $( "#splash" ).bind( "click", function() 
        {  
            //$('#experiment').combobox('reload',PATH+'/ajax_func.php?func=trainings');
        });
        
        $( "#splash" ).bind( "dblclick", function() 
        {  
            PATH=PATH2;
            //alert(PATH);
        });
            
        $("#bstop" ).bind( "click", function()
        {
            stopTest();
        }); 
        
         
        $( "#bstart" ).bind( "click", function() 
        {
           cmd=getCookie('cmd');
           // alert( "User clicked on 'foo.'" );
           //var L=results.length;           
           //results[L,0]=Date.now();
           results[i]=new Object;
           results[i].id_user=id_user;
           results[i].cmd=cmd;
           results[i].delta=d;
           results[i].start=Date.now();
           
           var id_exp=$('#id_exp').val(); 
           var timeTest=$('#timetest').val(); 
           //res[1]=0;
           //alert(results);
           //alert(L);
           
           //var serializedArr = JSON.stringify( results );
           //alert(serializedArr);
           //setCookie('results',serializedArr);
                      
        //$.get(PATH+'/mobile.php?id='+id_user+'&act=start&test='+current_test+'&id_exp='+id_exp);  
        
        $('#bstart').hide();
        $('#bstop').show();
        $('#save').show();
        //$('#del').show();
            
         t=Date.now();
         min=0;
         sec=0;
         
         
         // начать повторы с интервалом 2 сек
         //alert('TT '+timerId);
         timerId = setInterval(function() 
         {
             pr='end';
             t2=Date.now();
             delta=(t2-t)/1000;
             delta=Math.floor(delta);
             //alert(delta);
             sec=delta-min*60; //sec+1;
             if (sec==60) {min=min+1; sec=0;}
             $('#sec').html(sec);
             $('#min').html(min);
             $('#sec').val(sec);
             $('#min').val(min);
             //alert(sec);
               //alert('t '+timerId);    
             if (delta==timeTest) 
             {
                 stopTest();
                 //clearInterval(timerId);
             }
            
         }, 1000);
         
         //alert('E '+timerId);
         
         //

            // через 5 сек остановить повторы
         //setTimeout(stopTest, timeTest*1000);                   
        
        
        });  
         
        
//         minall=0;
//         secall=0;
//         // начать повторы с интервалом 2 сек
//         timerId2 = setInterval(function() 
//         {
//             secall=secall+1;
//             //alert(secall);
//             if (secall==60) {minall=minall+1; secall=0;}
//             $('#timeleft').html(minall+' мин '+secall+' сек ');
//             //alert(sec);
//            
//         }, 1000); 
                
        });    
        
        