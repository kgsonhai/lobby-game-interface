import { GameTypeItemInterface } from "../GameTypeItem/type";

export interface CategoryItemInterface {
  name: string;
  value: { items?: GameTypeItemInterface[] };
}
