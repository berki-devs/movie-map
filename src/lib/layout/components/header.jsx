import { Link, useLocation } from 'react-router';
import { routes } from '../../router/routes';

const Header = () => {
  const location = useLocation();
  const searchParams = location.search;

  return (
    <div className="fixed lg:top-5 left-0 right-0 mx-auto w-full lg:w-[1000px] lg:rounded-lg border bg-[#FFFFFF80] backdrop-blur-md text-card-foreground">
      <div className="px-8 py-5 flex items-center justify-between">
        <h1 className="text-lg font-light tracking-tighter">MovieMap</h1>
        <div className="flex gap-4">
          {routes.slice(0, -1).map((item) => (
            <Link
              key={item.path}
              to={{ pathname: item.path, search: searchParams }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
