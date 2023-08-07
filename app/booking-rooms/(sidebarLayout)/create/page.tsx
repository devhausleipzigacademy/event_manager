"use client";
import Button from "@/components/ui/forms/Button";
import Input from "@/components/ui/forms/Input";
import TextArea from "@/components/ui/forms/TextArea";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Room, createRoomSchema } from "@/schemas/roomSchema";
import { createClient } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type PreviewFile = File & { preview: string };

function CreateRoomPage() {
  const [images, setImages] = useState<PreviewFile[]>([]);
  const router = useRouter();
  const { userId } = useAuth();

  const [supabase] = useState(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 20,
    multiple: true,
  });

  const {
    register: registerForm,
    handleSubmit: handleFormSubmit,
    formState,
    reset,
  } = useForm<Room>({
    resolver: zodResolver(createRoomSchema),
    mode: "onBlur",
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: Room & { images: Array<string> }) =>
      axios.post("/api/room", values),
    onSuccess: () => {
      toast.success("Room created successfully");
      setImages([]);
      reset();
      router.push("/booking-rooms");
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong, try again later");
    },
  });

  function onDrop(acceptedFiles: File[]) {
    const newImages = acceptedFiles.reduce((prev, currFile) => {
      const alreadyExists = images.some((img) => img.name === currFile.name);

      if (!alreadyExists) {
        const newImage = Object.assign(currFile, {
          preview: URL.createObjectURL(currFile),
        });

        return [...prev, newImage];
      } else {
        toast.warn(`Datei ${currFile.name} existiert bereits.`);
        return prev;
      }
    }, [] as PreviewFile[]);

    setImages([...images, ...newImages]);
  }

  function onDeleteImage(image: PreviewFile) {
    setImages(images.filter((img) => img.name !== image.name));
  }

  async function onSubmit(forminputs: Room) {
    const currentDate = new Date();
    const uploadedImages = images.map(async (image) => {
      const { data, error } = await supabase.storage
        .from("rooms")
        .upload(`${userId}/${currentDate.getTime()}_${image.name}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        return {
          image,
          error,
        };
      }
      return {
        image,
        error: null,
        dataPath: data.path,
      };
    });

    const imagesData = await Promise.all(uploadedImages);

    const errorImages = imagesData.filter((imgData) => imgData.error !== null);
    const filteredImages = images.filter(
      (image) =>
        !errorImages.some((errorImage) => errorImage.image?.name === image.name)
    );

    if (errorImages.length > 0) {
      const failedImages = errorImages.map((img) => img.image?.name).join(", ");
      toast.error(`Es gab einen Fehler bei folgenden Bildern: ${failedImages}`);
      return setImages(filteredImages);
    }

    mutateAsync({
      ...forminputs,
      images: imagesData.map((img) => img.dataPath as string),
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-700">
        Create a Booking Room:
      </h1>
      <hr className="w-[50%] my-4" />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleFormSubmit(onSubmit)}
      >
        <div className="max-w-[550px] flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <Input
              label="Name"
              id="name"
              placeholder="Orange Place"
              error={formState.errors.name}
              {...registerForm("name")}
            />
            <Input
              label="postal"
              id="postal"
              placeholder="80333"
              error={formState.errors.postal}
              {...registerForm("postal")}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Input
              label="address"
              id="address"
              placeholder="Seestraße 1"
              error={formState.errors.address}
              {...registerForm("address")}
            />
            <Input
              label="city"
              id="city"
              placeholder="Munich"
              error={formState.errors.city}
              {...registerForm("city")}
            />
          </div>
          <TextArea
            label="description"
            id="description"
            className="max-w-[350px]"
            placeholder="Enter a description for the room."
            error={formState.errors.description}
            {...registerForm("description")}
          />

          <div>
            <h2 className="text-lg font-bold text-neutral-700 mb-2">
              Upload Images:
            </h2>
            <div className="flex flex-wrap gap-2">
              <div
                {...getRootProps()}
                className="w-[150px] h-[150px] cursor-pointer border-4 border-dotted border-primary hover:border-primary-dark rounded-md flex items-center justify-center p-2"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-xs text-center">Drop the files here ...</p>
                ) : (
                  <p className="text-xs text-center text-neutral-400">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>

              {images.map((image) => (
                <div
                  key={image.name}
                  className="w-[150px] h-[150px] overflow-hidden  rounded-md flex items-center justify-center p-2 relative"
                >
                  <div
                    className="bg-white p-2 cursor-pointer rounded-full absolute right-0 top-0 m-4 shadow-md"
                    onClick={(e) => onDeleteImage(image)}
                  >
                    <BsFillTrashFill className="fill-red-400" />
                  </div>
                  <img
                    className="w-[150px] h-[150px] overflow-hidden object-cover"
                    src={image.preview}
                    alt={image.name}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoomPage;
