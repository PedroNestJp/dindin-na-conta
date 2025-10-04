import { useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import { BottomNav } from '@/components/BottomNav';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { History } from '@/pages/History';

const HistoryPage = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { expenses, categories, addExpense, deleteExpense } = useExpenses();

  return (
    <div className="min-h-screen bg-background">
      <History 
        expenses={expenses} 
        categories={categories}
        onDeleteExpense={deleteExpense}
      />
      <BottomNav onAddExpense={() => setIsAddExpenseOpen(true)} />
      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        categories={categories}
        onAddExpense={addExpense}
      />
    </div>
  );
};

export default HistoryPage;
