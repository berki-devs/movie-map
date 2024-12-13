import Footer from './components/footer';
import Header from './components/header';

export const Layout = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="relative min-h-[95vh]">
        <Header />
        <div className="pt-20 md:pt-32 pb-10">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
