import React from "react";
import { BookOpen, CheckCircle, FileText, Star } from "lucide-react";

export default function CourseStatisticsCards({
  counts = { total: 0, published: 0, draft: 0, featured: 0 },
}) {
  const cards = [
    {
      title: "Total Core Components",
      value: counts.total,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Live Deployments",
      value: counts.published,
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Draft Mode Buffers",
      value: counts.draft,
      icon: FileText,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Featured Highlights",
      value: counts.featured,
      icon: Star,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">
              {card.title}
            </p>
            <p className="text-xl font-black text-slate-900">{card.value}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${card.color}`}>
            <card.icon className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
