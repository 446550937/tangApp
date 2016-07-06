function Dialog(opt){
    this.title = opt.title;
    this.buttons = opt.buttons;
    this.content = opt.content;
    this._closeBtn = opt.closeBtn;
    this.template = {

    mask : '<div class="ui-mask"></div>',



    wrap :  '<div class="ui-dialog">'+
            '<div class="ui-dialog-content"></div>'+
            '<div class="ui-dialog-btns">'+
            '</div>'+
            '</div>'
    }
    this.init();
    this.initDom();

}
Dialog.prototype = {
    init : function(){
        this._width = $(window).width();
        this._height = $(window).width();
    },
    initDom :function(){
        var btn = [],i = 0,str = '',self = this;
        this.buttons && $.each(this.buttons,function(key,val ){
            btn.push({
                idnex : ++i;
                text : key
            })
        
        })
        btn && $.each(btn,function(key,val){
            str+='<a class="ui-btn ui-btn'+btn[key].index+'"data-key="'+btn[key].text+'">'+btn[key].text+'</a>'
        })
        this.template.wrap = '<div class="ui-dialog">'+
            '<div class="ui-dialog-content"></div>'+
            (this.buttons?'<div class="ui-dialog-btns">'+str+'</div>':"")+
            '</div>'
        this._container = $(this.container || document.body);

        this._wrap = $(this.template.wrap).appendTo(this._container);

        this._closeBtn && $(this.template.close).prependTo(this._wrap);

        this._wrap.on('click',function(e){
            self._eventHandle(e);
        })
        this._mask = $(this.template.mask).appendTo(this._container);

        
    }
}