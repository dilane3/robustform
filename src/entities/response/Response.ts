import ResponseItem from "./ResponseItem";

type ResponseData = {
  id: number;
  formId: number;
  createdAt: Date;
  responseItems?: ResponseItem[];
}

export default class Response {
  private _id: number;
  private _formId: number;
  private _createdAt: Date;
  private _responseItems: ResponseItem[];

  constructor(data: ResponseData) {
    this._id = data.id;
    this._formId = data.formId;
    this._createdAt = data.createdAt;
    this._responseItems = data.responseItems || [];
  }

  // Getters

  get id(): number {
    return this._id;
  }

  get formId(): number {
    return this._formId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get responseItems(): ResponseItem[] {
    return this._responseItems;
  }

  // Methods

  addResponseItem(responseItem: ResponseItem) {
    this._responseItems.push(responseItem);
  }
}