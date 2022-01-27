import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetContext";
import '../App.css'

export default function AddBudgetModal({ show, handleClose }) {
    // Input Box에 작성하기 위해 useRef
    const nameRef = useRef()
    const maxRef = useRef()
    // 예산 추가 함수 가져오기
    const { addBudget } = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()

        // 예산 추가 함수에 name, max 값 전달
        addBudget(
        {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className="sbFont">새 예산</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>이름</Form.Label>
                        <Form.Control ref={nameRef} type="text" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>최대 예산치</Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">추가</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
