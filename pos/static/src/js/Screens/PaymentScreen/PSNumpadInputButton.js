odoo.define('pos.PSNumpadInputButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class PSNumpadInputButton extends PosComponent {
        get _class() {
            return this.props.changeClassTo || 'input-button number-char';
        }
    }
    PSNumpadInputButton.template = 'PSNumpadInputButton';

    Registries.Component.add(PSNumpadInputButton);

    return PSNumpadInputButton;
});
