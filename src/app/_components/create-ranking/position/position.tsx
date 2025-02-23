"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { type TImg, type TPosition } from "../create-ranking";
import { base64ToFile } from "@/utils/base64-to-file";
import { fileToBase64 } from "@/utils/file-to-base64";
import Image from "next/image";

export const Position = ({
  id,
  name,
  img,
  onDelete,
  onChange,
}: {
  id: string;
  name: string;
  img: TImg | undefined;
  onDelete: (id: string) => void;
  onChange: (position: TPosition) => void;
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [value, setValue] = useState(name);
  const [imgValue, setImgValue] = useState<File | undefined>();
  const [imgUrl, setImgUrl] = useState<string>();

  useEffect(() => {
    if (img) {
      const file = base64ToFile(img.base64, img.name, img.mimeType);
      setImgValue(file);
    }
  }, [img]);

  useEffect(() => {
    if (imgValue) {
      const objectUrl = URL.createObjectURL(imgValue);
      setImgUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imgValue]);

  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [ref]);

  const editedItemRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = async (event: MouseEvent) => {
    if (
      editedItemRef.current &&
      !editedItemRef.current.contains(event.target as Node)
    ) {
      const img = imgValue ? await fileToBase64(imgValue) : undefined;
      onChange({ id, name: value, img });
      setIsEdited(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      handleClickOutside(e).then((res) => {
        return res;
      }),
    );

    return () => {
      document.removeEventListener("mousedown", (e) =>
        handleClickOutside(e).then((res) => {
          return res;
        }),
      );
    };
  }, [value, imgValue, id, onChange]);

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
          />
          <label
            htmlFor="upload-position"
            className="z-10 flex cursor-pointer items-center justify-center rounded-xl border-2 px-2 py-2"
          >
            {!imgValue ? <FiUpload /> : <FaCheck color="green" />}
            <input
              type="file"
              id="upload-position"
              hidden
              onChange={(e) => {
                const file = e.target?.files?.[0];
                e.target.value = "";
                setImgValue(file);
              }}
            />
          </label>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <p className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </p>
          {imgUrl && (
            <Image
              alt=""
              src={imgUrl}
              style={{
                display: "block",
                height: "35px",
              }}
            />
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (isEdited) return;
            setIsEdited(true);
          }}
        >
          <FaRegEdit />
        </button>
        <button
          onClick={() => {
            if (isEdited) return;
            onDelete(id);
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
};
