import { create } from "zustand";

export interface IInvoiceItem {
  id: string;
  itemName: string;
  qty: number;
  price: number;
  total: number;
}

export interface IInvoice {
  id: string;
  billFromAddress: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;

  clientName: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  country: string;

  date: Date;
  paymentTerm: string;
  projectDescription: string;

  itemList: Array<IInvoiceItem>;

  isPaid: boolean;
  totalAmt: number;
}

interface IAppState {
  invoices: Array<IInvoice>;
}

export const useAppStore = create<IAppState>((set) => ({
  invoices: [],
}));
