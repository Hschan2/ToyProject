import React, { useContext } from 'react'
import { v4 as uuidV4 } from "uuid" // 네트워크 상 고유성이 보장되는 ID 생성
import useLocalStorage from '../hooks/useLocalStorage'

// useContext - 사용할 Props를 글로벌하게 사용할 수 있도록 도와줌
// 부모 클래스에서 자식 클래스로 혹은 자식의 자식 클래스로 Props를 넘겨주는 역할을 도와줌
const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "선택되지 않음"

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    // 예산, 지출 값 LocalStorage에 저장할 변수 선언
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    // 해당 ID와 같은 예산의 지출 모두 가져오기
    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    // 지출 추가. 설명, 금액, 해당 예산 ID 값으로 저장
    // 이전 지출내역을 포함해서 저장
    function addExpense({ description, amount, budgetId, time }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId, time }]
        })
    }

    // 예산 추가. 예산명과 총 금액으로 저장
    // 이전 예산을 포함하며 기존 이름과 같은 예산이 있을 경우 기존 예산을 사용
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }

            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    function updateBudget({ expenseId, description, amount }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.id === expenseId) {
                    return {
                        ...expense,
                        description: description,
                        amount: amount
                    }
                }

                return expense
            })
        })
    }

    // 예산 삭제. 해당 id를 활용해서 삭제
    // 해당 예산에 있는 지출 내역도 모두 삭제 (카테고리 없음으로 변경)
    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
            // return prevExpenses.map(expense => {
            //     if (expense.budgetId !== id) return expense
            //     return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            // })
            return prevExpenses.filter(expense => expense.budgetId !== id);
        })
        // Todo: Expense 다루기
        // 예산 ID가 삭제할 예산과 다른 경우만 저장
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    // ID를 활용해서 지출 삭제.
    // 지출 ID와 삭제할 ID가 다른 경우만 저장
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            updateBudget,
            deleteBudget,
            deleteExpense,
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}