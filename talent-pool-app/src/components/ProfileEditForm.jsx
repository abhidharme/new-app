import { Formik, Field, ErrorMessage, Form } from 'formik';
import { FileIcon, X } from 'lucide-react';  // Importing the X icon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { JOB_TYPES } from '../utils/constants';
import * as Yup from 'yup';

const ProfileEditForm = ({ uploadedResumeData, handleSubmit, showModal, setShowModal }) => {

  // Function to normalize job_availability to match schema and JOB_TYPES
  const normalizeJobAvailability = (value) => {
    // console.log("shhs", value); // Debug API value
    const normalized = value?.toLowerCase()?.trim();

    const options = {
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      'contract': 'Contract',
      'freelance': 'Freelance',
    };
    // console.log('normalized', options[normalized]); // Debug normalized output
    return options[normalized] || 'Full-Time'; // Default to 'Full-Time' if no match
  };

  // Function to format month and year
  const formatMonthYear = (str) => {
    if (!str || str === 'Present') return ''; // Handle "Present" or empty input
    const [monthName, year] = str.split(' ');
    if (!monthName || !year) return ''; // Handle invalid format
    const monthMap = {
      January: '01', February: '02', March: '03', April: '04',
      May: '05', June: '06', July: '07', August: '08',
      September: '09', October: '10', November: '11', December: '12',
    };
    const month = monthMap[monthName];
    return month && year ? `${year}-${month}` : ''; // Return empty if parsing fails
  };

  // Parse experience data
  const parsedData = uploadedResumeData?.experience?.map((exp) => {
    const durationParts = exp.duration?.split('(')?.[0]?.split('-') || [];
    const startDuration = durationParts[0]?.trim();
    const endDuration = durationParts[1]?.trim();

    const startDateFormatted = formatMonthYear(startDuration);
    const endDateFormatted = formatMonthYear(endDuration);

    return {
      ...exp,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    };
  }) || [{ jobTitle: '', company: '', startDate: '', endDate: '' }];

  // const formatMonthYear = (str) => {
  //   if (!str) return '';
  //   const [monthName, year] = str.split(' ');
  //   const monthMap = {
  //     January: '01', February: '02', March: '03', April: '04',
  //     May: '05', June: '06', July: '07', August: '08',
  //     September: '09', October: '10', November: '11', December: '12',
  //   };
  //   const month = monthMap[monthName];
  //   return `${year}-${month}`;
  // };

  // const parsedData = uploadedResumeData?.experience?.map((exp) => {
  //   const durationParts = exp.duration?.split('(')?.[0]?.split('-') || [];
  //   const startDuration = durationParts[0]?.trim();
  //   const endDuration = durationParts[1]?.trim();

  //   const startDateFormatted = formatMonthYear(startDuration);
  //   const endDateFormatted = formatMonthYear(endDuration);


  //   return {
  //     ...exp,
  //     startDate: startDateFormatted,
  //     endDate: endDateFormatted,
  //   }
  // })

  const initialValues = {
    name: uploadedResumeData?.name || '',
    email: uploadedResumeData?.email || '',
    phone: uploadedResumeData?.phone || '',
    shortBio: uploadedResumeData?.short_bio || '',
    preferred_location: uploadedResumeData?.preferred_location || '',
    industry: uploadedResumeData?.industry || '',
    skills: uploadedResumeData?.skills || '',
    years_of_experience: uploadedResumeData?.years_of_experience || '',
    area_of_interest: uploadedResumeData?.area_of_interest || '',
    job_availability: normalizeJobAvailability(uploadedResumeData?.job_availability) || '',
    experience: parsedData,
    education: uploadedResumeData?.education || [{ degree: '', school: '', startDate: '', endDate: '' }],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .max(255, 'Email must not exceed 255 characters'),

    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be a valid international format (e.g., +1234567890)'),

    shortBio: Yup.string()
      .required('Short bio is required')
      .min(10, 'Short bio must be at least 10 characters')
      .max(500, 'Short bio must not exceed 500 characters'),

    preferred_location: Yup.string()
      .required('Location is required')
      .min(2, 'Location must be at least 2 characters')
      .max(100, 'Location must not exceed 100 characters'),

    skills: Yup.string()
      .required('Skills are required')
      .min(2, 'Skills must be at least 2 characters')
      .max(500, 'Skills must not exceed 500 characters')
      .matches(
        /^[a-zA-Z\s,]+$/,
        'Skills can only contain letters, spaces, and commas (e.g., JavaScript, Python, React)'
      ),

    years_of_experience: Yup.number()
      .required('Years of experience is required')
      .min(0, 'Years of experience cannot be negative')
      .max(50, 'Years of experience must not exceed 50')
      .typeError('Years of experience must be a number'),

    area_of_interest: Yup.string()
      .required('Area of interest is required')
      .min(2, 'Area of interest must be at least 2 characters')
      .max(100, 'Area of interest must not exceed 100 characters'),

    job_availability: Yup.string()
      .required('Job availability is required')
      .oneOf(JOB_TYPES, 'Invalid job availability option'),

    industry: Yup.string()
      .required('Industry is required'),

    experience: Yup.array()
      .of(
        Yup.object({
          position: Yup.string()
            .required('Job title is required')
            .min(2, 'Job title must be at least 2 characters')
            .max(100, 'Job title must not exceed 100 characters'),
          company: Yup.string()
            .required('Company is required')
            .min(2, 'Company must be at least 2 characters')
            .max(100, 'Company must not exceed 100 characters'),
          startDate: Yup.string()
            .required('Start date is required')
            .matches(
              /^\d{4}-\d{2}$/,
              'Start date must be in YYYY-MM format (e.g., 2023-10)'
            ),
          endDate: Yup.string()
            .matches(
              /^\d{4}-\d{2}$/,
              'End date must be in YYYY-MM format (e.g., 2023-10, or leave empty if current)'
            )
            .nullable(),
        })
      )
      .min(1, 'At least one experience entry is required'),

    education: Yup.array()
      .of(
        Yup.object({
          degree: Yup.string()
            .required('Degree is required')
            .min(2, 'Degree must be at least 2 characters')
            .max(100, 'Degree must not exceed 100 characters'),
          year: Yup.string()
            .required("Year is required")
            .nullable(),
        })
      )
      .min(1, 'At least one education entry is required'),
  });

  const onSubmit = (values) => {
    // console.log('values', values)
    let payload = {
      user_id: uploadedResumeData?.user_id,
      values: values
    }
    handleSubmit(payload); // Use the handleSubmit prop
    // Close modal after submit
  };

  const handleFileChange = (e, setFieldValue) => {
    setFieldValue('file', e.target.files[0]);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-4xl overflow-x-auto max-h-[90vh] overflow-y-auto mt-4 relative">

          <p className='text-lg font-semibold mb-3'>{"Edit Profile"}</p>
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowModal(false)} // Close modal on click
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, errors }) => {

              // console.log("errors", errors)
              return <Form className="space-y-6">
                {/* Name */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Field name="name">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="name"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field name="email">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="email"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <Field name="phone">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="phone"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Short Bio */}
                <div className="mb-4">
                  <label htmlFor="shortBio" className="block text-sm font-medium text-gray-700">Short Bio</label>

                  <Field name="shortBio">
                    {({ field, form, meta }) => (
                      <textarea
                        {...field}
                        id="shortBio"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="shortBio" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                  <Field name="industry">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="industry"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="industry" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label htmlFor="preferred_location" className="block text-sm font-medium text-gray-700">Location</label>
                  <Field name="preferred_location">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="preferred_location"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="preferred_location" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                  <Field name="skills">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="skills"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter skills (comma separated)"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="skills" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">{"Total Work Experience"}</label>
                  <Field name="years_of_experience">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="years_of_experience"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter years of experience (comma separated)"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="years_of_experience" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="area_of_interest" className="block text-sm font-medium text-gray-700">Area of Interest</label>
                  <Field name="area_of_interest">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="area_of_interest"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter Area of interest (comma separated)"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="area_of_interest" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* <div className="mb-4">
                  <label htmlFor="job_availability" className="block text-sm font-medium text-gray-700">{"Avalaibility"}</label>
                  <Field name="job_availability">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="job_availability"
                        className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                        placeholder="Enter Area of interest (comma separated)"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="job_availability" component="div" className="text-red-500 text-xs mt-1" />
                </div> */}

                <div className="mb-4">
                  <label htmlFor="job_availability" className="block text-sm font-medium text-gray-700">Availability</label>

                  <Field name="job_availability">
                    {({ field, form }) => (
                      <Select
                        value={field.value || ''} // Use Formik's field value
                        onValueChange={(val) => {
                          form.setFieldValue('job_availability', val); // Update Formik's value
                          form.setFieldTouched('job_availability', true); // Mark field as touched for error handling
                        }}
                      >
                        <SelectTrigger id="job_availability" className="w-full">
                          <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {JOB_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>

                  {/* Error Message for the select field */}
                  <ErrorMessage name="job_availability" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Experience Section */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  {initialValues.experience.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                      <div className="mb-3">
                        <label htmlFor={`experience[${index}].jobTitle`} className="text-sm">Job Title</label>
                        <Field
                          name={`experience[${index}].position`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`experience[${index}].company`} className="text-sm">Company</label>
                        <Field
                          name={`experience[${index}].company`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label htmlFor={`experience[${index}].startDate`} className="text-sm">Start Date</label>
                          <Field
                            type="month"
                            name={`experience[${index}].startDate`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="w-1/2">
                          <label htmlFor={`experience[${index}].endDate`} className="text-sm">End Date</label>
                          <Field
                            type="month"
                            name={`experience[${index}].endDate`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* Education Section */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  {initialValues.education.map((edu, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                      <div className="mb-3">
                        <label htmlFor={`education[${index}].degree`} className="text-sm">Degree</label>
                        <Field
                          name={`education[${index}].degree`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label htmlFor={`education[${index}].startDate`} className="text-sm">Year Attended</label>
                          <Field
                            type="year"
                            name={`education[${index}].year`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>  */}

                {/* Experience Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  {initialValues.experience.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                      <div className="mb-3">
                        <label htmlFor={`experience[${index}].position`} className="text-sm">Job Title</label>
                        <Field
                          name={`experience[${index}].position`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name={`experience[${index}].position`} component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`experience[${index}].company`} className="text-sm">Company</label>
                        <Field
                          name={`experience[${index}].company`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name={`experience[${index}].company`} component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label htmlFor={`experience[${index}].startDate`} className="text-sm">Start Date</label>
                          <Field
                            type="month"
                            name={`experience[${index}].startDate`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                          <ErrorMessage name={`experience[${index}].startDate`} component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="w-1/2">
                          <label htmlFor={`experience[${index}].endDate`} className="text-sm">End Date</label>
                          <Field
                            type="month"
                            name={`experience[${index}].endDate`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                          <ErrorMessage name={`experience[${index}].endDate`} component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  {initialValues.education.map((edu, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4">
                      <div className="mb-3">
                        <label htmlFor={`education[${index}].degree`} className="text-sm">Degree</label>
                        <Field
                          name={`education[${index}].degree`}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name={`education[${index}].degree`} component="div" className="text-red-500 text-xs mt-1" />
                      </div>

                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <label htmlFor={`education[${index}].year`} className="text-sm">Year Attended</label>
                          <Field
                            type="text"
                            name={`education[${index}].year`}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                          <ErrorMessage name={`education[${index}].year`} component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)} // Close modal on cancel
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#239852] text-white rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            }}
          </Formik>
        </div>
      </div >
    )
  )
};

export default ProfileEditForm;
