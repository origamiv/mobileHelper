$( document ).ready(function() 
        {
            
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
            var id_user_cookie=0;
            

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
            //alert(serializedArr);
            for(j=0;j<i;j++)
            {
                id_user_cookie=results[j].id_user;
                //alert(id_user_cookie);
                if (id_user_cookie>0) {break;}
            }
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
            //var i_act=0;
             
            debug('start');
            var results =new Array;
            var serializedArr ='';
            var i=0;
            
            var cmd ='';
            
            serializedArr=getCookie('results');               
            serAct=getCookie('activity');
            debug('start2');
            //alert(serAct);
            if (serAct!=undefined)
            {
            activity = JSON.parse(serAct);
            }
            else
            {
                del_activity();
            }
            debug('start3');
            //
            if (activity.S2==null) {del_activity();}
            //show_time_all();
            //alert(activity.S2);
            
            debug('cookie');                    
            //alert(serializedArr);
            if ((serializedArr!=undefined) && (serializedArr!=''))
            { 
            results = JSON.parse(serializedArr);
            i=results.length;           
            
            //alert(i);
            //alert(serAct);
            $('#save').show();
            $('#del').show();
            }
            else
            {
                $('#save').hide();
                $('#del').hide();
            }
            
            $('#ptime').hide();
            
            var t=Date.now();
            
            debug('time='+t);
            //alert(PATH);
            //alert(t);
            
            
            
            
            var url2=PATH+'/ajax_func.php?func=sync&t='+t;
                //alert(url2);
                $.getJSON( url2, function( data ) {
                    //alert(data.delta);
                    setCookie('delta',data.delta);
                //$('#duser').html('Тесты выполняет '+data[0].fio);
                });
            
            
            var d=getCookie('delta');
            //alert(d);
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
                        $('#id_exp').val(data[0].id_exp)
                });
                
                debug('user='+id_user);
                                
            }
            
            $('#exp').hide();
            //$('.pres').hide();
            $('#bstart').show();
            $('#bstop').hide();
              
         
            $('#experiment').combobox({
                onClick: function(param)
                {
                    //param.id = 2;
                    //param.language = 'js';
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
                    //$('.pres').show();                    
                    //$('.pres').load(url);
                }
            });
        
        $( "#del" ).bind( "click", function()
        {
           serializedArr='';
           setCookie('results','');  
           results = []; //JSON.parse(serializedArr);
           
           del_activity();
           show_time_all();
           
           i=0;
           $('#save').hide();  
           $('#del').hide(); 
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
                        $('#del').hide();                                     
                      
                        del_activity();
                      }
                      else 
                      {
                          alert('На сервере что-то не так, попробуйте позже.');
                      }
                });
                
                    
            
                
                    var id_exp=$('#id_exp').val(); 
                    //var id_user=$('#id_user').val(); 
                    url=PATH+'/ajax_func.php?path='+PATH+'&func=get_tests&id='+id_user+'&id_exp='+id_exp;
                    //alert(url);
                    var tab = $('#tabs').tabs('getTab',1);  // get selected panel
                    tab.panel('refresh', url);  
              
        });
        
        $( "#splash" ).bind( "click", function() 
        {  
            $('#experiment').combobox('reload',PATH+'/ajax_func.php?func=trainings');
        });
        
        $( "#splash" ).bind( "dblclick", function() 
        {  
            PATH=PATH2;
            alert(PATH);
        });
            
        $( "#bstop" ).bind( "click", function() 
        {
            //alert(timerId);
            clearInterval(timerId); 
            
              results[i].stop=Date.now();
              i=i+1;
              serializedArr = JSON.stringify(results);
              //alert(serializedArr);
              setCookie('results',serializedArr);
              
            //$.get(PATH+'/mobile.php?id='+id_user+'&act=stop&test='+current_test);  
//            cmd=getCookie('cmd');
            //alert(cmd);
          //alert(sec); 
          //alert(min);  
            
            activity_time(min, sec)
            
            show_time_all();
            //alert(activity);
            //serAct = JSON.stringify(activity);              
            //alert(serAct);
//            setCookie('activity',serAct);
            
            
            sec=0; min=0;
            $('#sec').html(sec);
            $('#min').html(min);
           
           var audio = new Audio();
              audio.preload = 'auto';
              audio.src = 'mp3/1.mp3';
              audio.play();
              
            $('#bstart').show();
            $('#bstop').hide();   
               
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
        $('#del').show();
            
         min=0;
         sec=0;
         // начать повторы с интервалом 2 сек
         timerId = setInterval(function() 
         {
             sec=sec+1;
             if (sec==60) {min=min+1; sec=0;}
             $('#sec').html(sec);
             $('#min').html(min);
             $('#sec').val(sec);
             $('#min').val(min);
             //alert(sec);
            
         }, 1000);

            // через 5 сек остановить повторы
         setTimeout(function() 
         {
              clearInterval(timerId);
              
              min=0; 
              sec=0;
              $('#sec').html(sec);
              $('#min').html(min);
              
              results[i].stop=Date.now();
              i=i+1;
              serializedArr = JSON.stringify(results);
              //alert(serializedArr);
              setCookie('results',serializedArr);
              
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
              
         }, timeTest*1000);                   
        
        
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
        
        