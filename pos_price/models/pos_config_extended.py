from odoo import models, fields


class PosConfig(models.Model):
    _inherit = 'pos.config'

    restrict_price_control = fields.Boolean(string='Restrict Price Modifications')
    allow_ask_for_price = fields.Boolean("Allow Ask For Price", default=True)


class ProductProduct(models.Model):
    _inherit = "product.product"

    ask_for_price = fields.Boolean("Ask For Price")