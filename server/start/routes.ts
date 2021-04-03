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
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', 'HomeController.index')

// Health check
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('test', async () => {
  return Database.query().select('*').from('tutors')
})

Route.group(() => {
  // Tutor CRUD operations
  Route.resource('tutors', 'TutorsController').apiOnly()
    // Address
  Route.resource('address', 'AddressController').apiOnly()
  // Message
  Route.resource('message', 'MessageController').apiOnly()
  // Certifications
  Route.resource('certification', 'CertificationController').apiOnly()
  // Level of Education
  Route.resource('levelOfEducation', 'LevelOfEducationController').apiOnly()
  // Subject
  Route.resource('subject', 'SubjectController').apiOnly()

  // Offers
  // Sub-LoE
}).prefix('tutorFinder')
