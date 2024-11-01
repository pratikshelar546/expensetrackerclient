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
  map(arg0: (card: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
  _id: string;
  fieldId: string;
  fieldName?: string;
  RecivedAmount?: number | null;
  balance? :number |null
}

export interface addField {
  fieldName?: string;
  RecivedAmount?: string;
}
