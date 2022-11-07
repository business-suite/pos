odoo.define('pos.HeaderButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    // Previously HeaderButtonWidget
    // This is the close session button
    class HeaderButton extends PosComponent {
        onClick() {
            this.showPopup('ClosePosPopup');
        }
    }
    HeaderButton.template = 'HeaderButton';

    Registries.Component.add(HeaderButton);

    return HeaderButton;
});
