/**
 * Created by rishabh on 08-08-2017.
 */
/**
 * Created by rishabh on 03-08-2017.
 */
/**
 * Created by rishabh on 14-07-2017.
 */
var socket = io();
var flag = 0;
//var socket = io();
$(function () {
    // var arr = [];
    alert("Greetings! welcome to the confession box. Pick a fancy username which is not your name. You can post maximum 3 confessions here." +
        " Confession shouldn't be derogatory or offensive to anyone in particular. " +
        "This web application was created by Rishabh Gupta as a project for Neuromancers, The Coding society of IIT Bhubaneswar.");
    var count = 0;
    var username = prompt('user name');
    if(username===null){
        username = "Anonymous";
    }
    socket.emit('message', new Date().getTime());
    socket.on('start',{user: username});
    //$('#message').append(arr);

    $('.butn').click(function () {
        if(count<4) {
            var inp = $('#inp').val();
            if(inp.trim()!="") {
                console.log(inp);
                /*socket.on('get',function (data) {
                 arr = data;
                 console.log(arr);
                 });*/
                //console.log(arr);
                // arr.push({user:username, input: inp});
                socket.emit('rec_message', {user: username, input: inp});
                // socket.emit('rec_message',arr);
                count++;
                // $('#lehsoon').focus();
                // $('#'+counter).focus();
                $( '.speech-bubble' ).last().scroll();

            }
        }else {
            alert("you cannot post more than 3 confessions");
        }
    });
    /*socket.on('get', function (data) {
     console.log(data);
     });*/
    var counter = 0;
    // var st = ""
    socket.on('get', function (data) {
        var msg = '';
        msg+='<div id='+counter+' class="speech-bubble" onclick="deleter(this)" >' +data.input+'</div>';
        $('#inp').val('');
        $('#baapu').append(msg);
       // document.getElementById('lehsoon').innerHTML = '<a class="btn-floating waves-effect waves-light" href="#lehsoon"><i class="material-icons">send</i></a>';
       //  $('#'+counter).focus();


        //  gotoBottom('#baapu');
     //   $('#first').focus();

    });

    /*socket.on('get', function (data) {
     var msg = '';
     $('#message').html('');
     for(let i = 0; i<data.length;i++) {
     msg += '<li>' + data[i].user + ': ' + data[i].input + '</li>';
     $('#message').append(msg);
     }
     });*/
    socket.on('all', function (data) {
        var msg = '';
        $('#baapu').html('');
        data.forEach(client=>{

            msg='<div class="speech-bubble" onclick="deleter(this)">'+client.input+'</div>';
            // msg+='<span>'+'<a class="waves-effect waves-light btn" style="display: none;">'+delete+'</a>'+'</span>';
            $('#baapu').append(msg);
        });
    });
    $('#flipper').click(function () {
        if(flag==1){
            flag=0;
            $('#flipper').text('Admin');
        }else {
            var password = prompt('password');
            if (password === "chatter") {
                alert("password is correct");
                flag = 1;
                $('#flipper').text('back to client');
                // $('.waves-effect waves-light btn').show();
            }else {
                alert("incorrect password. Try again");
            }
        }
    });

    /*$('.close-div').on('click', function(){
     $(this).parent().parent().remove();
     });*/
    /* $('.speech-bubble').on('click',function () {
     console.log("i ma here")
     if(flag===1) {
     if (confirm('delete this box?')) {
     var msg = $(this).text();
     console.log("reached " + msg)
     socket.emit('del_message', msg);
     $(this).remove();
     }
     }
     });*/

});


function deleter (el) {
    if(flag===1) {
        if (confirm('Do you want to delete this box?')) {
            var msg = $(el).text();
            console.log("reached " + msg)
            socket.emit('del_message', msg);
            $(el).remove();
        }
    }
}
