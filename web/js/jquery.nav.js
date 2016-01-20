; (function ($) {
    $.fn.extend({
        "nav": function (con) {
            var $this = $(this), 
                $nav = $this.find('.switch-tab'), 
                t = (con && con.t) || 5000, a = (con && con.a) || 500, 
                i = 1, 
                st,
                autoChange = function () {
                    clearTimeout(st);
                    $nav.find('a:eq(' + i + ')').addClass('current').siblings().removeClass('current');

                    $this.find('.event-item:eq(' + i + ')').css({
                        display: 'block',
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, a, function () {
                        i = i + 1 === 4 ? 0 : i + 1;
                    }).siblings('.event-item').css({
                        display: 'none',
                        opacity: 0
                    });

                    $this.find('.event-tag-num').hide();
                    $this.find('.event-tag-'+(i+1)).css({
                        display:'block',
                        opacity:0
                    }).animate({opacity:1},a);

                    
                    st=setTimeout(autoChange,t);
                };
                st= setTimeout(autoChange,t);
                //st = setInterval(autoChange, t);
                
                $this.hover(function () {
                    clearTimeout(st);
                    return false;
                }, function () {
    		        clearTimeout(st);
                    st = setTimeout(autoChange, t);
                    return false;
                })
                
                $this.find('.switch-tab>a').on('click', function () {
                    i = $(this).index();
                    autoChange();
                    return false;
                })

                return $this;
        }
    });
}(jQuery));