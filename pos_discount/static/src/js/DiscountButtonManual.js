odoo.define('pos_discount.DiscountButtonManual', function (require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const ProductScreen = require('pos.ProductScreen');
    const {useListener} = require('web.custom_hooks');
    const Registries = require('pos.Registries');
    const NumpadWidget = require('pos.NumpadWidget')

    class DiscountButtonManual extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
            this.trigger('set-numpad-mode', 'discount');
        }

        async onClick() {
            var self = this;
            var type = $('.recently_value_discount_type').val();
            var sv = parseInt($('.recently_value_discount').val()) ? parseInt($('.recently_value_discount').val()) : this.env.pos.config.discount_pc
            const {confirmed, payload} = await this.showPopup('NumberPopupDiscountManual', {
                title: type,
                startingValue: sv,
                isInputSelected: true
            });
            this.trigger('set-numpad-mode', 'discount');
            if (confirmed) {
                const val = Math.round(Math.max(0, Math.min(100, parseFloat(payload))));
                await self.apply_discount(val);
            }

        }

        async apply_discount(pc) {


            // this.trigger('set-numpad-mode', 'discount');
            // let { buffer } = event.detail;
            //     let val = buffer === null ? 'remove' : buffer;
            //     console.log(val)
            //     this._setValue(123);


            if (this.env.pos.config.iface_customer_facing_display) {
                this.env.pos.send_current_order_to_customer_facing_display();
            }


            var order = this.env.pos.get_order();

            let selectedLine = order.get_selected_orderline();
            var discount = "";
            if ($('.recently_value_discount_type').val() == 'percent') {
                discount = pc;
                selectedLine.set_discount(discount,selectedLine.get_unit_display_price())
            } else {
                discount = pc / selectedLine.get_unit_display_price() * 100 ;
                selectedLine.set_discount(discount,selectedLine.get_unit_display_price(),'amount')
            }

        }
    }

    DiscountButtonManual.template = 'DiscountButtonManual';

    ProductScreen.addControlButton({
        component: DiscountButtonManual,
        condition: function () {
            return this.env.pos.config.module_pos_discount && this.env.pos.config.discount_product_id;
        },
    });


    Registries.Component.add(DiscountButtonManual);

    return DiscountButtonManual;
});
