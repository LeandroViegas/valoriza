import { useState } from "react";
import { SigninForm } from "../components/SigninForm";
import { SignupForm } from "../components/SignupForm";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Home() {
  const { user, isAuthLoading } = useAuth();

  const [tab, setTab] = useState<"signin" | "signup">("signin");

  console.log( process.env.BASEURLAPI)

  return (
    <>
      <Navbar />
      {isAuthLoading ? (
        <></>
      ) : !user ? (
        <div className="h-screen max-h-80 bg-gradient-to-r from-purple-400 via-blue-300 to-purple-900">
          <div className="container mx-auto md:flex gap-4 p-4">
            <div className="flex-1">
              <h2 className="text-3xl my-4 font-semibold text-white">
                Elogie seus colegas e amigos
              </h2>
              <p className="text-lg my-4 text-gray-50">
                Dê uma motivação a mais para seus amigos e colega. Envie um
                elogio agora mesmo.
                <br /> Basta entrar ou crie uma conta.
              </p>
            </div>
            {
              {
                signin: <SigninForm registerClick={() => setTab("signup")} />,
                signup: <SignupForm loginClick={() => setTab("signin")} />,
              }[tab]
            }
          </div>
          )
        </div>
      ) : (
        <div className="h-screen max-h-80 bg-gradient-to-r from-purple-400 via-blue-300 to-purple-900">
          <div className="container mx-auto md:flex gap-4 p-4">
            <div className="flex-1">
              <h2 className="text-3xl my-4 font-semibold text-white">
                Elogie seus colegas e amigos
              </h2>
              <p className="text-lg my-4 text-gray-50">
                Dê uma motivação a mais para seus amigos e colega. Envie um elogio agora mesmo.
              </p>
              <div>
                <Link className="bg-purple-500 mx-2 rounded font-semibold text-lg px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-600" to="/elogios/enviados">
                  Ver elogios enviados
                </Link>
                <Link className="bg-purple-500 mx-2 rounded font-semibold text-lg px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-600" to="/elogios/recebidos">
                  Ver elogios recebidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Home };
