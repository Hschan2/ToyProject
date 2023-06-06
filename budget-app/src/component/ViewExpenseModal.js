import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";
import expenseIcon from '../images/dollar.png'
import '../App.css'

export default function ViewExpenseModal({ budgetId, handleClose }) {
    // 지출 내역을 확인하기 위해 지출 내역, 예산, 예산 삭제, 지출 삭제 함수 가져오기
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    // 카테고리 없음일 경우 카테고리 없음의 예산 가져오기
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "카테고리 없음", id: UNCATEGORIZED_BUDGET_ID } : budgets.find(budget => budget.id === budgetId)
    // ID로 각 지출 내역 가져오기
    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        {/* ? 연산자는 undefined or null 자동으로 처리. budget 값이 있으면 name 출력 없으면 undefined or null */}
                        <div className="sbFont">지출 내역 - {budget?.name}</div>
                        {/* ID가 카테고리 없음이 아닐 경우 삭제 버튼 활성화 */}
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
                    {/* 저장된 지출 내역 모두 출력. 설명과 비용 그리고 삭제 버튼 출력 */}
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-6"><img src={expenseIcon} className="iconSize" /> {expense.description} <span className="text-secondary small-font">{expense.time}</span></div>
                            <div className="fs-6">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
