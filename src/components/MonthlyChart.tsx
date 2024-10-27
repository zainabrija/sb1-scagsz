import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Expense {
  amount: number;
  date: string;
}

interface MonthlyChartProps {
  expenses: Expense[];
}

export default function MonthlyChart({ expenses }: MonthlyChartProps) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const monthlyData = months.map((month, index) => {
    const amount = expenses
      .filter(expense => new Date(expense.date).getMonth() === index)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: month,
      amount: Number(amount.toFixed(2))
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Monthly Spending Overview</h2>
      </div>
      
      <div className="h-[400px] w-full">
        {expenses.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Add expenses to see your monthly spending chart
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}