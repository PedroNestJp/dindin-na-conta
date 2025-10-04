export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isPredefined: boolean;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'rent', name: 'Aluguel', icon: 'Home', color: 'hsl(160 84% 39%)', isPredefined: true },
  { id: 'groceries', name: 'Mercado', icon: 'ShoppingCart', color: 'hsl(38 92% 50%)', isPredefined: true },
  { id: 'water', name: 'Conta de Água', icon: 'Droplet', color: 'hsl(199 89% 48%)', isPredefined: true },
  { id: 'energy', name: 'Conta de Energia', icon: 'Zap', color: 'hsl(45 93% 47%)', isPredefined: true },
  { id: 'credit', name: 'Cartões de Crédito', icon: 'CreditCard', color: 'hsl(280 65% 60%)', isPredefined: true },
  { id: 'school', name: 'Escola dos Filhos', icon: 'GraduationCap', color: 'hsl(217 91% 60%)', isPredefined: true },
];
