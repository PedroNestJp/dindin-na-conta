import { useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import { BottomNav } from '@/components/BottomNav';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { Categories } from '@/pages/Categories';

const CategoriesPage = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const {
    expenses,
    categories,
    addExpense,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useExpenses();

  return (
    <div className="min-h-screen bg-background">
      <Categories
        categories={categories}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
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

export default CategoriesPage;
