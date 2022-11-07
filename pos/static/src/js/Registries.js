odoo.define('pos.Registries', function(require) {
    'use strict';

    /**
     * This definition contains all the instances of ClassRegistry.
     */

    const ComponentRegistry = require('pos.ComponentRegistry');

    return { Component: new ComponentRegistry() };
});
