// import React from 'react';
// import { Icon } from "react-icons-kit";
// import { trash } from "react-icons-kit/feather/trash";
// import { edit2 } from "react-icons-kit/feather/edit2";

// function ExpenseList({ expenses, onRemoveExpense,remaining }) {
  
//   return (
//     <div className="bg-white p-4 rounded-lg">
//       <h2 className="text-lg font-semibold mb-2">All Expenses </h2>
//       <ul>
//         {expenses.map((expense) => (
//           <li key={expense.id} className="flex justify-between items-center mb-2 border-b pb-1">
//             {/* <span>{`${expense.description}   (${expense.amount.toFixed(2)})  ${expense.category}  `}</span> */}
            
//            <span>{`${expense.category}`}</span>
//            <span>{`${expense.description}`}</span>
//       <span>{`${expense.amount} RS`}</span>
//             <button onClick={() => onRemoveExpense(expense.id)} className="text-red-500 "><Icon icon={trash}  /></button>
          
//           </li>
         
//         ))}
        
//       </ul>
//       <p>{`Remaining Budget: ${remaining} RS`}</p>
     
//     </div>
//   );
// }

// export default ExpenseList;




import React, { useState } from 'react';
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { edit2 } from "react-icons-kit/feather/edit2";

function ExpenseList({ expenses, onEditExpense, onRemoveExpense,remaining }) {
  const [editing, setEditing] = useState(null);
  const [editDesc, setEditDesc] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const handleEditClick = (expense) => {
    setEditing(expense.id);
    setEditDesc(expense.description);
    setEditAmount(expense.amount);
  };

  const handleSave = () => {
    onEditExpense({ id: editing, description: editDesc, amount: parseFloat(editAmount) });
    setEditing(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Expenses</h2>
      
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center mb-2 border-b pb-1">
            {editing === expense.id ? (
              <>
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="border rounded mr-2"
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="border rounded mr-2"
                />
                <button onClick={handleSave} className="text-green-500">Save</button>
              </>
            ) : (
              <>
                {/* <span>{expense.description} </span> */}
                <span>{`${expense.amount.toFixed(2)} RS`}</span>
                <span> {expense.category}</span>
                <div>
                  <button onClick={() => handleEditClick(expense)} className="text-blue-500 mr-2">  <Icon icon={edit2} /></button>
                  <button onClick={() => onRemoveExpense(expense.id)} className="text-red-500">  <Icon icon={trash} /></button>
                </div>
              </>
            )} 
            
          </li>
        ))}
        {/* <p>{`Remaining Budget: ${remaining} RS`}</p> */}
      </ul>
      
    </div>
  );
}

export default ExpenseList;

