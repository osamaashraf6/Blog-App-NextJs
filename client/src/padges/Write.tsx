"use client"
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { radioInputs } from "@/utils/data";
import usePost from "@/hooks/postHook";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});
import 'react-quill-new/dist/quill.snow.css';

function WritePage() {
  const [quillValue, setQuillValue] = useState("");
  const [quillValidate, setQuillValidate] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { createOnePostMutation } = usePost();
  const { error, isPending, data } = createOnePostMutation;
  const { currentUser } = useSelector((state: any) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmitMethod = (data: any) => {
    if (!currentUser) {
      toast.error("Sign in first ! Save as draft for the next time");
    } else {
      if (quillValue === "") {
        setQuillValidate(true);
      }

      // Create FormData to send as multipart/form-data
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("briefDesc", data.briefDesc);
      formData.append("detailedDesc", quillValue);
      formData.append("category", data.category);
      if (data.postImg && data.postImg[0]) {
        formData.append("postImg", data.postImg[0]);
      }
      createOnePostMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Post Has Been Created Successfully !");
        },
        onError: (res: any) => {
          toast.error(
            `${res?.response?.data?.error?.message}, Sign in Please !`
          );
        },
      });
      reset();
      setQuillValue("");
    }
  };

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <>
      <section className="py-16">
        <div className="container">
          <h1 className="   text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
            Let's Publish New Post !
          </h1>
          <p className="pb-10 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Easily reset your password and regain access to your account. Enter your registered email, and we'll send you a secure link to create a new password. Stay connected with your trusted insights and community.
          </p>
          <form className="" onSubmit={handleSubmit(handleSubmitMethod)}>
            <div className="items flex flex-col md:flex-row gap-4">
              <div className="item w-full md:w-[70%] flex flex-col gap-4">
                <div className="formcontrol">
                  <input
                    type="text"
                    placeholder="Type title..."
                    className=" p-3 rounded-lg border w-full border-gray-400 shadow-lg  placeholder:text-xs hover:border-amber-500 placeholder:text-neutral-500"
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 6,
                        message: "Title must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.title && typeof errors.title.message === 'string' && <p className="text-red-500">{errors.title.message}</p>}

                <div className="formcontrol">
                  <input
                    type="text"
                    placeholder="Type briefDesc..."
                    className=" p-3 rounded-lg border w-full border-gray-400 shadow-lg  placeholder:text-xs hover:border-amber-500 placeholder:text-neutral-500"
                    {...register("briefDesc", {
                      required: "briefDesc is required",
                      minLength: {
                        value: 6,
                        message: "briefDesc must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.briefDesc && typeof errors.briefDesc.message === 'string' && <p className="text-red-500">{errors.briefDesc.message}</p>}
                <div className="formcontrol">

                  <ReactQuill
                    value={quillValue}
                    onChange={setQuillValue}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image']
                      ]
                    }}
                    className="mb-2"
                  />
                </div>
                {quillValidate && (
                  <p className="text-red-500">Detailed Desc is required ! </p>
                )}
              </div>
              {/*  */}
              <div className="item   w-full md:w-[30%] flex flex-col gap-6">
                <div className="border order-2 md:order-1 border-gray-400 shadow-lg p-3 flex flex-col gap-2">
                  <span>Publish</span>
                  <div>Visibility: <span className="text-sm text-gray-500">Public</span></div>
                  <label className="" htmlFor="file">Choose file <FontAwesomeIcon icon={faCloudArrowUp} /></label>
                  <input type="file" className="hidden" id="file"   {...register("postImg", {
                    required: "postImg is required",
                  })} />
                  <button type="submit" className="px-2 py-1 rounded w-fit bg-amber-500 text-sm" disabled={isPending}>{isPending ? <LazyLoadingBtn /> : "Publish"}</button>
                  {errors.postImg && typeof errors.postImg.message === 'string' && <p className="text-red-500">{errors.postImg.message}</p>}
                </div>
                {/*  */}
                <div className="border border-gray-400  order-1 md:order-2 order-gray-400 shadow-lg p-3 flex flex-col gap-2">
                  <h2 className="pb-3">Category</h2>
                  {/*  */}
                  {radioInputs?.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          value={item.label}
                          //! important
                          id={item.label}
                          {...register("category", {
                            required: "category is required",
                          })}
                        />
                        <label htmlFor={item.label} className=" capitalize">
                          {item.label}
                        </label>
                      </div>
                    </div>
                  ))}
                  {errors.category && typeof errors.category.message === 'string' && <p className="text-red-500">{errors.category.message}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default WritePage;