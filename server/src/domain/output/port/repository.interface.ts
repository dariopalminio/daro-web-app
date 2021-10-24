/**
 * Repository Interface
 * The simplest approach of Repository Pattern, especially with an existing system, is to create a new Repository 
 * implementation for each business object you need to store to or retrieve from your infrastructure persistence layer.
 */
export interface IRepository<T> {
    getAll(): Promise<Array<T>>;
    find(query: any): Promise<Array<T>>; 
    getById(id: string): Promise<T>;
    getByQuery(query: any): Promise<T>;
    hasById(id: string): Promise<boolean> ;
    hasByQuery(query: any): Promise<boolean>;
    create<R>(doc: R | T): Promise<boolean>;
    update<R>(id: string, doc: R | T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  }
