import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Message from 'App/Models/Message'
import supertest from 'supertest'
import { createMessage, createTutor } from '../helper/functions'
import { message, tutor, tutor2 } from '../helper/constants'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

test.group('Message', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.group('/messages - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Get all messages', async (assert) => {
      const createdTutor = await createTutor(tutor)
      await createMessage(message, createdTutor.tid)
      const { body } = await app.get('/messages').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(body, 1)
      const createdTutor2 = await createTutor(tutor2)
      await createMessage(message, createdTutor2.tid)
      const res = await app.get('/messages').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(res.body, 2)
    })
  })

  test.group('/messages - POST', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Creating a message with incomplete parameters', async (assert) => {
      const unvalidMessage = Object.assign({}, message)
      const { body } = await app
        .post('/messages')
        .send(unvalidMessage)
        .expect(400)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Specify the required parameters to create a Message')
    })

    test('Successfully create a message', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const validMessage = Object.assign({}, message)
      validMessage['tutor_id'] = createdTutor.tid
      const { body } = await app
        .post('/messages')
        .send(validMessage)
        .expect(201)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Message created successfully.')
      assert.containsAllKeys(body, ['id'])
      const [createdMessage] = await Message.all()
      assert.equal(body.id, createdMessage.mid)
    })
  })

  test.group('/messages/:id - GET', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Find non existing message by id', async (assert) => {
      const { body } = await app.get('/messages/99').expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, 'Message with id 99 not found.')
    })

    test('Successfully get a message by id', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdMessage = await createMessage(message, createdTutor.tid)
      const { body } = await app
        .get(`/messages/${createdMessage.mid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.mid, createdMessage.mid)
    })
  })

  test.group('/messages/:id - PUT', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Update non existing message', async (assert) => {
      const { body } = await app
        .put(`/messages/99`)
        .send({ mmodality: 'In person', mphone: '7875554444' })
        .expect(404)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find Message with id: 99')
    })

    test('Successfully update message', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdMessage = await createMessage(message, createdTutor.tid)
      const { body } = await app
        .put(`/messages/${createdMessage.mid}`)
        .send({ mmodality: 'In person', mphone: '7875554444' })
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Message updated successfully.')
      assert.equal(body.mmessage.mid, createdMessage.mid)
      assert.equal(body.mmessage.tutor_id, createdTutor.tid)
      assert.equal(body.mmessage.m_modality, 'In person')
      assert.equal(body.mmessage.m_phone, '7875554444')
    })
  })

  test.group('/messages/:id - DELETE', async (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Delete non existing message', async (assert) => {
      const { body } = await app.delete(`/messages/99`).expect(404).expect('Content-Type', /json/)
      assert.equal(body.message, 'Could not find message with id: 99.')
    })

    test('Successfully delete message', async (assert) => {
      const createdTutor = await createTutor(tutor)
      const createdMessage = await createMessage(message, createdTutor.tid)
      const { body } = await app
        .delete(`/messages/${createdMessage.mid}`)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Message deleted successfully')
      assert.equal(body.id, createdMessage.mid)
      assert.lengthOf(await Message.all(), 0)
    })
  })
})
