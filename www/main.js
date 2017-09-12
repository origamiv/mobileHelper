var activity = new Object;
var serAct = '';
var results = new Array;
var serializedArr = '';
var i = 0;
var cmd = '';
var t = 0;
var timerId;
var pr = '';
var pr_send = 0;
var id_user_cookie = 0;
var isblock = false;
var device_id = 0;


function results_from_cookie()
{
    serializedArr = getCookie('results');
    serAct = getCookie('activity');

    if (serAct != undefined)
    {
        activity = JSON.parse(serAct);
    }
    else
    {
        del_activity();
    }

    if (activity.S2_must == null)
    {
        del_activity();
    }

    //alert(serializedArr);
    if ((serializedArr != undefined) && (serializedArr != ''))
    {
        results = JSON.parse(serializedArr);
        i = results.length;

        for (j = 0; j < i; j++)
        {
            id_user_cookie = results[j].id_user;
            if (id_user_cookie > 0)
            {
                break;
            }
        }
        $('#save').show();
    }
    else
    {
        $('#save').hide();
    }
}

function results_to_cookie()
{
    serializedArr = JSON.stringify(results);
    setCookie('results', serializedArr);
}

function del_activity()
{
    activity.S1_must = 0;
    activity.S2_must = 0;
    activity.S3_must = 0;
    activity.D1_must = 0;
    activity.D2_must = 0;
    activity.D3_must = 0;
    activity.D4_must = 0;
    activity.D5_must = 0;
    activity.D6_must = 0;

    activity.S1_fact = 0;
    activity.S2_fact = 0;
    activity.S3_fact = 0;
    activity.D1_fact = 0;
    activity.D2_fact = 0;
    activity.D3_fact = 0;
    activity.D4_fact = 0;
    activity.D5_fact = 0;
    activity.D6_fact = 0;

    serAct = JSON.stringify(activity);
    //alert(serializedArr);
    setCookie('activity', serAct);
    //alert('Куки очищены');
}

function activity_time(min, sec)
{
    sec = $('#sec').val();
    min = $('#min').val();
    t1 = parseInt(min) * 60 + parseInt(sec);
    must = cmd + '_must';
    fact = cmd + '_fact';
    activity[must] = activity[must] + t1;
    serAct = JSON.stringify(activity);
    setCookie('activity', serAct);
}

function del()
{
    serializedArr = '';
    setCookie('results', '');
    results = [];
    del_activity();
    i = 0;
    $('#save').hide();
    show_time_all();
}

function show_time_all()
{

    //alert(localStorage.batt1);
    must = cmd + '_must';
    t1 = activity[must];

    if (t1 == undefined)
    {
        t1 = 0;
    }
    if (t1 == NaN)
    {
        t1 = 0;
    }

    minall = Math.floor(t1 / 60);
    secall = t1 - minall * 60;

    $('#timeleft').html(minall + ' мин ' + secall + ' сек ');

    var timestr = '<table>';



    timestr = timestr + '<tr><td>Активность</td><td>Время</td><td>Факт</td>';
    timestr = timestr + '<td><a id="del" onclick="del();" style="float: right;" class="delall" title="Удалить все на хрен!">Удалить все</a>' + '</td></tr>';



    style_def = 'background-color:white;color:black;text-align:center';
    style_green = 'background-color:green;color:yellow;text-align:center';
    style_red = 'background-color:red;color:yellow;text-align:center';
    style_yell = 'background-color:yellow;color:black;text-align:center';

    timestr = timestr + '<tr><td>Время с каски</td><td colspan=2>' + localStorage.device_time + '</td></tr>';
    timestr = timestr + '<tr><td>Батарея</td><td style="' + style_def + '">' + localStorage.batt1 + '</td><td style="' + style_def + '">' + localStorage.batt2 + '</td></tr>';

    trainings = JSON.parse(localStorage.trainings);
    for (cmd2 in trainings)
    {
        must = cmd2 + '_must';
        fact = cmd2 + '_fact';

        if (activity[must] == 0)
        {
            style1 = style_def;
        }
        else if ((activity[must] - activity[fact]) > 1)
        {
            style1 = style_yell;
        }
        else if (activity[must] <= activity[fact])
        {
            style1 = style_green;
        }

        timestr = timestr + '<tr><td>' + cmd2 + ' ' + trainings[cmd2]['text'] + '</td><td style="' + style1 + '">' + activity[must] + '</td>';
        timestr = timestr + '<td style="' + style1 + '">' + activity[fact] + '</td><td><a activity="' + cmd2 + '" class="delact">Удалить</a></td></tr>';
    }

    timestr = timestr + '</table>';

    var tab = $('#tabs').tabs('getTab', 1); // get selected panel

    $('#layres').html(timestr);

    $('.delact').linkbutton(
    {
        iconCls: 'icon-remove'
    });

    $('.delall').linkbutton(
    {
        iconCls: 'icon-cancel'
    });

}

