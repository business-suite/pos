odoo.define('pos.ReprintReceiptButton', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class ReprintReceiptButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this._onClick);
        }
        async _onClick() {
            if (!this.props.order) return;
            this.showScreen('ReprintReceiptScreen', { order: this.props.order });
        }
    }
    ReprintReceiptButton.template = 'ReprintReceiptButton';
    Registries.Component.add(ReprintReceiptButton);

    return ReprintReceiptButton;
});
