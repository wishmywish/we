/**
*系统升级 提示页面
*/
(function($){  
    
    /**
    *弹出框
    */
    var Alert=function(){
        this._init_.apply(this,arguments);
    }
    Alert.prototype={
        template:'<div class="s-mask"></div><div class="s-alert"><div class="s-alert-content"><div class="s-alert-content-msg"></div><div class="s-alert-button"><span>关闭</span></div></div></div>',
        _init_:function(options){
            this.$element=$(this.template);
            if(options && options.close){
                this._close=true;
            }else{
                this._close=false;
            }
            this._linkDom();
            this._addEvent();
        },
        _linkDom:function(){
            var $element=this.$element;
            this.$sure=$('.s-alert-button',$element);
            this.$msg=$('.s-alert-content-msg',$element);
            if(this._close){
                this.$sure.remove();
            }
        },
        _addEvent:function(){
            var self=this;
            var $element=this.$element;

            this.$sure && this.$sure.on('click',function(){self.hide()});
            //this.$close.on('click',function(){self.hide()});
        },
        hide:function(){
            var $element=this.$element;
            //this.$title.text('');
            this.$msg.text('');
            /*
            *如果用hide 下次show的时候会再次append
            *detach在dom中移除
            *但不会移掉注册的事件
            */
            this.$element.trigger('out');
            this.$element.detach();
        },
        show:function(title,msg){
            if(!msg){
                msg=title;
                title='';
            }
            //this.$title.text(title);
            this.$msg.html(msg);
            $('body').append(this.$element);
        },
        destory:function(){
            this.$element.remove();
        }
    }
    /**
    *判断是否在升级中
    *不在升级中执行callback
    *发生error 默认执行callback
    */
    function isClose(callback){
         $.ajax({
            'type':'get',
            'url':'/WebReg/GlobalMaintainingPrompt?t=' + new Date(),
            "dataType": 'json',
            "contentType": 'application/json; charset=utf-8',
            'success':function(data){
                if(data.success && data.code!='0'){
                    var tip=data.error || "服务器停机维护中，请稍后重试。在此期间给您带来的不便敬请谅解。"
                    var alert=new bone.Alert();
                    alert.show(tip);
                }else{
                    callback();
                }
            },
            'error':function(){
                callback();
            }
        })
    }

    window.bone={'Alert':Alert,'isClose':isClose};

    /*
    *如果是非首页
    *先发送请求 验证是否可注册
    *如果不能注册则弹出提示
    */
    if ( !(/index.html/.test(location.href)) && (/\.html/.test(location.href))  ){
        /**
        *code 为0 表示正常
        *code 非0 表示异常 错误信息在error中
        */
        $.ajax({
            'type':'get',
            'url':'/WebReg/GlobalMaintainingPrompt?t=' + new Date(),
            "dataType": 'json',
            "contentType": 'application/json; charset=utf-8',
            'success':function(data){
                if(data.success && data.code!='0'){
                    var tip=data.error || "服务器停机维护中，请稍后重试。在此期间给您带来的不便敬请谅解。"
                    var alert=new bone.Alert({'close':true});
                    alert.show(tip);
                }
            }
        })
    }
   
})(window.jQuery);

