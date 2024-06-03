import { API } from "@/lib/api";
import { useAppSelector } from "@/store";
import { EditProfileType } from "@/types/app";
import getError from "@/utils/error/getError";
import { ChangeEvent, useEffect, useState } from "react";

export function useEditProfile() {
  const profile = useAppSelector((state) => state.profile);
  const [form, setForm] = useState<EditProfileType>({
    fullname: "",
    username: "",
    bio: "",
    avatar: undefined,
    cover: undefined,
  });
  const [avatarx, setAvatarx] = useState<string | null>(null);
  const [coverx, setCoverx] = useState<string | null>(null);

  useEffect(() => {
    setForm({
      fullname: profile.data?.fullname || "",
      username: profile.data?.username || "",
      bio: profile.data?.bio || "",
      avatar: undefined,
      cover: undefined,
    });
  }, [profile]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setForm({
        avatar: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setAvatarx(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setForm({
        cover: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        setCoverx(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("JWT token not found in localstorage");
  }
  const decoded = token.split(".")[1];
  const jsonDecoded = JSON.parse(atob(decoded));
  const userId = jsonDecoded.userId;

  async function handleEditProfile() {
    try {
      await API.put(`users/${userId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(getError(error));
    }
  }

  return {
    form,
    avatarx,
    coverx,
    handleChange,
    handleAvatarChange,
    handleCoverChange,
    handleEditProfile,
  };
}
