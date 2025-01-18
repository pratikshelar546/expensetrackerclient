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
  price?: number;
  category: string;
  date: Date;
}

export interface userData {
  email: string;
  name: string;
}

export interface expenseField {
  _id: string;
  fieldId: string;
  fieldName?: string;
  RecivedAmount: number;
  balance?: number | null;
}

export interface addField {
  fieldName?: string;
  RecivedAmount?: string;
  fieldType?: string;
}
