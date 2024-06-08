import { IAddress } from "@shared/types";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
}
