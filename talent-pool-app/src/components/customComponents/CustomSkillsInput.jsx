import { useState } from 'react';
import { ErrorMessage, FieldArray, useFormikContext } from 'formik';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CustomSkillsInput = ({ setFieldTouched }) => {
	const [inputValue, setInputValue] = useState('');
	const { values } = useFormikContext();

	const handleKeyDown = (e, arrayHelpers) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			const skill = inputValue.trim();

			// Avoid adding duplicates and skills exceeding the limit
			if (!values.skills.includes(skill)) {
				arrayHelpers.push(skill);
			}
			setInputValue('');
		}
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="skills">Required Skills</Label>

			<FieldArray name="skills">
				{(arrayHelpers) => (
					<>
						<Input
							id="skills"
							name="skills"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value)
								setFieldTouched('skills', true);
							}}
							onKeyDown={(e) => handleKeyDown(e, arrayHelpers)}
							placeholder="Type a skill and press Enter"
						/>

						<div className="flex flex-wrap gap-2 mt-2">
							{values.skills?.map((skill, index) => (
								<div
									key={index}
									className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full"
								>
									{skill}
									<button
										type="button"
										onClick={() => arrayHelpers.remove(index)}
										className="ml-2 text-gray-500 hover:text-red-500"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							))}
						</div>

						{/* Error Message */}
						<ErrorMessage
							name="skills"
							component="div"
							className="text-red-500 text-sm mt-1"
						/>
					</>
				)}
			</FieldArray>
		</div>
	);
};

export default CustomSkillsInput;
