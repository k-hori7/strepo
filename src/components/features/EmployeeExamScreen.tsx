"use client";

import { useState, FormEvent, useCallback, memo } from "react";

// ---- 質問データ ----

const SECTION_A_QUESTIONS = [
  "非常にたくさんの仕事をしなければならない",
  "時間内に仕事が処理しきれない",
  "一生懸命働かなければならない",
  "かなり注意を集中する必要がある",
  "高度な知識や技術が必要な仕事だ",
  "勤務時間中はいつも仕事のことを考えていなければならない",
  "からだを大変よく使う仕事だ",
  "自分のペースで仕事ができる",
  "自分で仕事の順番・やり方を決めることができる",
  "職場の仕事の方針に自分の意見を反映できる",
  "自分の技能や知識を仕事で使う機会が少ない",
  "自分の部署内での意見のくい違いがある",
  "私の部署と他の部署との間に争いがある",
  "私の部署の雰囲気は友好的である",
  "私の職場の作業環境（温度・照明・騒音など）はよくない",
  "仕事の内容が自分にあっている",
  "働きがいのある仕事だ",
];
const SECTION_A_SCALE = ["そうだ", "まあそうだ", "ややちがう", "ちがう"] as const;

const SECTION_B_QUESTIONS = [
  "活気がわいてくる",
  "元気がいっぱいだ",
  "生き生きする",
  "怒りを感じる",
  "内心腹立たしい",
  "ぐったりした",
  "ひどく疲れた",
  "うんざりした",
  "不安だ",
  "気がはりつめている",
  "心配で抑うつ気分だ",
  "何をするのも面倒だ",
  "物事に集中できない",
  "気分が晴れない",
  "仕事が手につかない",
  "悲しいと感じる",
  "めまいがする",
  "体のどこかが痛む",
  "頭が重かったり頭痛がする",
  "首筋や肩がこる",
  "腰が痛む",
  "目が疲れる",
  "動悸や息切れがする",
  "胃腸の具合がよくない",
  "食欲がない",
  "便秘や下痢をする",
  "よく眠れない",
  "手足がふるえる",
  "汗をかきやすい",
];
const SECTION_B_SCALE = ["ほとんどなかった", "時々あった", "しばしばあった", "ほとんどいつも"] as const;

const SECTION_C_GROUPS = [
  { id: "supervisor", label: "上司" },
  { id: "colleague", label: "同僚" },
  { id: "family", label: "配偶者、家族、友人等" },
] as const;
const SECTION_C_QUESTIONS = [
  "どのくらい気軽に相談できますか？",
  "あなたが困った時、どのくらい頼りになりますか？",
  "あなたの個人的な問題を聞いてもらえますか？",
];
const SECTION_C_SCALE = ["非常に", "かなり", "多少", "全くない"] as const;

const SECTION_D_QUESTIONS = ["仕事に満足している", "家庭生活に満足している"];
const SECTION_D_SCALE = ["満足している", "まあ満足", "やや不満足", "不満足"] as const;

// ---- 型定義 ----

type Profile = {
  name: string;
  birthdate: string;
  email: string;
};

type AnswerValue = 1 | 2 | 3 | 4;
type Answers = Record<string, AnswerValue>;

type ExamFormData = {
  profile: Profile;
  answers: Answers;
};

type EmployeeExamScreenProps = {
  onSubmit?: (data: ExamFormData) => void;
};

// ---- 小コンポーネント ----

type QuestionRowProps = {
  questionKey: string;
  label: string;
  scale: readonly string[];
  selected: AnswerValue | null;
  onAnswer: (key: string, value: AnswerValue) => void;
};

