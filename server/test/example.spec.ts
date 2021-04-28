import test from 'japa'

import Tutor from 'App/Models/Tutor'
import Message from 'App/Models/Message'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

 

const tutor = {
  "email": "juan.delpueblo@upr.edu",
  "password": "colegio2021",
  "password_confirmation": "colegio2021",
  "tfirst_name": "Juan",
  "tlast_name": "Pueblo",
  "tphone": "7874445555",
  "tnationality": "Espana",
  "tage": 23,
  "tsummary": "Soy Juan",
  "toverview": "Soy Juan del Pueblo",
  "tweekdays_day": true,
  "tweekends": true
}
const message = {
"tutor_id": 1,
"mmodality": "Online",
"mmessage": "Can you help me with math?",
"mphone": "78744455555",
"memail": "juan.delpueblo@upr.edu"}


test.group('Tutor creation', async () =>  {
  
  test('Register tutor', async (assert) => {
    await supertest(BASE_URL).post('/tutorFinder/register').send(tutor).expect(201)

  })

  test('Gets tutor successfully', async (assert) => {
    await supertest(BASE_URL).get('/tutorFinder/tutors/1').expect(200)
  })

  test('Throws 404 error, tutor not found', async (assert) => {
    await supertest(BASE_URL).get('/tutorFinder/tutors/99').expect(404)
  })

  test('Tutor not created, need more information', async (assert) => {
    await supertest(BASE_URL).post('/tutorFinder/register').send({"email": "juan.delpueblo@upr.edu",
      }).expect(422)

  })

  test('Creates message successfully', async (assert) => {
    await supertest(BASE_URL).post('/tutorFinder/messages').send(message).expect(201)
  })

  test('Message not created, need more information', async (assert) => {
    await supertest(BASE_URL).post('/tutorFinder/messages').send({"mmodality": "Online",
  }).expect(400)
  })

  test('Gets message successfully', async (assert) => {
    await supertest(BASE_URL).get('/tutorFinder/messages/1').expect(200)
  })

  test('Throws 404 error, message not found', async (assert) => {
    await supertest(BASE_URL).get('/tutorFinder/messages/99').expect(404)
  })
})
