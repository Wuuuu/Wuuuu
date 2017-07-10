let modal = (function () {
    let $window  = $(window),
        $modal   = $('<div class="modal"/>'),
        $content = $('<div class="modal-content"/>'),
        $close   = $('<button role="button" class="modal-close">close</button>');

    $modal.append($content, $close);

    $close.on('click', function(e){
        e.preventDefault();
        modal.close();
    });

    return {
        center: function() {                        
            var top  = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
            $modal.css({                                
                top:top + $window.scrollTop(),            
                left:left + $window.scrollLeft()          
            });
    },
        open: function(settings) {
            $content.empty().append(settings.content);
            $modal.css({
                width : settings.width || 'auto',
                height: settings.height || 'auto'
            }).fadeIn(700).appendTo('body');

            modal.center();
            $(window).on('resize', modal.center);
        },
        close: function() {
            $content.empty();
            $modal.detach();
            $(window).off('resize', modal.center);
        }
    };
}());