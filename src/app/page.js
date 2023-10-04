import Finances from "@/components/Finances";
import ExpensesByCat from "@/components/ExpensesByCat";
import MovementsModal from "@/components/MovementsModal/MovementsModal";
import DateSlider from "@/components/Finances/DateSlider";
import AddMovementButton from "@/components/AddMovementButton";
import FinancesSkeleton from "@/components/Finances/FinancesSkeleton";
import { Suspense } from "react";

export default async function MainPage({ searchParams }) {
  const year = searchParams?.year
    ? parseInt(searchParams.year)
    : new Date().getFullYear();
  const month = searchParams?.month
    ? parseInt(searchParams.month)
    : new Date().getMonth();
  const showModal = searchParams?.modal;

  return (
    <main className="mx-5 mb-5 h-screen max-w-lg sm:mx-auto">
      <DateSlider year={year} month={month} />
      <Suspense key={Math.random()} fallback={<FinancesSkeleton />}>
        <Finances year={year} month={month} />
      </Suspense>
      {showModal && <MovementsModal />}
      <AddMovementButton year={year} month={month} />
    </main>
  );
}