function debug(istr)
{
    //alert(istr);
}

function check()
{

    var url2 = PATH + '/ajax_func.php?func=device_data&id=' + device_id;
    $.getJSON(url2, function(data)
    {
        localStorage.device_time = data.device_time;
        localStorage.batt1 = data.voltage1;
        localStorage.batt2 = data.voltage2;
    });
    pr_send = 0;
    setCookie('pr_send', pr_send);

    var id_exp = $('#id_exp').val();
    var url2 = PATH + '/ajax_func.php?func=check_data_integrity&id_exp=' + id_exp;
    $.post(url2,
        {
            json_data: serializedArr
        })
        .done(function(data1)
        {
            data2 = JSON.parse(data1);


            $.each(data2, function(key, data)
            {
                if (data != null)
                {
                    pr_send = 1;
                    s12 = JSON.stringify(data);

                    must = data.cmd + '_must';
                    fact = data.cmd + '_fact';
                    activity[fact] = data.fact;


                    serAct = JSON.stringify(activity);
                    setCookie('activity', serAct);
                    show_time_all();
                }
                else
                {
                    pr_send = 0;
                    setCookie('pr_send', pr_send);
                    alert('На сервере пусто, попробуйте позже.');
                }
            });
        });

    pr_send = getCookie('pr_send');
    if (pr_send == 1)
    {


    }
}

