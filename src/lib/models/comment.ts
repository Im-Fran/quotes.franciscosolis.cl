import {Quote} from "@/lib/models/quote.ts";

export type Comment = {
  id: number;
  userId: string;
  quote: Quote;
  quoteId: number;
  parent: Comment | null;
  parentId: number | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}