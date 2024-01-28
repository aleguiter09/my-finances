import { getExpenses } from "@/services/movements";
import { createClient } from "@/utils/supabase-server";

export default async function ExpenseByCatChart({
  account,
}: Readonly<{ account: number }>) {
  const parseMovements = (
    movements: {
      amount: number;
      category: string;
      fullCategory?: { title: string; color: string } | null;
    }[]
  ) => {
    const result: { title: string; amount: number; color: string }[] = [];
    for (const movement of movements) {
      const { amount, fullCategory } = movement;
      const dataItem = result.find(
        (item) => item.title === fullCategory?.title
      );
      if (!dataItem) {
        result.push({
          title: fullCategory?.title ?? "Uncategorized",
          amount: amount,
          color: fullCategory?.color ?? "gray-500",
        });
      } else {
        dataItem.amount += amount;
      }
    }
    return result;
  };

  const supabase = createClient();
  const movements = await getExpenses(supabase, account);
  const data = parseMovements(movements);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-1">
      {data
        .sort((a, b) => b.amount - a.amount)
        .map((item) => (
          <div
            key={item.title}
            className="text-sm rounded-md bg-tremor-background px-1.5 py-2 shadow-md border border-tremor-border"
          >
            <div className="flex gap-1.5">
              <div className={`w-1 flex flex-col bg-${item?.color} rounded`} />
              <div className="w-full">
                <div className="flex justify-between space-x-1">
                  <p className="text-right text-slate-500 ">{item.title}</p>
                  <p className="font-medium text-right whitespace-nowrap">
                    ${item.amount.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
