odoo.define('pos.ClientLine', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class ClientLine extends PosComponent {
        get highlight() {
            return this.props.partner !== this.props.selectedClient ? '' : 'highlight';
        }
    }
    ClientLine.template = 'ClientLine';

    Registries.Component.add(ClientLine);

    return ClientLine;
});
