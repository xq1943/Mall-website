// ui-search
$.fn.uiSearch=function(){
  var ui=$(this);
  $('.ui-search-selected',ui).on('click',function(){
    $('.ui-search-select-list').show();
    return false;
  });
  $('.ui-search-select-list .item',ui).on('click',function(){
    $('.ui-search-selected').text($(this).text());
    $('.ui-search-select-list').hide();
    return false;
  });
  $('body').on('click',function(){
    $('.ui-search-select-list').hide();
    return false;
  });
};


/*
  @param {string} header  tab组件的所有选项卡item
  @param {string} content tab组件内容区域的所有item
  @param {string} focus_prefix  选项卡高亮样式前缀，可选
*/
// content-tab
$.fn.uiTab=function(header,content,focus_prefix){
  var ui=$(this);
  var tabs=$(header,ui);
  var cons=$(content,ui);
  var focus_prefix=focus_prefix || '';

  tabs.on('click',function(){
    var index=$(this).index();
    tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
    cons.hide().eq(index).show();
    return false;
  });
};
//ui-cascading
$.fn.uiCascading=function(){
  var ui=$(this);
  var selects=$('select',ui);
  selects
  .on('change',function(){
    var val=$(this).val();
    var index=selects.index(this);
    //出发下一个select的更新，根据当前的值
    //出发下一个之后的select的初始值（清除不必要的数据项）
    ui.find('select:gt('+(index+1)+')')
      .attr('data-where','')
      .triggerHandler('reloadOptions');
  })
  .on('reloadOption',function(){
    var method=$(this).attr('data-search');
    var data=AjaxRemoteGetDate[method]();
    var select=$(this);
    select.find('option').remove();
    $.each(data,function(i,item){
      var el=$('<option value=""'+item+'>'+item+'</option>');
      select.append(el);
    });
  });
}
//页面的脚本逻辑
$(function(){
  $('.ui-search').uiSearch();
  $('.content-tab').uiTab('.caption>.item','.block>.item');
  $('.content-tab').uiTab('.block-caption>.item','.block-content>.item');
});
