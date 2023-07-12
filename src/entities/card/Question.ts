type QuestionData = {
  label?: string;
  options?: string[];
};

export default class Question {
  private _label: string;
  private _options: string[];

  constructor(data?: QuestionData) {
    if (!data) data = {};
    
    this._label = data.label || "";
    this._options = data.options || [];
  }

  get label() {
    return this._label;
  }

  get options() {
    return this._options;
  }

  // Setters

  set label(label: string) {
    this._label = label;
  }

  set options(options: string[]) {
    this._options = options;
  }

  // Methods

  toObject() {
    return {
      label: this._label,
      options: this._options,
    };
  }
}
