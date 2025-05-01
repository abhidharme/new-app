import '../styles/Home.css';
import { Button } from '../components/ui/button';
import ExternLabsIcon from '../assets/extern_labs_icon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, UsersIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function Home() {
  const searchParams = new URLSearchParams(location.search);
   const role = searchParams.get('role') || Cookies.get('role') || localStorage.getItem('role');
    const token = Cookies.get('token') || localStorage.getItem('token');
    const navigate = useNavigate();

   useEffect(() => {
      if (token && role) {
        if (role === 'jobseeker') {
          navigate('/profile');
        } else if (role === 'admin') {
          navigate('/admin/explore');
        }
      }
    }, [navigate]);
   
  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            {/* Logo and buttons can go here */}
            <img src={ExternLabsIcon} alt='extern' height={40} width={50}/>
          </div>
        </div>
      </nav>

      <main className="main">
        <div className="hero-section">
          <h1 className="hero-title">Connect with Top Talent</h1>
          <p className="hero-subtitle">
            Streamline your hiring process with our modern recruitment platform. Find the perfect candidates for your team.
          </p>

          <div className="hero-buttons">
            <NavLink to="/login?role=jobseeker">
              <Button className="custom-btn primary">
                <UsersIcon className="btn-icon" />
                Join as Job Seeker
              </Button>
            </NavLink>

            <NavLink to="/login?role=admin">
              <Button className="custom-btn outline">
                <BriefcaseIcon className="btn-icon" />
                Sign in as Admin
              </Button>
            </NavLink>
          </div>

        </div>

        <section className="features-section">
          <div className="features-grid">
            {[
              {
                title: 'Talent Pool',
                description: 'Access a curated pool of qualified candidates ready for their next opportunity.',
                icon: <UsersIcon className="feature-icon" />,
              },
              {
                title: 'Job Posts',
                description: 'Create and manage job postings to attract the right candidates for your positions.',
                icon: <BriefcaseIcon className="feature-icon" />,
              },
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} Talent Pool. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
