import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

interface Expense {
  amount: number;
  category: string;
  date: string;
}

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const currentMonth = new Date().getMonth();
  const monthlyExpenses = expenses
    .filter(expense => new Date(expense.date).getMonth() === currentMonth)
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Top Category</p>
            <p className="text-2xl font-bold text-gray-900 capitalize">
              {topCategory ? topCategory[0] : 'N/A'}
            </p>
            {topCategory && (
              <p className="text-sm text-gray-500">${topCategory[1].toFixed(2)}</p>
            )}
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">${monthlyExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}