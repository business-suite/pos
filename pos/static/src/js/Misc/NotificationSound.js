odoo.define('pos.NotificationSound', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class NotificationSound extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('ended', () => (this.props.sound.src = null));
        }
    }
    NotificationSound.template = 'NotificationSound';

    Registries.Component.add(NotificationSound);

    return NotificationSound;
});
