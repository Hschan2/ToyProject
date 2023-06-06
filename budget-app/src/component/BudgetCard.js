import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
import budgetIcon from '../images/money.png'
// import expenseIcon from '../images/dollar.png'
import '../App.css'

export default function BudgetCard({ name, amount, max, gray, hideButton, onAddExpenseClick, onViewExpenseClick }) {
    // 지출 금액에 맞춰 배경색 등 변경을 위한 배열 변수
    const classNames = [

    ]

    // 지출 금액이 총 예산 금액보다 크면 배경은 투명도가 10인 빨간색으로 변경
    if (amount > max) classNames.push("bg-danger", "bg-opacity-10")
    // 위의 조건이 맞지 않으면 기본 배경
    else if (gray) classNames.push("bg-light")

    return (
        // className={classNames.join(" ")} => 위 조건문을 통해 해당되는 클래스 추가, join을 사용한 이유는 classNames.push("bg-danger", "bg-opacity-10")처럼 여러 개가 들어갈 경우를 대비
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2 fs-5 fw-bold"><img src={budgetIcon} className="iconSize" alt={name} /> {name}</div>
                    <div className="d-flex align-items-baseline fs-6">
                        {/* currencyFormatter - 천 자리 단위 설정 */}
                        {currencyFormatter.format(amount)}
                        {max && (<span className="text-muted ms-1">
                            / {currencyFormatter.format(max)}
                        </span>)}
                    </div>
                </Card.Title>
                {/* max값이 있으면 ProgressBar 보이기 */}
                {max && (<ProgressBar className="rounded-pill" variant={getProgressBarVariant(amount, max)} min={0} max={max} now={amount} />)}
                {/* hideButton이 활성화되어 있지 않으면 아래 버튼들 보이기 */}
                {!hideButton && (<Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>새 지출</Button>
                    <Button onClick={onViewExpenseClick} variant="outline-secondary">지출 내역</Button>
                </Stack>)}
            </Card.Body>
        </Card>
    )
}

// ProgressBar의 값에 따라 일반, 경고, 위험 색상으로 변경
function getProgressBarVariant(amount, max) {
    const ratio = amount / max

    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"

    return "danger"
}