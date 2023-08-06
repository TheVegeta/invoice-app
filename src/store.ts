import { create } from "zustand";

interface IInvoiceItem {
  itemName: string;
  qty: number;
  price: number;
  total: number;
}

interface IInvoice {
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
  paymentTerm: number;
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
