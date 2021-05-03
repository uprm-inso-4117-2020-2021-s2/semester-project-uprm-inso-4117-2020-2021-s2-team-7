import supertest from 'supertest'
import Tutor from 'App/Models/Tutor'

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
