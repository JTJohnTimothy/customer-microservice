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
   */
  getCustomers: async function (req, res, next) {
    let { page, limit, sortDirection, sortField } = req.query
    const { searchTerm, searchKey } = req.query
    page = Number.isInteger(parseInt(page)) ? parseInt(page) : 1
    limit = Number.isInteger(parseInt(limit)) ? parseInt(limit) : 10
    sortDirection = sortDirection === 'DESC' ? -1 : 1 // default to ASC
    sortField = sortField || 'name'
    // if no key value passed
    const query = {}
    // just add key value again to object for multiple field sort
    const sort = { [sortField]: sortDirection }
    const skip = (limit * (page - 1))
    if (searchKey !== '' || searchTerm !== '') {
      // just use $match with an array of $or with multiple searchKey = searchTerm
      query[searchKey] = { $regex: searchTerm }
    }

    Promise.all([
      // search -> sort -> paginate
      Customer.find(query).sort(sort).skip(skip).limit(limit),
      // get total
      Customer.find().count()
    ]).then(results => {
      const [customers, total] = results
      res.send({
        results: customers,
        pagination: {
          totalItems: total,
          currentPage: page, // page
          pageSize: limit, // limit
          totalPages: Math.ceil(total / limit)
        }
      })
    }).catch(error => next(error))
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
