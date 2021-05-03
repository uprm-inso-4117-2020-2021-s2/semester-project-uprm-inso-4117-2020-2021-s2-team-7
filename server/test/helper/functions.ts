import supertest from 'supertest'
import Tutor from 'App/Models/Tutor'
import Address from 'App/Models/Address'
import Message from 'App/Models/Message'
import Offer from 'App/Models/Offer'
import Subject from 'App/Models/Subject'
import LevelOfEducation from 'App/Models/LevelOfEducation'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/tutorFinder`
const app = supertest(BASE_URL)

export const createTutor = async (tutor) => {
  const validTutor = Object.assign({}, tutor)
  // @ts-ignore
  delete validTutor.password_confirmation
  return await Tutor.create(validTutor)
}

export const login = async (email, password) => {
  const { body } = await app.post('/login').send({ email, password })
  const { token } = body.token
  return token
}

export const logout = async (token) => {
  const { body } = await app.get('/logout').set('Authorization', `Bearer ${token}`)
  return body.loggedOut ? body.loggedOut : false
}

export const createAddress = async (address, tutorId) => {
  const validAddress = Object.assign({}, address)
  validAddress['tutor_id'] = tutorId
  return await Address.create(validAddress)
}

export const createMessage = async (message, tutorId) => {
  const validMessage = Object.assign({}, message)
  validMessage['tutor_id'] = tutorId
  return await Message.create(validMessage)
}

export const createOffer = async (offer, tutorId, subjectId, loeId) => {
  const validOffer = Object.assign({}, offer)
  validOffer['tutor_id'] = tutorId
  validOffer['subject_id'] = subjectId
  validOffer['level_of_education_id'] = loeId
  return await Offer.create(validOffer)
}

export const createSubject = async (subject, offerId?) => {
  const validSubject = Object.assign({}, subject)
  if (offerId) validSubject['offer_id'] = offerId
  return await Subject.create(validSubject)
}

export const createLevelOfEducation = async (levelOfEducation, offerId?) => {
  const validLevelOfEducation = Object.assign({}, levelOfEducation)
  if (offerId) validLevelOfEducation['offer_id'] = offerId
  return await LevelOfEducation.create(validLevelOfEducation)
}
