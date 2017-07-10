(function(){
  let $content = $('#share-options').detach();   // 删除modal-options,但是保存副本

  $('#share').on('click', function() {           // 点击打开Modal
    modal.open({content: $content, 
                width  : 300, 
                height : 200});
  });
}());