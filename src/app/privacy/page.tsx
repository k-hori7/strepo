import { Header } from "@/components/lp/Header";
import { Footer } from "@/components/lp/Footer";
import { LP_NAV_ITEMS_ABSOLUTE } from "@/constants/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Stre-Po",
  description:
    "ストレポのプライバシーポリシー。個人情報の取扱いについて定めます。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header navItems={LP_NAV_ITEMS_ABSOLUTE} />
      <main className="bg-white">
        <div className="max-w-[768px] mx-auto px-6 pt-16 pb-32 md:pt-24 md:pb-24">
          {/* Page Header */}
          <div className="flex flex-col gap-4 mb-16">
            <span className="inline-flex self-start items-center px-3 py-1 bg-teal-600/5 border border-teal-600/30 text-teal-600 text-xs font-medium font-inter rounded-full">
              Legal Documents
            </span>
            <h1 className="text-3xl md:text-4xl tracking-tight font-bold text-slate-900">
              プライバシーポリシー
            </h1>
            <p className="text-sm text-slate-500 font-light">
              最終改定日：2026年1月30日
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-12">
            {/* Preamble */}
            <p className="text-lg md:text-base font-light text-slate-700 leading-relaxed">
              ストレポ運営事務局（以下「当事務局」といいます。）は、本ウェブサイト上で提供するサービス「ストレポ」（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下の通りプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
            </p>

            {/* Article 1 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第1条（基本方針）
                </h2>
              </div>
              <div className="bg-slate-50 border-l-4 border-teal-600 rounded-lg p-5">
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  当事務局は、ストレスチェック制度の実施にあたり、受検者のプライバシー保護を最優先事項と捉えています。本サービスは、
                  <strong className="font-bold text-slate-900">
                    「従業員名簿をデータベースに保持しない」
                  </strong>
                  独自のアーキテクチャを採用しており、情報漏洩リスクを最小限に抑えつつ、法令に基づく適切なデータ保管を行います。
                </p>
              </div>
            </section>

            {/* Article 2 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第2条（収集する情報および収集方法）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed mb-5">
                本サービスでは、以下の情報を取得します。
              </p>
              <div className="flex flex-col gap-4">
                {/* Card 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    1. 産業医・事業者（クライアント）情報
                  </h3>
                  <p className="text-sm font-light text-slate-600 leading-relaxed">
                    氏名、メールアドレス、勤務先/法人名、決済情報（Stripeを通じて処理され、当事務局はカード番号等を保持しません）。
                  </p>
                </div>
                {/* Card 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    2. 受検者（従業員）情報
                  </h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li className="text-sm font-light text-slate-600 leading-relaxed">
                      <strong className="font-bold text-slate-900">
                        受検時に入力される情報：
                      </strong>{" "}
                      氏名。※本情報はレポート生成のために一時的に使用されますが、名簿データとして永続的にデータベースへ保存されることはありません。
                    </li>
                    <li className="text-sm font-light text-slate-600 leading-relaxed">
                      <strong className="font-bold text-slate-900">
                        回答データ：
                      </strong>{" "}
                      ストレスチェック項目（57項目等）への回答内容、および算出された判定結果。
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Article 3 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第3条（個人情報の利用目的）
                </h2>
              </div>
              <ol className="list-decimal pl-5 space-y-2">
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  本サービスの提供・運営および管理のため
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  労働安全衛生法に基づくストレスチェック結果の保存（5年間）のため
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  産業医等による労働基準監督署への報告書作成支援のため
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  ユーザーからのお問い合わせに対する回答のため
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  メンテナンス、重要なお知らせなど、必要に応じたご連絡のため
                </li>
              </ol>
            </section>

            {/* Article 4 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第4条（名簿レス設計とデータ保護）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed">
                本サービスは、事業主から従業員の名簿（氏名・メールアドレス・社員番号等）の提供を受けない仕組みとなっており、当事務局のデータベース上に個人特定が可能な名簿情報は構築されません。受検結果データは匿名化された識別子と紐づけて管理され、高い機密性を保持します。
              </p>
            </section>

            {/* Article 5 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第5条（データの保存期間）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed">
                受検結果データは、労働安全衛生法に基づき、実施完了日から5年間安全にクラウド保存されます。保存期間を経過したデータについては、速やかに適切な方法で消去します。
              </p>
            </section>

            {/* Article 6 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第6条（個人情報の第三者提供）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed mb-4">
                当事務局は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  法令に基づく場合
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li className="text-base font-light text-slate-600 leading-relaxed">
                  決済処理（Stripe）等、利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                </li>
              </ol>
            </section>

            {/* Article 7 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第7条（安全管理措置）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed">
                当事務局は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために、SSL/TLSによる通信の暗号化、データベースのアクセス制限、クラウドサーバーにおける最新のセキュリティ対策を講じています。
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 bg-teal-600 rounded-full shrink-0" />
                <h2 className="text-xl font-bold text-slate-900">
                  第8条（お問い合わせ窓口）
                </h2>
              </div>
              <p className="text-base font-light text-slate-600 leading-relaxed">
                本ポリシーに関するお問い合わせは、フッターに記載の「特定商取引法に基づく表記」内の連絡先、またはお問い合わせフォームよりお願いいたします。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
