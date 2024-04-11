
import { useState, ChangeEvent, useMemo, FormEvent } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

	const [budget, setBudget] = useState(0);
	const { dispatch } = useBudget();
	
	const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
		setBudget(e.target.valueAsNumber);
	};

	const isValid = useMemo(() => {
		return isNaN(budget) || budget <= 0;
		
	}, [budget])

	const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({type: "add-budget", payload: {budget}})

	}
	return (
		<>
			<form 
				className="space-y-5"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col space-y-5">
					<label htmlFor="budget" className="text-4xl text-blue-600 text-center">Definir Presupuesto</label>
					<input type="number"  name="budget" id="budget"  
						className="w-full border bg-white border-gray-200 p-2"
						placeholder="Define tu presupuesto"
						value={budget}
						onChange={handleChange}
						/>
				</div>
				<input type="submit"
					value={"Definir Presupuesto"}
					className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full text-white font-black p-2 uppercase rounded disabled:opacity-40"
					disabled={isValid}
				/>
			</form>
		</>
	)
}
