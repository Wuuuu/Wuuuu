let request,  // 存放最后请求的图片
    $current, // 当前正在显示的图片
    cache   = {}, // 记录已经加载图片的对象
    $frame  = $('#photo-viewer'), // 图片的容器
    $thumbs = $('.thumb'); // 略缩图的容器

function crossfade($img) {           
                                     
  if ($current) {                   
    $current.stop().fadeOut('slow'); 
  }

    $img.css({                         
        marginLeft: -$img.width() / 2,   
        marginTop: -$img.height() / 2    
    });

    $img.stop().fadeTo('slow', 1);     
    
    $current = $img;                   

}

$(document).on('click', '.thumb', function(e){ 
    let $img,                               
        src     = this.href;             
        request = src;                      
    
    e.preventDefault();                     
    
    $thumbs.removeClass('active');      
    $(this).addClass('active');       

    if (cache.hasOwnProperty(src)) {   
        if (cache[src].isLoading === false) {
        crossfade(cache[src].$img);        
        }
    } else {                            
        $img = $('<img/>');                   
        cache[src] = {                 
        $img: $img,                  
        isLoading: true                    
    };

    $img.on('load', function(){
        $img.hide()

        $frame.removeClass('is-loading').append($img);
        cache[src].isLoading = false;

        if (request === src) {
            crossfade($img);           
        }                                   
    });

    $frame.addClass('is-loading');     

    $img.attr({                          
        'src': src,                        
        'alt': this.title || ''             
    });

  }

});

$('.thumb').eq(0).click();                