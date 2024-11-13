import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && category) {
      const expense = {
        id: uuidv4(),
        description:' ',
        amount: parseFloat(amount),
        category,
      };
      onAddExpense(expense);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="  bg-white p-4 rounded-lg mb-4">
    
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded-lg w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br/>
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 rounded-lg w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      /><br/>
      <select
        className="border p-2 rounded-lg w-full mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Emergency">Emergency</option>
        <option value="Education">Education</option>
        <option value="Transportation">Transportation</option>
        <option value="Utilities">Utilities</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select><br/>
      <button type="submit" className=" bg-green-500 text-white px-4 py-2 rounded-lg w-full">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