const QuestionRow = memo(function QuestionRow({
  questionKey,
  label,
  scale,
  selected,
  onAnswer,
}: QuestionRowProps) {
  const labelId = `label-${questionKey}`;
  return (
    <div className="flex items-center justify-between gap-3 py-3 px-4 border-b border-gray-100 last:border-b-0">
      <span id={labelId} className="text-sm text-gray-700 flex-1 leading-relaxed">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={labelId} className="flex gap-2 shrink-0">
        {([1, 2, 3, 4] as AnswerValue[]).map((v) => (
          <label key={v} className="cursor-pointer">
            <input
              type="radio"
              name={questionKey}
              value={v}
              checked={selected === v}
              onChange={() => onAnswer(questionKey, v)}
              aria-label={`${v}: ${scale[v - 1]}`}
              className="sr-only peer"
            />
            <span className="flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-medium transition-colors select-none border-gray-300 text-gray-500 hover:border-teal-400 hover:text-teal-600 peer-checked:bg-teal-600 peer-checked:border-teal-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 peer-focus-visible:ring-offset-1">
              {v}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
});

type ScaleLabelProps = {
  scale: readonly string[];
};

function ScaleLabel({ scale }: ScaleLabelProps) {
  return (
    <div className="flex justify-between px-4 pt-2 pb-1">
      {scale.map((label, i) => (
        <span key={i} className="text-xs text-gray-400">{`${i + 1}. ${label}`}</span>
      ))}
    </div>
  );
}

type SectionHeaderProps = {
  id: string;
  badge: string;
  title: string;
};

function SectionHeader({ id, badge, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold shrink-0">
        {badge}
      </span>
      <h2 id={id} className="text-base font-bold text-gray-800">
        {title}
      </h2>
    </div>
  );
}

// ---- メインコンポーネント ----

export function EmployeeExamScreen({ onSubmit }: EmployeeExamScreenProps) {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    birthdate: "",
    email: "",
  });
  const [answers, setAnswers] = useState<Answers>({});

  function handleProfileChange(field: keyof Profile) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setProfile((p) => ({ ...p, [field]: e.target.value }));
  }

  const handleAnswer = useCallback((key: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.({ profile, answers });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} noValidate>
        {/* ヘッダー */}
        <header className="py-10 flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold text-teal-600 tracking-tight">Stre-Po</h1>
          <p className="text-xs text-gray-400 tracking-widest">Occupational Stress Questionnaire</p>
        </header>

        <div className="max-w-2xl mx-auto px-4 pb-16 flex flex-col gap-8">
          {/* プロフィール入力 */}
          <section aria-labelledby="profile-heading">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-6 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h2 id="profile-heading" className="text-base font-bold text-gray-800">
                  受検者プロフィールの入力
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 氏名 */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-gray-500">
                    氏名
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="例：山田 太郎"
                    value={profile.name}
                    onChange={handleProfileChange("name")}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* 生年月日 */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="birthdate" className="text-xs font-medium text-gray-500">
                    生年月日
                  </label>
                  <input
                    id="birthdate"
                    type="date"
                    value={profile.birthdate}
                    onChange={handleProfileChange("birthdate")}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* メールアドレス */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-gray-500">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="例：example@gmail.com"
                  value={profile.email}
                  onChange={handleProfileChange("email")}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* セクション A */}
          <section aria-labelledby="section-a-heading">
            <SectionHeader id="section-a-heading" badge="A" title="あなたの仕事について" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {SECTION_A_QUESTIONS.map((q, i) => {
                const qKey = `A-${i}`;
                return (
                  <QuestionRow
                    key={qKey}
                    questionKey={qKey}
                    label={`${i + 1}. ${q}`}
                    scale={SECTION_A_SCALE}
                    selected={answers[qKey] ?? null}
                    onAnswer={handleAnswer}
                  />
                );
              })}
              <ScaleLabel scale={SECTION_A_SCALE} />
            </div>
          </section>

          {/* セクション B */}
          <section aria-labelledby="section-b-heading">
            <SectionHeader id="section-b-heading" badge="B" title="最近1か月のあなたの状態" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {SECTION_B_QUESTIONS.map((q, i) => {
                const qKey = `B-${i}`;
                return (
                  <QuestionRow
                    key={qKey}
                    questionKey={qKey}
                    label={`${i + 1}. ${q}`}
                    scale={SECTION_B_SCALE}
                    selected={answers[qKey] ?? null}
                    onAnswer={handleAnswer}
                  />
                );
              })}
              <ScaleLabel scale={SECTION_B_SCALE} />
            </div>
          </section>

          {/* セクション C */}
          <section aria-labelledby="section-c-heading">
            <SectionHeader id="section-c-heading" badge="C" title="周囲の方々について" />
            <div className="flex flex-col gap-4">
              {SECTION_C_GROUPS.map(({ id, label }) => (
                <div key={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                  {SECTION_C_QUESTIONS.map((q, i) => {
                    const qKey = `C-${id}-${i}`;
                    return (
                      <QuestionRow
                        key={qKey}
                        questionKey={qKey}
                        label={`${i + 1}. ${q}`}
                        scale={SECTION_C_SCALE}
                        selected={answers[qKey] ?? null}
                        onAnswer={handleAnswer}
                      />
                    );
                  })}
                  <ScaleLabel scale={SECTION_C_SCALE} />
                </div>
              ))}
            </div>
          </section>

          {/* セクション D */}
          <section aria-labelledby="section-d-heading">
            <SectionHeader id="section-d-heading" badge="D" title="満足度について" />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {SECTION_D_QUESTIONS.map((q, i) => {
                const qKey = `D-${i}`;
                return (
                  <QuestionRow
                    key={qKey}
                    questionKey={qKey}
                    label={`${i + 1}. ${q}`}
                    scale={SECTION_D_SCALE}
                    selected={answers[qKey] ?? null}
                    onAnswer={handleAnswer}
                  />
                );
              })}
              <ScaleLabel scale={SECTION_D_SCALE} />
            </div>
          </section>

          {/* フッター */}
          <div className="flex flex-col gap-4 pt-2">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-base rounded-xl py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2"
            >
              回答を完了して送信する
            </button>
            <div className="flex flex-col gap-1 items-center text-center px-4">
              <p className="text-xs font-semibold text-gray-400">Security Notice</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                この回答は統計的に処理され、産業医以外の第三者が回答内容を特定することはありません。安心してありのままをご回答ください。
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
