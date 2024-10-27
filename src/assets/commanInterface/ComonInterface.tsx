import { User } from "next-auth";

export interface expenseFormData {
  desc: string;
  qyt?: number;
  price?: number;
  category: string;
  date: Date;
}

export interface tableRow {
  _id: string;
  desc: string;
  qyt?: number;
  price?: number;
  category: string;
  date: Date;
}

export interface userData {
  email: string;
  name: string;
}

export interface session {
  user: User;
  jwt: String;
  expires: String;
}

export interface expenseField {
  _id: string;
  fieldId: String;
  fieldName: String;
}

export interface addField {
  fieldName?: string;
  RecivedAmount?: string;
}
