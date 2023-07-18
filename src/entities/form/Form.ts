import Card from "../card/Card";
import Response from "../response/Response";
import ResponseItem from "../response/ResponseItem";

type FormData = {
  id: number;
  title: string;
  description: string;
  folderId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  cards?: Card[];
  responses?: Response[];
};

export default class Form {
  private _id: number;
  private _title: string;
  private _description: string;
  private _folderId: number | null;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _ownerId: number;
  private _cards: Card[];
  private _responses: Response[];

  constructor(data: FormData) {
    this._id = data.id;
    this._title = data.title;
    this._description = data.description;
    this._folderId = data.folderId || null;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._ownerId = data.ownerId;
    this._cards = data.cards || [];
    this._responses = data.responses || [];
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

  get cards() {
    return this._cards;
  }

  get responses() {
    return this._responses;
  }

  // Setters

  set title(title: string) {
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set responses(responses: Response[]) {
    this._responses = responses;
  }

  // Methods

  addCard(card: Card) {
    this._cards.push(card);
  }

  deleteCard(cardId: number) {
    console.log("cardId", cardId);
    this._cards = this._cards.filter((card) => card.id !== cardId);
  }

  addResponse(response: Response) {
    this._responses.push(response);
  }
}
