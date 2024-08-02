"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, productType } from "./schema";

export default function AddProduct() {
  const maxSize = 4 * 1024 * 1024;
  const [preview, setPreview] = useState("");
  const [state, action] = useFormState(uploadProduct, null);
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (!files || files[0].size > maxSize) {
      alert("파일이 너무 큽니다!");
      return;
    }
    if (!files[0].type.includes("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    const file = files[0];

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
  };

  return (
    <div>
      <form
        action={action}
        className="p-5 flex flex-col gap-5 flex-grow overflow-auto"
      >
        <label
          htmlFor="photo"
          className="border-2 aspect-square max-h-[50vh] flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-contain"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />{" "}
              <div className="text-neutral-400 text-sm">
                {state?.fieldErrors.photo
                  ? state.fieldErrors.photo
                  : "사진을 추가해주세요."}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="가격"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
