odoo.define('pos_discount.QuantityButton', function (require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const ProductScreen = require('pos.ProductScreen');
    const {useListener} = require('web.custom_hooks');
    const Registries = require('pos.Registries');

    class QuantityButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }

        async onClick() {
            var self = this;
            var type = $('.recently_value_discount_type').val();
            var sv = parseInt($('.recently_value_discount').val()) ? parseInt($('.recently_value_discount').val()) : this.env.pos.config.discount_pc
            const {confirmed, payload} = await this.showPopup('NumberPopupQuantity', {
                title: type,
                startingValue: sv,
                isInputSelected: true
            });
            if (confirmed) {
                const val = Math.round(Math.max(0, Math.min(100, parseFloat(payload))));
                await self.apply_discount(val);
            }

        }

        async apply_discount(pc) {

            var order = this.env.pos.get_order();
            var lines = order.get_orderlines();

            let selectedLine = order.get_selected_orderline();

            const result = selectedLine.set_quantity(pc);
                    if (!result) NumberBuffer.reset();

                    return;

            var product = this.env.pos.db.get_product_by_id(this.env.pos.config.discount_product_id[0]);
            if (product === undefined) {
                await this.showPopup('ErrorPopup', {
                    title: this.env._t("No discount product found"),
                    body: this.env._t("The discount product seems misconfigured. Make sure it is flagged as 'Can be Sold' and 'Available in Point of Sale'."),
                });
                return;
            }

            // Remove existing discounts
            for (const line of lines) {
                if (line.get_product() === product) {
                    order.remove_orderline(line);
                }
            }

            // Add discount
            // We add the price as manually set to avoid recomputation when changing customer.
            var base_to_discount = order.get_total_without_tax();
            if (product.taxes_id.length) {
                var first_tax = this.env.pos.taxes_by_id[product.taxes_id[0]];
                if (first_tax.price_include) {
                    base_to_discount = order.get_total_with_tax();
                }
            }
            var discount = "";
            if($('.recently_value_discount_type').val() == 'percent') {
                discount = -pc / 100.0 * base_to_discount
            } else {
                discount = -pc;
            }


            if (discount < 0) {
                order.add_product(product, {
                    price: discount,
                    lst_price: discount,
                    extras: {
                        price_manually_set: true,
                    },
                });
            }

        }
    }

    QuantityButton.template = 'QuantityButton';

    ProductScreen.addControlButton({
        component: QuantityButton,
        condition: function () {
            return true;
        },
    });


    Registries.Component.add(QuantityButton);

    return QuantityButton;
});
