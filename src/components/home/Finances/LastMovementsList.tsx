import { getLastMovements } from "@/services/movements";
import { createClient } from "@/utils/supabase-server";
import MovementDetail from "./MovementDetail";

export default async function LastMovementsList() {
  const supabase = createClient();
  const movements = await getLastMovements(supabase);

  return (
    <div className="flex flex-col gap-2 mt-3">
      {movements.map((item, i) => (
        <MovementDetail
          key={item.id}
          border={i !== movements.length - 1}
          {...item}
        />
      ))}
    </div>
  );
}
