odoo.define('pos_price.NumberPopupPrice', function(require) {
    'use strict';
    var core = require('web.core');
    var _t = core._t;

    const { useState } = owl;
    const AbstractAwaitablePopup = require('pos.AbstractAwaitablePopup');
    const NumberBuffer = require('pos.NumberBuffer');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('pos.Registries');

    // formerly NumberPopupPriceWidget
    class NumberPopupPrice extends AbstractAwaitablePopup {
        /**
         * @param {Object} props
         * @param {Boolean} props.isPassword Show password popup.
         * @param {number|null} props.startingValue Starting value of the popup.
         * @param {Boolean} props.isInputSelected Input is highlighted and will reset upon a change.
         *
         * Resolve to { confirmed, payload } when used with showPopup method.
         * @confirmed {Boolean}
         * @payload {String}
         */
        constructor() {
            super(...arguments);
            useListener('accept-input', this.confirm);
            useListener('close-this-popup', this.cancel);
            this.trigger('set-numpad-mode', 'discount');
            let startingBuffer = '';
            if (typeof this.props.startingValue === 'number' && this.props.startingValue > 0) {
                startingBuffer = this.props.startingValue.toString().replace('.', this.decimalSeparator);
            }
            this.state = useState({ buffer: startingBuffer, toStartOver: this.props.isInputSelected });
            NumberBuffer.use({
                nonKeyboardInputEvent: 'numpad-click-input',
                triggerAtEnter: 'accept-input',
                triggerAtEscape: 'close-this-popup',
                state: this.state,
            });


        }
        get decimalSeparator() {
            return this.env._t.database.parameters.decimal_point;
        }
        get inputBuffer() {
            if (this.state.buffer === null) {
                return '';
            }
            if (this.props.isPassword) {
                return this.state.buffer.replace(/./g, '•');
            } else {
                return this.state.buffer;
            }
        }

        setMemoryData() {
            $('.recently_value_discount').val($('.popup-input span').text())
        }
        confirm(event) {
            this.setMemoryData()
            if (NumberBuffer.get()) {
                super.confirm();
            }
        }
        cancel() {
            this.setMemoryData();
            this.trigger('close-popup');
        }
        sendInput(key) {
            this.trigger('numpad-click-input', { key });
        }
        discountAmount() {
            $('.discount').removeClass('selected-mode')
            $('.discount_amount').addClass('selected-mode')
            $('.recently_value_discount_type').val('amount')
        }
        discountPercent() {
            $('.discount').removeClass('selected-mode')
            $('.discount_percent').addClass('selected-mode')
            $('.recently_value_discount_type').val('percent')
        }
        getPayload() {
            return NumberBuffer.get();
        }
    }
    NumberPopupPrice.template = 'NumberPopupPrice';
    NumberPopupPrice.defaultProps = {
        confirmText: _t('Ok'),
        cancelText: _t('Cancel'),
        title: _t('Confirm ?'),
        body: '',
        cheap: false,
        startingValue: null,
        isPassword: false,
    };

    Registries.Component.add(NumberPopupPrice);

    return NumberPopupPrice;
});
