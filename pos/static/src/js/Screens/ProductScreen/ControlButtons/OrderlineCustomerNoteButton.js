odoo.define('pos.OrderlineCustomerNoteButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const ProductScreen = require('pos.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('pos.Registries');

    class OrderlineCustomerNoteButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        async onClick() {
            const selectedOrderline = this.env.pos.get_order().get_selected_orderline();
            if (!selectedOrderline) return;

            const { confirmed, payload: inputNote } = await this.showPopup('TextAreaPopup', {
                startingValue: selectedOrderline.get_customer_note(),
                title: this.env._t('Add Customer Note'),
            });

            if (confirmed) {
                selectedOrderline.set_customer_note(inputNote);
            }
        }
    }
    OrderlineCustomerNoteButton.template = 'OrderlineCustomerNoteButton';

    ProductScreen.addControlButton({
        component: OrderlineCustomerNoteButton,
        condition: function() {
            return this.env.pos.config.iface_orderline_customer_notes;
        },
    });

    Registries.Component.add(OrderlineCustomerNoteButton);

    return OrderlineCustomerNoteButton;
});
