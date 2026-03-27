import { Download } from "lucide-react";

export function MacBookMockup() {
  return (
    <div className="absolute left-0 top-[60px] md:top-[91px] w-[85%] max-w-[582px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 overflow-hidden">
      <div className="bg-white rounded-lg">
        <div className="bg-slate-100 border-b border-slate-200 h-8 flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex h-[200px] md:h-[328px]">
          <div className="bg-slate-50 border-r border-slate-200 w-1/3 p-4 hidden sm:flex flex-col gap-4">
            <div className="bg-slate-200 h-2 rounded w-20" />
            <div className="bg-teal-50 border border-teal-100 rounded p-2">
              <div className="bg-teal-200 h-2 rounded w-24" />
            </div>
            <div className="px-2 pt-1">
              <div className="bg-slate-200 h-2 rounded w-16" />
            </div>
            <div className="px-2 pt-1">
              <div className="bg-slate-200 h-2 rounded w-20" />
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <div className="bg-slate-200 h-4 rounded w-32" />
              <div className="bg-teal-600 flex items-center gap-1 px-3 py-1 rounded text-xs font-bold text-white">
                <Download className="w-3 h-3" />
                CSV出力
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { left: "w-24", right: "w-24", rightBg: "bg-slate-200" },
                { left: "w-20", right: "w-24", rightBg: "bg-green-200" },
                { left: "w-28", right: "w-24", rightBg: "bg-slate-200" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-100 rounded p-3 flex items-center justify-between"
                >
                  <div className={`bg-slate-200 h-2 rounded ${row.left}`} />
                  <div className={`h-2 rounded ${row.rightBg} ${row.right}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
