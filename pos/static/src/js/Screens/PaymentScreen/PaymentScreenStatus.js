odoo.define('pos.PaymentScreenStatus', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class PaymentScreenStatus extends PosComponent {
        get changeText() {
            return this.env.pos.format_currency(this.currentOrder.get_change());
        }
        get totalDueText() {
            return this.env.pos.format_currency(
                this.currentOrder.get_total_with_tax() + this.currentOrder.get_rounding_applied()
            );
        }
        get remainingText() {
            return this.env.pos.format_currency(
                this.currentOrder.get_due() > 0 ? this.currentOrder.get_due() : 0
            );
        }
        get currentOrder() {
            return this.env.pos.get_order();
        }
    }
    PaymentScreenStatus.template = 'PaymentScreenStatus';

    Registries.Component.add(PaymentScreenStatus);

    return PaymentScreenStatus;
});
