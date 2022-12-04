odoo.define('pos_search_keyboard.keyboardWidget', function (require) {
    // 'use strict';
    const { useState } = owl;
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class KeyboardWidget extends PosComponent {
        constructor() {
            super(...arguments);
            this.state = useState({
                status: false,
                exist: true
            });
        }

        sendInput(key) {
            let str = $('.tti').val();
            if (key !== 'Enter') {
                if (str !== undefined) {
                    str = $('.tti').val() + key;
                } else {
                    str = key
                }
                $('.tti').val(str);
                this.trigger('update-search', str);
            }

            if (key === 'Enter') {
                this.trigger('try-add-product', str);
            }
        }

        togglePane() {
            if (!$(".tti")[0]) {
                this.trigger('toggle-mobile-searchbar');
            }
            if ($('.enter').is(":hidden")) {
                $('.key--space').show();
                $('.key--letter').show();
                $('.toggle_button').show();
                $('.product-list-container').css('z-index',0);
                this.state.status = true;
            } else {
                $('.key--space').hide();
                $('.key--letter').hide();
                $('.toggle_button').show();
                $('.toggle_button').css('z-index',99999);
                $('.product-list-container').css('z-index',999);
                this.state.status = false;
            }
        }

        backDelete() {
            let str = $('.tti').val();
            if (str) {
                str = str.substring(0, str.length - 1);
                $('.tti').val(str);
                 this.trigger('update-search', str);
            }
        }

    }

    KeyboardWidget.template = 'KeyboardWidget';


    Registries.Component.add(KeyboardWidget);

    return KeyboardWidget;
});
