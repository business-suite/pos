# -*- coding: utf-8 -*-



{
    'name': 'POS Quantity',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'sequence': 6,
    'summary': '',
    'description': "",
    'depends': ['pos'],
    'data': [
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