function stopTest()
{
    if (pr == 'end')
    {
        clearInterval(timerId);

        min = 0;
        sec = 0;
        $('#sec').html(sec);
        $('#min').html(min);

        results[i].stop = Date.now();
        i = i + 1;
        results_to_cookie();

        activity_time(min, sec)

        show_time_all();

        var audio = new Audio();
        audio.preload = 'auto';
        audio.src = 'mp3/1.mp3';
        audio.play();



        $('.exp1').linkbutton('enable');
        isblock = false;
        $('#bstart').show();
        $('#bstop').hide();
        pr = '';
    }
}
//==============================================            
$(document).ready(function()
{
    serializedArr = '';

    debug('start');
    results_from_cookie();
    cmd = 'S1';
    show_time_all();
    $('#ptime').hide();

    t = Date.now();
    debug('time=' + t);

    $('#mmm').hide();

    var url2 = PATH + '/ajax_func.php?func=sync&t=' + t;
    $.getJSON(url2, function(data)
    {
        setCookie('delta', data.delta);
    });


    var d = getCookie('delta');

    id_exp = 0;
    $('#id_exp').val(id_exp);

    var huser = location.hash;
    z = huser.split('#');
    huser = z[1];
    z2 = huser.split('_');
    if (z2[0] == 'user')
    {
        id_user = z2[1];
        $('#hiduser').val(id_user);

        var url2 = PATH + '/ajax_func.php?func=user_by_id&id=' + id_user;
        $.getJSON(url2, function(data)
        {

            device_id = data[0].device_id;
            $('#id_exp').val(data[0].id_exp);
            id_exp = $('#id_exp').val();
            $('#duser').html('Тесты выполняет ' + data[0].fio + ' эксп.' + id_exp);
        });
    }

    if (id_user != id_user_cookie)
    {
        del();
    }

    url = PATH + '/ajax_func.php?func=trainings&cmd=ALL';
    $.getJSON(url, function(data)
    {
        localStorage.trainings = JSON.stringify(data);
    });
    //==============================================



    $('#exp').hide();
    //$('.pres').hide();
    $('#bstart').show();
    $('#bstop').hide();

    $('.exp1').bind("click", function()
    {
        if (isblock == false)
        {
            cmd = $(this).attr('cmd');
            trainings = JSON.parse(localStorage.trainings);
            param = trainings[cmd];

            //                    param.id = 2;
            //                    param.tim = 300;
            //                    param.pic='stay.jpg';
            //                    param.descr='ffff';
            //                    param.mp3='stay.mp3';
            debug('exp_click');
            current_test = param.id;

            $('#timetest').val(param.tim);
            $('#exp').show();
            $('#splash').hide();

            $('#descr').html(param.descr);
            $('<audio class="player" src="sound.mp3"></audio><br>').prependTo('#descr');
            $('#img').attr('src', 'trainings/' + param.pic);
            $('.player').attr('src', 'mp3/' + param.mp3);

            var wid = parseInt($('#descr').css('width'));
            wid = 0; //wid-42;

            var settings = {
                progressbarWidth: wid + 'px',
                progressbarHeight: '5px',
                progressbarColor: '#22ccff',
                progressbarBGColor: '#eeeeee',
                defaultVolume: 0.8
            };

            $(".player").player(settings);

            setCookie('cmd', param.id);

            cmd = param.id;
            $('#ptime').show();
            show_time_all();

            debug('exp_click_end');

        }

    });




    $("body").on("click", '.delact', function()
    {
        var act_for_del = $(this).attr('activity');
        for (k = 0; k < results.length; k++)
        {
            z = results[k];
            if (z != null)
            {
                if (z.cmd == act_for_del)
                {
                    delete(results[k]);

                    must = act_for_del + '_must';
                    fact = act_for_del + '_fact';
                    activity[must] = 0;
                }
            }
        }
        results_to_cookie();
        serAct = JSON.stringify(activity);
        setCookie('activity', serAct);

        show_time_all();
    });
    $('#tabs').tabs(
    {
        border: true,
        onSelect: function(title)
        {
            //alert(title+' is selected');
            if (title == 'Результаты')
            {
                check();
            }
        }
    });



    $("#save").bind("click", function()
    {

        var id_exp = $('#id_exp').val();
        $.post(PATH + '/ajax_func.php?func=send&check=1&id_exp=' + id_exp,
            {
                q1: serializedArr
            })
            .done(function(data)
            {
                if (data == 'ok')
                {
                    var url2 = PATH + '/ajax_func.php?func=user_by_id&id=' + id_user;
                    $.getJSON(url2, function(data)
                    {
                        $('#id_exp').val(data[0].id_exp)
                    });

                    serializedArr = '';
                    setCookie('results', '');
                    $('#save').hide();

                    del();
                }
                else
                {
                    alert('На сервере что-то не так, попробуйте позже.');
                }
            });




        var id_exp = $('#id_exp').val();
    });


    $("#bstop").bind("click", function()
    {
        stopTest();
    });


    $("#bstart").bind("click", function()
    {
        cmd = getCookie('cmd');

        results[i] = new Object;
        results[i].id_user = id_user;
        results[i].cmd = cmd;
        results[i].delta = d;
        results[i].start = Date.now();

        var id_exp = $('#id_exp').val();
        var timeTest = $('#timetest').val();

        $('.exp1').linkbutton('disable');
        isblock = true;

        $('#bstart').hide();
        $('#bstop').show();
        $('#save').show();

        t = Date.now();
        min = 0;
        sec = 0;


        // начать повторы с интервалом 2 сек
        timerId = setInterval(function()
        {
            pr = 'end';
            t2 = Date.now();
            delta = (t2 - t) / 1000;
            delta = Math.floor(delta);
            //alert(delta);
            sec = delta - min * 60; //sec+1;
            if (sec == 60)
            {
                min = min + 1;
                sec = 0;
            }
            $('#sec').html(sec);
            $('#min').html(min);
            $('#sec').val(sec);
            $('#min').val(min);
            //alert(sec);
            //alert('t '+timerId);    
            if (delta == timeTest)
            {
                stopTest();
                //clearInterval(timerId);
            }

        }, 1000);


    });

});