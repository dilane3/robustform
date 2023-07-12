type FormData = {
  id: number;
  title: string;
  description: string;
  folderId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
};

export default class Form {
  private _id: number;
  private _title: string;
  private _description: string;
  private _folderId: number | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _ownerId: string;

  constructor(data: FormData) {
    this._id = data.id;
    this._title = data.title;
    this._description = data.description;
    this._folderId = data.folderId || null;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._ownerId = data.ownerId;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get folderId() {
    return this._folderId;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get ownerId() {
    return this._ownerId;
  }

  // Setters

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }
}
