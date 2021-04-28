/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', 'HomeController.index')

// Health check
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.group(() => {
    // Tutor CRUD operations
    // Route.post('tutors', 'TutorsController.store')
    Route.put('tutors/:id', 'TutorsController.update')
    Route.delete('tutors/:id', 'TutorsController.destroy')
    // Address
    Route.post('addresses', 'AddressController.store')
    Route.put('addresses/:id', 'AddressController.update')
    Route.delete('addresses/:id', 'AddressController.destroy')
    // Certifications
    Route.post('certifications', 'CertificationController.store')
    Route.put('certifications/:id', 'CertificationController.update')
    Route.delete('certifications/:id', 'CertificationController.destroy')
    // Level of Education
    Route.post('levelOfEducations', 'LevelOfEducationController.store')
    Route.put('levelOfEducations/:id', 'LevelOfEducationController.update')
    Route.delete('levelOfEducations/:id', 'LevelOfEducationController.destroy')
    // Subject
    Route.post('subjects', 'SubjectController.store')
    Route.put('subjects/:id', 'SubjectController.update')
    Route.delete('subjects/:id', 'SubjectController.destroy')
    // Speaks
    Route.post('speaks', 'SpeaksController.store')
    Route.put('speaks/:id', 'SpeaksController.update')
    Route.delete('speaks/:id', 'SpeaksController.destroy')
    // Offers
    Route.post('offers', 'OffersController.store')
    Route.put('offers/:id', 'OffersController.update')
    Route.delete('offers/:id', 'OffersController.destroy')
  }).middleware('auth')

  // Tutor
  Route.get('tutors', 'TutorsController.index')
  Route.get('tutors/:id', 'TutorsController.show')

  // Address
  Route.get('addresses', 'AddressController.index')
  Route.get('addresses/:id', 'AddressController.show')

  // Certifications
  Route.get('certifications', 'CertificationController.index')
  Route.get('certifications/:id', 'CertificationController.show')

  // Level of Education
  Route.get('levelOfEducations', 'LevelOfEducationController.index')
  Route.get('levelOfEducations/:id', 'LevelOfEducationController.show')

  // Subject
  Route.get('subjects', 'SubjectController.index')
  Route.get('subjects/:id', 'SubjectController.show')

  // Offers
  Route.get('offers', 'OffersController.index')
  Route.get('offers/:id', 'OffersController.show')

  // Languages
  Route.get('languages', 'LanguagesController.index')

  // Speaks
  Route.get('speaks', 'SpeaksController.index')
  Route.get('speaks/:id', 'SpeaksController.show')

  // Message
  Route.resource('messages', 'MessageController').apiOnly()

  // Authentication
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')

  // Home page
  Route.get('', async () => {
    return { message: 'Welcome to TutorFinder API!' }
  })
}).prefix('tutorFinder')
