import { useState, ChangeEvent, FormEvent } from 'react';
import { categories } from '../data/categories'
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';


export default function ExpenseForm() {


	const [expense, setExpense] = useState<DraftExpense>({
		expenseName: '',
		amount: 0,
		category: '',
		date: new Date()
	})

	const [error, setError] = useState('');
	const {dispatch} = useBudget();

	const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const {name, value} = e.target;
		const isAmountField = ['amount'].includes(name);
		setExpense({
			...expense,
			[name]: isAmountField? +value : value
		})
		
	}

	const handleChangeDate = (value : Value) => {
		setExpense({
			...expense,
			date: value	
		})
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//Validar
		if(Object.values(expense).some(value => value === '')) {
			setError('Todos los campos son obligatorios');
			return;
		}
		//Agregar un nuevo gasto
		dispatch({type: 'add-expense', payload:{ expense}})

		//Reiniciar el state
		setExpense({
			expenseName: '',
			amount: 0,
			category: '',
			date: new Date()
		})
		
	}

	return (
		<form className='space-y-5' onSubmit={handleSubmit }>
			<legend
				className='uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500'
			>Nuevo Gasto</legend>

			{error && <ErrorMessage>
					{error}
				</ErrorMessage>}

			<div className='flex flex-col gap-2'>
				<label htmlFor="expenseName" className='text-xl'>Nombre del Gasto:</label>
				<input type="text" id='expenseName' placeholder='Escribe el nombre del Gasto' 
					className='bg-slate-100 p-2'
					name='expenseName'
					value={expense.expenseName}
					onChange={handleChange}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor="amount" className='text-xl'>Cantidad del Gasto:</label>
				<input type="number" id='amount' placeholder='Agrega la cantidad del gasto: ej.300 ' 
					className='bg-slate-100 p-2'
					name='amount'
					value={expense.amount}
					onChange={handleChange}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor="category" className='text-xl'>Categoria del Gasto:</label>
				<select id='category'
					className='bg-slate-100 p-2'
					name='category'
					value={expense.category}
					onChange={handleChange}
				> 
					<option value={""}>--Seleccione--</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor="expenseName" className='text-xl'>Fecha del Gasto:</label>
				<DatePicker
					className={"bg-slate-100 p-2 border-0"}
					value={expense.date}
					onChange={handleChangeDate}
				/>
			</div>

			<input type="submit" 
				className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
				value={"Registrar Gasto"}
			/>
		</form>
	)
}