/*!
 */


;(function ( $, window, document, undefined ) {
    var pluginName = "loadingBar",
        defaults = {
            fixed: false
        };

    // The actual plugin constructor
    function LoadingBar( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        this.startProcessing = false;
        this.stopProcessing = false;

        this._defaults = defaults;
        this._name = pluginName;

        this._init();
    }

    LoadingBar.prototype = {

        _init: function() {
            $(this.element).addClass('youtube-loadingbar-wrapper');
            if (this.options.fixed) {
                $(this.element).addClass('youtube-loadingbar-wrapper-fixed');
            }
        },

        start: function() {
            if (this.startProcessing) {
                return;
            }
            this.startProcessing = true;

            $(this.element).css({opacity: 1});
            this.$progressDiv  = $('<div />');
            this.$progressDiv.addClass('youtube-loadingbar').append($("<dt/><dd/>"));
            $(this.element).append(this.$progressDiv)
            this.$progressDiv.addClass('waiting')
            this.$progressDiv.width((50 + Math.random() * 30) + "%");
        },

        stop: function() {
            if (this.stopProcessing || this.startProcessing == false) {
                return;
            }
            this.stopProcessing = true;

            this.$progressDiv.width("101%");
            var that = this;
            setTimeout(
                function() {
                    $(that.element).animate({opacity: 0}, 200, function() {
                        $('.youtube-loadingbar', that.element).remove();
                        that.stopProcessing = false;
                        that.startProcessing = false;
                    })
                }, 360);
        }
    };

    $.fn['loadingBar'] = function ( options ) {
        return this.each(function () {
            var data    = $.data(this, "plugin_" + pluginName)
            if (!data) {
                $.data(this, "plugin_" + pluginName,
                    new LoadingBar( this, options ));
            } else {
                $.data(this, "plugin_" + pluginName);
            }
            if (typeof options == 'string') {
                data[options]()
            }
        });
    };

})( jQuery, window, document );