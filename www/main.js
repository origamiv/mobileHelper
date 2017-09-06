$( document ).ready(function() 
        {
            
            var activity = new Object;
            var serAct = ''; 
            
function del_activity()
{
            activity.S1=0;
            activity.S2=0;
            activity.S3=0;
            activity.D1=0;
            activity.D2=0;
            activity.D3=0;
            activity.D4=0;
            activity.D5=0;
            activity.D6=0;
            
            serAct = JSON.stringify(activity);
              //alert(serializedArr);
            setCookie('activity',serAct);  
            alert('ok');
            }
            
function activity_time(min, sec)
{
                
            sec=$('#sec').val();
            min=$('#min').val();    
            
            t1=parseInt(min)*60+parseInt(sec);
            
            //alert(cmd +' - '+activity.S2+' - '+t1);
            
            if (cmd=='S1') {activity.S1=activity.S1+t1;}
            if (cmd=='S2') {activity.S2=activity.S2+t1;}
            if (cmd=='S3') {activity.S3=activity.S3+t1;}
            if (cmd=='D1') {activity.D1=activity.D1+t1;}
            if (cmd=='D2') {activity.D2=activity.D2+t1;}
            if (cmd=='D3') {activity.D3=activity.D3+t1;}
            if (cmd=='D4') {activity.D4=activity.D4+t1;}
            if (cmd=='D5') {activity.D5=activity.D5+t1;}            
            if (cmd=='D6') {activity.D6=activity.D6+t1;}  
            
            serAct = JSON.stringify(activity);
              //alert(serializedArr);
            setCookie('activity',serAct);
            }
            
function show_time_all()
{
                
                if (cmd=='S1') {t1=activity.S1;}
                if (cmd=='S2') {t1=activity.S2;}
                if (cmd=='S3') {t1=activity.S3;}
                if (cmd=='D1') {t1=activity.D1;}
                if (cmd=='D2') {t1=activity.D2;}
                if (cmd=='D3') {t1=activity.D3;}
                if (cmd=='D4') {t1=activity.D4;}
                if (cmd=='D5') {t1=activity.D5;} 
                if (cmd=='D6') {t1=activity.D6;} 
                
                //alert(t1);
                if (t1==undefined) {t1=0;}
                if (t1==NaN) {t1=0;}
                
                minall=Math.floor(t1 / 60);
                secall=t1-minall*60;
                    
                $('#timeleft').html(minall+' мин '+secall+' сек ');  
                
                var timestr='<table>'+
                '<tr><td>S1 Стоит</td><td>'+activity.S1+'</td></tr>'+
                '<tr><td>S2 Сидит</td><td>'+activity.S2+'</td></tr>'+
                '<tr><td>S3 Лежит</td><td>'+activity.S3+'</td></tr>'+
                '<tr><td>D1 Идет</td><td>'+activity.D1+'</td></tr>'+
                '<tr><td>D2 Бежит</td><td>'+activity.D2+'</td></tr>'+
                '<tr><td>D3 Подъем по лестнице</td><td>'+activity.D3+'</td></tr>'+
                '<tr><td>D4 Спуск по лестнице</td><td>'+activity.D4+'</td></tr>'+
                '<tr><td>D5 Подъем на лифте</td><td>'+activity.D5+'</td></tr>'+
                '<tr><td>D6 Спуск на лифте</td><td>'+activity.D6+'</td></tr>'+
                '</table>';
                
                
                var tab = $('#tabs').tabs('getTab',1);  // get selected panel
                
                $('#layres').html(timestr);
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
        
        