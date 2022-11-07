odoo.define('pos.Orderline', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class Orderline extends PosComponent {
        selectLine() {
            this.trigger('select-line', { orderline: this.props.line });
        }
        lotIconClicked() {
            this.trigger('edit-pack-lot-lines', { orderline: this.props.line });
        }
        get addedClasses() {
            return {
                selected: this.props.line.selected,
            };
        }
        get customerNote() {
            return this.props.line.get_customer_note();
        }
    }
    Orderline.template = 'Orderline';

    Registries.Component.add(Orderline);

    return Orderline;
});
