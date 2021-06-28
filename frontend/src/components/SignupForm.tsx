import { useState } from "react";
import { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

type SigninFormProps = {
  loginClick: () => any;
};

function SignupForm({loginClick}: SigninFormProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>();

  const { loadUser } = useAuth();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    api
      .post("/users", { email, name, admin, password })
      .then(async (res) => {
        await api
          .post("/login", { email, password })
          .then((res) => {
            localStorage.setItem("token", res.data?.token || "");
            loadUser();
          })
          .catch((e) => {
            let errors = e.response.data?.error;
            setErrors(
              errors && errors instanceof Array ? [...errors] : [errors]
            );
          });
      })
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
    setLoading(false);
  }

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 px-12 pt-6 pb-8"
      >
        <h2 className="text-gray-700 font-semibold text-2xl">
          Criar nova conta
        </h2>
        {errors &&
          errors.map((err) => {
            return (
              <p key={err} className="text-purple-500 text-sm py-1">
                {err}
              </p>
            );
          })}
        <hr className="pb-4 mt-2" />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-normal mb-2"
            htmlFor="username"
          >
            Nome
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            v-model="form.name"
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-normal mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            v-model="form.email"
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div onClick={(e) => setAdmin(!admin)} className="mb-4 flex">
          <label
            className="block text-gray-700 text-sm font-normal mb-2"
            htmlFor="admin"
          >
            Admin
          </label>
          <input
            className="my-1 mx-2"
            name="admin"
            type="checkbox"
            required
            autoFocus
            onChange={() => {}}
            checked={admin}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-normal mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Senha"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="flex items-center justify-between">
        <button
            className={`px-4 py-2 rounded text-white inline-block shadow-lg ${
              loading ? "bg-gray-500" : "bg-purple-500"
            } ${!loading && "hover:bg-purple-700 focus:bg-purple-700"}`}
            type={loading ? "button" : "submit"}
          >
            Criar conta
          </button>
          <button
            onClick={loginClick}
            className={`px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-500 hover:bg-purple-700 focus:bg-purple-700`}
            type="button"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export { SignupForm };
