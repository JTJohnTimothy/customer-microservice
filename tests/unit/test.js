// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
/* eslint-env node, mocha */
import { expect } from 'chai'
import sinon from 'sinon'
import app from '../../server.js'
import Customer from '../../models/Customer.js'
const request = require('supertest')(app)
const jwt = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.fsBWyoY2cuBiQbYxSRz9_hYy9RQIzSYGc4aa-gkA3-o'

describe('Customer Controller', () => {
  /**
   * default values Customer Controller
   */
  // TODO: randomize values for validated fields
  const req = {
    body: {
      firstName: 'John',
      middleName: 'Timothy',
      lastName: 'Ama',
      birthDate: '05/13/1989',
      occupation: 'Software Engineer',
      email: 'johntimothyama@gmail.com',
      gender: 'Male',
      mobileNo: '202-555-0109',
      address: '85 Bridge St. Park Ridge, IL 60068',
      maritalStatus: 'Married'
    },
    params: {
      id: 'c8a5adf5-f733-4176-a6bd-e9c8a5cfd424'
    }
  }

  describe('Register Customer', () => {
    it('should return registered customer details', (done) => {
      done()
    })

    it('should return customer already exists', (done) => {
      done()
    })

    it('should return email field validations', (done) => {
      done()
    })
  })

  describe('Get Customer', () => {
    it('should return a Customer', (done) => {
      sinon.stub(Customer, 'findOne').resolves(req.body)

      // TODO: create route param to be more flexible
      const route = '/api/v1/customers/5e5f59d8-2994-4350-9d62-4eab697ab47f'
      request
        .get(route)
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(200)
          Customer.findOne.restore()
          done()
        })
    })

    it('should return no customer', (done) => {
      sinon.stub(Customer, 'findOne').resolves(null)

      const route = '/api/v1/customers/123'
      request
        .get(route)
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(404)
          Customer.findOne.restore()
          done()
        })
    })
  })

  describe('Get All Customers', () => {
    it('should return customers', (done) => {
      done()
    })
  })

  describe('Get All Customers', () => {
    it('should return updated customer details', (done) => {
      done()
    })

    it('should return customer does not exist', (done) => {
      done()
    })

    it('should return email field validations', (done) => {
      done()
    })
  })
})
