odoo.define('pos.TextInputPopup', function(require) {
    'use strict';

    const { useState, useRef } = owl.hooks;
    const AbstractAwaitablePopup = require('pos.AbstractAwaitablePopup');
    const Registries = require('pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    // formerly TextInputPopupWidget
    class TextInputPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            this.state = useState({ inputValue: this.props.startingValue });
            this.inputRef = useRef('input');
        }
        mounted() {
            this.inputRef.el.focus();
        }
        getPayload() {
            return this.state.inputValue;
        }
    }
    TextInputPopup.template = 'TextInputPopup';
    TextInputPopup.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        title: '',
        body: '',
        startingValue: '',
    };

    Registries.Component.add(TextInputPopup);

    return TextInputPopup;
});
