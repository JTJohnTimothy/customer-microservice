import uuid from 'uuid'
import validation from '../utils/validation'
import Customer from '../models/Customer.js'

export default {
  /**
   * get single customer based on customerId
   * @param {string} req.param.id customerId
   */
  getCustomer: async function (req, res, next) {
    try {
      const customerId = req.params.id
      const customer = await Customer.findOne({ customerId })

      if (!customer) return res.status(404).send({ message: `customer with id ${customerId} does not exists.` })
      res.send(customer)
    } catch (error) {
      return next(error)
    }
  },

  /**
   * get all customers
   * TODO: add search sort pagination
   */
  getCustomers: async function (req, res, next) {
    try {
      const customers = await Customer.find()
      res.send(customers)
    } catch (error) {
      return next(error)
    }
  },

  /**
   * register new customer
   * @param {object} req.body customer object
   */
  registerCustomer: async function (req, res, next) {
    try {
      validation(req, res)

      let customer = await Customer.findOne({ email: req.body.email })
      if (customer) return res.status(409).json({ message: `email ${req.body.email} already exists.` })

      customer = req.body
      customer.customerId = uuid.v4()
      customer = await new Customer(customer).save()
      res.send(customer)
    } catch (error) {
      return next(error)
    }
  },

  /**
   * update customer details
   * @param {string} req.param.id customerId
   */
  updateCustomers: async function (req, res, next) {
    try {
      validation(req, res)

      const customerId = req.params.id
      const customer = await Customer.findOneAndUpdate({ customerId }, req.body, { new: true })
      if (!customer) return res.status(404).json({ message: `customer with id ${customerId} does not exists.` })
      res.send(customer)
    } catch (error) {
      return next(error)
    }
  }
}
