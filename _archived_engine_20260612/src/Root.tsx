import { Composition } from "remotion";

import {
  ZipBomb as SandboxZipBomb,
  TOTAL_FRAMES as SANDBOX_ZIP_BOMB_TOTAL_FRAMES,
} from "@sandbox/experiments/zip_bomb/Composition";

import {
  AiBlackBox as SandboxAiBlackBox,
  TOTAL_FRAMES as SANDBOX_AI_BLACK_BOX_TOTAL_FRAMES,
} from "@sandbox/experiments/ai_black_box/Composition";

import {
  LLM as SandboxLLM,
  TOTAL_FRAMES as SANDBOX_LLM_TOTAL_FRAMES,
} from "@sandbox/experiments/llm/Composition";

import {
  ImageGeneration as SandboxImageGeneration,
  TOTAL_FRAMES as SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES,
} from "@sandbox/experiments/image_generation/Composition";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="sandbox-zip-bomb"
        component={SandboxZipBomb}
        durationInFrames={SANDBOX_ZIP_BOMB_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="sandbox-ai-black-box"
        component={SandboxAiBlackBox}
        durationInFrames={SANDBOX_AI_BLACK_BOX_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="sandbox-image-generation"
        component={SandboxImageGeneration}
        durationInFrames={SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="sandbox-llm"
        component={SandboxLLM}
        durationInFrames={SANDBOX_LLM_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
