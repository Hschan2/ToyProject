import { useBudgets } from "../contexts/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
    // 합계를 위한 예산 배열, 지출 배열 가져오기
    const { expenses, budgets } = useBudgets()
    // 지출 배열에 있는 모든 값 더하기, 없으면 0
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount, 0
    )
    // 예산 배열에 있는 모든 값 더하기, 없으면 0
    const max = budgets.reduce(
        (total, budget) => total + budget.max, 0
    )

    // 총 예산이 없으면 카드 출력 없음
    if (max === 0) return null

    return (
        <BudgetCard amount={amount} name="합계" gray max={max} hideButton />
    )
}
