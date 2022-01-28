import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
    // 지출 내역 가져오기
    const { getBudgetExpenses } = useBudgets()
    // 카테고리 없음이라는 ID를 가진 지출 총액을 가져오기, 없으면 0
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0
    )

    // 총액이 없으면 카테고리 없음 카드 출력 없음
    if (amount === 0) return null

    return (
        <BudgetCard amount={amount} name="카테고리 없음" gray {...props} />
    )
}
