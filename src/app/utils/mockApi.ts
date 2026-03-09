import { Expense } from '../components/expense-form';

// Mock API to simulate fetching initial expense data
export const fetchMockExpenses = async (): Promise<Expense[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const mockExpenses: Expense[] = [
    {
      id: crypto.randomUUID(),
      amount: 45.99,
      category: 'Food & Dining',
      description: 'Lunch at Italian Restaurant',
      date: '2026-03-08',
    },
    {
      id: crypto.randomUUID(),
      amount: 120.00,
      category: 'Bills & Utilities',
      description: 'Monthly Internet Bill',
      date: '2026-03-05',
    },
    {
      id: crypto.randomUUID(),
      amount: 35.50,
      category: 'Transportation',
      description: 'Gas Station Fill-up',
      date: '2026-03-07',
    },
    {
      id: crypto.randomUUID(),
      amount: 89.99,
      category: 'Shopping',
      description: 'New Running Shoes',
      date: '2026-03-06',
    },
    {
      id: crypto.randomUUID(),
      amount: 15.00,
      category: 'Entertainment',
      description: 'Movie Tickets',
      date: '2026-03-04',
    },
    {
      id: crypto.randomUUID(),
      amount: 67.25,
      category: 'Food & Dining',
      description: 'Grocery Shopping',
      date: '2026-03-03',
    },
    {
      id: crypto.randomUUID(),
      amount: 25.00,
      category: 'Healthcare',
      description: 'Pharmacy - Vitamins',
      date: '2026-03-02',
    },
    {
      id: crypto.randomUUID(),
      amount: 200.00,
      category: 'Travel',
      description: 'Flight Booking Deposit',
      date: '2026-02-28',
    },
  ];

  return mockExpenses;
};
