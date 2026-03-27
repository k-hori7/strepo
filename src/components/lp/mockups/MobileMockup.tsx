import { ArrowRight, Copy, Link2 } from "lucide-react";

export function MobileMockup() {
  return (
    <>
      <div className="absolute inset-[40px] rounded-full bg-gradient-to-tr from-teal-100 to-transparent blur-3xl" />
      <div className="relative bg-gray-800 border-[10px] border-gray-800 rounded-[40px] shadow-2xl p-2.5 w-[260px] md:w-[280px]">
        <div className="bg-slate-50 rounded-[32px] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black h-6 w-24 rounded-b-2xl z-10" />
          <div className="pt-12 px-5 pb-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <ArrowRight className="w-5 h-5 text-slate-800 rotate-180" />
              <span className="text-sm font-bold text-slate-800">
                プロジェクト設定
              </span>
              <div className="w-5" />
            </div>
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center gap-3 mb-6">
              <div className="bg-teal-100 rounded-full p-3">
                <Link2 className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-base font-bold text-slate-800">
                決済・実施用URL
              </span>
              <span className="text-xs text-slate-500 font-light text-center">
                このURLをクライアントに送付してください
              </span>
              <div className="bg-slate-100 rounded p-2 w-full">
                <p className="text-[11px] text-slate-500 font-mono text-center break-all">
                  https://stre-po.com/pay/cl_...
                </p>
              </div>
              <div className="bg-teal-600 text-white font-bold text-base py-3 rounded-lg shadow-sm w-full flex items-center justify-center gap-2">
                <Copy className="w-4.5 h-4.5" />
                URLをコピー
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
              <span className="text-xs text-slate-400 text-center">
                送信イメージ
              </span>
              <div className="flex items-end gap-2">
                <div className="bg-slate-300 w-6 h-8 rounded-full flex-shrink-0" />
                <div className="bg-green-500 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl px-3 py-2.5 shadow-sm max-w-[180px]">
                  <span className="text-xs text-white font-light leading-4">
                    お世話になっております。
                    <br />
                    ストレスチェック用のURLを
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
