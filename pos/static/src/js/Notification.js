odoo.define('pos.Notification', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class Notification extends PosComponent {
        constructor() {
            super(...arguments)
            useListener('click', this.closeNotification);
        }
        mounted() {
            setTimeout(() => {
                this.closeNotification();
            }, this.props.duration)
        }
    }
    Notification.template = 'Notification';

    Registries.Component.add(Notification);

    return Notification;
});
