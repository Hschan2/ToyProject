import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contents/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "카테고리 없음", id: UNCATEGORIZED_BUDGET_ID } : budgets.find(budget => budget.id === budgetId)
    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        {/* ? 연산자는 undefined or null 처리를 자동 */}
                        <div>지출 내역 - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}
                            variant="outline-danger"
                            >
                                삭제
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
