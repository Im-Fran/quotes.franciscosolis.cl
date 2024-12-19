import {Comment} from "@/lib/models/comment.ts";
import {Item} from "@/lib/models/item.ts";

export type Quote = {
  id: number;
  creatorId: string;
  clientId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  comments: Comment[];
  items: Item[];

  creator: {
    name: string;
    avatar: string;
  },

  client: {
    name: string;
    avatar: string;
  },
}