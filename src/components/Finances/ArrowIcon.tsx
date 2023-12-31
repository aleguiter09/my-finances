"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { Icon } from "@tremor/react";

export default function ArrowIcon({
  left = false,
}: Readonly<{ left?: boolean }>) {
  return (
    <Icon color="blue" size="sm" icon={left ? ArrowLeftIcon : ArrowRightIcon} />
  );
}
