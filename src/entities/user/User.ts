type UserData = {
  id: number;
  uid: string;
  username: string;
  email: string;
  created_at: Date;
  avatar: string;
  color: string;
};

export default class User {
  private _id: number;
  private _uid: string;
  private _username: string;
  private _email: string;
  private _created_at: Date;
  private _avatar: string;
  private _color: string;

  constructor(data: UserData) {
    this._id = data.id;
    this._uid = data.uid;
    this._username = data.username;
    this._email = data.email;
    this._created_at = data.created_at;
    this._avatar = data.avatar;
    this._color = data.color;
  }

  // Getters

  get id(): number {
    return this._id;
  }

  get uid(): string {
    return this._uid;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get avatar(): string {
    return this._avatar;
  }

  get color(): string {
    return this._color;
  }

  // Setters

  set username(username: string) {
    this._username = username;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }
}
