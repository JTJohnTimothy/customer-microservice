/* eslint-env node, mocha */
import { expect } from 'chai'
const request = require('supertest')('http://0.0.0.0:3000')
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
    const route = '/api/v1/customers'
    it('should return registered customer details', (done) => {
      request
        .post(route)
        .send(req.body)
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(200)
          expect(res.body.email).to.equal(req.body.email)
          done()
        })
    })

    it('should return customer already exists', (done) => {
      request
        .post(route)
        .send(req.body)
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(409)
          done()
        })
    })

    it('should return email field validations', (done) => {
      request
        .post(route)
        .send({
          ...req.body,
          email: ''
        })
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(400)
          done()
        })
    })
  })

  describe('Get Customer', () => {
    it('should return a Customer', (done) => {
      // TODO: create route param to be more flexible
      const route = '/api/v1/customers/5e5f59d8-2994-4350-9d62-4eab697ab47f'
      request
        .get(route)
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(200)
          done()
        })
    })

    it('should return no customer', (done) => {
      const route = '/api/v1/customers/123'
      request
        .get(route)
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(404)
          done()
        })
    })
  })

  describe('Get All Customers', () => {
    it('should return Customers', (done) => {
      const route = '/api/v1/customers/'
      request
        .get(route)
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(200)
          done()
        })
    })
  })

  describe('Update Customer Details', () => {
    it('should return updated customer details', (done) => {
      // TODO: create route param to be more flexible
      const route = '/api/v1/customers/5e5f59d8-2994-4350-9d62-4eab697ab47f'
      const mobileNo = '0999999998'
      request
        .put(route)
        .send({
          ...req.body,
          mobileNo
        })
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(200)
          expect(res.body.mobileNo).to.equal(mobileNo)
          done()
        })
    })

    it('should return customer does not exist', (done) => {
      const route = '/api/v1/customers/123'
      request
        .put(route)
        .send(req.body)
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(404)
          done()
        })
    })

    it('should return email field validations', (done) => {
      const route = '/api/v1/customers/5e5f59d8-2994-4350-9d62-4eab697ab47f'
      request
        .put(route)
        .send({
          ...req.body,
          email: ''
        })
        .set('Accept', 'application/json')
        .set('authorization', jwt)
        .end((err, res) => {
          if (err) console.log(err)

          expect(res.status).to.equal(400)
          done()
        })
    })
  })
})
