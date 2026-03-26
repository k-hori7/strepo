import {
  ArrowRight,
  CheckCircle2,
  Check,
  Copy,
  FileText,
  Link2,
  Monitor,
  Smartphone,
} from "lucide-react";

export interface WorkflowSectionProps {
  step1Heading?: string;
  step1Description?: string;
  step1Features?: string[];
  step2Heading?: string;
  step2Description?: string;
}

export function WorkflowSection({
  step1Heading = "複数クライアントを一元管理",
  step1Description = "サイドバーでクライアント（A社、Bクリニック等）を瞬時に切り替え。進捗状況はプログレスバーで一目瞭然。面倒なログイン/ログアウトを繰り返す必要はありません。",
  step1Features = [
    "ステータス（未実施・実施中・完了）の可視化",
    "高ストレス者の人数をリアルタイム把握",
  ],
  step2Heading = "スマホで完結、即座に配布",
  step2Description = "PCを開く必要すらありません。スマートフォンに最適化されたUIで、決済用URLをワンタップでコピー。LINEやSlackなどのチャットアプリで、担当者にすぐに送信できます。",
}: WorkflowSectionProps) {
  return (
    <section className="bg-slate-50 py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8 flex flex-col gap-20 md:gap-32">
        {/* Step 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-1/2 flex flex-col items-center w-full">
            <DesktopMockup />
          </div>
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 w-fit">
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">
                PC管理画面
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {step1Heading}
            </h2>
            <p className="text-base md:text-lg text-slate-600 font-light">
              {step1Description}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              {step1Features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600 font-light">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 md:gap-20">
          <div className="lg:w-1/2 flex justify-center relative">
            <MobileMockup />
          </div>
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 w-fit">
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">
                モバイル画面
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {step2Heading}
            </h2>
            <p className="text-base md:text-lg text-slate-600 font-light pb-2">
              {step2Description}
            </p>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-center gap-3 w-fit">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">
                  こんなに簡単
                </span>
                <span className="text-xs text-slate-500 font-light">
                  「URLをコピー」→「チャットにペースト」だけ。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopMockup() {
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

function MobileMockup() {
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
