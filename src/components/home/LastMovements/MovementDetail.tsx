import { MovementDB } from "@/types/database";
import { CATEGORY_ICONS } from "@/utils/constants";
import Icon from "@mdi/react";

interface MovementDetailProps extends MovementDB {
  border: boolean;
}

export default function MovementDetail({
  done_at,
  amount,
  comment,
  type,
  fullCategory,
  border,
}: Readonly<MovementDetailProps>) {
  return (
    <div
      className={`flex items-center justify-between pb-2 ${
        border && "border-b border-gray-300"
      }`}
    >
      <div className="flex gap-3">
        <Icon
          className={`bg-${fullCategory.color} mx-auto rounded-full p-1.5`}
          path={CATEGORY_ICONS[fullCategory.icon]}
          size="36px"
          color="white"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{comment}</span>
          <span className="text-xs text-gray-500">{fullCategory.title}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-right">
        <span
          className={`font-medium ${
            type === "expense" ? "text-red-500" : "text-green-600"
          }`}
        >{`${type === "expense" ? "-" : ""} $${amount.toFixed(2)}`}</span>
        <span className="text-xs text-gray-500">
          {new Date(done_at).toLocaleDateString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}