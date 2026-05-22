import { Composition } from "remotion";

import {
  VideoWithSlides as FiveGWorldChangeSlides,
  TOTAL_FRAMES as FIVE_G_WORLD_CHANGE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/5g_world_change/remotion/VideoWithSlides";

import {
  VideoWithSlides as AccurateRandomNumbersSlides,
  TOTAL_FRAMES as ACCURATE_RANDOM_NUMBERS_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/accurate_random_numbers/remotion/VideoWithSlides";

import {
  VideoWithSlides as CudaGripOnAiSlides,
  TOTAL_FRAMES as CUDA_GRIP_ON_AI_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/cuda_grip_on_ai/remotion/VideoWithSlides";

import {
  VideoWithSlides as FreeAppRealPriceSlides,
  TOTAL_FRAMES as FREE_APP_REAL_PRICE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/free_app_real_price/remotion/VideoWithSlides";

import {
  VideoWithSlides as UsbConnectorDiversitySlides,
  TOTAL_FRAMES as USB_CONNECTOR_DIVERSITY_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/usb_connector_diversity/remotion/VideoWithSlides";

import {
  VideoWithSlides as FaxSlides,
  TOTAL_FRAMES as FAX_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/fax/remotion/VideoWithSlides";

import {
  VideoWithSlides as WiFiSlides,
  TOTAL_FRAMES as WI_FI_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/wi_fi/remotion/VideoWithSlides";

import {
  VideoWithSlides as PasswordSecuritySlides,
  TOTAL_FRAMES as PASSWORD_SECURITY_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_539006a7/remotion/VideoWithSlides";

import {
  VideoWithSlides as ProgrammingEssenceSlides,
  TOTAL_FRAMES as PROGRAMMING_ESSENCE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_afbe778d/remotion/VideoWithSlides";

import {
  VideoWithSlides as DigitalTattooSlides,
  TOTAL_FRAMES as DIGITAL_TATTOO_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_352c4df4/remotion/VideoWithSlides";

import {
  VideoWithSlides as InternetGovernanceSlides,
  TOTAL_FRAMES as INTERNET_GOVERNANCE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_ede76869/remotion/VideoWithSlides";

import {
  VideoWithSlides as AlgorithmEssenceSlides,
  TOTAL_FRAMES as ALGORITHM_ESSENCE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_614d0f20/remotion/VideoWithSlides";

import {
  VideoWithSlides as ZeroOneVideo,
  TOTAL_FRAMES as ZERO_ONE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/0_1/remotion/VideoWithSlides";

import {
  VideoWithSlides as QrVideo,
  TOTAL_FRAMES as QR_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/qr/remotion/VideoWithSlides";

import {
  VideoWithSlides as VideoFormatVideo,
  TOTAL_FRAMES as VIDEO_FORMAT_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_cbea8eeb/remotion/VideoWithSlides";

import {
  VideoWithSlides as CloudVideo,
  TOTAL_FRAMES as CLOUD_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_dc16b914/remotion/VideoWithSlides";

import {
  VideoWithSlides as VpnVideo,
  TOTAL_FRAMES as VPN_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/vpn/remotion/VideoWithSlides";

import {
  VideoWithSlides as ChargingCableVideo,
  TOTAL_FRAMES as CHARGING_CABLE_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_7973c0b4/remotion/VideoWithSlides";

import {
  VideoWithSlides as RestartFixesVideo,
  TOTAL_FRAMES as RESTART_FIXES_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_dd86b600/remotion/VideoWithSlides";

import {
  VideoWithSlides as PrinterMoodVideo,
  TOTAL_FRAMES as PRINTER_MOOD_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_215da920/remotion/VideoWithSlides";

import {
  VideoWithSlides as CacheClearVideo,
  TOTAL_FRAMES as CACHE_CLEAR_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/proj_c86941a8/remotion/VideoWithSlides";

import {
  VideoWithSlides as BluetoothVideo,
  TOTAL_FRAMES as BLUETOOTH_TOTAL_FRAMES,
} from "@channels/tech_explainer/projects/bluetooth/remotion/VideoWithSlides";

// ===== sandbox（試作） =====
import {
  PublicKeyCrypto as SandboxPublicKeyCrypto,
  TOTAL_FRAMES as SANDBOX_PUBLIC_KEY_TOTAL_FRAMES,
} from "@sandbox/experiments/public_key_crypto/Composition";

import {
  ImageGeneration as SandboxImageGeneration,
  TOTAL_FRAMES as SANDBOX_IMAGE_GENERATION_TOTAL_FRAMES,
} from "@sandbox/experiments/image_generation/Composition";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="5g-world-change-slides"
        component={FiveGWorldChangeSlides}
        durationInFrames={FIVE_G_WORLD_CHANGE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="accurate-random-numbers-slides"
        component={AccurateRandomNumbersSlides}
        durationInFrames={ACCURATE_RANDOM_NUMBERS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="cuda-grip-on-ai-slides"
        component={CudaGripOnAiSlides}
        durationInFrames={CUDA_GRIP_ON_AI_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="free-app-real-price-slides"
        component={FreeAppRealPriceSlides}
        durationInFrames={FREE_APP_REAL_PRICE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="usb-connector-diversity-slides"
        component={UsbConnectorDiversitySlides}
        durationInFrames={USB_CONNECTOR_DIVERSITY_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="fax-slides"
        component={FaxSlides}
        durationInFrames={FAX_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="wi-fi-slides"
        component={WiFiSlides}
        durationInFrames={WI_FI_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-539006a7-slides"
        component={PasswordSecuritySlides}
        durationInFrames={PASSWORD_SECURITY_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-afbe778d-slides"
        component={ProgrammingEssenceSlides}
        durationInFrames={PROGRAMMING_ESSENCE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-352c4df4-slides"
        component={DigitalTattooSlides}
        durationInFrames={DIGITAL_TATTOO_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-ede76869-slides"
        component={InternetGovernanceSlides}
        durationInFrames={INTERNET_GOVERNANCE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-614d0f20-slides"
        component={AlgorithmEssenceSlides}
        durationInFrames={ALGORITHM_ESSENCE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="0-1-slides"
        component={ZeroOneVideo}
        durationInFrames={ZERO_ONE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="qr-slides"
        component={QrVideo}
        durationInFrames={QR_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-cbea8eeb-slides"
        component={VideoFormatVideo}
        durationInFrames={VIDEO_FORMAT_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-dc16b914-slides"
        component={CloudVideo}
        durationInFrames={CLOUD_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="vpn-slides"
        component={VpnVideo}
        durationInFrames={VPN_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-7973c0b4-slides"
        component={ChargingCableVideo}
        durationInFrames={CHARGING_CABLE_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-dd86b600-slides"
        component={RestartFixesVideo}
        durationInFrames={RESTART_FIXES_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-215da920-slides"
        component={PrinterMoodVideo}
        durationInFrames={PRINTER_MOOD_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="proj-c86941a8-slides"
        component={CacheClearVideo}
        durationInFrames={CACHE_CLEAR_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="bluetooth-slides"
        component={BluetoothVideo}
        durationInFrames={BLUETOOTH_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ===== sandbox（試作） ===== */}

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
    </>
  );
};
