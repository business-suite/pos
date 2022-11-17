odoo.define('pos_ask_price', function (require) {
"use strict";
    const PosComponent = require('pos.PosComponent');
    const ProductScreen = require('pos.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('pos.Registries');
    const models = require('pos.models');
    const { useState, useRef } = owl.hooks;
    const AbstractAwaitablePopup = require('pos.AbstractAwaitablePopup');

    models.load_fields('product.product',['ask_for_price']);


    const PosResProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            async _clickProduct(event) {
                var pro = event.detail;
                if(this.env.pos.config.allow_ask_for_price && pro.ask_for_price){
                    const { confirmed, payload } = await this.showPopup('NumberPopup',{
                        title: this.env._t('Price'),
                    });
                    if (confirmed) {
                        var order = this.env.pos.get_order();
                        order.add_product(pro, {merge: false});
                        order.get_selected_orderline().set_unit_price(payload);
                        order.get_selected_orderline().price_manually_set = true;
                    }
                }
                else{
                    return super._clickProduct(event);
                }
            }
        };

    Registries.Component.extend(ProductScreen, PosResProductScreen);
});

