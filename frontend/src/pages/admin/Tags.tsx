import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { CreateTag } from "../../components/CreateTag";
import { Navbar } from "../../components/Navbar";
import Outclick from "../../components/Outclick";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

type Tag = {
  id: string;
  name: string;
};

function Tags() {
  const { user, isAuthLoading } = useAuth();

  const [errors, setErrors] = useState<string[]>();

  const [createTagOpenned, setCreateTagOpenned] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [tags, setTags] = useState<Tag[]>();
  async function handleLoadTags() {
    setLoading(true);
    setErrors([""]);
    const token = localStorage.getItem("token");
    await api
      .get("/tags", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setTags(res.data?.tags);
      })
      .catch((e) => {
        let errors = e.response.data?.error;
        setErrors(errors && errors instanceof Array ? [...errors] : [errors]);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!isAuthLoading && user) {
      handleLoadTags();
    }
  }, [isAuthLoading, user]);

  return (
    <>
      {createTagOpenned && (
        <div className="top-0 left-0 h-full w-full fixed bg-black bg-opacity-30 flex items-center">
          <Outclick callback={() => setCreateTagOpenned(false)}>
            <CreateTag
              callBack={() => {
                setCreateTagOpenned(false);
                handleLoadTags();
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
                Tags registradas
              </h2>
              <hr style={{ height: "2px" }} className="mt-1 bg-white" />
            </div>
          </div>
          <div className="container px-5 mx-auto">
            <div>
              <div className="my-3">
                <button
                  onClick={() => setCreateTagOpenned(true)}
                  className="bg-purple-600 rounded font-semibold text-sm mx-2 px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-700"
                >
                  Criar Tag
                </button>
                <button
                  onClick={handleLoadTags}
                  className="bg-purple-500 mx-2 rounded font-semibold text-sm px-6 text-white hover:text-gray-200 py-2 hover:bg-purple-600"
                >
                  Atualizar tags
                </button>
                <br />
              </div>
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
                  tags &&
                  tags.map((tag) => {
                    return (
                      <div key={tag.id}>
                        <div className="bg-white m-2 p-4 w-auto">
                          <span className="bg-purple-500 rounded font-semibold text-white px-3 py-1 my-1 mx-2">
                            #{tag.name}
                          </span>
                        </div>
                      </div>
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

export { Tags };
