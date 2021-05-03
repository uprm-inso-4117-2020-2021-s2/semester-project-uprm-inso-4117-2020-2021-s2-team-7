import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Subject from 'App/Models/Subject'
import supertest from 'supertest'
import { createSubject, createTutor, login } from '../helper/functions'
import { subject, subject2, tutor } from '../helper/constants'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

test.group('Subject', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.group('/subjects - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Get all subjects', async (assert) => {
      await createSubject(subject)
      const { body } = await app.get('/subjects').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(body, 1)
      await createSubject(subject2)
      const res = await app.get('/subjects').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(res.body, 2)
    })
  })

  test.group('/subjects - POST', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Creating a subject with incomplete parameters', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const unvalidSubject = Object.assign({}, subject)
      // @ts-ignore
      delete unvalidSubject.sname
      const { body } = await app
        .post('/subjects')
        .send(unvalidSubject)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Specify the required parameters to create a Subject')
    })

    test('Successfully create a subject', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .post('/subjects')
        .send(subject)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Subject created successfully.')
      assert.containsAllKeys(body, ['id'])
      const [createdSubject] = await Subject.all()
      assert.equal(body.id, createdSubject.sid)
    })
  })

  test.group('/subjects/:id - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Find non existing subject by id', async (assert) => {
      const { body } = await app.get('/subjects/99').expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, 'Subject with id 99 not found.')
    })

    test('Successfully get a subject by id', async (assert) => {
      const createdSubject = await createSubject(subject)
      const { body } = await app
        .get(`/subjects/${createdSubject.sid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.sid, createdSubject.sid)
    })
  })

  test.group('/subjects/:id - PUT', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Update non existing subject', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .put(`/subjects/99`)
        .send({ sname: 'Engineering' })
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find Subject with id: 99')
    })

    test('Successfully update subject', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdSubject = await createSubject(subject)
      const { body } = await app
        .put(`/subjects/${createdSubject.sid}`)
        .send({ sname: 'Engineering' })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Subject updated successfully.')
      assert.equal(body.subject.sid, createdSubject.sid)
      assert.equal(body.subject.s_name, 'Engineering')
    })
  })

  test.group('/subjects/:id - DELETE', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Delete non existing subject', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const { body } = await app
        .delete(`/subjects/99`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find subject with id: 99.')
    })

    test('Successfully delete subject', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const token = await login(createdTutor.email, tutor.password)
      const createdSubject = await createSubject(subject)
      const { body } = await app
        .delete(`/subjects/${createdSubject.sid}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Subject deleted successfully')
      assert.equal(body.id, createdSubject.sid)
      assert.lengthOf(await Subject.all(), 0)
    })
  })
})
