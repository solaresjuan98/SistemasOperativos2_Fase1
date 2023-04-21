
import { ChangeEvent, useState } from 'react';


export const useForm = <T>(initialState: T) => {

	const [formData, setFormData] = useState<T>(initialState);


	const onChangeForm = (ev: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = ev.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};


	const isNotEmpty = (field: string): boolean => {

		return (field.trim().length > 0) ? true : false;
	};

	// const hasEmailFormat = (field: string) => {

	// 	const emailRegex = /\S+@\S+\.\S+/;

	// 	return emailRegex.test(field) ? true : false;
	// };

	return {
		onChangeForm,
		isNotEmpty,
		//hasEmailFormat,
		formData
	};


};
