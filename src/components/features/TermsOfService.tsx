import type { ReactNode } from "react";

type TermsOfServiceProps = {
  className?: string;
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-l-4 border-teal-600 pl-5 font-bold text-xl text-slate-950 mb-4">
      {children}
    </h2>
  );
}

export function TermsOfService({ className }: TermsOfServiceProps) {
  return (
    <article className={`bg-slate-50 ${className ?? ""}`}>
      <div className="max-w-[768px] mx-auto px-6 py-20 md:py-24">
        {/* タイトル */}
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            利用規約
          </h1>
          <p className="text-sm font-light text-slate-500">
            最終改定日：2026年1月30日
          </p>
        </div>

        {/* 条文 */}
        <div className="flex flex-col gap-12">
          {/* 第1条 */}
          <section>
            <SectionHeading>第1条（適用）</SectionHeading>
            <p className="text-base font-light text-slate-700 leading-relaxed px-1">
              本規約は、本サービスの利用に関するすべての関係に適用されます。本サービスを利用した時点で、本規約に同意したものとみなします。
            </p>
          </section>

          {/* 第2条 */}
          <section>
            <SectionHeading>第2条（定義とサービスの性質）</SectionHeading>
            <p className="text-base font-light text-slate-700 leading-relaxed px-1">
              本サービスは、労働安全衛生法に基づくストレスチェック実施を支援するクラウド型ツールです。当事務局は、システムの提供者であり、「実施者（医師等）」としての法的責任は、本サービスを利用する医師本人が負うものとします。
            </p>
          </section>

          {/* 第3条 */}
          <section>
            <SectionHeading>第3条（利用料金および支払方法）</SectionHeading>
            <div className="bg-teal-50 border border-teal-600/20 rounded-xl p-6 flex flex-col gap-4">
              <p className="font-bold text-lg text-slate-950">
                利用料金：1プロジェクトあたり 5,500円（税込）
              </p>
              <p className="text-base font-light text-slate-700 leading-relaxed">
                ユーザーは、本サービス上でStripeを通じて決済を行い、決済完了後に受検URLが発行されます。
              </p>
              <p className="font-bold text-base text-teal-600 leading-relaxed">
                返金について：デジタルコンテンツおよびサービスの性質上、決済完了後のキャンセルおよび返金には一切応じられません。
              </p>
            </div>
          </section>

          {/* 第4条 */}
          <section>
            <SectionHeading>
              第4条（名簿レス運用と自己責任）
            </SectionHeading>
            <p className="text-base font-light text-slate-700 leading-relaxed px-1">
              本サービスは、従業員名簿（氏名等）を事前に登録しない設計です。ユーザー（産業医）は、発行された受検URLを自己の責任において顧問先企業へ配布するものとします。受検者が入力した氏名情報等の正確性について、当事務局は一切の責任を負いません。
            </p>
          </section>

          {/* 第5条 */}
          <section>
            <SectionHeading>
              第5条（データの保存期間と取り扱い）
            </SectionHeading>
            <div className="flex flex-col gap-4 px-1">
              <p className="text-base font-light text-slate-700 leading-relaxed">
                当事務局は、安衛法に基づき、受検結果データを
                <strong className="font-bold underline">
                  実施日から5年間
                </strong>
                、クラウド上で保管します。5年を経過したデータ、または本サービスが終了した後のデータについては、当事務局の判断で消去できるものとします。
              </p>
              <p className="text-base font-light text-slate-700 leading-relaxed">
                保存されるデータには、氏名等の個人特定情報は含まれず、匿名化された識別子を付した数値データとして管理されます。
              </p>
            </div>
          </section>

          {/* 第6条 */}
          <section>
            <SectionHeading>第6条（禁止事項）</SectionHeading>
            <div className="flex flex-col gap-4 px-1">
              <p className="text-base font-light text-slate-700 leading-relaxed">
                ユーザーは、以下の行為を行ってはなりません。
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base font-light text-slate-700 leading-relaxed">
                <li>
                  不正なアクセスやシステムの解析（リバースエンジニアリング等）。
                </li>
                <li>虚偽の情報を入力してのアカウント作成。</li>
                <li>
                  本サービスをストレスチェック以外の目的で利用すること。
                </li>
              </ul>
            </div>
          </section>

          {/* 第7条 */}
          <section>
            <SectionHeading>第7条（免責事項：重要）</SectionHeading>
            <div className="flex flex-col gap-6 px-1">
              <div>
                <h3 className="font-bold text-base text-slate-950 mb-2">
                  診断結果について：
                </h3>
                <p className="text-base font-light text-slate-700 leading-relaxed">
                  本サービスによる判定はアルゴリズムに基づくものであり、最終的な医学的判断は産業医が行うものとします。診断結果に起因するトラブルについて、当事務局は一切の責任を負いません。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-950 mb-2">
                  行政対応：
                </h3>
                <p className="text-base font-light text-slate-700 leading-relaxed">
                  当事務局は、出力されるXMLが「心理的な負担の程度を把握するための検査結果等報告書」の報告に利用可能であるよう努めますが、行政側のシステム変更等により、将来にわたって完全な互換性を保証するものではありません。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-950 mb-2">
                  サービスの中断：
                </h3>
                <p className="text-base font-light text-slate-700 leading-relaxed">
                  サーバーメンテナンスや不可抗力（天災・通信障害等）によるサービス停止について、当事務局は責任を負いません。
                </p>
              </div>
            </div>
          </section>

          {/* 第8条 */}
          <section>
            <SectionHeading>第8条（サービスの終了）</SectionHeading>
            <p className="text-base font-light text-slate-700 leading-relaxed px-1">
              当事務局が本サービスを終了する場合、3ヶ月前までにユーザーに通知します。その際、保存されているデータの取り扱いについて適切に案内するものとします。
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
