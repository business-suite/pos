odoo.define('pos.ProductList', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class ProductList extends PosComponent {}
    ProductList.template = 'ProductList';

    Registries.Component.add(ProductList);

    return ProductList;
});
