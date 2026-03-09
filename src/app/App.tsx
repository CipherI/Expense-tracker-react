import { useState, useEffect, useMemo, useCallback } from 'react';
import { ExpenseForm, Expense } from './components/expense-form';
import { ExpenseList } from './components/expense-list';
import { ExpenseSummary } from './components/expense-summary';
import { ExpenseChart } from './components/expense-chart';
import { ExpenseFilter } from './components/expense-filter';
import { Wallet } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { fetchMockExpenses } from './utils/mockApi';

const STORAGE_KEY = 'expense-tracker-data';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch and display data from a mock API
  useEffect(() => {
    const loadExpenses = async () => {
      // First, check localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setExpenses(parsed);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load expenses:', error);
        }
      } else {
        // If no stored data, fetch from mock API
        try {
          const mockData = await fetchMockExpenses();
          setExpenses(mockData);
          toast.success('Loaded sample expenses from API');
        } catch (error) {
          console.error('Failed to fetch expenses:', error);
          toast.error('Failed to load expenses');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadExpenses();
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isLoading]);

  // useCallback to optimize callback functions
  const handleAddExpense = useCallback((expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    toast.success('Expense added successfully!');
  }, []);

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Expense deleted');
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // useMemo to optimize expensive filtering operation
  const filteredExpenses = useMemo(() => {
    console.log('Filtering expenses...'); // Log to show memoization working
    return selectedCategory === 'all'
      ? expenses
      : expenses.filter(expense => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  // useMemo to optimize summary calculations
  const expenseStats = useMemo(() => {
    console.log('Calculating stats...'); // Log to show memoization working
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = expenses.length;
    return { total, count };
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="h-8 w-8 text-primary" />
              <h1 className="text-4xl">Expense Tracker</h1>
            </div>
            <p className="text-muted-foreground">
              Track and manage your expenses with ease
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6">
            <ExpenseSummary expenses={expenses} />
          </div>

          {/* Charts */}
          <div className="mb-6">
            <ExpenseChart expenses={expenses} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-1 space-y-6">
  <ExpenseForm onAddExpense={handleAddExpense} />
  <ExpenseFilter
    selectedCategory={selectedCategory}
    onCategoryChange={handleCategoryChange}
  />
</div>
            </div>
            <div className="lg:col-span-2">
              <ExpenseList
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </div>
        
      
      <Toaster />
    </>
  );
}