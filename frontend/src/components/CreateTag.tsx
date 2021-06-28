import { FormEvent, useState } from "react";
import api from "../services/api";


function CreateTag({ callBack }: { callBack?: () => any }) {
  const [errors, setErrors] = useState<string[]>();

  const [name, setName] = useState<string>();

  const [loading, setLoading] = useState<boolean>();

  const token = localStorage.getItem("token");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setErrors([""]);
    await api
      .post(
        "/tags",
        { name },
        {
          headers: { authorization: `bearer ${token}` },
        }
      )
      .then((res) => callBack && callBack())
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-screen-sm w-full py-6 px-10 mx-auto"
    >
      <h2 className="text-gray-700 font-semibold text-2xl">Nova Tag</h2>
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
          className="block text-gray-500 text-sm font-normal mb-2"
          htmlFor="message"
        >
          
          Nome
        </label>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name=""
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome"
        />
      </div>
      <button
        className={`px-4 py-2 rounded text-white inline-block shadow-lg ${
          loading ? "bg-gray-500" : "bg-purple-500"
        } ${!loading && "hover:bg-purple-700 focus:bg-purple-700"}`}
        type={loading ? "button" : "submit"}
      >
        Criar Tag
      </button>
    </form>
  );
}
export { CreateTag };
