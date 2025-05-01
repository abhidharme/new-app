import { NavLink } from 'react-router-dom';
import {Button} from '../components/ui/button';
import { BriefcaseIcon, UsersIcon } from 'lucide-react';
import ExternLabsIcon from '../assets/extern_labs_icon.png'

function Home() {
   
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-2">

            <img src={ExternLabsIcon} className="h-13 w-12 text-blue-600" alt='Externlabs' />
            {/* <BriefcaseIcon className="h-8 w-8 text-blue-600" />  */}
            {/* <span className="text-2xl font-bold text-gray-800"></span> */}
            {/* </div> */}
            {/* <div className="hidden md:flex space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Connect with Top Talent
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Streamline your hiring process with our modern recruitment platform. Find the perfect candidates for your team.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <NavLink to="/login?role=jobseeker">
              <Button size="lg" className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Join as Job Seeker
              </Button>
            </NavLink>
            {/* <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link> */}

            {/* <Link href="/clientsidehoc">
              <Button size="lg" className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Client
              </Button>
            </Link> */}

            <NavLink to="/login?role=admin">
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5" />
                Sign in as Admin
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2">
              {[
                {
                  title: 'Talent Pool',
                  description: 'Access a curated pool of qualified candidates ready for their next opportunity.',
                  icon: <UsersIcon className="h-6 w-6 text-blue-600" />,
                },
                {
                  title: 'Job Posts',
                  description: 'Create and manage job postings to attract the right candidates for your positions.',
                  icon: <BriefcaseIcon className="h-6 w-6 text-blue-600" />,
                },
                // {
                //   title: 'Interview Management',
                //   description: 'Schedule and track interviews efficiently with our integrated management system.',
                //   icon: <UsersIcon className="h-6 w-6 text-blue-600" />,
                // },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-blue-50 hover:bg-blue-100 rounded-2xl shadow-md transition duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-center h-14 w-14 bg-white rounded-full shadow mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{feature.title}</h3>
                  <p className="mt-3 text-gray-600 text-center text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-10 shadow-inner">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Talent Pool. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;