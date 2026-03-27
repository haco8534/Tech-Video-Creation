import { Composition } from "remotion";

// === 新パイプライン: スライドTSX直接描画版 ===
// 旧mp4ベース版(VideoWithSubtitles)は全て廃止。
// mp4ファイルは存在しないため、VideoWithSlides版のみを使用する。


import {
  VideoWithSlides as UsbConnectorDiversitySlides,
  TOTAL_FRAMES as USB_CONNECTOR_DIVERSITY_TOTAL_FRAMES,
} from "./projects/usb_connector_diversity/VideoWithSlides";

import {
  VideoWithSlides as Why700ProgrammingLanguagesSlides,
  TOTAL_FRAMES as WHY_700_PROGRAMMING_LANGUAGES_TOTAL_FRAMES,
} from "./projects/_archive/why_700_programming_languages/VideoWithSlides";

import {
  VideoWithSlides as PythonDominanceSlides,
  TOTAL_FRAMES as PYTHON_DOMINANCE_TOTAL_FRAMES,
} from "./projects/python_dominance/VideoWithSlides";

import {
  VideoWithSlides as TypescriptSaviorOrKillerSlides,
  TOTAL_FRAMES as TYPESCRIPT_SAVIOR_OR_KILLER_TOTAL_FRAMES,
} from "./projects/typescript_savior_or_killer/VideoWithSlides";

import {
  VideoWithSlides as SelfTaughtEngineerSlides,
  TOTAL_FRAMES as SELF_TAUGHT_ENGINEER_TOTAL_FRAMES,
} from "./projects/self_taught_engineer/VideoWithSlides";

import {
  VideoWithSlides as RustVsCppSlides,
  TOTAL_FRAMES as RUST_VS_CPP_TOTAL_FRAMES,
} from "./projects/rust_vs_cpp/VideoWithSlides";

import "./index.css";

// Archived (rendered, source removed): attention_economy, fake_news_spread,
//   addiction_brain_science, mehrabian_rule, dunning_kruger, skipping_breakfast,
//   placebo_effect, praise_parenting, mozart_effect, brain_lateralization_myth,
//   milgram_reexamination, brain_ten_percent_myth, stress_half_myth,
//   money_happiness, blood_type_personality, lactic_acid_myth,
//   subliminal_effect_myth, detox_no_evidence, human_selfishness,
//   food_additive_misconception, encryption_vs_hashing,
//   delete_key_file_fate, gif_patent_png_drama, image_formats, jpeg_human_eye_trick,
//   os_kernel_difference, password_storage, qwerty_keyboard, url_behind_the_scenes,
//   google_search_dominance, linux_history, javascript_10days, font_rendering,
//   usb_connector_history, why_700_programming_languages, zip_compression,
//   fax_still_used_2026, charset_utf8_history, why_vscode, docker_popularity,
//   chatgpt_coding, programmer_mac_obsession, code_without_tests

export const RemotionRoot: React.FC = () => {
  return (
    <>

      <Composition
        id="usb-connector-diversity-slides"
        component={UsbConnectorDiversitySlides}
        durationInFrames={USB_CONNECTOR_DIVERSITY_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="why-700-programming-languages-slides"
        component={Why700ProgrammingLanguagesSlides}
        durationInFrames={WHY_700_PROGRAMMING_LANGUAGES_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

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
    </>
  );
};
