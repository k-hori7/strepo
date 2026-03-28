"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

type DoctorSettingsProps = {
  className?: string;
};

const inputBaseClass =
  "w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent";

const labelClass =
  "text-xs font-bold text-slate-700 tracking-wider uppercase";

function SectionHeading({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description?: string;
  variant?: "default" | "danger";
}) {
  return (
    <div
      className={`border-l-4 pl-5 flex flex-col gap-1 ${
        variant === "danger" ? "border-red-500" : "border-teal-600"
      }`}
    >
      <h2
        className={`text-lg font-bold ${
          variant === "danger" ? "text-red-600" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xs font-light text-slate-500">{description}</p>
      )}
    </div>
  );
}

function Card({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger";
}) {
  const variants = {
    default: "bg-white border-slate-200",
    danger: "bg-red-50/50 border-red-100",
  };
  return (
    <div
      className={`border rounded-xl shadow-sm p-6 ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function DoctorSettings({ className }: DoctorSettingsProps) {
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  return (
    <div className={`flex flex-col gap-12 ${className ?? ""}`}>
      {/* 医師基本情報 */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="医師基本情報"
          description="厚生労働省への報告書類に使用される正式な情報を入力してください。"
        />
        <Card>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="doctorName" className={labelClass}>
                  氏名
                </label>
                <input
                  id="doctorName"
                  type="text"
                  autoComplete="name"
                  placeholder="山田 太郎"
                  className={inputBaseClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="medicalRegistrationNumber" className={labelClass}>
                  医籍登録番号
                </label>
                <input
                  id="medicalRegistrationNumber"
                  type="text"
                  placeholder="123456"
                  className={inputBaseClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="occupationalPhysicianNumber" className={labelClass}>
                日本医師会認定産業医番号
              </label>
              <input
                id="occupationalPhysicianNumber"
                type="text"
                placeholder="000000"
                className={inputBaseClass}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* 所属機関情報 */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="所属機関情報"
          description="報告書の「産業医所属」欄に反映される情報です。"
        />
        <Card>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="institutionName" className={labelClass}>
                所属医療機関・事務所名
              </label>
              <input
                id="institutionName"
                type="text"
                placeholder="〇〇クリニック"
                className={inputBaseClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="postalCode" className={labelClass}>
                  郵便番号
                </label>
                <input
                  id="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="123-4567"
                  className={inputBaseClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className={labelClass}>
                  所在地
                </label>
                <input
                  id="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="東京都中央区銀座1-2-3 〇〇ビル4F"
                  className={inputBaseClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClass}>
                連絡先電話番号（電子申請用）
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="03-1234-5678"
                className={inputBaseClass}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* 通知・システム設定 */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="通知・システム設定" />
        <Card>
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-700">
                面接指導申し出のリアルタイム通知
              </span>
              <span className="text-xs font-light text-slate-500">
                従業員から面接指導の希望があった際、即時にメールで通知します。
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notificationEnabled}
              aria-label="面接指導申し出のリアルタイム通知"
              onClick={() => setNotificationEnabled(!notificationEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                notificationEnabled ? "bg-teal-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  notificationEnabled ? "translate-x-[22px]" : "translate-x-0.5"
                } mt-0.5`}
              />
            </button>
          </div>
        </Card>
      </section>

      {/* アカウント設定 */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="アカウント設定" />
        <Card>
          <div className="flex flex-col gap-6">
            <dl className="flex flex-col gap-2">
              <dt className={labelClass}>ログインメールアドレス</dt>
              <dd className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                <Mail className="w-[18px] h-[18px] text-slate-400 shrink-0" />
                <span className="text-sm font-medium text-slate-500">
                  yamada@example.com
                </span>
              </dd>
            </dl>
            <div className="border-t border-slate-100 pt-6 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-700">
                  パスワード再設定
                </span>
                <span className="text-xs font-light text-slate-500">
                  セキュリティ保護のため、再設定用メールを送信します。
                </span>
              </div>
              <button
                type="button"
                className="shrink-0 bg-white border border-slate-300 rounded-lg px-5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                メールを送信
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Danger Zone */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Danger Zone" variant="danger" />
        <Card variant="danger" className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-red-700">
              アカウントの削除
            </span>
            <span className="text-xs font-light text-red-600/80 leading-relaxed">
              削除後、すべてのデータは復元できません。安衛法に基づく「5年間の保存義務」を遵守しているか確認の上、実行してください。
            </span>
          </div>
          <button
            type="button"
            className="shrink-0 bg-white border border-red-200 rounded-lg px-6 py-2.5 text-sm font-bold text-red-600 shadow-sm hover:bg-red-50 transition-colors"
          >
            退会手続きへ
          </button>
        </Card>
      </section>
    </div>
  );
}
