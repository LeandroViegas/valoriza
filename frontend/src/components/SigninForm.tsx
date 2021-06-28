import { useState } from "react";
import { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

type SigninFormProps = {
  registerClick: () => any;
};

function SigninForm({ registerClick }: SigninFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const { loadUser } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setErrors([""]);
    await api
      .post("/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data?.token || "");
        loadUser();
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
        className="bg-white shadow-md border border-gray-200 px-12 pt-6 pb-8 mb-4"
      >
        <h2 className="text-gray-700 font-semibold text-2xl">Entrar</h2>
        {errors &&
          errors.map((err) => {
            return (
              <p key={err} className="text-red-500 text-sm py-1">
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
            Entrar
          </button>
          <button
            onClick={registerClick}
            className={`px-4 py-2 rounded text-white inline-block shadow-lg bg-purple-500 hover:bg-purple-700 focus:bg-purple-700`}
            type="button"
          >
            Registra-se
          </button>
        </div>
      </form>
    </div>
  );
}

export { SigninForm };
