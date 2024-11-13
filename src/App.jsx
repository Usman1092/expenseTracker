// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Budget from './Components/Budget'
// import ExpenseForm from './Components/ExpenseForm'
// import ExpenseList from './Components/ExpenseList'
// function App() {
//   // const [count, setCount] = useState(0)
//   const [budget, setBudget] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [remainingBudget, setRemainingBudget] = useState(0);

//   // Update the budget and reset remaining budget
//   const handleSetBudget = (amount) => {
//     setBudget(amount);
//     setRemainingBudget(amount);
//   };

//   // Add a new expense
//   const handleAddExpense = (expense) => {
//     setExpenses((prevExpenses) => [...prevExpenses, expense]);
//     setRemainingBudget((prev) => prev - expense.amount);
//   };

//   // Remove an expense
//   const handleRemoveExpense = (id) => {
//     const updatedExpenses = expenses.filter((expense) => expense.id !== id);
//     const removedExpense = expenses.find((expense) => expense.id === id);
//     setExpenses(updatedExpenses);
//     setRemainingBudget((prev) => prev + removedExpense.amount);
//   };
//   return (
//     <>
//       <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
//       <Budget onSetBudget={handleSetBudget} budget={budget}  />
//       <ExpenseForm onAddExpense={handleAddExpense} />
//       <ExpenseList expenses={expenses} onRemoveExpense={handleRemoveExpense} remaining={remainingBudget}/>
     
//     </div>
//       {/* <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//     </>
//   )
// }

// export default App



import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Budget from './components/Budget';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExpensePDF from './components/ExpensePDF';

function App() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [isBudgetSet, setIsBudgetSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load data from local storage on mount
  useEffect(() => {
    const loadData = async () => {
      const savedBudget = await localStorage.getItem('budget');
      const savedExpenses = await localStorage.getItem('expenses');
      setBudget(savedBudget || 0);
      setExpenses(savedExpenses || []);
      setRemainingBudget(savedBudget || 0);
      setIsBudgetSet(!!savedBudget);
    };
    loadData();
  }, []);

  // Save data to local storage on change
  useEffect(() => {
    localStorage.setItem('budget', budget);
    localStorage.setItem('expenses', expenses);
  }, [budget, expenses]);

  const handleSetBudget = (amount) => {
    setBudget(amount);
    setRemainingBudget(amount);
    setIsBudgetSet(true);
    setErrorMessage('');
  };

  const handleAddExpense = (expense) => {
    if (!isBudgetSet) {
      setErrorMessage('Please enter your budget first.');
      return;
    }
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    setRemainingBudget((prev) => prev - expense.amount);
    setErrorMessage('');
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prevExpenses) => 
      prevExpenses.map((expense) => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setRemainingBudget(budget - expenses.reduce((total, exp) => total + exp.amount, 0));
  };

  const handleRemoveExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    const removedExpense = expenses.find((expense) => expense.id === id);
    setExpenses(updatedExpenses);
    setRemainingBudget((prev) => prev + removedExpense.amount);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
      <Budget onSetBudget={handleSetBudget} budget={budget} remaining={remainingBudget} />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onEditExpense={handleEditExpense} onRemoveExpense={handleRemoveExpense} remaining={remainingBudget}  />
      <div className="mt-4 text-center">
        <PDFDownloadLink document={<ExpensePDF expenses={expenses} budget={budget}  />} fileName="expense_report.pdf">
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Expense List')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;
