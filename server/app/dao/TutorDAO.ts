import Tutor from 'App/Models/Tutor'
import Offer from 'App/Models/Offer'
import Speak from 'App/Models/Speak'

class TutorDAO implements BaseDAO<Tutor> {
  // Create Tutor.
  public async create(params: Object): Promise<Tutor> {
    return await Tutor.create(params)
  }

  // Delete Tutor.
  public async delete(id: number): Promise<boolean> {
    let tutor: Tutor | null = await this.getById(id)
    if (tutor) {
      await tutor.delete()
      return true
    }
    return false
  }

  // Get all tutors.
  public async getAll(): Promise<Tutor[]> {
    return await Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('offers')
      .preload('languages')
      .exec()
  }

  // Get tutor by id.
  public async getById(id: number): Promise<Tutor | null> {
    return await Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('offers')
      .preload('languages')
      .where('tid', id)
      .first()
  }

  public async getByLanguage(lid: number): Promise<Tutor[]> {
    let subquery = Speak.query().select('tutor_id').where('language_id', '=', lid)
    return await Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('offers')
      .preload('languages')
      .whereIn('tid', subquery)
      .exec()
  }

  public async getAllRelationshipInId(id: number, id2: number = 0): Promise<Tutor[]> {
    let subquery = Offer.query().select('tutor_id').where('subject_id', '=', id)
    if (id2 !== 0) subquery = subquery.andWhere('level_of_education_id', '=', id2)
    let query = Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('offers')
      .preload('languages')
      .whereIn('tid', subquery)
    return await query.exec()
  }

  public async update(id: number, params: Object): Promise<Tutor | boolean> {
    let tutor: Tutor | null = await this.getById(id)
    if (tutor) {
      tutor.merge(params)
      await tutor.save()
      return tutor
    }
    return false
  }
}

export const tutorDAO: TutorDAO = new TutorDAO()
