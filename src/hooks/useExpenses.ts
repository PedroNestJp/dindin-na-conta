import { useState, useEffect } from 'react';
import { Expense, Category, DEFAULT_CATEGORIES } from '@/types/expense';

const EXPENSES_KEY = 'finance-app-expenses';
const CATEGORIES_KEY = 'finance-app-categories';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    const savedExpenses = localStorage.getItem(EXPENSES_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(newExpenses));
  };

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCategories));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, expense: Partial<Expense>) => {
    const updated = expenses.map(e => e.id === id ? { ...e, ...expense } : e);
    saveExpenses(updated);
  };

  const deleteExpense = (id: string) => {
    saveExpenses(expenses.filter(e => e.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    saveCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const updated = categories.map(c => c.id === id ? { ...c, ...category } : c);
    saveCategories(updated);
  };

  const deleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category?.isPredefined) return;
    saveCategories(categories.filter(c => c.id !== id));
  };

  return {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
