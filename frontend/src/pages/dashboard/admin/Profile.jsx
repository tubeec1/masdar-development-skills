import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  selectUser,
  selectLoading,
} from "../../../features/auth/authSlice";
import {
  HiCamera,
  HiUser,
  HiPhone,
  HiGlobe,
  HiLockClosed,
} from "react-icons/hi";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    nationality: "",
    bio: "",
    phone: "",
    password: "",
    profileImage: null,
  });

  // For instant preview
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        gender: user.gender || "",
        nationality: user.nationality || "",
        bio: user.bio || "",
        phone: user.phone || "",
        password: "",
        profileImage: null,
      });
      if (user.profileImage)
        setPreview(`http://localhost:5000/${user.profileImage}`);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file)); // Create local URL for instant preview
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    await dispatch(updateProfile(data));
    dispatch(getProfile());
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-900 mb-8">Admin Profile</h1>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Sidebar Avatar */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={preview || "/default-avatar.png"}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-inner"
              alt="Profile"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <HiCamera className="text-white text-2xl" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Click avatar to change photo
          </p>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              icon={<HiUser />}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              icon={<HiPhone />}
            />
            <Input
              label="Nationality"
              value={formData.nationality}
              onChange={(e) =>
                setFormData({ ...formData, nationality: e.target.value })
              }
              icon={<HiGlobe />}
            />
            <Input
              label="Gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              icon={<HiUser />}
            />
          </div>

          <Input
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            isTextArea
          />
          <Input
            label="New Password (Leave blank to keep current)"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            icon={<HiLockClosed />}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, icon, isTextArea, type = "text" }) {
  const Component = isTextArea ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400 text-lg">{icon}</div>
        )}
        <Component
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full border border-slate-200 rounded-xl p-3 ${icon ? "pl-10" : "pl-4"} focus:border-indigo-500 outline-none transition`}
        />
      </div>
    </div>
  );
}
