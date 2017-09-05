/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 function onLoad() 
 {
      alert('sdfds');
 } 
 
 function init(){ 
   
        }
 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('app', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('app');
{
            //var i_act=0;
            serializedArr='';
             
            alert('start');
            results_from_cookie();
            cmd='S1';
            show_time_all();
            $('#ptime').hide();
            
            t=Date.now();            
            alert('time='+t);
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
            
            
            $('#mmm').html(serializedArr);  
            
            var url2=PATH+'/ajax_func.php?func=sync&t='+t;
                alert(url2);
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
            
            alert(id_exp);
            
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
                
                alert('user='+id_user);
                
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
                
        }
        
    },      

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();