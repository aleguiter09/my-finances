import { List } from "@tremor/react";

export default function LastMovementsSkeleton() {
  return (
    <List>
      <div className="animate-pulse flex flex-col gap-2 mt-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-300">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="h-3 w-28 rounded bg-slate-300" />
              <span className="my-2 me-2 h-3 w-16 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ml-auto h-4 w-16 rounded-full bg-slate-300" />
            <span className="h-3 w-20 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-gray-300">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="h-3 w-28 rounded bg-slate-300" />
              <span className="my-2 me-2 h-3 w-16 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ml-auto h-4 w-16 rounded-full bg-slate-300" />
            <span className="h-3 w-20 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-gray-300">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="h-3 w-28 rounded bg-slate-300" />
              <span className="my-2 me-2 h-3 w-16 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ml-auto h-4 w-16 rounded-full bg-slate-300" />
            <span className="h-3 w-20 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="flex items-center justify-between pb-2 border-b border-gray-300">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="h-3 w-28 rounded bg-slate-300" />
              <span className="my-2 me-2 h-3 w-16 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ml-auto h-4 w-16 rounded-full bg-slate-300" />
            <span className="h-3 w-20 rounded-full bg-slate-300" />
          </div>
        </div>
        <div className="flex items-center justify-between pb-2">
          <div className="flex gap-3">
            <span className="h-9 w-9 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="h-3 w-28 rounded bg-slate-300" />
              <span className="my-2 me-2 h-3 w-16 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ml-auto h-4 w-16 rounded-full bg-slate-300" />
            <span className="h-3 w-20 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </List>
  );
}
