"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Users,
  Settings,
  AlertCircle,
  StopCircle,
  Download,
  Search,
  FileDown,
  Copy,
  RefreshCw,
  Lock,
  CheckCircle2,
} from "lucide-react";
import type { ProjectStatus, Employee } from "@/types/project";
import { defaultEmployees } from "./ClientDetail.fixtures";

type ClientDetailProps = {
  companyName?: string;
  status?: ProjectStatus;
  period?: { start: string; end: string };
  capacity?: number;
  reportUrl?: string;
  passcode?: string;
  stats?: {
    completionRate: number;
    completedCount: number;
    highStressCount: number;
    interviewRequestCount: number;
  };
  completedAt?: string;
  dataRetentionDeadline?: string;
  alertMessage?: string;
  employees?: Employee[];
  onBack?: () => void;
  onForceEnd?: () => void;
  onResendResult?: (employeeId: string) => void;
  onViewEmployee?: (employeeId: string) => void;
  onDownloadXml?: () => void;
  onDownloadCsv?: () => void;
  onExportTableCsv?: () => void;
  onCopyShareInfo?: () => void;
  onRegeneratePasscode?: () => void;
  onSettingsChange?: () => void;
};

const statusConfig = {
  in_progress: {
    label: "実施中",
    badgeClass: "bg-teal-50 border border-teal-100 text-teal-600",
  },
  unpaid: {
    label: "未決済",
    badgeClass: "bg-slate-100 border border-blue-600 text-blue-600",
  },
  action_required: {
    label: "要対応",
    badgeClass: "bg-red-50 border border-red-200 text-red-600",
  },
  completed: {
    label: "報告完了",
    badgeClass: "bg-slate-100 border border-slate-200 text-slate-600",
  },
} as const;

