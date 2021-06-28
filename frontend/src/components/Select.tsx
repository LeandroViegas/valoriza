import { useEffect } from "react";
import { useState } from "react";

type SelectType = {
  value: string;
  field: string;
};

type SelectProps = {
  select: SelectType[] | undefined;
  selected?: SelectType;
  callBack: (selected: SelectType) => any;
};

function Select({ select, selected, callBack }: SelectProps) {
  const [Selected, setSelected] = useState<SelectType>();

  useEffect(() => {
    setSelected(selected)
  },[selected])

  return (
    <div className="border rounded overflow-auto h-24">
      {select &&
        select.map((s) => {
          return (
            <div
              onClick={() => {
                setSelected(s);
                callBack(s);
              }}
              className={`${
                s.value === Selected?.value && "bg-purple-500 text-white"
              } py-1 px-2`}
              key={s.value}
            >
              {s.field}
            </div>
          );
        })}
    </div>
  );
}

export { Select };
