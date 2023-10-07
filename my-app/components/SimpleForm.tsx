"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema } from "@/lib/schema";
import { useState } from "react";
import { addEntry } from "@/app/_actions";

type Inputs = z.infer<typeof FormDataSchema>;

const Error = ({ msg }: { msg: string }) => {
  return <p className="text-sm text-red-400">{msg}</p>;
};

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });
  const [data, setData] = useState<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await addEntry(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      console.log(result.error.message);
      return;
    }

    reset();
    setData(result.data);
  };

  return (
    <section className="flex gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4 sm:w"
      >
        <input
          className="rounded-lg p-2"
          placeholder="name"
          {...register("name")}
        />
        {errors.name?.message && <Error msg={errors.name.message} />}
        <input
          className="rounded-lg p-2"
          placeholder="message"
          {...register("message")}
        />
        {errors.message?.message && <Error msg={errors.message.message} />}
        <button className="rounded-lg bg-black py-2 text-white">Submit</button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
