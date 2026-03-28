import type { ReactNode } from "react";

type LegalNoticeProps = {
  className?: string;
};

type TableRow = {
  label: string;
  value: ReactNode;
};

const rows: TableRow[] = [
  { label: "販売業者", value: "ストレポ運営事務局" },
  { label: "運営責任者", value: "堀康太" },
  { label: "所在地", value: "〒[更新予定]" },
  {
    label: "メールアドレス",
    value: (
      <span className="font-medium font-inter text-teal-600">
        strepo.official@gmail.com
      </span>
    ),
  },
  {
    label: "電話番号",
    value: <span className="font-medium text-teal-600">[更新予定]</span>,
  },
  {
    label: "販売価格",
    value: (
      <span className="font-bold">
        1プロジェクト（1社/1回実施分） 5,500円（税込）
      </span>
    ),
  },
  {
    label: "商品代金以外の必要料金",
    value: (
      <span className="text-slate-600">
        サイト閲覧、コンテンツダウンロード、お問い合わせ等の際の通信料。
      </span>
    ),
  },
  { label: "お支払方法", value: "クレジットカード決済（Stripe）" },
  {
    label: "代金の支払時期",
    value: "ストレスチェック用URL発行時（事前決済）",
  },
  {
    label: "商品の引渡時期",
    value:
      "決済完了後、直ちに受検用URLを発行し、管理画面上にて提供いたします。",
  },
  {
    label: "返品・交換・キャンセル",
    value: (
      <span className="text-slate-600">
        デジタルコンテンツおよびサービスの性質上、決済完了後の返品・交換・キャンセルには応じられません。
      </span>
    ),
  },
  {
    label: "動作環境",
    value: (
      <span className="text-xs text-slate-600">
        [PC] Windows 10/11, macOS 最新版（Chrome, Edge, Safari 推奨）
        <br />
        [スマートフォン] iOS, Android 最新版（Safari, Chrome 推奨）
      </span>
    ),
  },
];

export function LegalNotice({ className }: LegalNoticeProps) {
  return (
    <article className={`bg-slate-50 ${className ?? ""}`}>
      <div className="max-w-[768px] mx-auto px-6 pt-32 pb-20 md:pt-36 md:pb-24">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">
          特定商取引法に基づく表記
        </h1>

        {/* テーブル */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i > 0 ? "border-t border-slate-100" : ""}
                >
                  <td className="bg-slate-50/50 p-5 font-bold text-sm text-slate-600 align-middle w-1/3">
                    {row.label}
                  </td>
                  <td className="p-5 font-light text-sm text-slate-900 align-middle">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 注意書き */}
        <div className="bg-teal-600/5 border border-teal-600/10 rounded-xl p-6 mt-8">
          <p className="text-xs font-light text-teal-600 leading-relaxed">
            ※本ページの内容は、サービスの正式リリースおよび有料化に伴い、必要に応じて随時更新されます。現在はベータ版テスト期間中につき、実際の決済が発生しない場合がございます。
          </p>
        </div>
      </div>
    </article>
  );
}
