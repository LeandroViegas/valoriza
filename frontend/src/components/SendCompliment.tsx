import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { Select } from "./Select";

type User = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

function SendCompliment({ callBack }: { callBack?: () => any }) {
  const { user } = useAuth();

  const [errors, setErrors] = useState<string[]>();

  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User>();

  const [tags, setTags] = useState<Tag[]>();
  const [selectedTag, setSelectedTag] = useState<Tag>();

  const [message, setMessage] = useState<string>();

  const [loading, setLoading] = useState<boolean>();

  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/users", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data?.users);
        setSelectedUser(
          res.data?.users.filter((u: User) => u.id !== user?.id)[0]
        );
      })
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
  }, [token, user]);

  useEffect(() => {
    api
      .get("/tags", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setTags(res.data?.tags);
        setSelectedUser(res.data?.tags[0]);
      })
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
  }, [token, user]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setErrors([""]);
    await api
      .post(
        "/compliments",
        { tag_id: selectedTag?.id, user_receiver: selectedUser?.id, message },
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
      <h2 className="text-gray-700 font-semibold text-2xl">Elogiar alguém</h2>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label
              className="block text-gray-500 text-sm font-normal mb-2"
              htmlFor="message"
            >
              Quem?
            </label>
            <Select
              select={
                users &&
                users
                  .filter((u) => u.id !== user?.id)
                  .map((u) => ({
                    field: u.name,
                    value: u.id,
                  }))
              }
              selected={
                selectedUser && {
                  field: selectedUser?.name,
                  value: selectedUser?.id,
                }
              }
              callBack={(selected) =>
                setSelectedUser({ id: selected.value, name: selected.field })
              }
            />
          </div>
          <div className="col-span-1">
            <label
              className="block text-gray-500 text-sm font-normal mb-2"
              htmlFor="message"
            >
              Qual Tag?
            </label>
            <Select
              select={
                tags &&
                tags.map((tag) => ({
                  field: tag.name,
                  value: tag.id,
                }))
              }
              selected={
                selectedTag && {
                  field: selectedTag?.name,
                  value: selectedTag?.id,
                }
              }
              callBack={(selected) =>
                setSelectedTag({ id: selected.value, name: selected.field })
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-normal mb-2"
          htmlFor="message"
        >
          Mensagem
        </label>
        <textarea
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name=""
          required
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Mensagem"
        />
      </div>
      <button
        className={`px-4 py-2 rounded text-white inline-block shadow-lg ${
          loading ? "bg-gray-500" : "bg-purple-500"
        } ${!loading && "hover:bg-purple-700 focus:bg-purple-700"}`}
        type={loading ? "button" : "submit"}
      >
        Elogiar
      </button>
    </form>
  );
}
export { SendCompliment };
