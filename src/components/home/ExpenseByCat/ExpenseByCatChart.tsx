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
          color: fullCategory?.color ?? "gray-500",
          amount: amount,
        });
      } else {
        dataItem.amount += amount;
      }
    }
    return result.sort((a, b) => b.amount - a.amount);
  };

  const supabase = await createClient();
  const movements = await getExpenses(supabase, account);
  const data = parseMovements(movements);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-1">
      {data.map((item) => (
        <div
          key={item.title}
          className={`text-sm px-1.5 rounded-md py-2 border border-${item?.color} border-s-4`}
        >
          <div className="flex gap-1.5">
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
      {data.length === 0 && (
        <p className="pt-2 text-sm text-slate-500 text-center col-span-3">
          No expenses this month
        </p>
      )}
    </div>
  );
}
