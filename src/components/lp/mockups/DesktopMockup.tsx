import { FileText } from "lucide-react";

export function DesktopMockup() {
  return (
    <>
      <div className="bg-gray-800 border-8 border-gray-800 rounded-t-xl p-2 w-full max-w-[600px]">
        <div className="bg-white rounded-lg overflow-hidden flex h-[250px] md:h-[334px]">
          <div className="bg-slate-50 border-r border-slate-200 w-[184px] p-3 flex-col gap-2 hidden sm:flex">
            <div className="pb-1">
              <span className="text-[10px] font-bold text-slate-400">
                クライアント一覧
              </span>
            </div>
            <div className="bg-white border border-slate-100 rounded shadow-sm p-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  株式会社A
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="bg-slate-100 h-1 rounded-full">
                <div className="bg-green-500 h-1 rounded-full w-4/5" />
              </div>
            </div>
            <div className="px-2 pt-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                Bクリニック
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <div className="px-2 pt-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                合同会社C
              </span>
              <span className="w-2 h-2 rounded-full bg-slate-300" />
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="bg-slate-100 h-4 rounded w-32" />
            <div className="flex gap-3">
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded p-3 flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-light">
                  回答率
                </span>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-slate-800">82</span>
                  <span className="text-xs text-slate-500 font-light">%</span>
                </div>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded p-3 flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-light">
                  高ストレス者
                </span>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-red-500">3</span>
                  <span className="text-xs text-slate-500 font-light">名</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 h-5 w-full max-w-[600px] rounded-b-xl" />
      <div className="bg-gray-800 h-10 w-20 rounded-b-xl" />
    </>
  );
}
