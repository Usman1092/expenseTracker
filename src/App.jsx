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




//2nd final step
// import React, { useState, useEffect } from 'react';
// import localforage from 'localforage';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import Budget from './components/Budget';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import ExpensePDF from './components/ExpensePDF';

// function App() {
//   const [budget, setBudget] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [remainingBudget, setRemainingBudget] = useState(0);
//   const [isBudgetSet, setIsBudgetSet] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Load data from local storage on mount
//   useEffect(() => {
//     const loadData = async () => {
//       const savedBudget = await localforage.getItem('budget');
//       const savedExpenses = await localforage.getItem('expenses');
//       setBudget(savedBudget || 0);
//       setExpenses(savedExpenses || []);
//       setRemainingBudget(savedBudget || 0);
//       setIsBudgetSet(!!savedBudget);
//     };
//     loadData();
//   }, []);

//   // Save data to local storage on change
//   useEffect(() => {
//     localforage.setItem('budget', budget);
//     localforage.setItem('expenses', expenses);
    
//   }, [budget, expenses]);

//   console.log(budget);
//   console.log(expenses);
//   const handleSetBudget = (amount) => {
//     setBudget(amount);
//     setRemainingBudget(amount);
//     setIsBudgetSet(true);
//     setErrorMessage('');
//   };

//   const handleAddExpense = (expense) => {
//     if (!isBudgetSet) {
//       setErrorMessage('Please enter your budget first.');
//       return;
//     }
//     setExpenses((prevExpenses) => [...prevExpenses, expense]);
//     setRemainingBudget((prev) => prev - expense.amount);
//     setErrorMessage('');
//   };

//   const handleEditExpense = (updatedExpense) => {
//     setExpenses((prevExpenses) => 
//       prevExpenses.map((expense) => 
//         expense.id === updatedExpense.id ? updatedExpense : expense
//       )
//     );
//     setRemainingBudget(budget - expenses.reduce((total, exp) => total + exp.amount, 0));
//   };

//   const handleRemoveExpense = (id) => {
//     const updatedExpenses = expenses.filter((expense) => expense.id !== id);
//     const removedExpense = expenses.find((expense) => expense.id === id);
//     setExpenses(updatedExpenses);
//     setRemainingBudget((prev) => prev + removedExpense.amount);
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen ">
     
   
//       <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
//       <Budget onSetBudget={handleSetBudget} budget={budget} remaining={remainingBudget} />
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <ExpenseForm onAddExpense={handleAddExpense} />
   
     
//       <ExpenseList expenses={expenses} onEditExpense={handleEditExpense} onRemoveExpense={handleRemoveExpense} remaining={remainingBudget}  />
//       <div className="mt-4 text-center">
//         <PDFDownloadLink document={<ExpensePDF expenses={expenses} budget={budget}  />} fileName="expense_report.pdf">
//           {({ loading }) => (loading ? 'Generating PDF...' : 'Download Expense List')}
//         </PDFDownloadLink>
//       </div>
//       </div>
     
   
//   );
// }

// export default App;






// import React, { useState, useEffect } from 'react';
// import localforage from 'localforage';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import Budget from './components/Budget';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import ExpensePDF from './components/ExpensePDF';

// function App() {
//   const [budget, setBudget] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [remainingBudget, setRemainingBudget] = useState(0);
//   const [isBudgetSet, setIsBudgetSet] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [totalExpenses, setTotalExpenses] = useState(0);
//   const [budgetExceeded, setBudgetExceeded] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       const savedBudget = await localforage.getItem('budget');
//       const savedExpenses = await localforage.getItem('expenses');
//       setBudget(savedBudget || 0);
//       setExpenses(savedExpenses || []);
//       setRemainingBudget(savedBudget || 0);
//       setIsBudgetSet(!!savedBudget);
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     localforage.setItem('budget', budget);
//     localforage.setItem('expenses', expenses);
//     const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
//     setTotalExpenses(total);
//     setRemainingBudget(budget - total);
//   }, [budget, expenses]);

//   const handleSetBudget = (amount) => {
//     setBudget(amount);
//     setRemainingBudget(amount);
//     setIsBudgetSet(true);
//     setErrorMessage('');
//     setBudgetExceeded(false);
//   };

//   const handleAddExpense = (expense) => {
//     if (!isBudgetSet) {
//       setErrorMessage('Please enter your budget first.');
//       return;
//     }
//     setExpenses((prevExpenses) => [...prevExpenses, expense]);
//     setErrorMessage('');
//   };

//   const handleEditExpense = (updatedExpense) => {
//     setExpenses((prevExpenses) =>
//       prevExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
//     );
//   };

