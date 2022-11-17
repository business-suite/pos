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
    'data': [
      'views/pos_config_view.xml'
    ],
    'assets': {
        'pos.assets': [
            'pos_price/static/src/js/**/*',
        ],
        'web.assets_qweb': [
            'pos_price/static/src/xml/**/*',
        ],
    },
    'license': 'LGPL-3',
}
