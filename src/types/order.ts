interface IMenu {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
}

interface ICard {
  id?: string;
  menuId?: string;
  quantity: number;
  notes: string;
  menuItem?: IMenu;
}

interface IOrder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: ICard[];
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  total: number;
}

export type { IOrder, ICard, IMenu };
