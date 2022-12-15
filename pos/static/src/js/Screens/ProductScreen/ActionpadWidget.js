odoo.define('pos.ActionpadWidget', function (require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    /**
     * @props client
     * @emits click-customer
     * @emits click-pay
     */
    class ActionpadWidget extends PosComponent {

        constructor() {
            super(...arguments);
            this.update();
        }

        get order() {
            return this.env.pos.get_order();
        }

        mounted() {
            this.order.on('change', () => {
                this.update();
                this.render();
            });
            this.order.orderlines.on('change', () => {
                this.update();
                this.render();
            });
        }

        get isLongName() {
            return this.client && this.client.name.length > 10;
        }

        get client() {
            return this.props.client;
        }

        update() {
            this.items_number = this.order ? this.order.orderlines.reduce((items_number, line) => items_number + line.quantity, 0) : 0;
        }
    }

    ActionpadWidget.template = 'ActionpadWidget';
    ActionpadWidget.defaultProps = {
        isActionButtonHighlighted: false,
    }

    Registries.Component.add(ActionpadWidget);

    return ActionpadWidget;
});
