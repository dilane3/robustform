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
}
