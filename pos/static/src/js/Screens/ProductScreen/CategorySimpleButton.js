odoo.define('pos.CategorySimpleButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class CategorySimpleButton extends PosComponent {}
    CategorySimpleButton.template = 'CategorySimpleButton';

    Registries.Component.add(CategorySimpleButton);

    return CategorySimpleButton;
});
