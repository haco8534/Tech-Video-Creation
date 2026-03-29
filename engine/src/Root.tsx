import { Composition } from "remotion";

// === 新パイプライン: スライドTSX直接描画版 ===
// プロジェクトファイルは projects/{id}/remotion/ に配置
// @projects/ エイリアスで参照

import {
  VideoWithSlides as PythonDominanceSlides,
  TOTAL_FRAMES as PYTHON_DOMINANCE_TOTAL_FRAMES,
} from "@projects/python_dominance/remotion/VideoWithSlides";

import {
  VideoWithSlides as TypescriptSaviorOrKillerSlides,
  TOTAL_FRAMES as TYPESCRIPT_SAVIOR_OR_KILLER_TOTAL_FRAMES,
} from "@projects/typescript_savior_or_killer/remotion/VideoWithSlides";

import {
  VideoWithSlides as SelfTaughtEngineerSlides,
  TOTAL_FRAMES as SELF_TAUGHT_ENGINEER_TOTAL_FRAMES,
} from "@projects/self_taught_engineer/remotion/VideoWithSlides";

import {
  VideoWithSlides as RustVsCppSlides,
  TOTAL_FRAMES as RUST_VS_CPP_TOTAL_FRAMES,
} from "@projects/rust_vs_cpp/remotion/VideoWithSlides";

import {
  VideoWithSlides as CreatingProgrammingLanguageSlides,
  TOTAL_FRAMES as CREATING_PROGRAMMING_LANGUAGE_TOTAL_FRAMES,
} from "@projects/creating_programming_language/remotion/VideoWithSlides";

import {
  VideoWithSlides as HeavyWebAppsSlides,
  TOTAL_FRAMES as HEAVY_WEB_APPS_TOTAL_FRAMES,
} from "@projects/heavy_web_apps/remotion/VideoWithSlides";

import {
  VideoWithSlides as CodeWithoutTestsSlides,
  TOTAL_FRAMES as CODE_WITHOUT_TESTS_TOTAL_FRAMES,
} from "@projects/code_without_tests/remotion/VideoWithSlides";

import {
  VideoWithSlides as WhatWasWeb3Slides,
  TOTAL_FRAMES as WHAT_WAS_WEB3_TOTAL_FRAMES,
} from "@projects/what_was_web3/remotion/VideoWithSlides";

import {
  VideoWithSlides as CssProgrammingLanguageSlides,
  TOTAL_FRAMES as CSS_PROGRAMMING_LANGUAGE_TOTAL_FRAMES,
} from "@projects/css_programming_language/remotion/VideoWithSlides";

import {
  VideoWithSlides as ReadableCodeSlides,
  TOTAL_FRAMES as READABLE_CODE_TOTAL_FRAMES,
} from "@projects/readable_code/remotion/VideoWithSlides";

import {
  VideoWithSlides as FullstackMythSlides,
  TOTAL_FRAMES as FULLSTACK_MYTH_TOTAL_FRAMES,
} from "@projects/fullstack_myth/remotion/VideoWithSlides";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>

      <Composition
        id="python-dominance-slides"
        component={PythonDominanceSlides}
        durationInFrames={PYTHON_DOMINANCE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="typescript-savior-or-killer-slides"
        component={TypescriptSaviorOrKillerSlides}
        durationInFrames={TYPESCRIPT_SAVIOR_OR_KILLER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="self-taught-engineer-slides"
        component={SelfTaughtEngineerSlides}
        durationInFrames={SELF_TAUGHT_ENGINEER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="rust-vs-cpp-slides"
        component={RustVsCppSlides}
        durationInFrames={RUST_VS_CPP_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="creating-programming-language-slides"
        component={CreatingProgrammingLanguageSlides}
        durationInFrames={CREATING_PROGRAMMING_LANGUAGE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="heavy-web-apps-slides"
        component={HeavyWebAppsSlides}
        durationInFrames={HEAVY_WEB_APPS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="code-without-tests-slides"
        component={CodeWithoutTestsSlides}
        durationInFrames={CODE_WITHOUT_TESTS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="what-was-web3-slides"
        component={WhatWasWeb3Slides}
        durationInFrames={WHAT_WAS_WEB3_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="css-programming-language-slides"
        component={CssProgrammingLanguageSlides}
        durationInFrames={CSS_PROGRAMMING_LANGUAGE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="readable-code-slides"
        component={ReadableCodeSlides}
        durationInFrames={READABLE_CODE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="fullstack-myth-slides"
        component={FullstackMythSlides}
        durationInFrames={FULLSTACK_MYTH_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
