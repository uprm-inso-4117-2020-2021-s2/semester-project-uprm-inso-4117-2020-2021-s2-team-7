import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import Tutor from 'App/Models/Tutor'
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
  tage: 23,
  tsummary: 'Soy Juan',
  toverview: 'Soy Juan del Pueblo',
  tweekdays_day: true,
  tweekends: true,
}

const tutor2 = {
  email: 'pueblo.deljuan@upr.edu',
  password: 'colegio2021',
  tfirst_name: 'Pueblo',
  tlast_name: 'Juan',
  tphone: '7874445555',
  tage: 23,
  tsummary: 'Soy Juan',
  toverview: 'Soy Juan del Pueblo',
  tweekdays_day: true,
  tweekends: true,
}

const tutorLogin = {
  email: 'juan.delpueblo@upr.edu',
  password: 'colegio2021',
}

const tutor2Login = {
  email: 'pueblo.deljuan@upr.edu',
  password: 'colegio2021',
}

const message = {
  mmodality: 'Online',
  mmessage: 'Can you help me with math?',
  mphone: '78744455555',
  memail: 'juan.delpueblo@upr.edu',
}

test.group('Tutor', async (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.group('/register - Register tutor', (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Incomplete information', async (assert) => {
      try {
        let dummyTutor = {
          email: 'juandelpueblo@gmail.com',
          password: 'secret',
          password_confirmation: 'secret',
          tfirst_name: 'Juan',
          tlast_name: 'Pueblo',
        }
        await app.post('/register').send(dummyTutor).expect(422).expect('Content-Type', /json/)
        let nullTutor: Tutor | null = await Tutor.query()
          .where('email', '=', dummyTutor.email)
          .first()
        assert.isNull(nullTutor)
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    test('Duplicate email', async (assert) => {
      try {
        await app.post('/register').send(tutor).expect(201).expect('Content-Type', /json/)
        const { body } = await app
          .post('/register')
          .send(tutor)
          .expect(422)
          .expect('Content-Type', /json/)
        assert.equal(body.errors[0].message, 'unique validation failure')
        assert.equal(body.errors[0].field, 'email')
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    test('Empty password confirmation', async (assert) => {
      try {
        const { body } = await app
          .post('/register')
          .send(tutor2)
          .expect(422)
          .expect('Content-Type', /json/)
        assert.equal(body.errors[0].field, 'password_confirmation')
        assert.equal(body.errors[0].rule, 'confirmed')
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    test('Successful register tutor', async (assert) => {
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
  })

  test.group('/login - Tutor login', (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Login with non existing tutor', async (assert) => {
      await app.post('/login').send(tutorLogin).expect(500).expect('Content-Type', /json/)
    })

    test('Login with existing tutor', async (assert) => {
      await Tutor.create(tutor2)
      const { body } = await app
        .post('/login')
        .send(tutor2Login)
        .expect(200)
        .expect('Content-Type', /json/)
      assert.equal(body.message, 'Authenticated successfully.')
      assert.containsAllKeys(body, ['token'])
    })
  })

  test.group('/logout - Tutor logout', (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Successful tutor logout', async (assert) => {
      await Tutor.create(tutor2)
      await app.post('/login').send(tutor2Login).expect(200).expect('Content-Type', /json/)
      const { body } = await app.get('/logout').expect(200)
      assert.equal(body.loggedOut, true)
    })
  })

  test.group('/tutors - GET', (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Get all tutors', async (assert) => {
      await Tutor.create(tutor2)
      const { body } = await app.get('/tutors').expect(200).expect('Content-Type', /json/)
      assert.lengthOf(body, 1)
    })
  })

  test.group('/tutors/:id - GET', (group) => {
    group.beforeEach(async () => {
      await Database.beginGlobalTransaction()
    })

    group.afterEach(async () => {
      await Database.rollbackGlobalTransaction()
    })

    test('Non existing tutor', async (assert) => {
      try {
        const { body } = await app.get('/tutors/99').expect(404).expect('Content-Type', /json/)
        assert.equal(body.message, 'Tutor with id 99 not found.')
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
        assert.equal(body.email, createdTutor.email)
        assert.equal(body.fullName, `${createdTutor.tFirstName} ${createdTutor.tLastName}`)
      } catch (err) {
        console.log(err)
        throw err
      }
    })
  })

  // test.group('/tutors - PUT', (group) => {
  //   group.beforeEach(async () => {
  //     await Database.beginGlobalTransaction()
  //   })
  //
  //   group.afterEach(async () => {
  //     await Database.rollbackGlobalTransaction()
  //   })
  // })
  //
  // test.group('/tutors - DELETE', (group) => {
  //   group.beforeEach(async () => {
  //     await Database.beginGlobalTransaction()
  //   })
  //
  //   group.afterEach(async () => {
  //     await Database.rollbackGlobalTransaction()
  //   })
  // })

  // test('Throws 404 error, tutor not found', async (assert) => {
  //   try {
  //     const { body } = await app.get('/tutors/99').expect(404).expect('Content-Type', /json/)
  //     assert.equal(body.message, 'Tutor with id 99 not found.')
  //   } catch (err) {
  //     console.log(err)
  //     throw err
  //   }
  // })

  // test('Tutor not created, need more information', async (assert) => {
  //   await app.post('/register').send({ email: 'juan.delpueblo@upr.edu' }).expect(422)
  // })
  //
  // test('Creates message successfully', async (assert) => {
  //   await app.post('/messages').send(message).expect(201)
  // })
  //
  // test('Message not created, need more information', async (assert) => {
  //   await app.post('/tutorFinder/messages').send({ mmodality: 'Online' }).expect(400)
  // })
  //
  // test('Gets message successfully', async (assert) => {
  //   await app.get('/tutorFinder/messages/1').expect(200)
  // })
  //
  // test('Throws 404 error, message not found', async (assert) => {
  //   await app.get('/tutorFinder/messages/99').expect(404)
  // })
})
