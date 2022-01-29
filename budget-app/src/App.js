import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import AddBudgetModal from './component/AddBudgetModal';
import AddExpenseModal from './component/AddExpenseModal';
import BudgetCard from './component/BudgetCard'
import TotalBudgetCard from './component/TotalBudgetCard';
import UncategorizedBudgetCard from './component/UncategorizedBudgetCard';
import ViewExpenseModal from './component/ViewExpenseModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContext';
import "./App.css"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false) // 새 예산
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false) // 새 지출
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState() // 지출 내역 보기
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()// 각 지출 ID
  const { budgets, getBudgetExpenses } = useBudgets() // 지출 모두 가져오기

  // 버튼 클릭 시, 새 지출
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true) // 새 지출 기본값을 false에서 true로 바꾸어 열기
    setAddExpenseModalBudgetId(budgetId) // ID 값으로 카테고리 가져오기
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto sbFont">가계부</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>새 예산</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>새 지출</Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start"
          }}
        >
          {budgets.map(budget => {
            // 초기 값 0. 지출 값이 있을 경우 통합하여 가져오기
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)} // 새 지출 버튼
                onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)} // 지출 내역 버튼
              />
            )
          })}
          {/* 카테고리가 없는 경우, 카테고리 없는 카드 생성, 지출 내역은 카테고리 없음이라는 ID로 보이기 */}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
          {/* 예산 카드가 있을 경우, 총 합계 카드 생성 */}
          <TotalBudgetCard />
        </div>
      </Container>
      {/* showAddBudgetModal가 true일 경우 새 예산 카드 보이기 */}
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      {/* showAddExpenseModal가 true일 경우 새 지출 카드 보이기 */}
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
      {/* 해당 ID로 지출 내역 카드 보이기 */}
      <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleClose={() => setViewExpenseModalBudgetId()} />
    </>
  )
}

export default App;
