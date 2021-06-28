export interface IRepository<T> {
    getAll(): Promise<Array<T>>;
    getById(id: string): Promise<T>;
    create<R>(doc: R | T): Promise<boolean>;
    update<R>(id: string, doc: R | T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  }
