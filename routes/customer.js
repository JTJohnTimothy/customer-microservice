import express from 'express'
import { body } from 'express-validator'
import customerController from '../controllers/customer.js'

// TODO: refactor input validation on param body and query
export default function () {
  const customerRouter = express.Router()
  const { getCustomer, getCustomers, registerCustomer, updateCustomers } = customerController

  // get 1
  customerRouter.get('/:id', [], getCustomer)

  // get all with search, sorting and pagination
  customerRouter.get('/', [], getCustomers)

  // register customers
  customerRouter.post('/', [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Input is not an email')
  ], registerCustomer)

  // update customer details
  customerRouter.put('/:id', [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Input is not an email')
  ], updateCustomers)

  return customerRouter
}
