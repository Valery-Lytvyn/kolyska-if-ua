"use client";
import { useToast } from "@/providers/ToastContext";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

type AdminData = {
  bestOffer: string[];
  newOffer: string[];
  bgImagePath: string[];
};

const AdminDashboard: React.FC = () => {
  const [bestOffer, setBestOffer] = useState<string[]>([]);
  const [newOffer, setNewOffer] = useState<string[]>([]);
  const [bgImagePath, setBgImagePath] = useState<string[]>([]);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/adminData")
      .then((res) => res.json())
      .then((data: Partial<AdminData>) => {
        if (data && typeof data === "object") {
          setBestOffer(Array.isArray(data.bestOffer) ? data.bestOffer : []);
          setNewOffer(Array.isArray(data.newOffer) ? data.newOffer : []);
          setBgImagePath(
            Array.isArray(data.bgImagePath) ? data.bgImagePath : []
          );
        }
      })
      .catch((error) => console.error("Failed to fetch admin data:", error));
  }, []);

  const handleInputChange = useCallback(
    (
      index: number,
      value: string,
      setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      if (typeof value !== "string") return;
      setter((prev) => prev.map((item, i) => (i === index ? value : item)));
    },
    []
  );

  const handleAddItem = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev) => [...prev, ""]);
    },
    []
  );

  const handleDeleteItem = useCallback(
    (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleSave = async () => {
    if (
      [...bestOffer, ...newOffer, ...bgImagePath].some(
        (item) => typeof item !== "string" || item.trim() === ""
      )
    ) {
      showToast("Видаліть порожні поля!");
      return;
    }

    try {
      const response = await fetch("/api/adminData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bestOffer, newOffer, bgImagePath }),
      });

      if (!response.ok) throw new Error("Failed to save data");
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    } finally {
      router.push(ROUTES.home);
    }
  };

  return (
    <div className="p-8 bg-primary text-white min-h-screen w-full flex flex-col ">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {[
        { title: "Best Offer", data: bestOffer, setter: setBestOffer },
        { title: "New Offer", data: newOffer, setter: setNewOffer },
        {
          title: "Background Image Path",
          data: bgImagePath,
          setter: setBgImagePath,
        },
      ].map((section, idx) => (
        <div
          key={idx}
          className="mb-8  rounded-lg bg-secondary border overflow-hidden"
        >
          <h2 className="text-xl font-semibold mb-4 bg-primary border-b p-4">
            {section.title}
          </h2>
          {section.data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    e.target.value.replace(/^"(.*)"$/, "$1"),
                    section.setter
                  )
                }
                className="w-full mx-2 my-1 p-2 bg-primary
                 text-white rounded"
              />
              <button
                onClick={() => handleDeleteItem(index, section.setter)}
                className="mx-2 px-4 py-2 bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddItem(section.setter)}
            className="m-2 px-4 py-2 bg-accent rounded"
          >
            Add Item
          </button>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="mt-2 px-6 py-3 bg-success rounded-lg text-lg font-semibold mx-auto w-full max-w-sm"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminDashboard;
