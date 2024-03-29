"use client";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  NumberInput,
  TextInput,
  DatePicker,
  DatePickerValue,
  Card,
} from "@tremor/react";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { AddMovementFormProps } from "@/types/components";
import { useFormState } from "react-dom";
import { addMovementForm } from "@/utils/movement-action";
import React, { useState, useTransition } from "react";
import { Type } from "@/types/general";
import CategorySelect from "./CategorySelect";
import AccountSelect from "./AccountSelect";
import { useRouter } from "next/navigation";

export default function AddMovementForm({
  accounts,
  expenseCategories,
  incomeCategories,
  defaultAcc,
}: Readonly<AddMovementFormProps>) {
  const router = useRouter();
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addMovementForm, initialState);
  const [date, setDate] = useState<DatePickerValue>(new Date());
  const [type, setType] = useState<Type>("expense");
  const [category, setCategory] = useState<string>("");
  const [from, setFrom] = useState<string>(defaultAcc?.toString() ?? "");
  const [where, setWhere] = useState<string>("");
  const [pending, startTransition] = useTransition();

  const handleTypeChange = (i: number) => {
    switch (i) {
      case 0:
        setType("expense");
        break;
      case 1:
        setType("income");
        break;
      case 2:
        setType("transfer");
        break;
    }
  };

  const submit = (formData: FormData) => {
    startTransition(() => {
      formData.set("done_at", date ? date.toISOString() : "");
      formData.set("type", type);
      formData.set("from", from);
      formData.set("category", category);
      if (type === "transfer") {
        formData.set("where", where);
        formData.delete("category");
      }
      dispatch(formData);
    });
  };

  return (
    <form action={submit}>
      <Card className="rounded-md p-4">
        {/* Movement done_at */}
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Enter a date
        </label>
        <DatePicker
          className="mb-3"
          value={date}
          onValueChange={(v) => setDate(v)}
          enableClear={false}
        />
        {/* Movement type/category */}
        <div className="rounded-md mb-4">
          <TabGroup className="mb-3" onIndexChange={(i) => handleTypeChange(i)}>
            <TabList className="w-full">
              <Tab className="w-full place-content-center">Expense</Tab>
              <Tab className="w-full place-content-center">Income</Tab>
              <Tab className="w-full place-content-center">Transfer</Tab>
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel>
                <AccountSelect
                  label="Choose an account"
                  accounts={accounts}
                  from={from}
                  setFrom={setFrom}
                  error={!!state.errors?.from}
                  errorMessage={state.errors?.from?.at(0)}
                />
                <CategorySelect
                  categories={expenseCategories}
                  category={category}
                  setCategory={setCategory}
                  error={!!state.errors?.category}
                  errorMessage={state.errors?.category?.at(0)}
                />
              </TabPanel>
              <TabPanel>
                <AccountSelect
                  label="Choose an account"
                  accounts={accounts}
                  from={from}
                  setFrom={setFrom}
                  error={!!state.errors?.from}
                  errorMessage={state.errors?.from?.at(0)}
                />
                <CategorySelect
                  categories={incomeCategories}
                  category={category}
                  setCategory={setCategory}
                  error={!!state.errors?.category}
                  errorMessage={state.errors?.category?.at(0)}
                />
              </TabPanel>
              <TabPanel>
                <AccountSelect
                  label="Choose from where you will transfer"
                  accounts={accounts}
                  from={from}
                  setFrom={setFrom}
                  error={!!state.errors?.from}
                  errorMessage={state.errors?.from?.at(0)}
                />
                <AccountSelect
                  label="Choose where you will transfer"
                  accounts={accounts}
                  from={where}
                  setFrom={setWhere}
                  error={!!state.errors?.where}
                  errorMessage={state.errors?.where?.at(0)}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        {/* Movement amount */}
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Enter an amount
        </label>
        <NumberInput
          id="amount"
          name="amount"
          icon={CurrencyDollarIcon}
          placeholder="Amount..."
          enableStepper={false}
          step="0.01"
          min="0"
          error={!!state.errors?.amount}
          errorMessage={state.errors?.amount?.at(0)}
        />
        {/* Movement comment */}
        <label
          htmlFor="comment"
          className="mt-2 mb-2 block text-sm font-medium"
        >
          Enter a comment
        </label>
        <TextInput
          id="comment"
          name="comment"
          placeholder="Comment..."
          error={!!state.errors?.comment}
          errorMessage={state.errors?.comment?.at(0)}
        />
        {/* Movement paid_with */}
        <fieldset className="mt-2">
          <legend className="block text-sm font-medium">
            Choose an option
          </legend>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="cash"
                name="paid_with"
                type="radio"
                tabIndex={0}
                value="cash"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-50"
              />
              <label
                htmlFor="cash"
                className="ml-2 cursor-pointer gap-1.5 rounded-full py-1.5 text-sm"
              >
                Debit/Cash
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="credit"
                name="paid_with"
                type="radio"
                tabIndex={0}
                value="credit"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-50"
              />
              <label
                htmlFor="credit"
                className="ml-2 cursor-pointer gap-1.5 rounded-full py-1.5 text-sm"
              >
                Credit
              </label>
            </div>
          </div>
          {state.errors?.paid_with && (
            <div id="paid-error" aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500">
                {state.errors.paid_with.at(0)}
              </p>
            </div>
          )}
        </fieldset>
        {/* Actions */}
        <div className="mt-3 flex flex-row gap-2">
          <button
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="w-full rounded-md bg-slate-500 py-2 text-sm font-semibold text-white focus:outline-none focus:ring focus:ring-gray-300"
          >
            Close
          </button>
          {pending ? (
            <div className="flex w-full justify-center rounded-md bg-blue-600 py-2">
              <output
                className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                aria-live="polite"
              />
            </div>
          ) : (
            <button
              tabIndex={0}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white focus:outline-none focus:ring focus:ring-gray-blue"
              type="submit"
            >
              Confirm
            </button>
          )}
        </div>
      </Card>
    </form>
  );
}
