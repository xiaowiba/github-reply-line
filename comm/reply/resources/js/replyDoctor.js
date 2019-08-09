commApp.controller('replyDoctorController', function ($scope, $state, $http, $filter, $timeout, $sce) {
    mui.showLoading('正在加载..', 'div');
    //var vConsole = new VConsole();
    /*******************************************************方法-start***********************************************************/
    //初始化数据
    $scope.INIT = function () {
        // data-ripple="ripple"
        // new Ripple({
        //     opacity : 0.6,  //水波纹透明度
        //     speed : 1,      //水波纹扩散速度
        //     bgColor : "#fff", //水波纹颜色
        //     cursor : true  //是否显示手型指针
        // });

        $scope.account = common.getUrlParam('account');
        $scope.openId = common.getUrlParam('openId');

        //微信语音SDK容器
        $scope.voice = {
            localId: '',
            serverId: ''
        };

        //语音内容容器->用不着了
        //$scope.content = '';

        //语音识别弹出框状态
        $scope.voiceState = false;

        //图片确认框状态
        $scope.imgState = false;

        $scope.SportImg = '';

        $scope.info = {
            patientName: '小红',
            patientAvatan: 'resources/img/chat/B.jpg'
        };

        $scope.list = [
            {
                time: '2019-08-06 09:15',//发送时间
                avatar: 'resources/img/chat/A.jpg',//头像
                name: '贝吉塔',//发送人姓名
                role: 0,//0:医生，1:本人
                type: 0,//0:文字，1:图片，2:语音
                data: '我是医生',//文字或语音链接或图片链接
                length: ''
            },
            // {
            //     time: '2019-08-06 09:26',//发送时间
            //     avatar: 'resources/img/chat/A.jpg',//头像
            //     name: '超级赛亚人',//发送人姓名
            //     role: 0,//0:医生，1:本人
            //     type: 2,//0:文字，1:图片，2:语音
            //     data: 'https://xhyydevelop.mdruby.cn/hdata/XHYY/consult/files/HmProvider/4349/voices/adda2019012010540739553325325.aac',//文字或语音链接或图片链接
            //     length: '30'
            // },
            {
                time: '2019-08-06 09:28',//发送时间
                avatar: 'resources/img/chat/A.jpg',//头像
                name: '小明',//发送人姓名
                role: 0,//0:医生，1:本人
                type: 2,//0:文字，1:图片，2:语音
                data: 'http://xiaowiba.com/test.mp3',//文字或语音链接或图片链接
                length: '10'
            },
            // {
            //     time: '2019-08-06 09:30',//发送时间
            //     avatar: 'resources/img/chat/A.jpg',//头像
            //     name: '贝吉塔',//发送人姓名
            //     role: 0,//0:医生，1:本人
            //     type: 2,//0:文字，1:图片，2:语音
            //     data: 'https://txhyy.mdruby.cn/hdata/TXHYY/consult/files/HmProvider/1648/voices/adda2019020113510743553325325.aac',//文字或语音链接或图片链接
            //     length: '28'
            // },
            // {
            //     time: '2019-08-06 09:55',//发送时间
            //     avatar: 'resources/img/chat/A.jpg',//头像
            //     name: '贝吉塔',//发送人姓名
            //     role: 0,//0:医生，1:本人
            //     type: 2,//0:文字，1:图片，2:语音
            //     data: 'https://txhyy.mdruby.cn/hdata/TXHYY/consult/files/HmProvider/1762/voices/adda2019020113454625553325325.wav',//文字或语音链接或图片链接
            //     length: '10'
            // },
            {
                time: '2019-08-06 11:15',//发送时间
                avatar: 'resources/img/chat/B.jpg',//头像
                name: '超级赛亚人',//发送人姓名
                role: 1,//0:医生，1:本人
                type: 0,//0:文字，1:图片，2:语音
                data: '我是本人',//文字或语音链接或图片链接
                length: ''
            },
            {
                time: '2019-08-06 12:15',//发送时间
                avatar: 'resources/img/chat/B.jpg',//头像
                name: '超级赛亚人',//发送人姓名
                role: 1,//0:医生，1:本人
                type: 1,//0:文字，1:图片，2:语音
                data: 'http://xiaowiba.com/xwb.jpg',//文字或语音链接或图片链接
                length: ''
            },
            {
                time: '2019-08-06 16:15',//发送时间
                avatar: 'resources/img/chat/A.jpg',//头像
                name: '贝吉塔',//发送人姓名
                role: 0,//0:医生，1:本人
                type: 0,//0:文字，1:图片，2:语音
                data: 'what`s your problem?',//文字或语音链接或图片链接
                length: ''
            },
            {
                time: '2019-08-06 18:00',//发送时间
                avatar: 'resources/img/chat/B.jpg',//头像
                name: '超级赛亚人',//发送人姓名
                role: 1,//0:医生，1:本人
                type: 0,//0:文字，1:图片，2:语音
                data: 'I am rich',//文字或语音链接或图片链接
                length: ''
            }
        ];

        //$scope.list = [];
        $scope.inputVal = '';//输入框内容
        $scope.timer = 1;
        $scope._timer = 1;
        $scope.chatStatus = true;
        $scope.noStatus = false;
        $scope.pageIndex = 2;//第一页单独请求，分页从第二页开始
        $scope.pageSize = 3;
        $scope.pageID = 0;

        $.ajax({
            async: false,
            method: 'get',
            url:'../reply/resources/json/payIndex.json',
            data:{
                account:$scope.account,
                openId:$scope.openId
            },
            success:function (Data) {
                if(Data === null || Data === '' || Data === undefined){
                    mui.toast('获取患者异常');
                    mui.hideLoading();
                    return false;
                }

                // var data = (JSON.parse(Data)).data;
                var data = Data.data;
                $scope.openId = data.openId;//微信openID
                $scope.patientId = data.patientId;//病人id
                $scope.doctorId = data.doctorId;
                $scope.addaUrl = data.addaUrl;//接口平台url
                $scope.accessKey = data.accessKey;
                $scope.patientPlatformKey = data.accessKey;
                //mui.hideLoading();

            },
            error:function (err) {
                console.log(err);
                mui.toast('获取患者异常');
                mui.hideLoading();
            }
        });

        //键盘遮挡问题
        $('#chat-input').focus(function(e){
            //滚动到底部
            $scope.toDown();
        });

    };

    //判断禁言状态
    $scope.isForbidden = function () {
        if($scope.timer > 3){
            $scope.chatStatus = false;
        }else{
            $scope.timer++;
        }
        $scope.$applyAsync();
    };

    //关闭当前页面
    $scope.closeChat = function () {
        wx.closeWindow();
    };

    //初始化微信SDK
    $scope.initSDK = function () {
        var url = window.location.href.split('#')[0];
        return false;

        $.ajax({
            async: false,
            method: 'post',
            url:'/wxapi/jsTicket',
            data:{
                url: url,
                account: $scope.account
            },
            success:function (Data) {
                //mui.hideLoading();

                var data = (JSON.parse(Data)).data;

                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'onVoicePlayEnd',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice'
                    ]
                });

            },
            error:function (err) {
                mui.toast('获取语音接口异常');
                mui.hideLoading();
            }
        });
    };

    //打开图片上传框
    $scope.iStart = function () {
        $scope.imgState = true;
    };

    $scope.iCancel = function () {
        $scope.imgState = false;
    };

    $scope.iSubmit = function () {
        $('.up-section').remove();
        $('.z_file').show();
        $scope.imgState = false;
        //深拷贝
        var imgVal = JSON.parse(JSON.stringify($scope.SportImg));

        $scope.list.push({
            time: $scope.getTime(),//发送时间
            avatar: $scope.info.patientAvatan,//头像
            name: $scope.info.patientName,//发送人姓名
            role: 1,//0:医生，1:本人
            type: 1,//0:文字，1:图片，2:语音
            data: 'http://xiaowiba.com/xwb.jpg'//文字或语音链接或图片链接
        });

        $scope.SportImg = '';
        $scope.initImg();
        //滚动到底部
        $scope.toDown();
        $scope.isForbidden();
        $scope.$applyAsync();

        return false;

        mui.showLoading('正在加载..', 'div');
        $.ajax({
            async: false,
            method: 'post',
            url:$scope.addaUrl + '/rest/chatmessage/sendmessage/wx/' + $scope.accessKey,
            data:{
                doctorID:$scope.doctorId,
                userAccountId:$scope.patientId,
                type:1,
                data:imgVal,
                length:''
            },
            success:function (Data) {
                if(Data.result === 200){
                    $scope.list.push({
                        time: $scope.getTime(),//发送时间
                        avatar: $scope.info.patientAvatan,//头像
                        name: $scope.info.patientName,//发送人姓名
                        role: 1,//0:医生，1:本人
                        type: 1,//0:文字，1:图片，2:语音
                        data: imgVal//文字或语音链接或图片链接
                    });

                    $scope.SportImg = '';
                    $scope.initImg();
                    //滚动到底部
                    $scope.toDown();
                    $scope.isForbidden();
                    $scope.$applyAsync();
                }else{
                    mui.toast('提交异常');
                    return false;
                }

                mui.hideLoading();
            },
            error:function (err) {
                console.log(err);
                mui.toast('提交异常');
                mui.hideLoading();
            }
        });

    };

    //初始化上传
    $scope.imgUp = function () {
        var delParent;
        var defaults = {
            fileType : ["jpg","png","bmp","jpeg"],  // 上传文件的类型
            fileSize : 1024 * 1024 * 5             // 上传文件的大小 5M
        };

        /*点击图片的文本框*/
        $(".file").change(function(){
            var idFile = $(this).attr("id");
            var file = document.getElementById(idFile);

            //存放图片的父亲元素
            var imgContainer = $(this).parents(".z_photo");

            //获取的图片文件
            var fileList = file.files;

            //遍历得到的图片文件
            var numUp = imgContainer.find(".up-section").length;

            //总的数量
            var totalNum = numUp + fileList.length;

            if(fileList.length > 1 || totalNum > 1){
                //一次选择上传超过4个 或者是已经上传和这次上传的到的总数也不可以超过4个
                //mui.toast("上传图片数目不可以超过4个，请重新选择");
                mui.toast("一次只能添加一张照片");
            } else if (numUp < 2){
                mui.showLoading('正在加载..', 'div');

                var date = new Date().getTime();

                fileList = validateUp(fileList);

                //未通过图片判断停止继续
                if(fileList.length === 0){
                    mui.hideLoading();
                    return false;
                }

                fileList[0].date = date;

                /**************************************************************************************************/
                // 压缩图片需要的一些元素和对象
                var reader = new FileReader();
                var img = new Image();

                // 缩放图片需要的canvas
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                //图片类型,其实用不到
                var fileType = fileList[0].type;

                //图片大小
                var fileSize = fileList[0].size;

                reader.readAsDataURL(fileList[0]);

                reader.onload = function(e) {
                    //e.target.result就是图片的base64地址信息
                    img.src = e.target.result;
                };

                img.onload = function() {
                    EXIF.getData(img, function() {
                        var Orientation = EXIF.getTag(this, 'Orientation');
                        var wph = (img.height*1)/(img.width*1);
                        var hpw = wph.toFixed(2)*1;
                        var square = 700;   //定义画布的大小，也就是图片压缩之后的像素
                        var imageWidth = 0;    //压缩图片的大小
                        var imageHeight = 0;
                        var offsetX = 0;
                        var offsetY = 0;
                        var hsquare = Math.ceil(square*hpw);

                        var u = navigator.userAgent;
                        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                        if(isiOS){
                            if(Orientation === 6){
                                canvas.width = hsquare;
                                canvas.height = square;
                                context.clearRect(0, 0, hsquare, square);
                            }else if(Orientation === 8){
                                canvas.width = hsquare;
                                canvas.height = square;
                            }else{
                                canvas.width = square;
                                canvas.height = hsquare;
                                context.clearRect(0, 0, square, hsquare);
                            }
                        }else{
                            canvas.width = square;
                            canvas.height = hsquare;
                            context.clearRect(0, 0, square, hsquare);
                        }

                        if(isiOS){
                            var degree;
                            switch(Orientation){
                                case 3:
                                    degree = 180;
                                    imageWidth = -square;
                                    imageHeight = -hsquare;
                                    break;
                                case 6:
                                    degree = 90;
                                    imageWidth = square;
                                    imageHeight = -hsquare;
                                    break;
                                case 8:
                                    degree = 270;
                                    imageWidth = -square;
                                    imageHeight = hsquare;
                                    break;
                                default:
                                    degree = 0;
                                    imageWidth = square;
                                    imageHeight = hsquare;
                            }
                            context.rotate(degree * Math.PI / 180.0);
                        }else{
                            if (img.width > img.height) {
                                imageWidth = square;
                                imageHeight = hsquare;
                                offsetX = - Math.round((imageWidth - square) / 2);
                            } else {
                                imageHeight = hsquare;
                                imageWidth = square;
                                offsetY = - Math.round((imageHeight - hsquare) / 2);
                            }
                        }

                        context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);

                        var blob = canvas.toDataURL('image/jpeg', 1.0);

                        $scope.upload2(blob, date);

                        var blobs = $scope.toBlob(blob);

                        blobs.date = date;

                        var $section = $("<section class='up-section fl loading ' data-date='" + date + "'>");
                        imgContainer.prepend($section);

                        var $span = $("<span class='up-span'>");
                        $span.appendTo($section);

                        var $img0 = $("<img class='close-upimg'>")
                            .on("click", function(event){
                                event.preventDefault();
                                event.stopPropagation();
                                //$(".works-mask").show();
                                delParent = $(this).parent();
                                $(this).parent().remove();
                                $('.z_file').show();

                                //将已上传回来的图片缓存集中对应的结果删除
                                $scope.SportImg = '';

                                $('#file').val('');
                                return false;
                            });

                        $img0.attr("src","img/a7.png").appendTo($section);

                        var $img = $("<img class='up-img up-opcity'>");
                        $img.css("background",'url(' + blob + ')').css('background-size', 'cover');

                        // var $img = $("<img class='up-img up-opcity' src='" + $scope.SportImg + "' >");

                        $img.appendTo($section);

                        var $p = $("<p class='img-name-p'>");
                        $p.html(fileList[0].name).appendTo($section);

                        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                        $input.appendTo($section);

                        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                        $input2.appendTo($section);

                        setTimeout(function(){
                            $(".up-section").removeClass("loading");
                            $(".up-img").removeClass("up-opcity");
                        }, 450);

                        numUp = imgContainer.find(".up-section").length;

                        if(numUp >= 1){
                            $('.z_file').hide();
                        }

                        //input内容清空
                        $(this).val("");

                        //初始化图片插件
                        //$scope.initImg();

                        mui.hideLoading();

                    });

                };

            }

        });

        // $(".z_photo").delegate(".close-upimg", "click", function(){
        //     $(".works-mask").hide();
        //     var numUp = delParent.siblings().length;
        //
        //     if(numUp < 2){
        //         delParent.parent().find(".z_file").show();
        //     }
        //
        //     var date = delParent.attr('data-date');
        //     console.log(delParent);
        //
        //     delParent.remove();
        //
        //     //将已上传回来的图片缓存集中对应的结果删除
        //     $scope.SportImg = '';
        //
        //     $('#file').val('');
        //     return false;
        //     $(".works-mask").show();
        //     delParent = $(this).parent();
        // });
        //
        // $(".wsdel-ok").click(function(){
        //     $(".works-mask").hide();
        //     var numUp = delParent.siblings().length;
        //
        //     if(numUp < 2){
        //         delParent.parent().find(".z_file").show();
        //     }
        //
        //     var date = delParent.attr('data-date');
        //
        //     delParent.remove();
        //
        //     //将已上传回来的图片缓存集中对应的结果删除
        //     $scope.SportImg = '';
        //
        //     $('#file').val('');
        //
        // });
        //
        // $(".wsdel-no").click(function(){
        //     $(".works-mask").hide();
        // });

        function validateUp(files){
            //替换的文件数组
            var arrFiles = [];
            //不能上传文件名重复的文件
            for(var i = 0, file; file = files[i]; i++){
                //获取文件上传的后缀名
                var newStr = file.name.split("").reverse().join("");
                if(newStr.split(".")[0] != null){
                    var type = newStr.split(".")[0].split("").reverse().join("");
                    if(jQuery.inArray(type, defaults.fileType) > -1){
                        // 类型符合，可以上传
                        if (file.size >= defaults.fileSize) {
                            //mui.toast(file.name +'"文件过大');
                            mui.toast('文件过大');
                        } else {
                            // 在这里需要判断当前所有文件中
                            arrFiles.push(file);
                        }
                    }else{
                        //mui.toast(file.name +'"上传类型不符合');
                        mui.toast('该图片格式不支持上传');
                    }
                }else{
                    //mui.toast(file.name +'"没有类型, 无法识别');
                    mui.toast('没有类型,无法识别');
                }
            }

            return arrFiles;

        }
    };

    /**
     * 点击就上传图片的接口
     * @param base64
     * @param date
     */
    $scope.upload2 = function (base64, date) {
        var blob = $scope.toBlob(base64);
        var fd = new FormData();

        fd.append('name', blob, date + '.jpg');

        //$scope.SportImg = '';

        return false;

        $.ajax({
            async: false,
            method: 'post',
            processData : false,
            contentType: false,
            url: $scope.addaUrl + '/rest/healthrecord/' + $scope.accessKey + '/' + $scope.patientId + '/wx/img',
            data: fd,
            success:function (Data) {
                mui.hideLoading();

                if(Data.result === 200){
                    var data = Data.data;
                    $scope.SportImg = data[0].DataValue;

                }else{
                    mui.toast('上传异常,请稍后再试');
                    setTimeout(function () {
                        //window.location.reload();
                        $scope.imgState = false;
                        $scope.SportImg = '';
                    }, 10);

                }

                $scope.$applyAsync();

            },
            error:function (err) {
                mui.toast('图片上传异常');
                mui.hideLoading();
            }
        });
    };

    //开始语音识别
    $scope.vStart = function () {
        var InterValObj; //timer变量，控制时间
        var count = 10; //间隔函数，1秒执行
        var curCount;//当前剩余秒
        curCount = count;

        $scope.curCount = curCount;

        $scope.InterValObj = window.setInterval(function () {
            if (curCount === 1) {
                window.clearInterval($scope.InterValObj);//停止计时器
                $scope.vSubmit();

            } else {
                curCount--;
                $scope.curCount = curCount;
                $scope.$applyAsync();
            }

        }, 1000);

        $scope.voiceState = true;

        return false;

        wx.ready(function () {
            wx.startRecord({
                success: function(res){
                    console.log(res);
                },
                cancel: function () {
                    //alert('用户拒绝授权录音');
                    mui.toast('你拒绝了授权');
                    $scope.vCancel();
                }
            });

            wx.onVoiceRecordEnd({
                complete: function (res) {
                    $scope.voice.localId = res.localId;
                    mui.toast('录音时间已超过一分钟');
                    $scope.vSubmit();
                }
            });

        });

    };

    $scope.vCancel = function () {
        $scope.curCount = 10;
        window.clearInterval($scope.InterValObj);
        $scope.voiceState = false;

        return false;

        wx.ready(function () {
            wx.stopRecord({
                success: function (res) {
                    //$scope.voice.localId = res.localId;
                },
                fail: function (res) {
                    //alert(JSON.stringify(res));
                }
            });

        });
    };

    $scope.vSubmit = function () {
        $scope.curCount = 10;
        window.clearInterval($scope.InterValObj);
        $scope.voiceState = false;

        $scope.inputVal = $scope.inputVal + '这是模拟的数据';
        $scope.$applyAsync();

        return false;

        wx.ready(function () {
            wx.stopRecord({
                success: function (res) {
                    $scope.voice.localId = res.localId;

                    if ($scope.voice.localId === '') {
                        //alert('请先使用 startRecord 接口录制一段声音');
                        mui.toast('接口异常，请重新操作');
                        $scope.vCancel();
                        return false;
                    }

                    wx.translateVoice({
                        localId: $scope.voice.localId,
                        complete: function (res) {
                            if (res.hasOwnProperty('translateResult')) {
                                console.log(res.translateResult);
                                $scope.inputVal = $scope.inputVal + res.translateResult;
                                $scope.$applyAsync();

                            } else {
                                //alert('无法识别');
                                mui.toast('无法识别');
                                $scope.$applyAsync();
                                $scope.vCancel();
                            }
                        }
                    });

                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                    mui.toast('语音接口异常');
                    $scope.vCancel();
                }
            });

        });

    };

    /**
     * base64转blob
     * @param urlData
     * @returns {Blob}
     */
    $scope.toBlob = function (urlData) {
        var bytes = window.atob(urlData.split(',')[1]);
        // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var  ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab],{type : 'image/jpeg'});
    };

    $scope.getFirstPage = function () {
        return false;
        $.ajax({
            async: false,
            method: 'post',
            url:$scope.addaUrl + '/rest/chatmessage/patient/' + $scope.accessKey,
            data:{
                PageIndex:1,
                PageSize:$scope.pageSize,
                DoctorID:$scope.doctorId,
                UserAccountId:$scope.patientId,
                ID:$scope.pageID
            },
            success:function (Data) {
                var data = Data.data;

                if(data === '' || data === null || data === undefined){
                    mui.toast('获取列表异常');
                    $scope.noStatus = true;
                    $scope.$applyAsync();
                    return false;
                }
                var list = data.data;
                var length = list.length;

                if(Data.result === 200){
                    if (length === 0) {
                        $scope.noStatus = true;
                        $scope.$applyAsync();

                    }else{
                        for(var i=(length-1);i>-1;i--){
                            var item = list[i];
                            var avatar = item.avatar;
                            if(avatar === '' || avatar === null || avatar === undefined){
                                list[i].avatar = '../reply/resources/img/chat/avatar.png';
                            }
                            $scope.list.unshift(list[i]);
                        }

                        $scope.pageID = list[length-1].id;

                        $scope.initImg();
                        $scope.$applyAsync();
                        $scope.initPage();

                    }

                }else{
                    mui.toast('获取列表异常');
                }

                mui.hideLoading();
            },
            error:function (err) {
                console.log(err);
                mui.toast('获取列表异常');
                mui.hideLoading();
            }
        });
    };

    $scope.initPage = function () {
        $('#chat-container').dropload({
            scrollArea: window,
            domUp: {
                domClass: 'dropload-down',
                domRefresh: '<div class="dropload-refresh">下拉刷新</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">暂无更多数据</div>'
            },
            loadUpFn: function (me) {
                if($scope._timer < 3){
                    setTimeout(function () {
                        $scope.list.unshift({
                            time: $scope.getTime(),//发送时间
                            avatar: $scope.info.patientAvatan,//头像
                            name: $scope.info.patientName,//发送人姓名
                            role: 0,//0:医生，1:本人
                            type: 0,//0:文字，1:图片，2:语音
                            data: '我是医生的加载'//文字或语音链接或图片链接
                        });
                        $scope._timer++;
                        $scope.$applyAsync();
                        me.resetload();
                    }, 500);
                }else{
                    me.lock();
                    me.noData();
                    me.resetload();
                    $scope.noStatus = true;
                    $scope.$applyAsync();
                }

                return false;

                // $.ajax({
                //     async: false,
                //     method: 'post',
                //     url:$scope.addaUrl + '/rest/chatmessage/patient/' + $scope.accessKey,
                //     data:{
                //         PageIndex:$scope.pageIndex,
                //         PageSize:$scope.pageSize,
                //         DoctorID:$scope.doctorId,
                //         UserAccountId:$scope.patientId,
                //         ID:$scope.pageID
                //     },
                //     success:function (Data) {
                //         var data = Data.data;
                //
                //         if(data === '' || data === null || data === undefined){
                //             mui.toast('获取列表异常');
                //             $scope.noStatus = true;
                //             $scope.$applyAsync();
                //
                //             me.lock();
                //             me.noData();
                //             me.resetload();
                //             return false;
                //         }
                //         var list = data.data;
                //         var length = list.length;
                //
                //         if(Data.result === 200){
                //             if (length === 0) {
                //
                //                 if($scope.pageIndex === 1){
                //                     me.lock();
                //                     me.noData();
                //                     me.resetload();
                //
                //                     /*$('.dropload-noData').remove();
                //                     $('body')
                //                         .css('height', '90vh')
                //                         .css('background', 'url(../resources/img/none.png)')
                //                         .css('background-repeat', 'no-repeat')
                //                         .css('background-position', 'center center');*/
                //
                //                 }else{
                //                     me.lock();
                //                     me.noData();
                //                     me.resetload();
                //                 }
                //
                //                 $scope.noStatus = true;
                //                 $scope.$applyAsync();
                //
                //             }else{
                //                 $scope.pageIndex ++;
                //                 for(var i=(length-1);i>-1;i--){
                //                     var item = list[i];
                //                     var avatar = item.avatar;
                //                     if(avatar === '' || avatar === null || avatar === undefined){
                //                         list[i].avatar = '../reply/resources/img/chat/avatar.png';
                //                     }
                //                     $scope.list.unshift(list[i]);
                //                 }
                //
                //                 $scope.initImg();
                //                 $scope.$applyAsync();
                //
                //                 me.resetload();
                //             }
                //
                //         }else{
                //             mui.toast('获取列表异常');
                //         }
                //
                //         mui.hideLoading();
                //     },
                //     error:function (err) {
                //         console.log(err);
                //         mui.toast('获取列表异常');
                //         mui.hideLoading();
                //     }
                // });

            }
        });
    };

    //页面元素加载完后的动作
    angular.element(window).bind('load', function() {
        $scope.toDown();
        mui.hideLoading();
    });

    //初始化图片插件
    $scope.initImg = function () {
        mui.previewImage();
    };

    //提交文字
    $scope.fSubmit = function () {
        if($scope.inputVal === ''){
            //mui.toast('请输入信息');
            return false;
        }else{
            $('#chat-input').blur();
            //深拷贝
            var inputVal = JSON.parse(JSON.stringify($scope.inputVal));

            $scope.list.push({
                time: $scope.getTime(),//发送时间
                avatar: $scope.info.patientAvatan,//头像
                name: $scope.info.patientName,//发送人姓名
                role: 1,//0:医生，1:本人
                type: 0,//0:文字，1:图片，2:语音
                data: inputVal//文字或语音链接或图片链接
            });

            $scope.inputVal = '';
            //滚动到底部
            $scope.toDown();
            $scope.isForbidden();
            $scope.$applyAsync();

            return false;

            mui.showLoading('正在加载..', 'div');
            $.ajax({
                async: false,
                method: 'post',
                url:$scope.addaUrl + '/rest/chatmessage/sendmessage/wx/' + $scope.accessKey,
                data:{
                    doctorID:$scope.doctorId,
                    userAccountId:$scope.patientId,
                    type:0,
                    data:inputVal,
                    length:''
                },
                success:function (Data) {
                    if(Data.result === 200){
                        $scope.list.push({
                            time: $scope.getTime(),//发送时间
                            avatar: $scope.info.patientAvatan,//头像
                            name: $scope.info.patientName,//发送人姓名
                            role: 1,//0:医生，1:本人
                            type: 0,//0:文字，1:图片，2:语音
                            data: inputVal//文字或语音链接或图片链接
                        });

                        $scope.inputVal = '';
                        //滚动到底部
                        $scope.toDown();
                        $scope.isForbidden();
                        $scope.$applyAsync();
                    }else{
                        mui.toast('提交异常');
                        return false;
                    }

                    mui.hideLoading();
                },
                error:function (err) {
                    console.log(err);
                    mui.toast('提交异常');
                    mui.hideLoading();
                }
            });
        }

    };

    //滚动到底部
    $scope.toDown = function () {
        var height = +($(document).height()) + 100 + 400;
        $('html, body, #chat-down').animate({
            scrollTop: height
        }, 100);
    };

    //获取当前时间
    $scope.getTime = function () {
        function getNow(s) {
            return s < 10 ? '0' + s: s;
        }

        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth()+1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours();       //获取当前小时数(0-23)
        var m = myDate.getMinutes();     //获取当前分钟数(0-59)
        var s = myDate.getSeconds();
        return year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m);
    };

    //过滤音频地址使其可用
    $scope.voiceUrl = function(url){
        return $sce.trustAsResourceUrl(url);
    };

    //播放录音
    $scope.play = function ($event, sound, index) {
        $('.reply-doctor-sound-label').removeClass('reply-doctor-sound-label-false');

        var audioArr = $('audio');

        audioArr.each(function () {
            this.pause();
            if(this.id === 'audio-' + index){

            }else{
                this.className = 'pause';
            }
        });

        var that = document.getElementById('audio-' + index);
        var parent = document.getElementById('audio-parent-' + index);

        parent.className = 'reply-doctor-sound-label reply-doctor-sound-label-false bounceIn animated';

        //var audio = $event.target.childNodes[1];

        if(that.className === 'pause'){
            that.className = 'play';
            that.play();
        }else{
            that.className = 'pause';
            that.pause();
        }

        setTimeout(function () {
            parent.className = 'reply-doctor-sound-label';
        }, 1500);

    };

    //获取用户信息
    $scope.getInfo = function () {
        $scope.info.patientName = '超级赛亚人';
        $scope.info.patientAvatan = '../reply/resources/img/chat/avatar.png';

        return false;

        mui.showLoading('正在加载..', 'div');
        $.ajax({
            async: false,
            method: 'post',
            url: $scope.addaUrl + '/rest/patient/headImg/' + $scope.patientId + '/' + $scope.accessKey,
            data:{
                account:$scope.account,
                openId:$scope.openId
            },
            success:function (Data) {
                var data = Data.data;
                if(data.patientAvatan === '' || data.patientAvatan === null || data.patientAvatan === undefined){
                    $scope.info.patientAvatan = '../reply/resources/img/chat/avatar.png';
                }else{
                    $scope.info.patientAvatan = data.patientAvatan;
                }

                $scope.info.patientName = data.patientName;
                //mui.hideLoading();
            },
            error:function (err) {
                console.log(err);
                mui.toast('获取患者异常');
                mui.hideLoading();
            }
        });
    };

    /*******************************************************方法-end***********************************************************/

    /*******************************************************逻辑-start***********************************************************/
    //初始化数据
    $scope.INIT();

    //获取用户信息
    $scope.getInfo();

    $scope.getFirstPage();

    $scope.initPage();

    //初始化微信SDK
    $scope.initSDK();

    //初始化上传
    $scope.imgUp();

    /*******************************************************逻辑-end***********************************************************/

});