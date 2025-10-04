import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expense, Category } from '@/types/expense';
import { Trash2, Edit, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

interface HistoryProps {
  expenses: Expense[];
  categories: Category[];
  onDeleteExpense: (id: string) => void;
}

export const History = ({ expenses, categories, onDeleteExpense }: HistoryProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const monthMatch = selectedMonth === 'all' || expenseDate.getMonth().toString() === selectedMonth;
    const categoryMatch = selectedCategory === 'all' || expense.categoryId === selectedCategory;
    return monthMatch && categoryMatch;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCategoryById = (id: string) => categories.find(c => c.id === id);

  const months = [
    { value: 'all', label: 'Todos os meses' },
    ...Array.from({ length: 12 }, (_, i) => ({
      value: i.toString(),
      label: format(new Date(2024, i, 1), 'MMMM', { locale: ptBR }),
    })),
  ];

  const handleDelete = () => {
    if (deleteId) {
      onDeleteExpense(deleteId);
      toast.success('Despesa excluída com sucesso!');
      setDeleteId(null);
    }
  };

  return (
    <div className="pb-24 px-4 max-w-md mx-auto">
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Histórico</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Mês</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedExpenses.length === 0 ? (
        <Card className="shadow-soft">
          <CardContent className="py-12 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma despesa encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros acima
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedExpenses.map(expense => {
            const category = getCategoryById(expense.categoryId);
            return (
              <Card key={expense.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category?.color }}
                        />
                        <span className="font-semibold">{category?.name}</span>
                      </div>
                      <p className="text-2xl font-bold mb-1">
                        R$ {expense.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(new Date(expense.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      {expense.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          {expense.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(expense.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta despesa? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
