/**
 *判断如果是移动端跳转至同路径下的./mob/index.html
 *
暂时辨别不出来 wp平板
**/
(function(){  
    function isMobile(){
        var ua=navigator.userAgent;

        var isMMobile=/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/i.test(ua);
        var isMobile=/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua);
        var isAndroidPad=/Macintosh/i.test(ua);
        return ((isMobile&&!isAndroidPad)||isMMobile);
    }
    //先检测是本域名么
    if(window.location.href.indexOf('baidu.com')>=0){
        window.location.href = 'http://www.51lick.com/index.html';
    }
    if(isMobile()){
        var params=location.href.split('?')[1];
        params=params ? '?'+params :'';
        window.location.href='./mob/index.html'+params;
    }
})();

