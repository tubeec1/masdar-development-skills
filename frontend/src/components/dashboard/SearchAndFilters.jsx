import React from "react";
import { Search } from "lucide-react";

export default function SearchAndFilters({
  categories = [],
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  setSortOrder,
  isAdmin = false,
  teacherFilter,
  setTeacherFilter,
  teachers = [],
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-600">
      <div className="relative flex items-center col-span-1 sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter tracking index title array..."
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 outline-none font-medium text-slate-800 focus:border-emerald-600"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-white border border-slate-200 p-2 rounded-lg cursor-pointer outline-none focus:border-emerald-600"
      >
        <option value="All">All Lifecycles</option>
        <option value="Published">Published Deploy</option>
        <option value="Draft">Draft Buffer</option>
        <option value="Archived">Archived Purge</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="bg-white border border-slate-200 p-2 rounded-lg cursor-pointer outline-none focus:border-emerald-600"
      >
        <option value="All">All Structural Categories</option>
        {categories.map((cat) => (
          <option key={cat._id || cat.id} value={cat._id || cat.id}>
            {cat.title}
          </option>
        ))}
      </select>

      {isAdmin && (
        <select
          value={teacherFilter}
          onChange={(e) => setTeacherFilter(e.target.value)}
          className="bg-white border border-slate-200 p-2 rounded-lg cursor-pointer outline-none focus:border-emerald-600"
        >
          <option value="All">All Instructors</option>
          {teachers.map((t) => (
            <option key={t._id || t.id} value={t._id || t.id}>
              {t.name}
            </option>
          ))}
        </select>
      )}

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-white border border-slate-200 p-2 rounded-lg cursor-pointer outline-none focus:border-emerald-600 col-span-1"
      >
        <option value="Newest">Chronological: Newest</option>
        <option value="Oldest">Chronological: Oldest</option>
        <option value="A-Z">Alphabetic: Vector A-Z</option>
        <option value="Z-A">Alphabetic: Vector Z-A</option>
      </select>
    </div>
  );
}
