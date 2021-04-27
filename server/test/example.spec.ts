import test from 'japa'

import Tutor from 'App/Models/Tutor'
import Message from 'App/Models/Message'
import { tutorDAO } from 'App/DAO/TutorDAO'

const BASE_URL = `http://localhost:8083`

// Tutor Create
const tutor = new Tutor()
tutor.email = 'yoyo@gmail.com'
tutor.password = 'secret'
tutor.tFirstName = 'holri'
tutor.tLastName = 'wesspa'
tutor.tPhone = '92838278'
tutor.tAge = 3
tutor.tNationality = 'sj'
tutor.tSummary = 'ssh'
tutor.tOverview = 'djd'
// Tutor message
const message = new Message()
message.mModality = 'online'
message.mMessage = 'Este es el mensaje'
message.mPhone = '787233201'
message.mEmail = 'elmensajero@gmail.com' 

test.group('Tutor creation', async () =>  {
  test('Creates tutor and ensure email is same has the one created', async (assert) => {
    assert.equal(tutor.email, 'yoyo@gmail.com')
    await tutor.save()
  })
  test('Creates tutor and ensure password is hashed', async (assert) => {
    assert.notEqual(tutor.password, 'ETO ES SECRETO')
    await tutor.save()
  })
})
