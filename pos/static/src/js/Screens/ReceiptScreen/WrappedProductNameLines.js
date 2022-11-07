odoo.define('pos.WrappedProductNameLines', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class WrappedProductNameLines extends PosComponent {
        constructor() {
            super(...arguments);
            this.line = this.props.line;
        }
    }
    WrappedProductNameLines.template = 'WrappedProductNameLines';

    Registries.Component.add(WrappedProductNameLines);

    return WrappedProductNameLines;
});
