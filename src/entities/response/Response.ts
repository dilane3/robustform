import ResponseItem from "./ResponseItem";

type ResponseData = {
  id: number;
  formId: number;
  createdAt?: Date;
  responseItems?: ResponseItem[];
};

export default class Response {
  private _id: number;
  private _formId: number;
  private _createdAt: Date | null;
  private _responseItems: ResponseItem[];

  constructor(data: ResponseData) {
    this._id = data.id;
    this._formId = data.formId;
    this._createdAt = data.createdAt || null;
    this._responseItems = data.responseItems || [];
  }

  // Getters

  get id(): number {
    return this._id;
  }

  get formId(): number {
    return this._formId;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get responseItems(): ResponseItem[] {
    return this._responseItems;
  }

  // Setters

  set id(id: number) {
    this._id = id;
  }

  set createdAt(createdAt: Date | null) {
    this._createdAt = createdAt;
  }

  // Methods

  addResponseItem(responseItem: ResponseItem) {
    this._responseItems.push(responseItem);
  }

  toObject() {
    const responseItems = this._responseItems.map((responseItem) =>
      responseItem.toObject()
    );

    return {
      id: this._id,
      formId: this._formId,
      createdAt: this._createdAt,
      responseItems,
    };
  }

  static fromObject(data: any) {
    const responseItems = data.responseItems.map((responseItem: any) =>
      ResponseItem.fromObject(responseItem)
    );

    return new Response({
      id: data.id,
      formId: data.formId,
      createdAt: data.createdAt,
      responseItems,
    });
  }
}
