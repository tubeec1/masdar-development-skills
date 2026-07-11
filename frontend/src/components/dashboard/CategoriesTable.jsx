import { useEffect } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const CategoriesTable = ({
  categories,
  getCategories,
  setOpenModal,
  setIsEdit,
  setEditingCategory,
  setFormData,
}) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getCategories();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Category deleted successfully");

        getCategories();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  const handleEdit = (category) => {
    setIsEdit(true);

    setEditingCategory(category);

    setFormData({
      name: category.name || "",
      description: category.description || "",
      thumbnail: null,
    });

    setOpenModal(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-[#0F172A]">Categories List</h2>

        <p className="text-slate-500 text-sm mt-1">
          Manage all categories in your system.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-xl font-semibold text-slate-700">
            No Categories Found
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first category to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Thumbnail
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Description
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/public/categories/${category.thumbnail}`}
                      alt={category.name}
                      className="w-16 h-16 rounded-xl object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <h4 className="font-semibold text-[#0F172A]">
                      {category.name}
                    </h4>
                  </td>

                  <td className="px-6 py-4 text-slate-500 max-w-md">
                    {category.description}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
                      >
                        <HiPencilAlt />
                      </button>

                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
