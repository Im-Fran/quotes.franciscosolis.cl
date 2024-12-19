import {Quote} from "@/lib/models/quote.ts";
import {Calendar, User} from "lucide-react";
import dayjs from "dayjs";
import {clsx} from "clsx";
import {currencyFormat} from "@/lib/utils.ts";

export type QuoteProps = {
  className?: string;
  quote: Quote;
}

const QuoteCard = ({ className, quote }: QuoteProps) => <div className={clsx(["flex flex-col gap-2 bg-neutral-300 dark:bg-gray-800 rounded-xl px-5 py-2.5", className])}>
  <div className={"flex flex-col"}>
    <div className={"flex items-center justify-between w-full"}>
      <h1 className={"w-full text-2xl font-bold"}>{quote.name}</h1>

      {quote.Item?.length > 0 && <span className={"text-green-600 font-semibold text-lg"}>{currencyFormat.format(quote.Item.reduce((acc, item) => acc + item.amount, 0))}</span>}
    </div>
    <div className={"flex flex-col gap-2.5 my-2.5"}>
      <span className={"flex gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <Calendar className={"w-6 h-6 text-indigo-600"}/>
        <span>Fecha de Creación:</span>
        {dayjs(quote.createdAt).format('ddd D/M/YYYY H:m A')}
      </span>
      <span className={"flex items-center gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <User className={"w-6 h-6 text-indigo-600"}/>
        <span>Creado Por:</span>
        <span className={"flex items-center gap-2"}>
          <img
            src={quote.creator.avatar}
            alt={quote.creator.name}
            className={"rounded-full object-cover w-5 h-5"}
          />
          {quote.creator.name}
        </span>
      </span>
      <span className={"flex items-center gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <User className={"w-6 h-6 text-indigo-600"}/>
        <span>Cliente:</span>
        <span className={"flex items-center gap-2"}>
          <img
            src={quote.client.avatar}
            alt={quote.client.name}
            className={"rounded-full object-cover w-5 h-5"}
          />
          {quote.client.name}
        </span>
      </span>
    </div>
  </div>
  <p className={"text-md text-neutral-700 dark:text-neutral-300"}>{quote.description}</p>
</div>

export default QuoteCard