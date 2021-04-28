import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Tutor from 'App/Models/Tutor'
// import { BASE_URL } from '../japaFile'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

const tutor = {
  email: 'juan.delpueblo@upr.edu',
  password: 'colegio2021',
  password_confirmation: 'colegio2021',
  tfirst_name: 'Juan',
  tlast_name: 'Pueblo',
  tphone: '7874445555',
  tnationality: 'Espana',
  tage: 23,
  tsummary: 'Soy Juan',
  toverview: 'Soy Juan del Pueblo',
  tweekdays_day: true,
  tweekends: true,
}

const tutor2 = {
  email: 'juan.delpueblo@upr.edu',
  password: 'colegio2021',
  tfirst_name: 'Juan',
  tlast_name: 'Pueblo',
  tphone: '7874445555',
  tnationality: 'Espana',
  tage: 23,
  tsummary: 'Soy Juan',
  toverview: 'Soy Juan del Pueblo',
  tweekdays_day: true,
  tweekends: true,
}

const message = {
  mmodality: 'Online',
  mmessage: 'Can you help me with math?',
  mphone: '78744455555',
  memail: 'juan.delpueblo@upr.edu',
}

test.group('Tutor creation', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Register tutor', async (assert) => {
    try {
      const { body } = await app
        .post('/register')
        .send(tutor)
        .expect(201)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Tutor registered successfully.')
      assert.equal(body.tutor.email, tutor.email)
      assert.doesNotHaveAnyKeys(body.tutor, ['password'])
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  test('Gets tutor successfully', async (assert) => {
    const createdTutor = await Tutor.create(tutor2)
    try {
      const { body } = await app
        .get(`/tutors/${createdTutor.tid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.tid, createdTutor.tid)
      assert.equal(body.fullName, `${createdTutor.tFirstName} ${createdTutor.tLastName}`)
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  test('Throws 404 error, tutor not found', async (assert) => {
    try {
      const { body } = await app.get('/tutors/99').expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, '')
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  test('Tutor not created, need more information', async (assert) => {
    await app.post('/register').send({ email: 'juan.delpueblo@upr.edu' }).expect(422)
  })

  test('Creates message successfully', async (assert) => {
    await app.post('/messages').send(message).expect(201)
  })

  test('Message not created, need more information', async (assert) => {
    await app.post('/tutorFinder/messages').send({ mmodality: 'Online' }).expect(400)
  })

  test('Gets message successfully', async (assert) => {
    await app.get('/tutorFinder/messages/1').expect(200)
  })

  test('Throws 404 error, message not found', async (assert) => {
    await app.get('/tutorFinder/messages/99').expect(404)
  })
})
