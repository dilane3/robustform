import Question from "./Question";
import { CardType, QuestionType } from "./type";

export type CardData = {
  id: number;
  title?: string;
  description?: string;
  subtitle?: string;
  type: CardType;
  questionType: QuestionType;
  question?: Question;
  createdAt: Date;
  position: number;
  active: boolean;
  formId: number;
};

export default class Card {
  private _id: number;
  private _title: string;
  private _description: string;
  private _subtitle: string;
  private _type: CardType;
  private _questionType: QuestionType;
  private _question: Question;
  private _createdAt: Date;
  private _position: number;
  private _active: boolean;
  private _formId: number;

  constructor(data: CardData) {
    this._id = data.id;
    this._title = data.title || "";
    this._description = data.description || "";
    this._subtitle = data.subtitle || "";
    this._type = data.type;
    this._questionType = data.questionType;
    this._createdAt = data.createdAt;
    this._position = data.position;
    this._active = data.active || false;
    this._formId = data.formId;

    if (data.question) this._question = data.question;
    else this._question = new Question();
  }

  get id() {
    return this._id;
  }

  get title(): string | undefined {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get subtitle(): string | undefined {
    return this._subtitle;
  }

  get type() {
    return this._type;
  }

  get questionType() {
    return this._questionType;
  }

  get question() {
    return this._question;
  }

  get createdAt() {
    return this._createdAt;
  }

  get position() {
    return this._position;
  }

  get active() {
    return this._active;
  }

  get formId() {
    return this._formId;
  }

  // Setters

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set subtitle(subtitle: string) {
    this._subtitle = subtitle;
  }

  set type(type: CardType) {
    this._type = type;
  }

  set active(active: boolean) {
    this._active = active;
  }
}
