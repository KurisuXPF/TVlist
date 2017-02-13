window.onload=function(){



var channels = ["525", "105441","607207","154537","846805","1080583","934363","index"];
function getRoomInfo() {
    channels.forEach(function(channel) {
        function makeURL(name) {
            return 'http://crossorigin.me/http://open.douyucdn.cn/api/RoomApi/room/' + name+"";//因为跨域问题，所以采用了一个http://crossorigin.me代理获取数据
        };
        $.get(makeURL(channel), function(data) {
            var error=data.error;
            var mdata=data.data;
            var game="", //游戏分类信息
                status="",//房间状态信息
                url="#",//播出链接地址
                owner_name="",//主播名
                room_name=channel,//房间名
                start_time="",//最近开播时间
                room_thumb="",//主播头像
                online=0,//在线人数
                logo="https://ipsumimage.appspot.com/50x50?l=%3f&s=40&b=ecf0e7&f=5c5457&t=png",//要显示的主播logo
                owner_wight=0;//主播体重
            var html="";//要显示的1行内容

            if(error===0){
                if(mdata.room_status==="2"){
                    url="#"
                    game="关播";
                    status="offline";
                }else if(mdata.room_status==="1"){
                    game=mdata.cate_name;
                    url="https://www.douyu.com/"+mdata.room_id;
                    status="online";
                }
                logo = mdata.room_thumb ? mdata.room_thumb : "https://ipsumimage.appspot.com/50x50?l=%3f&s=40&b=ecf0e7&f=5c5457&t=png";//主播头像


                owner_name=mdata.owner_name;
                room_name=mdata.room_name;//房间名
                start_time=mdata.start_time;//最近开播时间
                online=mdata.online;//在线人数
            }else{
                game="不能查询到该房间";
                status="offline";
            }
            html='<div class="row '+
                status+' "><div class="col-xs-2 col-sm-1" id="icon"><img src="'+
                logo+'" class="logo"></div><div class="col-xs-10 col-sm-3" id="name">';
            if(url==="#"){
                html+='<span class="nourl">'+room_name+'</span>';
            }else{
                html+='<a href="'+
                    url+'" target="_blank">'+
                    room_name+'</a>';
            }

            html+='</div><div class="col-xs-10 col-sm-8" id="streaming">'+
                game+' <span class="hidden-xs">'+
                "播主:"+owner_name+"/在线人数:"+online+"/最近播出时间:"+start_time+'</span></div></div>';
            status === "online" ? $("#display").prepend(html):$("#display").append(html);
        });
    });
    };

    $(document).ready(function() {
        getRoomInfo();
        $(".selector").click(function() {
            $(".selector").removeClass("active");
            $(this).addClass("active");
            var status = $(this).attr('id');
            if (status === "all") {
                $(".online, .offline").show();
            } else if (status === "online") {
                $(".online").show();
                $(".offline").hide();
            } else {
                $(".offline").show();
                $(".online").hide();
            }
        })
    });

};
