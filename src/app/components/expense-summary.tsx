import { Expense } from './expense-form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: DollarSign,
      description: `${expenses.length} transactions`,
    },
    {
      title: 'This Month',
      value: formatCurrency(monthlyExpenses),
      icon: Calendar,
      description: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    {
      title: 'Average Expense',
      value: formatCurrency(avgExpense),
      icon: TrendingUp,
      description: 'Per transaction',
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'N/A',
      icon: PieChart,
      description: topCategory ? formatCurrency(topCategory[1]) : 'No data',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
