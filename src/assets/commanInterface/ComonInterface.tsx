

export interface expenseFormData {
  desc: string;
  price?: number;
  category: string;
  date: Date | null;
}

export interface tableRow {
  _id: string;
  desc: string;
  price?: number;
  category: string;
  date: Date;
  userName: string;
}

export interface userData {
  email: string;
  name: string;
}

export interface expenseField {
  _id: string;
  // fieldId: string;
  fieldName?: string;
  RecivedAmount: number;
  balance?: number | null;
  expiry?: String,
  fieldType?: String,
  fieldId?: string,
}

export interface expenseFieldData {
  expensefields: expenseField;
}

export interface addField {
  fieldName?: string;
  RecivedAmount?: string;
  fieldType?: string;
  expiry?: string;
  email?: string;
}
