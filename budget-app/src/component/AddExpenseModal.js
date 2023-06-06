import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import currentTime from '../constants/currentTime';
import '../App.css'

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    // Input Box 입력하기 위한 useRef
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    // 새 지출 추가와 해당 예산 함수 가져오기
    const { addExpense, budgets } = useBudgets()
    const nowDateTime = currentTime();

    function handleSubmit(e) {
        e.preventDefault()

        // 예산 추가 함수에 값 전달
        addExpense(
        {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
            time: nowDateTime,
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="sbFont">새 지출</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>내용</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>비용</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            {/* 예산 카드가 아닌 상단의 새 지출 버튼 클릭 시 초기 카테고리는 선택되지 않음 */}
                            <option id={UNCATEGORIZED_BUDGET_ID}>선택되지 않음</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">추가</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
