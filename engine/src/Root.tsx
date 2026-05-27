import { Composition } from "remotion";

import {
  PublicKeyCrypto as SandboxPublicKeyCrypto,
  TOTAL_FRAMES as SANDBOX_PUBLIC_KEY_TOTAL_FRAMES,
} from "@sandbox/experiments/public_key_crypto/Composition";

import {
  ImageGeneration as SandboxImageGeneration,
  TOTAL_FRAMES as SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES,
} from "@sandbox/experiments/image_generation/Composition";

import {
  ZipBomb as SandboxZipBomb,
  TOTAL_FRAMES as SANDBOX_ZIP_BOMB_TOTAL_FRAMES,
} from "@sandbox/experiments/zip_bomb/Composition";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="sandbox-public-key"
        component={SandboxPublicKeyCrypto}
        durationInFrames={SANDBOX_PUBLIC_KEY_TOTAL_FRAMES}
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
        id="sandbox-zip-bomb"
        component={SandboxZipBomb}
        durationInFrames={SANDBOX_ZIP_BOMB_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
