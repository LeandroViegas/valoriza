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

function ComplimentCard({ compliment }: { compliment: Compliment }) {
  return (
    <>
      <div className="m-2 bg-white border border-gray-200 rounded my-4 p-3">
        <div>
          <span className="text-sm text-gray-700 font-semibold">
            De: {compliment.userSender.name}
          </span>{" "}
          <br />
          <span className="text-sm text-gray-700 font-semibold">
            Para: {compliment.userReceiver.name}
          </span>
        </div>
        <span className="text-gray-600">{compliment.message}</span>
        <hr className="my-2" />
        <div className="flex">
          <span className="bg-purple-500 rounded text-sm text-white px-3 py-1 my-1 mx-2">
            #{compliment.tag.name}
          </span>
        </div>
      </div>
    </>
  );
}

export { ComplimentCard };
