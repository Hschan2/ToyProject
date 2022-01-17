import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contents/BudgetContext";

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const BudgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()

        addExpense(
        {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: BudgetIdRef.current.value
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>새 지출</Modal.Title>
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
                        <Form.Select defaultValue={defaultBudgetId} ref={BudgetIdRef}>
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
