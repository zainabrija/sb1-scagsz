import React, { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import MonthlyChart from './components/MonthlyChart';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

// Sample test data
const testData: Expense[] = [
  {
    id: '1',
    amount: 120.50,
    description: 'Grocery shopping',
    category: 'food',
    date: '2024-03-15'
  },
  {
    id: '2',
    amount: 45.00,
    description: 'Gas',
    category: 'transportation',
    date: '2024-02-20'
  },
  {
    id: '3',
    amount: 200.00,
    description: 'Electricity bill',
    category: 'utilities',
    date: '2024-01-10'
  },
  {
    id: '4',
    amount: 75.30,
    description: 'Restaurant',
    category: 'food',
    date: '2024-03-01'
  }
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : testData; // Use test data as initial state
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expenseData,
      id: crypto.randomUUID(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Receipt className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Expense Tracker</h1>
          </div>
        </div>

        <ExpenseSummary expenses={expenses} />
        <MonthlyChart expenses={expenses} />
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
      </div>
    </div>
  );
}

export default App;