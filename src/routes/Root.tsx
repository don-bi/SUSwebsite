import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import HomePage from '../pages/HomePage';
import './Root.css'; // Or your main CSS file

function Root() {
  return (
    <>
      <Header />
      <main className="px-4 sm:px-8 md:px-16 py-8"> {/* Responsive padding */}
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default Root;