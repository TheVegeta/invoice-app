import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addInvoice: (arg0: IInvoice) => void;
}

export const useAppStore = create<IAppState>()(
  persist(
    (set) => ({
      invoices: [],
      addInvoice: (arg0) =>
        set((state) => ({ invoices: [...state.invoices, arg0] })),
    }),
    { name: "invoice-state", version: 1 }
  )
);