//   const handleRemoveExpense = (id) => {
//     const updatedExpenses = expenses.filter((expense) => expense.id !== id);
//     const removedExpense = expenses.find((expense) => expense.id === id);
//     setExpenses(updatedExpenses);
//   };

//   const groupExpensesByDate = () => {
//     return expenses.reduce((grouped, expense) => {
//       const date = expense.date;
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
//       grouped[date].push(expense);
//       return grouped;
//     }, {});
//   };
//   return (
//     <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
//       <Budget onSetBudget={handleSetBudget} budget={budget} remaining={remainingBudget} />
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       {budgetExceeded && <p className="text-red-500">Warning: Expenses have exceeded the set budget!</p>}
//       <ExpenseForm onAddExpense={handleAddExpense} />
//       <ExpenseList expenses={expenses} onEditExpense={handleEditExpense} onRemoveExpense={handleRemoveExpense} />
//       <div className="mt-2 text-lg font-bold">Total Expenses: {`${totalExpenses.toFixed(2)} RS`}</div>
      
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Expense History by Date</h2>
//         {Object.entries(groupExpensesByDate()).map(([date, expenses]) => (
//           <div key={date} className="bg-white p-4 rounded-lg shadow-md mb-4">
//             <h3 className="font-bold mb-2">{date}</h3>
//             <ul>
//               {expenses.map((expense) => (
//                 <li key={expense.id}>
//                   {expense.description}: ${expense.amount.toFixed(2)} ({expense.category})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 text-center">
//         <PDFDownloadLink document={<ExpensePDF expenses={expenses} budget={budget} />} fileName="expense_report.pdf">
//           {({ loading }) => (loading ? 'Generating PDF...' : 'Download Expense List')}
//         </PDFDownloadLink>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Budget from './components/Budget';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ExpensePDF from './components/ExpensePDF';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginBottom: 4,
    paddingBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  tableCol: {
    flex: 1,
    fontSize: 12,
  },
  groupContainer: {
    marginVertical: 10,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
function App() {
  
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? JSON.parse(savedBudget) : 0;
  });
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [remainingBudget, setRemainingBudget] = useState(budget);
  const [isBudgetSet, setIsBudgetSet] = useState(budget > 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
console.log(budget);
  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('expenses', JSON.stringify(expenses));

    const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    setTotalExpenses(total);
    setRemainingBudget(budget - total);
    setBudgetExceeded(total > budget);
  }, [budget, expenses]);

  const handleSetBudget = (amount) => {
    setBudget(amount);
    setRemainingBudget(amount);
    setIsBudgetSet(true);
    setErrorMessage('');
    setBudgetExceeded(false);
  };

  const handleAddExpense = (expense) => {
    if (!isBudgetSet) {
      setErrorMessage('Please enter your budget first.');
      return;
    }
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    setErrorMessage('');
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const groupExpensesByDate = () => {
    return expenses.reduce((grouped, expense) => {
      const date = expense.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(expense);
      return grouped;
    }, {});
  };
  console.log(totalExpenses);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>
      <Budget onSetBudget={handleSetBudget} budget={budget} remaining={remainingBudget} />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {budgetExceeded && <p className="text-red-500">Warning: Expenses have exceeded the set budget!</p>}
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onEditExpense={handleEditExpense} onRemoveExpense={handleRemoveExpense} />
      <div className="mt-2 text-lg font-bold">Total Expenses:{`${totalExpenses.toFixed(2)} RS`} </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Expense History by Date</h2>
        
          {Object.entries(groupExpensesByDate()).map(([date, expenses]) => (
          <div key={date} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-bold mb-2">{`Date: ${date}`}</h3>
            <ul>
            <div class="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 text-left uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                
               
            </tr>
        </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"> 
                {/* <li key={expense.id}> */}
                 <td class="px-6 py-4">{expense.description}</td>
                  <td class="px-6 py-4">{expense.amount}</td>
                  <td class="px-6 py-4">{expense.category}</td>
         
                
                  {/* {` (${expense.description})     =>      Amount: ${expense.amount} RS     =>      (${expense.category})`} */}
                {/* </li>  */}
                 </tr>
              ))}
              </tbody>
             </table>
             </div>
            </ul>
          </div>
        ))}
      
      </div>
      <div className="mt-4 text-center">
       <button className=' px-4 py-4 bg-[#000] text-white rounded-md hover:text-[#26355D] hover:font-bold hover:bg-[#FF8F00] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-[#FF8F00] duration-300  '> <PDFDownloadLink document={<ExpensePDF expenses={expenses} budget={budget} />} fileName="expense_report.pdf">
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Expense List')}
        </PDFDownloadLink></button>
      </div>
    </div>
  );
}

export default App;
