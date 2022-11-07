odoo.define('pos.SyncNotification', function(require) {
    'use strict';

    const { useState } = owl;
    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    // Previously SynchNotificationWidget
    class SyncNotification extends PosComponent {
        constructor() {
            super(...arguments);
            const synch = this.env.pos.get('synch');
            this.state = useState({ status: synch.status, msg: synch.pending });
        }
        mounted() {
            this.env.pos.on(
                'change:synch',
                (pos, synch) => {
                    this.state.status = synch.status;
                    this.state.msg = synch.pending;
                },
                this
            );
        }
        willUnmount() {
            this.env.pos.on('change:synch', null, this);
        }
        onClick() {
            this.env.pos.push_orders(null, { show_error: true });
        }
    }
    SyncNotification.template = 'SyncNotification';

    Registries.Component.add(SyncNotification);

    return SyncNotification;
});
