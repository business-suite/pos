# -*- coding: utf-8 -*-



{
    'name': 'POS Quantity',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'sequence': 6,
    'summary': '',
    'description': "",
    'depends': ['pos'],
    'installable': True,
    'assets': {
        'pos.assets': [
            'pos_quantity/static/src/js/**/*',
        ],
        'web.assets_qweb': [
            'pos_quantity/static/src/xml/**/*',
        ],
    },
    'license': 'LGPL-3',
}
