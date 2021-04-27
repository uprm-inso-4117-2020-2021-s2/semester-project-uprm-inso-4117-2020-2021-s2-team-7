import Tutor from 'App/Models/Tutor'

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
      .preload('subjects')
      .exec()
  }

  // Get tutor by id.
  public async getById(id: number): Promise<Tutor | null> {
    return await Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('subjects')
      .where('tid', id)
      .first()
  }

  public async getByField(field: string, value: any): Promise<Tutor[]> {
    return await Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('subjects')
      .where(field, value)
      .exec()
  }

  public async getAllRelationshipHasId(
    rel: any,
    id: number,
    rel2?: any,
    id2?: number
  ): Promise<Tutor[]> {
    let query = Tutor.query()
      .preload('address')
      .preload('messages')
      .preload('certifications')
      .preload('subjects')
      .has(rel, '=', id)
    if (rel2 && id2) query = query.andHas(rel2, '=', id2)
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
