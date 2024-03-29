import { Card } from "@tremor/react";
import { MONTHS } from "@/utils/constants";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import { YearMonth } from "@/types/general";

export default function DateSlider({ year, month }: Readonly<YearMonth>) {
  const rightArrow =
    month === 11
      ? `/movements?year=${year + 1}&month=${0}`
      : `/movements?year=${year}&month=${month + 1}`;

  const leftArrow =
    month === 0
      ? `/movements?year=${year - 1}&month=${11}`
      : `/movements?year=${year}&month=${month - 1}`;

  return (
    <Card className="mb-4 flex justify-between px-3 py-2">
      <Link href={leftArrow}>
        <ArrowIcon left />
      </Link>
      <h5 className="mt-1 text-lg font-semibold">
        {MONTHS[month]} {year}
      </h5>
      <Link href={rightArrow}>
        <ArrowIcon />
      </Link>
    </Card>
  );
}
