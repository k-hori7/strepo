"use client";

import { useState, useMemo } from "react";
import { Plus, Search, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

type ProjectStatus = "action_required" | "in_progress" | "unpaid" | "completed";

type Project = {
  id: string;
  companyName: string;
  fiscalYear: number;
  status: ProjectStatus;
  statusDetail?: string;
  highlightDetail?: string;
};

type DoctorDashboardProps = {
  className?: string;
  projects?: Project[];
  userName?: string;
  onNewProject?: () => void;
  onProjectClick?: (projectId: string) => void;
};

const statusConfig = {
  action_required: {
    cardClass: "border-2 border-red-200",
    badgeClass: "bg-red-50 border border-red-200 text-red-600",
    badgeLabel: "要対応",
    badgeDot: true,
    ctaClass:
      "bg-red-600 text-white shadow-[0_10px_15px_-3px_#fee2e2,0_4px_6px_-4px_#fee2e2]",
    ctaLabel: "結果を確認する",
  },
  in_progress: {
    cardClass: "border border-slate-200",
    badgeClass: "bg-teal-50 border border-teal-100 text-teal-600",
    badgeLabel: "実施中",
    badgeDot: false,
    ctaClass: "bg-slate-900 text-white",
    ctaLabel: "進捗を確認する",
  },
  unpaid: {
    cardClass: "border border-dashed border-slate-200 opacity-90",
    badgeClass: "bg-slate-100 border border-blue-600 text-blue-600",
    badgeLabel: "未決済",
    badgeDot: false,
    ctaClass: "bg-teal-600 text-white",
    ctaLabel: "決済画面へ",
  },
  completed: {
    cardClass: "border border-slate-200 opacity-60",
    badgeClass: "bg-slate-200 text-slate-600",
    badgeLabel: "報告完了",
    badgeDot: false,
    ctaClass: "border border-slate-500 text-slate-500",
    ctaLabel: "過去のデータを見る",
  },
} as const;

export const defaultProjects: Project[] = [
  {
    id: "1",
    companyName: "AAA株式会社",
    fiscalYear: 2026,
    status: "action_required",
    highlightDetail: "高ストレス者 5名",
  },
  {
    id: "2",
    companyName: "株式会社BBB",
    fiscalYear: 2026,
    status: "in_progress",
    statusDetail: "受検率 65% (31/48名)",
  },
  {
    id: "3",
    companyName: "新宿物流センター",
    fiscalYear: 2026,
    status: "unpaid",
    statusDetail: "プロジェクト作成済み",
  },
  {
    id: "4",
    companyName: "株式会社EEE商事",
    fiscalYear: 2025,
    status: "completed",
    statusDetail: "アーカイブ済みのデータ",
  },
];

function getInitials(userName: string): string {
  const words = userName.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return userName.slice(0, 2).toUpperCase();
}

function DashboardHeader({ userName = "DR" }: { userName?: string }) {
  const initials = getInitials(userName);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 md:px-8 h-14">
        <Logo size="sm" />
        <button
          type="button"
          aria-label={`ユーザーメニュー: ${userName}`}
          className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] hover:bg-slate-200 transition-colors"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  const config = statusConfig[project.status];
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${project.companyName} ${project.fiscalYear}年度`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`cursor-pointer bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${config.cardClass}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-[4px] ${config.badgeClass}`}
        >
          {config.badgeDot && (
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
            />
          )}
          {config.badgeLabel}
        </span>
        <ChevronRight
          aria-hidden="true"
          className="w-5 h-5 text-slate-300 shrink-0"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-slate-900 leading-snug">
          {project.companyName}
        </p>
        <p className="text-sm text-slate-400">{project.fiscalYear}年度</p>
      </div>
      {project.highlightDetail ? (
        <p className="text-[11px] font-bold text-red-500">
          {project.highlightDetail}
        </p>
      ) : project.statusDetail ? (
        <p className="text-[11px] text-slate-400">{project.statusDetail}</p>
      ) : null}
      <div
        className={`w-full rounded-lg py-2.5 text-[11px] font-bold text-center ${config.ctaClass}`}
      >
        {config.ctaLabel}
      </div>
    </div>
  );
}

export function DoctorDashboard({
  className,
  projects = defaultProjects,
  userName = "DR",
  onNewProject,
  onProjectClick,
}: DoctorDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const years = useMemo(() => {
    return [...new Set(projects.map((p) => p.fiscalYear))].sort(
      (a, b) => b - a
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !query ||
        p.companyName.toLowerCase().includes(query) ||
        String(p.fiscalYear).includes(query);
      const matchesYear = activeYear === null || p.fiscalYear === activeYear;
      return matchesSearch && matchesYear;
    });
  }, [projects, searchQuery, activeYear]);

  const hasProjects = projects.length > 0;
  const hasResults = filteredProjects.length > 0;

  return (
    <div className={`bg-slate-50 min-h-dvh ${className ?? ""}`}>
      <DashboardHeader userName={userName} />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6">
        {/* タイトル行 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            ダッシュボード
          </h1>
          <button
            type="button"
            onClick={onNewProject}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-[0_10px_15px_-3px_rgba(13,148,136,0.1),0_4px_6px_-4px_rgba(13,148,136,0.1)] transition-colors"
          >
            <Plus aria-hidden="true" className="w-4 h-4" />
            新規プロジェクト
          </button>
        </div>

        {/* 検索・フィルターバー */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="会社名、年度で検索..."
              aria-label="会社名、年度で検索"
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="年度フィルター"
              className="flex items-center bg-slate-100 rounded-xl p-1"
            >
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  aria-pressed={activeYear === year}
                  onClick={() =>
                    setActiveYear(activeYear === year ? null : year)
                  }
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                    activeYear === year
                      ? "bg-white text-teal-600 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {year}年度
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="フィルター"
              className="bg-white border border-slate-200 rounded-xl p-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal
                aria-hidden="true"
                className="w-4 h-4 text-slate-500"
              />
            </button>
          </div>
        </div>

        {/* カードグリッド */}
        {hasResults ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onProjectClick?.(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p className="text-sm font-medium">
              {hasProjects
                ? "該当するプロジェクトが見つかりません"
                : "まだプロジェクトがありません"}
            </p>
            {searchQuery && hasProjects && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 text-xs text-teal-600 hover:underline"
              >
                検索をクリア
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
