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
// export default expenseFormData;
