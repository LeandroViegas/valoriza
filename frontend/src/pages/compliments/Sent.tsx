import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ComplimentCard } from "../../components/ComplimentCard";
import { Navbar } from "../../components/Navbar";
import Outclick from "../../components/Outclick";
import { SendCompliment } from "../../components/SendCompliment";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

import { BiLoaderCircle } from "react-icons/bi";

type Compliment = {
  id: string;
  message: string;
  userSender: {
    name: string;
  };
  userReceiver: {
    name: string;
  };
  tag: {
    name: string;
  };
};

function Sent() {
  const { user, isAuthLoading } = useAuth();

  const [errors, setErrors] = useState<string[]>();

  const [elogiarTabOpenned, setElogiarTabOpenned] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [compliments, setCompliments] = useState<Compliment[]>();

  async function handleLoadCompliments() {
    setErrors([""]);
    setLoading(true);
    const token = localStorage.getItem("token");
    await api
      .get("/users/compliments/send", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setCompliments(res.data?.compliments);
      })
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!isAuthLoading && user) {
      handleLoadCompliments();
    }
  }, [isAuthLoading, user]);

  return (
    <>
      {elogiarTabOpenned && (
        <div className="top-0 left-0 h-full w-full fixed bg-black bg-opacity-30 flex items-center">
          <Outclick callback={() => setElogiarTabOpenned(false)}>
            <SendCompliment
              callBack={() => {
                setElogiarTabOpenned(false);
                handleLoadCompliments();
              }}
            />
          </Outclick>
        </div>
      )}

      <Navbar />
      
      {user && (
        <>
          <div className="bg-gradient-to-r from-purple-400 via-blue-300 to-purple-900">
            <div className="container px-5 mx-auto py-4">
              <h2 className="text-2xl text-white font-semibold">
                Olá {user.name}, esses foram seus elogios enviados
              </h2>
              <hr style={{ height: "2px" }} className="mt-1 bg-white" />
            </div>
          </div>
          <div className="container px-5 mx-auto">
            <div>
              <div className="my-3">
                <button
                  onClick={() => setElogiarTabOpenned(true)}
                  className="bg-purple-600 rounded font-semibold text-sm mx-2 px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-700"
                >
                  Elogiar
                </button>
                <button
                  onClick={handleLoadCompliments}
                  className="bg-purple-500 mx-2 rounded font-semibold text-sm px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-600"
                >
                  Atualizar elogios
                </button>
                <br />
              </div>
              <Link
                className="text-blue-600 text-sm underline mx-2"
                to="/elogios/recebidos"
              >
                Elogios recebidos
              </Link>
              {errors &&
                errors.map((err) => {
                  return (
                    <p key={err} className="text-red-500 text-sm py-1">
                      {err}
                    </p>
                  );
                })}
              <hr className="mb-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {loading ? (
                  <div className="h-80 col-span-4 flex items-center justify-center">
                    <span className="px-1 text-gray-700">Carregando</span>
                    <BiLoaderCircle />
                  </div>
                ) : (
                  compliments &&
                  compliments.map((compliment) => {
                    return (
                      <ComplimentCard
                        key={compliment.id}
                        compliment={compliment}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Sent };
