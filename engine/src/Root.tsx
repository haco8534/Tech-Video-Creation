import { Composition } from "remotion";

// === 新パイプライン: スライドTSX直接描画版 ===
// プロジェクトファイルは projects/{id}/remotion/ に配置
// @projects/ エイリアスで参照

import {
  VideoWithSlides as UsbConnectorDiversitySlides,
  TOTAL_FRAMES as USB_CONNECTOR_DIVERSITY_TOTAL_FRAMES,
} from "@projects/usb_connector_diversity/remotion/VideoWithSlides";

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

import "./index.css";

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
