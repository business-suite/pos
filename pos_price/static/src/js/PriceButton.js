odoo.define('pos_price.PriceButton', function (require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const ProductScreen = require('pos.ProductScreen');
    const {useListener} = require('web.custom_hooks');
    const Registries = require('pos.Registries');

    class PriceButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }

        async onClick() {
            var self = this;
            var order = this.env.pos.get_order();
            var lines = order.get_orderlines();
            let selectedLine = order.get_selected_orderline();
            var sv = parseInt($('.recently_value_price').val()) ? parseInt($('.recently_value_price').val()) : selectedLine.get_unit_price()
            const {confirmed, payload} = await this.showPopup('NumberPopupPrice', {
                startingValue: sv,
                isInputSelected: true
            });
            if (confirmed) {
                const val = Math.round(Math.max(0, Math.min(100, parseFloat(payload))));
                await self.apply_price(val);
            }

        }

        async apply_price(pc) {

            var order = this.env.pos.get_order();
            var lines = order.get_orderlines();

            let selectedLine = order.get_selected_orderline();

            selectedLine.set_unit_price(pc);

        }
    }

    PriceButton.template = 'PriceButton';

    ProductScreen.addControlButton({
        component: PriceButton,
        condition: function () {
            return true;
        },
    });


    Registries.Component.add(PriceButton);

    return PriceButton;
});
