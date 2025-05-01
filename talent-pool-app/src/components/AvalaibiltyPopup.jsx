import { Field, Formik } from "formik"
import { Form } from "react-hook-form"

const AvailabilityPopup = () => {

	const initialValues = {
		weekdays: ['Monday', 'Friday'], // Pre-checked based on the image
		workHour: { hours: '', minutes: '', period: 'AM' },
		workMode: 'Remote', // Pre-selected based on the image
	};

	// Handle form submission
	const onSubmit = (values, { setSubmitting }) => {
		// console.log('Form data:', values);
		setSubmitting(false);
	};

	// Validation (optional, can be expanded)
	const validate = (values) => {
		const errors = {};
		if (!values.workHour.hours || !values.workHour.minutes) {
			errors.workHour = 'Work hours are required';
		}
		return errors;
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg  relative">
				<h2 className="text-xl font-semibold mb-4 text-gray-800">{"Availability"}</h2>

				<Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
					{({ values, errors }) => (
						<Form className="space-y-6">
							{/* Weekdays Section */}
							<fieldset className="space-y-2">
								<legend className="font-medium text-gray-700 mb-2">Select Weekdays</legend>

								{/* Week Days Section */}
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
									{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
										<label key={day} className="flex items-center space-x-2 cursor-pointer">
											<div className="relative">
												<Field
													type="checkbox"
													name="weekdays"
													value={day}
													className="absolute opacity-0 h-5 w-5"
													aria-label={`Select ${day}`}
												/>
												<span
													className={`h-5 w-5 border rounded flex items-center justify-center transition-colors ${values.weekdays.includes(day)
														? 'bg-[#239852] border-[#239852]'
														: 'bg-white border-gray-300'
														}`}
												>
													{values.weekdays.includes(day) && (
														<span className="text-white text-lg font-semibold">✓</span>
													)}
												</span>
											</div>
											<span className="text-gray-600">{day}</span>
										</label>
									))}
								</div>
							</fieldset>

							{/* Work Hour Section */}
							<fieldset className="space-y-2">
								<legend className="font-medium text-gray-700 mb-2">Work Hours</legend>
								<div className="flex items-center space-x-3">
									<Field
										name="workHour.hours"
										type="number"
										min="1"
										max="12"
										placeholder="HH"
										className="border rounded-md p-2 w-16 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
										aria-label="Hours"
									/>
									<span className="text-gray-500">:</span>
									<Field
										name="workHour.minutes"
										type="number"
										min="0"
										max="59"
										placeholder="MM"
										className="border rounded-md p-2 w-16 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
										aria-label="Minutes"
									/>
									<Field
										as="select"
										name="workHour.period"
										className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
										aria-label="AM/PM"
									>
										<option value="AM">AM</option>
										<option value="PM">PM</option>
									</Field>
								</div>
								{errors.workHour && (
									<p className="text-red-500 text-sm mt-1">{errors.workHour}</p>
								)}
							</fieldset>

							{/* Work Mode Section */}
							<fieldset className="space-y-2">
								<legend className="font-medium text-gray-700 mb-2">Work Mode</legend>
								<div className="flex flex-wrap gap-4">
									{['Remote', 'Hybrid', 'Part-Time', 'Any Location'].map((mode) => (
										<label key={mode} className="flex items-center space-x-2 cursor-pointer">
											<div className="relative">
												<Field
													type="radio"
													name="workMode"
													value={mode}
													className="absolute opacity-0 h-5 w-5"
													aria-label={`Work mode: ${mode}`}
												/>
												<span
													className={`h-5 w-5 border rounded-full flex items-center justify-center transition-colors ${values.workMode === mode
														? 'bg-[#239852] border-[#239852]'
														: 'bg-white border-gray-300'
														}`}
												>
													{values.workMode === mode && (
														<span className="text-white text-lg font-bold">✔</span>
													)}
												</span>
											</div>
											<span className="text-gray-600">{mode}</span>
										</label>
									))}
								</div>
							</fieldset>

							{/* Buttons */}
							<div className="flex justify-end space-x-3 mt-6">
								<button
									type="submit"
									className="bg-[#239852] text-white px-5 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
								>
									Update
								</button>
								<button
									type="button"
									// onClick={onClose}
									className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
								>
									Cancel
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default AvailabilityPopup;

