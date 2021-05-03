import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import supertest from 'supertest'
import { createAddress, createTutor, login } from '../helper/functions'
import { address, tutor, tutor2 } from '../helper/constants'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

test.group('Address', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.group('/address - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Get all addresses', async (assert) => {
      const createdTutor = await createTutor(tutor)
      await createAddress(address, createdTutor.tid)
      const { body } = await app.get('/addresses').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(body, 1)
      const createdTutor2 = await createTutor(tutor2)
      await createAddress(address, createdTutor2.tid)
      const res = await app.get('/addresses').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(res.body, 2)
    })
  })

  test.group('/address - POST', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Creating an address with incomplete parameters', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const unvalidAddress = Object.assign({}, address)
      const { body } = await app
        .post('/addresses')
        .send(unvalidAddress)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Specify the required parameters to create a Address')
    })

    test('Successfully create an address', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const validAddress = Object.assign({}, address)
      validAddress['tutor_id'] = createdTutor.tid
      const { body } = await app
        .post('/addresses')
        .send(validAddress)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Address created successfully.')
      assert.containsAllKeys(body, ['id'])
      const [createdAddress] = await Address.all()
      assert.equal(body.id, createdAddress.aid)
    })
  })

  test.group('/address/:id - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Find non existing address by id', async (assert) => {
      const { body } = await app.get('/addresses/99').expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, 'Address with id 99 not found.')
    })

    test('Successfully get an address by id', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdAddress = await createAddress(address, createdTutor.tid)
      const { body } = await app
        .get(`/addresses/${createdAddress.aid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.aid, createdAddress.aid)
    })
  })

  test.group('/address/:id - PUT', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Update non existing address', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .put(`/addresses/99`)
        .send({ astreet1: 'Mi otra casa', astreet2: 'la del campo' })
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find Address with id: 99')
    })

    test('Successfully update address', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdAddress = await createAddress(address, createdTutor.tid)
      const { body } = await app
        .put(`/addresses/${createdAddress.aid}`)
        .send({ astreet1: 'Mi otra casa', astreet2: 'la del campo' })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Address updated successfully.')
      assert.equal(body.address.aid, createdAddress.aid)
      assert.equal(body.address.tutor_id, createdTutor.tid)
      assert.equal(body.address.a_street_1, 'Mi otra casa')
      assert.equal(body.address.a_street_2, 'la del campo')
    })
  })

  test.group('/address/:id - DELETE', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Delete non existing address', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .delete(`/addresses/99`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find address with id: 99.')
    })

    test('Successfully delete address', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdAddress = await createAddress(address, createdTutor.tid)
      const { body } = await app
        .delete(`/addresses/${createdAddress.aid}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Address deleted successfully')
      assert.equal(body.id, createdAddress.aid)
      assert.lengthOf(await Address.all(), 0)
    })
  })
})
