import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';
import { JOB_TYPES } from '../../utils/constants';
import CustomSkillsInput from '../../components/customComponents/CustomSkillsInput';
import { postJobs } from '../../redux/slices/jobSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useLoader from '../../hooks/useLoader'; // Ensure correct path

function JobPosts() {
  const dispatch = useDispatch();
  const handleLoader = useLoader();

  const initialValues = {
    job_name: '',
    department: '',
    employment_type: '',
    location: '',
    experience: '',
    education_level: '',
    skills: [],
    description: '',
    budget: '',
    openings: '',
  };

  const validationSchema = Yup.object({
    job_name: Yup.string()
      .min(3, 'Job title must be at least 3 characters long')
      .max(100, 'Job title must be less than 100 characters')
      .required('Job title is required'),

    department: Yup.string()
      .min(3, 'Department name must be at least 3 characters long')
      .max(100, 'Department name must be less than 100 characters')
      .required('Department name is required'),

    employment_type: Yup.string()
      .oneOf(['Full-time', 'Part-time', 'Contract', 'Freelance'], 'Invalid employment type')
      .required('Employment type is required'),

    education_level: Yup.string()
      .oneOf(['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'], 'Invalid qualification')
      .required('Qualification is required'),

    description: Yup.string()
      .min(10, 'Description must be at least 10 characters long')
      .max(500, 'Description must be less than 500 characters')
      .required('Description is required'),

    location: Yup.string()
      .min(3, 'Location must be at least 3 characters long')
      .max(100, 'Location must be less than 100 characters')
      .required('Location is required'),

    experience: Yup.string()
      .min(0, 'Experience cannot be negative')
      .max(50, 'Experience cannot exceed 50 years')
      .required('Experience is required'),

    skills: Yup.array()
      .of(Yup.string().min(2, 'Skill name must be at least 2 characters long').required('Skill is required'))
      .min(1, 'At least one skill is required')
      .max(10, 'You can only add up to 10 skills')
      .required('Skills are required'),

    budget: Yup.number()
      .positive('Budget must be a positive number')
      .required('Budget is required'),

    openings: Yup.number()
      .min(1, 'At least one opening is required')
      .max(100, 'Maximum 100 openings allowed')
      .required('Number of openings is required'),
  });

  const handleSubmit = (values) => {
    if (values) {
      handleLoader(async () => {
        await dispatch(postJobs(values));
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Job</CardTitle>
        </CardHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="space-y-6 max-w-8xl mx-auto p-6 bg-white rounded shadow">

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job_name">Job Title</Label>
                  <Field as={Input} id="job_name" name="job_name" placeholder="e.g., Senior Frontend Developer" />
                  <ErrorMessage name="job_name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education_level">Qualification</Label>
                  <Field as={Input} id="education_level" name="education_level" placeholder="Enter Qualification" />
                  <ErrorMessage name="education_level" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Select
                    defaultValue={values.employment_type}
                    onValueChange={(val) => setFieldValue('employment_type', val)}
                  >
                    <SelectTrigger
                      id="employment_type"
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent
                      className="z-50 bg-white border border-gray-200 rounded-md shadow-lg"
                      position="popper"
                      sideOffset={4}
                    >
                      {JOB_TYPES.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.employment_type && errors.employment_type && (
                    <div className="text-red-500 text-sm">{errors.employment_type}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department Name</Label>
                  <Field as={Input} id="department" name="department" placeholder="Your department name" />
                  <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
                </div>
              </div>


              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Field as={Input} id="location" name="location" placeholder="e.g., New York, NY" />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Required Experience (years)</Label>
                  <Field as={Input} id="experience" name="experience" placeholder="Enter Experience" />
                  <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Skills */}
              <CustomSkillsInput setFieldTouched={setFieldTouched} />

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Field as={Textarea} id="description" name="description" rows={5} placeholder="Describe the role and responsibilities" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openings">Openings</Label>
                  <Field as={Input} id="openings" name="openings" placeholder="Enter number of openings" />
                  <ErrorMessage name="openings" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Field as={Input} id="budget" name="budget" placeholder="Enter Budget" />
                  <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="bg-[#31B465] w-[469px] h-[48px] rounded-[8px] text-white mx-auto block">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default JobPosts;
