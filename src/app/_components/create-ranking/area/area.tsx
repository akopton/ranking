"use client";

import { useEffect, useRef, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const Area = ({
  id,
  name,
  color,
  onChange,
  onDelete,
}: {
  id: string;
  name: string;
  color: string;
  onChange: (area: { id: string; name: string; color: string }) => void;
  onDelete: (id: string) => void;
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(name);
  const [colorValue, setColorValue] = useState(color);

  const toggleEdit = () => setIsEdited((prev) => !prev);

  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [ref]);

  const editedItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editedItemRef.current &&
        !editedItemRef.current.contains(event.target as Node)
      ) {
        onChange({ id, name: value, color: colorValue });
        setIsEdited(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, colorValue]);

  return (
    <li
      className="flex items-center justify-between gap-2 rounded-xl px-5 py-2"
      style={{
        background: "#3b3a3a",
      }}
      ref={ref}
    >
      {isEdited ? (
        <div
          ref={editedItemRef}
          className="flex w-full items-center justify-between gap-2"
        >
          <input
            className="w-full rounded-xl border-2 bg-transparent bg-none px-4 py-2 outline-none"
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // onBlur={(e) => {
            //   onChange({ id, name: e.target.value, color });
            //   setIsEdited(false);
            // }}
          />
          <input
            type="color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            // onBlur={(e) => {
            //   onChange({ id, name, color: e.target.value });
            //   setIsEdited(false);
            // }}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between overflow-hidden">
          <p className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </p>
          <div
            style={{
              backgroundColor: color,
              height: "30px",
              width: "30px",
            }}
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <button onClick={toggleEdit}>
          <FaRegEdit />
        </button>
        <button onClick={() => onDelete(id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
};
