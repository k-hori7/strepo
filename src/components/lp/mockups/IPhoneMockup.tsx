export function IPhoneMockup() {
  return (
    <div className="absolute right-0 md:right-4 bottom-0 md:bottom-8 w-[140px] md:w-[240px] bg-slate-900 border-[6px] border-slate-800 rounded-[36px] md:rounded-[48px] shadow-2xl p-2.5 md:p-4.5">
      <div className="bg-white border border-slate-700/50 rounded-[28px] md:rounded-[35px] overflow-hidden">
        <div className="bg-slate-50 px-3 md:px-4 pt-8 md:pt-10 pb-4 md:pb-6 flex flex-col gap-3 md:gap-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 h-5 md:h-6 w-20 md:w-28 rounded-b-xl" />
          <div className="flex flex-col items-center gap-1">
            <div className="bg-slate-200 h-1.5 rounded w-24" />
            <div className="bg-slate-300 h-2.5 md:h-3 rounded w-36" />
          </div>
          <div className="flex flex-col gap-2.5 md:gap-4">
            {[true, false, false].map((active, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-lg shadow-sm p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3"
              >
                <div
                  className={`w-3 md:w-4 h-3 md:h-4 rounded-full border-2 ${active ? "border-teal-500" : "border-slate-300"}`}
                />
                <div
                  className={`bg-slate-200 h-2 rounded ${i === 2 ? "w-5/6" : i === 1 ? "w-3/4" : "flex-1"}`}
                />
              </div>
            ))}
          </div>
          <div className="bg-teal-600 rounded-lg shadow-md py-2 md:py-3 text-center">
            <span className="text-[10px] md:text-xs font-bold text-white">
              回答を送信する
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
