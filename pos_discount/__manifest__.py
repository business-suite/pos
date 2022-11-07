# -*- coding: utf-8 -*-



{
    'name': 'Point of Sale Discounts',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'sequence': 6,
    'summary': 'Simple Discounts in the Point of Sale ',
    'description': """

This module allows the cashier to quickly give percentage-based
discount to a customer.

""",
    'depends': ['pos'],
    'data': [
        'views/pos_config_views.xml',
        'views/pos_discount_views.xml',
    ],
    'installable': True,
    'assets': {
        'pos.assets': [
            'pos_discount/static/src/css/pos_discount.css',
            'pos_discount/static/src/js/**/*',
        ],
        'web.assets_qweb': [
            'pos_discount/static/src/xml/**/*',
        ],
    },
    'license': 'LGPL-3',
}
