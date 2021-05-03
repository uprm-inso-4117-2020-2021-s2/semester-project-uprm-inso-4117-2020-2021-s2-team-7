import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Offer from 'App/Models/Offer'
import supertest from 'supertest'
import { createLevelOfEducation, createOffer, createSubject, createTutor, login } from '../helper/functions'
import { levelOfEducation, offer, subject, tutor, tutor2 } from '../helper/constants'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

test.group('Offer', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.group('/offers - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Get all offers', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdSubject = await createSubject(subject)
      const createdLOE = await createLevelOfEducation(levelOfEducation)
      await createOffer(offer, createdTutor.tid, createdSubject.sid, createdLOE.leid)
      const { body } = await app.get('/offers').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(body, 1)
      const createdTutor2 = await createTutor(tutor2)
      const createdSubject2 = await createSubject({ sname: 'Spanish' })
      const createdLOE2 = await createLevelOfEducation({ lename: 'Graduate' })
      await createOffer(offer, createdTutor2.tid, createdSubject2.sid, createdLOE2.leid)
      const res = await app.get('/offers').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(res.body, 2)
    })
  })

  test.group('/offers - POST', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Creating an offer with incomplete parameters', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const unvalidOffer = Object.assign({}, offer)
      const { body } = await app
        .post('/offers')
        .send(unvalidOffer)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Specify the required parameters to create an Offer.')
    })

    test('Successfully create an offer', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdSubject = await createSubject(subject)
      const createdLOE = await createLevelOfEducation(levelOfEducation)
      const token = await login(createdTutor.email, tutor.password)
      const validOffer = Object.assign({}, offer)
      validOffer['tutor_id'] = createdTutor.tid
      validOffer['subject_id'] = createdSubject.sid
      validOffer['level_of_education_id'] = createdLOE.leid
      const { body } = await app
        .post('/offers')
        .send(validOffer)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Offer created successfully.')
      assert.containsAllKeys(body, ['id'])
      const [createdOffer] = await Offer.all()
      assert.equal(body.id, createdOffer.oid)
    })
  })

  test.group('/offers/:id - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Find non existing offer by id', async (assert) => {
      const { body } = await app.get('/offers/99').expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, 'Offer with id 99 not found.')
    })

    test('Successfully get an offer by id', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdSubject = await createSubject(subject)
      const createdLOE = await createLevelOfEducation(levelOfEducation)
      const createdOffer = await createOffer(
        offer,
        createdTutor.tid,
        createdSubject.sid,
        createdLOE.leid
      )
      const { body } = await app
        .get(`/offers/${createdOffer.oid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.oid, createdOffer.oid)
    })
  })

  test.group('/offers/:id - PUT', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Update non existing offer', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .put(`/offers/99`)
        .send({ modality: 'In person', hourly_rate: 44.99 })
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find Offer with id: 99')
    })

    test('Successfully update offer', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdSubject = await createSubject(subject)
      const createdLOE = await createLevelOfEducation(levelOfEducation)
      const createdOffer = await createOffer(
        offer,
        createdTutor.tid,
        createdSubject.sid,
        createdLOE.leid
      )
      const { body } = await app
        .put(`/offers/${createdOffer.oid}`)
        .send({ modality: 'In person', hourly_rate: 44.99 })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Offer updated successfully.')
      assert.equal(body.offer.oid, createdOffer.oid)
      assert.equal(body.offer.tutor_id, createdTutor.tid)
      assert.equal(body.offer.subject_id, createdSubject.sid)
      assert.equal(body.offer.level_of_education_id, createdLOE.leid)
      assert.equal(body.offer.modality, 'In person')
      assert.equal(body.offer.hourly_rate, 44.99)
    })
  })

  test.group('/offers/:id - DELETE', async (group) => {
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
        .delete(`/offers/99`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find offer with id: 99.')
    })

    test('Successfully delete offer', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdSubject = await createSubject(subject)
      const createdLOE = await createLevelOfEducation(levelOfEducation)
      const createdOffer = await createOffer(
        offer,
        createdTutor.tid,
        createdSubject.sid,
        createdLOE.leid
      )
      const { body } = await app
        .delete(`/offers/${createdOffer.oid}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Offer deleted successfully')
      assert.equal(body.id, createdOffer.oid)
      assert.lengthOf(await Offer.all(), 0)
    })
  })
})
