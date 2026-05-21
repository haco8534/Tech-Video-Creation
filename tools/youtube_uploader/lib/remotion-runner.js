import { spawn } from "child_process";
import path from "path";
import net from "net";

const ENGINE_DIR = path.resolve(import.meta.dirname, "..", "..", "..", "engine");
const STUDIO_PORT = 3848;

let studioProcess = null;

function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true));
    server.once("listening", () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
}

export async function startStudio() {
  const inUse = await isPortInUse(STUDIO_PORT);
  if (inUse) {
    return { running: true, port: STUDIO_PORT, message: "Studio already running" };
  }

  studioProcess = spawn("npx", ["remotion", "studio", "--port", String(STUDIO_PORT), "--host", "0.0.0.0"], {
    cwd: ENGINE_DIR,
    stdio: "pipe",
    shell: true,
    detached: false,
  });

  studioProcess.on("close", () => {
    studioProcess = null;
  });

  // Wait a moment for studio to start
  await new Promise((r) => setTimeout(r, 3000));

  return { running: true, port: STUDIO_PORT, message: "Studio started" };
}

export async function getStudioStatus() {
  const inUse = await isPortInUse(STUDIO_PORT);
  return { running: inUse, port: STUDIO_PORT };
}

export function stopStudio() {
  if (studioProcess) {
    studioProcess.kill();
    studioProcess = null;
  }
}

export { STUDIO_PORT };
