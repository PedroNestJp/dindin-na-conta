import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseChart } from '@/components/ExpenseChart';
import { Expense, Category } from '@/types/expense';
import { TrendingUp, Wallet, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DashboardProps {
  expenses: Expense[];
  categories: Category[];
}

export const Dashboard = ({ expenses, categories }: DashboardProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter(e => {
    const expenseDate = new Date(e.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const totalAmount = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryBreakdown = categories.map(category => {
    const categoryTotal = monthlyExpenses
      .filter(e => e.categoryId === category.id)
      .reduce((sum, e) => sum + e.amount, 0);
    
    return {
      ...category,
      total: categoryTotal,
      percentage: totalAmount > 0 ? (categoryTotal / totalAmount) * 100 : 0,
    };
  }).filter(c => c.total > 0);

  return (
    <div className="pb-24 px-4 max-w-md mx-auto">
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-2">Minhas Finanças</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}</span>
        </div>
      </div>

      <Card className="mb-6 gradient-card shadow-medium border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total do Mês</p>
              <p className="text-4xl font-bold">
                R$ {totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{monthlyExpenses.length} despesas registradas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {categoryBreakdown.length > 0 && (
        <>
          <Card className="mb-6 shadow-soft">
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart expenses={monthlyExpenses} categories={categories} />
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Resumo das Categorias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryBreakdown.map(category => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <span className="font-bold">R$ {category.total.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {category.percentage.toFixed(1)}% do total
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {monthlyExpenses.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="py-12 text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma despesa este mês</h3>
            <p className="text-muted-foreground">
              Comece adicionando suas primeiras despesas usando o botão + abaixo
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
