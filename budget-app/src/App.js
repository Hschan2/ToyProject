import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import AddBudgetModal from './component/AddBudgetModal';
import AddExpenseModal from './component/AddExpenseModal';
import BudgetCard from './component/BudgetCard'
import TotalBudgetCard from './component/TotalBudgetCard';
import UncategorizedBudgetCard from './component/UncategorizedBudgetCard';
import ViewExpenseModal from './component/ViewExpenseModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contents/BudgetContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto font-weight-bold">BUDGETS</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
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
            // 초기 값 0
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleClose={() => setViewExpenseModalBudgetId()} />
    </>
  )
}

export default App;
