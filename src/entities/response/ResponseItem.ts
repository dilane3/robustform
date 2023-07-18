type ResponseItemData = {
  id: number;
  values: string[];
  questionId: number;
};

export default class ResponseItem {
  private _id: number;
  private _values: string[];
  private _questionId: number;

  constructor(data: ResponseItemData) {
    this._id = data.id;
    this._values = data.values;
    this._questionId = data.questionId;
  }

  // Getters

  get id(): number {
    return this._id;
  }

  get values(): string[] {
    return this._values;
  }

  get questionId(): number {
    return this._questionId;
  }

  // Setters

  set id(id: number) {
    this._id = id;
  }

  set values(values: string[]) {
    this._values = values;
  }

  // Methods

  toObject() {
    return {
      id: this._id,
      values: this._values,
      questionId: this._questionId,
    };
  }

  static fromObject(data: ResponseItemData) {
    return new ResponseItem(data);
  }
}
