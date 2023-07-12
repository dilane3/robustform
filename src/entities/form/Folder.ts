import Form from "./Form";

type FolderData = {
  id: number,
  name: string,
  forms?: Form[]
}

export default class Folder {
  private _id: number;
  private _name: string;
  private _forms: Form[];

  constructor(data: FolderData) {
    this._id = data.id;
    this._name = data.name;
    this._forms = data.forms || [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get forms() {
    return this._forms;
  }

  // Methods

  /**
   * Add a form to the folder
   * @param form 
   */
  addForm(form: Form) {
    this._forms.push(form);
  }

  /**
   * Delete a form from a folder
   * @param formId
   */
  deleteForm(formId: number) {
    this._forms = this._forms.filter(form => form.id !== formId);
  }
}
