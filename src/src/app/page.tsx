import {
  ArrowRight,
  Users,
  FileText,
  Coins,
  Monitor,
  Smartphone,
  CheckCircle2,
  Link2,
  CreditCard,
  ClipboardCheck,
  Copy,
  Check,
  Download,
  Menu,
} from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-8 md:px-20">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-black text-2xl tracking-tight text-slate-950">
            Stre<span className="text-teal-600">-Po</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              機能
            </a>
            <a href="#workflow" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              利用の流れ
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              料金
            </a>
            <a
              href="#pricing"
              className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm hover:bg-teal-700 transition-colors"
            >
              無料で始める (医師用)
            </a>
          </nav>
          <button className="md:hidden text-slate-600" aria-label="メニューを開く">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-24 pb-16 md:pt-48 md:pb-32 px-6 md:px-28">
      <div className="absolute -right-[200px] -top-[200px] w-[800px] h-[800px] rounded-full bg-teal-200/20 blur-3xl" />
      <div className="absolute -left-[150px] -bottom-[150px] w-[600px] h-[600px] rounded-full bg-slate-200/40 blur-3xl" />
      <div className="relative max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Hero Content */}
        <div className="flex flex-col gap-6 items-start lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span className="text-xs font-bold text-teal-700">2026年の法改正にも完全対応</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ストレスチェックを名簿レスで。
            <br />
            転記作業ゼロ。
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-400">
              低価格で快適な体験を。
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-light max-w-md">
            医師と企業の負担を最小限にする、最短のストレスチェックツール。面倒な従業員名簿のインポートは不要です。
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold text-base px-8 h-12 rounded-md shadow-[0_10px_15px_-3px_rgba(13,148,136,0.2),0_4px_6px_-4px_rgba(13,148,136,0.2)] hover:bg-teal-700 transition-colors"
          >
            無料で始める (医師用)
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Hero Visual */}
        <div className="relative lg:w-1/2 h-[400px] md:h-[600px] w-full">
          {/* MacBook Mockup */}
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
                    <div className="bg-slate-50 border border-slate-100 rounded p-3 flex items-center justify-between">
                      <div className="bg-slate-200 h-2 rounded w-24" />
                      <div className="bg-slate-200 h-2 rounded w-24" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded p-3 flex items-center justify-between">
                      <div className="bg-slate-200 h-2 rounded w-20" />
                      <div className="bg-green-200 h-2 rounded w-24" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded p-3 flex items-center justify-between">
                      <div className="bg-slate-200 h-2 rounded w-28" />
                      <div className="bg-slate-200 h-2 rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* iPhone Mockup */}
          <div className="absolute right-0 md:right-4 bottom-0 md:bottom-8 w-[140px] md:w-[240px] bg-slate-900 border-[6px] border-slate-800 rounded-[36px] md:rounded-[48px] shadow-2xl p-2.5 md:p-4.5">
            <div className="bg-white border border-slate-700/50 rounded-[28px] md:rounded-[35px] overflow-hidden">
              <div className="bg-slate-50 px-3 md:px-4 pt-8 md:pt-10 pb-4 md:pb-6 flex flex-col gap-3 md:gap-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 h-5 md:h-6 w-20 md:w-28 rounded-b-xl" />
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-slate-200 h-1.5 rounded w-24" />
                  <div className="bg-slate-300 h-2.5 md:h-3 rounded w-36" />
                </div>
                <div className="flex flex-col gap-2.5 md:gap-4">
                  <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3">
                    <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border-2 border-teal-500" />
                    <div className="bg-slate-200 h-2 rounded flex-1" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3">
                    <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border-2 border-slate-300" />
                    <div className="bg-slate-200 h-2 rounded w-3/4" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3">
                    <div className="w-3 md:w-4 h-3 md:h-4 rounded-full border-2 border-slate-300" />
                    <div className="bg-slate-200 h-2 rounded w-5/6" />
                  </div>
                </div>
                <div className="bg-teal-600 rounded-lg shadow-md py-2 md:py-3 text-center">
                  <span className="text-[10px] md:text-xs font-bold text-white">回答を送信する</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-teal-600" />,
      title: "名簿登録不要",
      description: "従業員情報のCSVインポートや手入力作業は一切不要です。",
      snippet: (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col gap-3">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">従業員一覧</span>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full">
              登録不要
            </span>
          </div>
          <div className="opacity-50 flex flex-col gap-2">
            <div className="bg-slate-100 h-2 rounded w-full" />
            <div className="bg-slate-100 h-2 rounded w-2/3" />
          </div>
          <div className="flex justify-center pt-1">
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded px-3 py-1.5">
              <span className="text-xs text-slate-400 font-light">データは自動集計されます</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <FileText className="w-6 h-6 text-teal-600" />,
      title: "厚労省形式XML",
      description: "提出用のフォーマットで即座に出力。加工作業ゼロで報告完了。",
      snippet: (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col items-center gap-4 py-8">
          <div className="bg-green-50 rounded-lg p-3">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <button className="bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2 w-full justify-center shadow-sm">
            <Download className="w-4 h-4" />
            厚労省形式XMLを出力
          </button>
        </div>
      ),
    },
    {
      icon: <Coins className="w-6 h-6 text-teal-600" />,
      title: "シンプルな料金",
      description: "実施時だけの都度課金だから、小規模事業所にも最適。実施時以外は全て無料利用可能。",
      snippet: (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">1社・1回あたり</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 tracking-tight">5,500</span>
              <span className="text-sm font-medium text-slate-500">円(税込)</span>
            </div>
            <span className="bg-slate-100 text-red-600 text-xs font-light px-2 py-1 rounded mt-1">業界最安水準</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="bg-white py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col gap-4 items-center mb-12 md:mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            医師の業務フローを最適化
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-light">
            煩雑なストレスチェック業務を、Stre-Poなら低価格でシンプルに。
            <br className="hidden md:block" />
            余計な機能は削ぎ落とし、本当に必要な機能だけを搭載しました。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm overflow-hidden p-px"
            >
              <div className="p-6 flex flex-col gap-3.5">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-500 font-light">{feature.description}</p>
                {feature.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="bg-slate-50 py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8 flex flex-col gap-20 md:gap-32">
        {/* Step 1: Desktop Management */}
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          {/* MacBook Frame */}
          <div className="lg:w-1/2 flex flex-col items-center w-full">
            <div className="bg-gray-800 border-8 border-gray-800 rounded-t-xl p-2 w-full max-w-[600px]">
              <div className="bg-white rounded-lg overflow-hidden flex h-[250px] md:h-[334px]">
                {/* Sidebar */}
                <div className="bg-slate-50 border-r border-slate-200 w-[184px] p-3 flex-col gap-2 hidden sm:flex">
                  <div className="pb-1">
                    <span className="text-[10px] font-bold text-slate-400">クライアント一覧</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded shadow-sm p-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">株式会社A</span>
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="bg-slate-100 h-1 rounded-full">
                      <div className="bg-green-500 h-1 rounded-full w-4/5" />
                    </div>
                  </div>
                  <div className="px-2 pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Bクリニック</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <div className="px-2 pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">合同会社C</span>
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 p-4 flex flex-col gap-4">
                  <div className="bg-slate-100 h-4 rounded w-32" />
                  <div className="flex gap-3">
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded p-3 flex flex-col gap-1">
                      <span className="text-[10px] text-slate-400 font-light">回答率</span>
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold text-slate-800">82</span>
                        <span className="text-xs text-slate-500 font-light">%</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded p-3 flex flex-col gap-1">
                      <span className="text-[10px] text-slate-400 font-light">高ストレス者</span>
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
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 w-fit">
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">PC管理画面</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              複数クライアントを一元管理
            </h2>
            <p className="text-base md:text-lg text-slate-600 font-light">
              サイドバーでクライアント（A社、Bクリニック等）を瞬時に切り替え。
              進捗状況はプログレスバーで一目瞭然。面倒なログイン/ログアウトを繰り返す必要はありません。
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-600 font-light">
                  ステータス（未実施・実施中・完了）の可視化
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-base text-slate-600 font-light">
                  高ストレス者の人数をリアルタイム把握
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Mobile Distribution */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 md:gap-20">
          {/* iPhone Frame */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-[40px] rounded-full bg-gradient-to-tr from-teal-100 to-transparent blur-3xl" />
            <div className="relative bg-gray-800 border-[10px] border-gray-800 rounded-[40px] shadow-2xl p-2.5 w-[260px] md:w-[280px]">
              <div className="bg-slate-50 rounded-[32px] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black h-6 w-24 rounded-b-2xl z-10" />
                <div className="pt-12 px-5 pb-4 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <ArrowRight className="w-5 h-5 text-slate-800 rotate-180" />
                    <span className="text-sm font-bold text-slate-800">プロジェクト設定</span>
                    <div className="w-5" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col items-center gap-3 mb-6">
                    <div className="bg-teal-100 rounded-full p-3">
                      <Link2 className="w-6 h-6 text-teal-600" />
                    </div>
                    <span className="text-base font-bold text-slate-800">決済・実施用URL</span>
                    <span className="text-xs text-slate-500 font-light text-center">
                      このURLをクライアントに送付してください
                    </span>
                    <div className="bg-slate-100 rounded p-2 w-full">
                      <p className="text-[11px] text-slate-500 font-mono text-center break-all">
                        https://stre-po.com/pay/cl_...
                      </p>
                    </div>
                    <button className="bg-teal-600 text-white font-bold text-base py-3 rounded-lg shadow-sm w-full flex items-center justify-center gap-2">
                      <Copy className="w-4.5 h-4.5" />
                      URLをコピー
                    </button>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                    <span className="text-xs text-slate-400 text-center">送信イメージ</span>
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
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 w-fit">
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">モバイル画面</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              スマホで完結、即座に配布
            </h2>
            <p className="text-base md:text-lg text-slate-600 font-light pb-2">
              PCを開く必要すらありません。スマートフォンに最適化されたUIで、決済用URLをワンタップでコピー。
              LINEやSlackなどのチャットアプリで、担当者にすぐに送信できます。
            </p>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex items-center gap-3 w-fit">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">こんなに簡単</span>
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

function TimelineSection() {
  const steps = [
    {
      icon: <Link2 className="w-7 h-7 text-teal-600" />,
      title: "1. URL発行",
      description: "医師が管理画面から決済用URLを発行し、企業の担当者に送付します。",
    },
    {
      icon: <CreditCard className="w-7 h-7 text-teal-600" />,
      title: "2. クライアント決済",
      description: "企業担当者がURLからクレジットカードで決済。即座に実施可能になります。",
    },
    {
      icon: <ClipboardCheck className="w-7 h-7 text-teal-600" />,
      title: "3. 従業員回答",
      description: "従業員はスマホから回答。完了後、電子申請時に必要なデータの表示。",
    },
  ];

  return (
    <section id="workflow" className="bg-white border-t border-slate-200 py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col gap-4 items-center mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">利用の流れ</h2>
          <p className="text-sm md:text-base text-slate-500 font-light">
            最短3ステップで実施開始。面倒な手続きは一切ありません。
          </p>
        </div>
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div
                key={step.title}
                className="relative bg-white border border-slate-100 rounded-xl p-6 pt-20 text-center"
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-teal-50 border-4 border-white rounded-full shadow-sm w-16 h-16 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-slate-50 py-16 md:py-24 px-6 md:px-20">
      <div className="max-w-[512px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 px-6 py-4 text-center">
            <h3 className="text-lg font-bold text-white">シンプルプラン</h3>
            <p className="text-sm text-teal-100 font-light">初期費用・月額費用は一切かかりません</p>
          </div>

          {/* Body */}
          <div className="px-10 pt-10 pb-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center">
              <span className="text-5xl font-black text-slate-900 tracking-tight">5,500</span>
              <div className="flex flex-col ml-2">
                <span className="text-sm font-bold text-slate-900">円 (税込)</span>
                <span className="text-xs text-slate-500">/ 1社・1回</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-light text-center">
              50人未満の小規模事業所に特化した料金設定。
              <br />
              実施するたびにお支払いいただく都度課金型です。
            </p>
            <a
              href="#"
              className="bg-slate-900 text-white font-bold text-base px-6 py-4 rounded-lg shadow-lg w-full text-center hover:bg-slate-800 transition-colors"
            >
              今すぐ無料でアカウント作成
            </a>
            <p className="text-xs text-slate-400 font-light">※ 医師用アカウントの作成は無料です</p>
          </div>

          {/* Feature list */}
          <div className="bg-slate-50 border-t border-slate-100 px-10 py-6">
            <div className="flex flex-col gap-3">
              {[
                "顧問先（プロジェクト）作成無制限",
                "クラウドデータ保存（5年間）",
                "電子申請用XMLのダウンロード",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-6 px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Brand */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <span className="font-black text-xl tracking-tight text-slate-950">
              Stre<span className="text-teal-600">-Po</span>
            </span>
            <p className="text-sm text-slate-500 font-light max-w-xs">
              医師と企業の負担を最小限にする、
              <br />
              新しいストレスチェックツール。
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">プロダクト</h4>
              <div className="flex flex-col gap-2.5">
                <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  機能
                </a>
                <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  料金
                </a>
                <a href="#workflow" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  利用の流れ
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">法的情報</h4>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  利用規約
                </a>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  プライバシーポリシー
                </a>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  特定商取引法に基づく表記
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400 font-light">&copy; 2026 Stre-Po. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <TimelineSection />
      <PricingSection />
      <Footer />
    </>
  );
}