export function ClientDetail({
  companyName = "株式会社BBB",
  status = "in_progress",
  period = { start: "2026/01/01", end: "01/31" },
  capacity = 50,
  reportUrl = "https://stre-po.com/p/a1b2-c3d4...",
  passcode = "8822",
  stats = {
    completionRate: 40,
    completedCount: 20,
    highStressCount: 0,
    interviewRequestCount: 0,
  },
  completedAt,
  dataRetentionDeadline,
  alertMessage = "高ストレス者が5名検出されました。早急に内容を確認してください。",
  employees = defaultEmployees,
  onBack,
  onForceEnd,
  onResendResult,
  onViewEmployee,
  onDownloadXml,
  onDownloadCsv,
  onExportTableCsv,
  onCopyShareInfo,
  onRegeneratePasscode,
  onSettingsChange,
}: ClientDetailProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const isCompleted = status === "completed";
  const isActionRequired = status === "action_required";
  const showSearch = isActionRequired || isCompleted;
  const showForceEnd = !isCompleted;
  const highStressHighlight =
    (isActionRequired || isCompleted) && stats.highStressCount > 0;
  const settingsLabel = isActionRequired ? "設定・メッセージ変更" : "設定変更";
  const completionRateLabel = isCompleted ? "最終受検率" : "受検率";
  const { label: statusLabel, badgeClass } = statusConfig[status];

  const fiscalYear = period.start.split("/")[0];

  const safeReportUrl =
    reportUrl.startsWith("https://") || reportUrl.startsWith("http://")
      ? reportUrl
      : "#";

  const trimmedQuery = searchQuery.trim();
  const filteredEmployees = trimmedQuery
    ? employees.filter((e) => e.name.includes(trimmedQuery))
    : employees;

  const footerLabel =
    trimmedQuery && filteredEmployees.length !== employees.length
      ? `${filteredEmployees.length} 件表示中（全 ${employees.length} 件中）`
      : "全リスト表示中";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* アラートバナー（要対応のみ） */}
        {isActionRequired && (
          <div className="bg-red-50 border border-red-200 rounded-3xl shadow-sm flex items-center justify-between px-4 py-4 md:px-[17px] md:py-[17px]">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-red-700 font-bold text-[12px]">
                {alertMessage}
              </span>
            </div>
            <div className="bg-red-600 rounded-[4px] px-2 py-0.5 shrink-0 ml-3">
              <span className="text-white font-black text-[9px] tracking-[0.9px] uppercase">
                Immediate
              </span>
            </div>
          </div>
        )}

        {/* 完了バナー（報告完了のみ） */}
        {isCompleted && (
          <div className="bg-slate-800 rounded-3xl shadow-lg flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-teal-600 rounded-2xl w-12 h-12 flex items-center justify-center shadow-[0_10px_15px_-3px_rgba(13,148,136,0.2),0_4px_6px_-4px_rgba(13,148,136,0.2)] shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-teal-400 font-black italic text-sm tracking-[1.4px] uppercase">
                  Project Completed
                </p>
                <p className="text-slate-300 text-[12px] font-light mt-0.5">
                  {fiscalYear}年度のストレスチェックはすべて完了し、データは保護されました。
                </p>
              </div>
            </div>
            {completedAt && (
              <div className="text-right shrink-0 ml-4">
                <p className="text-slate-500 font-bold text-[10px] uppercase">
                  完了日
                </p>
                <p className="text-white font-black text-sm mt-0.5">{completedAt}</p>
              </div>
            )}
          </div>
        )}

        {/* ヘッダーセクション */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 flex flex-col gap-3">
            {/* タイトル行 */}
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                aria-label="前のページに戻る"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[24px] font-black text-slate-900">
                  {companyName}
                </h1>
                <span
                  className={`text-[10px] font-bold px-[9px] py-[3px] rounded-[4px] ${badgeClass}`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* メタ情報行 */}
            <div className="flex items-center gap-6 flex-wrap ml-9">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-[12px] text-slate-500 font-medium">
                  {isCompleted
                    ? `期間: ${period.start} 〜 ${period.end}`
                    : `${period.start} 〜 ${period.end}`}
                </span>
              </div>
              {!isCompleted && (
                <>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-[12px] text-slate-500 font-medium">
                      定員: {capacity}名
                    </span>
                  </div>
                  <button
                    onClick={onSettingsChange}
                    className="flex items-center gap-1 pl-2 text-teal-600 hover:underline"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-bold">{settingsLabel}</span>
                  </button>
                </>
              )}
              {isCompleted && dataRetentionDeadline && (
                <>
                  <span className="text-slate-200">|</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px] text-slate-500">
                      データ保存期限: {dataRetentionDeadline}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* アクションボタン */}
          {showForceEnd ? (
            <button
              onClick={onForceEnd}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-[21px] py-[13px] bg-white border border-red-200 rounded-2xl shadow-sm hover:bg-red-50 transition-colors shrink-0"
            >
              <StopCircle className="w-[18px] h-[18px] text-red-600 shrink-0" />
              <span className="text-red-600 font-black text-[12px] whitespace-nowrap">
                実施を強制終了する
              </span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full md:w-auto px-[17px] py-[7px] bg-slate-100 border border-slate-200 rounded-xl shadow-sm">
              <Lock className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-500 font-bold text-[10px]">
                このプロジェクトは編集不可です
              </span>
            </div>
          )}
        </div>

        {/* URLバー */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row md:h-14">
          {/* URL セクション */}
          <div className="bg-slate-50/50 flex-1 flex flex-col justify-center px-4 py-3 md:py-0 min-w-0">
            <p className="text-[8px] font-black text-slate-400 tracking-[0.8px] uppercase">
              Final Report URL（URL先で受験用URL、受験率、集団分析の確認が可能です。）
            </p>
            <a
              href={safeReportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 text-[10.8px] font-mono italic truncate hover:underline mt-0.5"
            >
              {reportUrl}
            </a>
          </div>
          {/* 区切り */}
          <div className="hidden md:block w-px bg-slate-200 my-3" />
          <div className="md:hidden h-px bg-slate-200 mx-4" />
          {/* パスコード セクション */}
          <div className="bg-white flex items-center px-5 py-3 md:py-0">
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-[8px] font-black text-slate-400 tracking-[0.8px] uppercase text-right">
                閲覧パスコード
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-black text-slate-900 tracking-[2.8px]">
                  {passcode}
                </span>
                <button
                  onClick={onRegeneratePasscode}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="閲覧パスコードを再発行する"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-[10px] font-bold">再発行</span>
                </button>
              </div>
            </div>
          </div>
          {/* コピーボタン */}
          <button
            onClick={onCopyShareInfo}
            className="bg-slate-900 flex items-center justify-center gap-2 px-6 py-3 md:py-0 hover:bg-slate-800 transition-colors shrink-0"
            aria-label="共有情報をクリップボードにコピーする"
          >
            <span className="text-white font-black text-[11px] whitespace-nowrap">
              共有情報をコピー
            </span>
            <Copy className="w-[18px] h-[18px] text-white" />
          </button>
        </div>

        {/* ダウンロードカード（報告完了のみ） */}
        {isCompleted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* XML */}
            <div className="bg-white border-2 border-teal-200/50 rounded-[32px] shadow-sm overflow-visible relative pt-10 pb-7 px-7 flex flex-col gap-4">
              <div className="absolute top-[-16px] right-[-16px] w-24 h-24 rounded-full bg-teal-50/50 flex items-center justify-center pointer-events-none">
                <Download className="w-8 h-8 text-teal-300" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-[4px] uppercase">
                    E-GOV
                  </span>
                  <h3 className="text-slate-900 font-black text-sm">
                    1. 厚労省への報告用データ
                  </h3>
                </div>
                <p className="text-slate-500 font-light text-[10px] leading-[1.625]">
                  労働安全衛生法関係の届出・申請等帳票印刷に係る入力支援サービスに必要な集計数値のみを抽出したXMLファイルです。
                  <br />
                  ※会社情報等のは事前に設定ページより入力ください。
                </p>
              </div>
              <button
                onClick={onDownloadXml}
                className="bg-teal-600 text-white font-black text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_15px_-3px_rgba(13,148,136,0.2),0_4px_6px_-4px_rgba(13,148,136,0.2)] hover:bg-teal-700 transition-colors"
              >
                <Download className="w-[18px] h-[18px]" />
                XMLファイルをダウンロード
              </button>
            </div>
            {/* CSV */}
            <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-visible relative pt-10 pb-7 px-7 flex flex-col gap-4">
              <div className="absolute top-[-16px] right-[-16px] w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center pointer-events-none">
                <FileDown className="w-8 h-8 text-slate-300" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-slate-900 font-black text-sm">
                  2. 受検結果の保存用データ
                </h3>
                <p className="text-slate-500 font-light text-[10px] leading-[1.625]">
                  全受検者の回答判定が載った詳細リストです。法律に基づき5年間の保存が必要です。
                </p>
              </div>
              <button
                onClick={onDownloadCsv}
                className="bg-slate-100 text-slate-600 font-black text-sm py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <Download className="w-[18px] h-[18px]" />
                全受検結果CSVをダウンロード
              </button>
            </div>
          </div>
        )}

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 受検率 */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-[21px] flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-[1px] uppercase">
              {completionRateLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[24px] font-black text-slate-900">
                {stats.completionRate}%
              </span>
              <span className="text-[12px] text-slate-400">
                {stats.completedCount} / {capacity} 名
              </span>
            </div>
          </div>
          {/* 高ストレス者 */}
          <div
            className={`bg-white rounded-3xl shadow-sm p-[21px] flex flex-col gap-1 ${
              highStressHighlight
                ? "border-2 border-red-200 shadow-[0_0_0_4px_rgba(254,242,242,0.5),0_1px_2px_0_rgba(0,0,0,0.05)]"
                : "border border-slate-200"
            }`}
          >
            <span
              className={`text-[10px] font-bold tracking-[1px] uppercase ${
                highStressHighlight ? "text-red-300" : "text-slate-400"
              }`}
            >
              {isCompleted ? "高ストレス者" : "高ストレス者数"}
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-[24px] font-black ${
                  highStressHighlight ? "text-red-600" : "text-slate-900"
                }`}
              >
                {stats.highStressCount}
              </span>
              <span
                className={`text-[14px] font-black ${
                  highStressHighlight ? "text-red-600" : "text-slate-900"
                }`}
              >
                名
              </span>
            </div>
          </div>
          {/* 面談希望者 */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-[21px] flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-[1px] uppercase">
              面談希望者
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-black text-slate-900">
                {stats.interviewRequestCount}
              </span>
              <span className="text-[14px] font-black text-slate-900">名</span>
            </div>
          </div>
        </div>

        {/* 受検者テーブル */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          {/* テーブルヘッダー（frosted） */}
          <div className="bg-slate-50/50 border-b border-slate-100 h-[78px]" />

          {/* 受検者リスト */}
          <div className="divide-y divide-slate-100">
            {filteredEmployees.map((employee) => {
              const isHS =
                (isActionRequired || isCompleted) && employee.isHighStress;
              return (
                <div
                  key={employee.id}
                  className={`flex items-center justify-between py-5 px-5 ${
                    isHS ? "bg-red-50/30" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13.3px] font-black text-slate-900">
                        {employee.name}
                      </span>
                      {isHS && (
                        <span className="bg-red-600 text-white text-[8.9px] font-black px-2 py-0.5 rounded-full tracking-[-0.45px]">
                          高ストレス
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] italic text-slate-400">
                      {employee.birthDate}
                      {employee.completedAt &&
                        ` | 完了: ${employee.completedAt}`}
                      {isHS && employee.requestsInterview && (
                        <>
                          {" | "}
                          <span className="font-bold text-red-600 not-italic">
                            面談希望あり
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onResendResult?.(employee.id)}
                      aria-label={`${employee.name}の結果を再送信する`}
                      className="bg-slate-100 border border-slate-200 text-black font-bold text-[12px] px-[17px] py-[9px] rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      結果を再送信する
                    </button>
                    <button
                      onClick={() => onViewEmployee?.(employee.id)}
                      aria-label={`${employee.name}の結果を表示`}
                      className={`font-bold text-[12px] px-[17px] py-[9px] rounded-xl transition-colors ${
                        isHS
                          ? "bg-white border border-red-200 text-red-600 shadow-sm hover:bg-red-50"
                          : "bg-teal-50 border border-teal-100 text-teal-600 hover:bg-teal-100"
                      }`}
                    >
                      表示
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 検索 + CSV（要対応・報告完了のみ） */}
          {showSearch && (
            <div className="bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-5">
              <div className="relative w-full sm:max-w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="受検者を検索..."
                  aria-label="受検者を名前で検索"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-2 text-[12px] text-slate-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>
              <button
                onClick={onExportTableCsv}
                className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-[17px] py-[9px] shadow-sm hover:bg-slate-50 transition-colors shrink-0"
              >
                <FileDown className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-600">
                  表データをCSV保存
                </span>
              </button>
            </div>
          )}

          {/* フッター */}
          <div className="bg-slate-50 border-t border-slate-100 py-4 text-center">
            <span className="text-[10px] font-bold text-slate-400">
              {footerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
