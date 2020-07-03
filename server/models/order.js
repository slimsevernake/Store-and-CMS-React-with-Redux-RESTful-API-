const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class Order {
  static table = 'orders'

  static properties = {
    city_id: { type: 'integer' },
    customer_id: { type: 'integer' },
    complete: { type: 'boolean' },
    steps: { type: "object" },
    products: { type: "object" }
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'customer_id',
        'complete',
        'steps',
        'products'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { products, steps, ...properties } } = this
    return {
      type,
      properties: {
        all,
        ...properties
      }
    }
  }

  static get updateSchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      properties
    }
  }
}

module.exports = {
  Order
}