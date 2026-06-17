import { Composition } from "remotion";

import {
  ZipBomb as SandboxZipBomb,
  TOTAL_FRAMES as SANDBOX_ZIP_BOMB_TOTAL_FRAMES,
} from "@project/experiments/zip_bomb/Composition";

import {
  AiBlackBox as SandboxAiBlackBox,
  TOTAL_FRAMES as SANDBOX_AI_BLACK_BOX_TOTAL_FRAMES,
} from "@project/experiments/ai_black_box/Composition";

import {
  LLM as SandboxLLM,
  TOTAL_FRAMES as SANDBOX_LLM_TOTAL_FRAMES,
} from "@project/experiments/llm/Composition";

import {
  ImageGeneration as SandboxImageGeneration,
  TOTAL_FRAMES as SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES,
} from "@project/experiments/image_generation/Composition";

import {
  Cookie as SandboxCookie,
  TOTAL_FRAMES as SANDBOX_COOKIE_TOTAL_FRAMES,
} from "@project/experiments/cookie/Composition";

import {
  Encryption as SandboxEncryption,
  TOTAL_FRAMES as SANDBOX_ENCRYPTION_TOTAL_FRAMES,
} from "@project/experiments/encryption/Composition";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="zip-bomb"
        component={SandboxZipBomb}
        durationInFrames={SANDBOX_ZIP_BOMB_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ai-black-box"
        component={SandboxAiBlackBox}
        durationInFrames={SANDBOX_AI_BLACK_BOX_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="image-generation"
        component={SandboxImageGeneration}
        durationInFrames={SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="llm"
        component={SandboxLLM}
        durationInFrames={SANDBOX_LLM_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="cookie"
        component={SandboxCookie}
        durationInFrames={SANDBOX_COOKIE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="encryption"
        component={SandboxEncryption}
        durationInFrames={SANDBOX_ENCRYPTION_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
