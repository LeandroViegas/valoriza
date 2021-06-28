import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-purple-700">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-700 mr-16">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">Valoriza</Link>
          </span>
        </div>
        <div className="block lg:hidden ">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-purple-700 border-purple-700 hover:text-purple-700 hover:border-purple-700"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div className="text-md font-bold text-purple-500 lg:flex-grow">
          {user?.admin && (
            <>
              <Link
                to="/admin/tags"
                className="block mt-4 lg:inline-block lg:mt-0 px-4 hover:text-purple-700 py-2 rounded mr-2"
              >
                Tags
              </Link>
              <Link
                to="/admin/usuarios"
                className=" block mt-4 lg:inline-block lg:mt-0 px-4 hover:text-purple-700 py-2 rounded mr-2"
              >
                Usuários
              </Link>
            </>
          )}
        </div>
        <div className="flex">
          {user && (
            <>
              <span className="block text-md px-4 py-2 rounded text-purple-700 ml-2 font-bold mt-4 lg:mt-0">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className=" block text-md px-4  ml-2 py-2 rounded text-purple-700 font-bold hover:text-white mt-4 hover:bg-purple-700 lg:mt-0"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { Navbar };
