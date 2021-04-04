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
    Route.resource('tutors', 'TutorsController').apiOnly()
    // Address
    Route.resource('addresses', 'AddressController').apiOnly()
    // Message
    Route.resource('messages', 'MessageController').apiOnly()
    // Certifications
    Route.resource('certifications', 'CertificationController').apiOnly()
    // Level of Education
    Route.resource('levelOfEducations', 'LevelOfEducationController').apiOnly()
    // Subject
    Route.resource('subjects', 'SubjectController').apiOnly()
    // Offers
    // Sub-LoE
  }).middleware('auth')

  // Authentication
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')

  // Home page
  Route.get('', async () => {
    return { message: 'Welcome to TutorFinder API!' }
  })
}).prefix('tutorFinder')
