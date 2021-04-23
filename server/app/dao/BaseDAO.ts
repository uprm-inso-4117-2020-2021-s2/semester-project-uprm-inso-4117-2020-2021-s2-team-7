interface BaseDAO<T> {
  getAll(): Promise<T[]>
  getById(id: number): Promise<T | null>
  create(params: Object): Promise<T>
  update(id: number, params: Object): Promise<T | boolean>
  delete(id: number): Promise<boolean>
}
