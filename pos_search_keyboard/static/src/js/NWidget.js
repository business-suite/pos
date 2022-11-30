odoo.define('pos_search_keyboard.NWidget', function (require) {
    // 'use strict';
    const { useState } = owl;
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class NWidget extends PosComponent {
        constructor() {
            super(...arguments);
            this.state = useState({
                status: false,
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
                $('.keyboard__row').show();
                $('.enter-key').show();
                $('.key--space').show();
                this.state.status = true;
            } else {
                $('.keyboard__row').hide();
                $('.enter-key').hide();
                $('.key--space').hide();
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

    NWidget.template = 'NWidget';


    Registries.Component.add(NWidget);

    return NWidget;
});
