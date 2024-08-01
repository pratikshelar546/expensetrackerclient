export interface expenseFormData {
  desc: string;
  qyt?: number;
  price?: number;
  category: string;
  date: String;
}

export interface tableRow {
  _id: string;
  desc: string;
  qyt?: number;
  price?: number;
  category: string;
  date: Date;
}

// export default expenseFormData;
