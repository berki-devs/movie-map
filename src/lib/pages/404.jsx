import { useNavigate } from 'react-router';

const Page404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full grid items-center md:w-1/2 min-h-[30vh] mx-auto">
      <div className="text-2xl font-bold text-center">Error: 404</div>
      <div className="p-6 pt-5 flex justify-center">
        <button
          onClick={() => handleClick()}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gray-400 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-1"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
