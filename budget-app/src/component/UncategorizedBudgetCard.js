import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contents/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0
    )

    if (amount === 0) return null

    return (
        <BudgetCard amount={amount} name="카테고리 없음" gray {...props} />
    )
}
