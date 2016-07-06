function Dialog(opt) {
    this.title = opt.title;
    this.content = opt.content;
    this.template = {


        mask: '<div class="ui-mask"></div>',



        wrap: '<div class="ui-dialog">' +
            '<div class="ui-dialog-content"></div>' +
            '<div class="ui-dialog-btns">' +
            '</div>' +
            '</div>'
    }
    this.buttons = opt.buttons;
    this._closeBtn = opt.closeBtn;
    this.init();
    this.initDom();
}
Dialog.prototype = {
    init: function () {
        this._width = $(window).width();
        this._height = $(window).height();
    },
    initDom: function () {
        var btn = [],
            i = 0,
            str = '',
            self = this;
        this.buttons && $.each(this.buttons, function (key, val) {
            btn.push({
                index: ++i,
                text: key
            })
        })
        
        btn && $.each(btn, function (key, val) {
            str += '<a class="ui-btn ui-btn' + btn[key].index + '" data-key="' + btn[key].text + '">' + btn[key].text + '</a>'
        })

        this.template.wrap = '<div class="ui-dialog">' +
            '<div class="ui-dialog-content"></div>' +
            (this.buttons ? '<div class="ui-dialog-btns">' + str + '</div>' : '') +
            '</div>';

        this._container = $(this.container || document.body);

        this._wrap = $(this.template.wrap).appendTo(this._container);

        this._closeBtn && $(this.template.close).prependTo(this._wrap);

        this._wrap.on('click', function (e) {
            self._eventHandle(e);
        })

        this._mask = $(this.template.mask).appendTo(this._container)

        this._titleTxt = $(this.template.title);

        this._contentTxt = $('.ui-dialog-content');

        this._title(this.title);
        
        this._content(this.content);
    },
    _eventHandle: function (e) {
        var self = this;
        if ($(e.target).closest('.ui-dialog-close').length >= 1) {
            self._close();
        } else if ((macth = $(e.target).closest('.ui-btn')) && macth.length) {
            fn = this.buttons[macth.attr('data-key')];
            fn && fn.apply(this, arguments);
            (macth.attr('data-key') == '取消') && self._close();
        }
    },
    _title: function (value) {
        value = (this.title = value) ? '<h3>' + value + '</h3>' : value;
        this._titleTxt.html(value)[value ? 'prependTo' : 'remove'](this._wrap);
    },
    _content: function (val) {
        this._contentTxt.empty().html(val);
    },
    _close: function () {
        this._wrap.remove();
        this._mask.remove();
    }
}