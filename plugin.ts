import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

import { TurnstilePluginOptions } from "./index.ts";

export type TurnstileWindow = Window & typeof globalThis & {
  turnstileReady: Promise<Turnstile>;
  onloadTurnstileCallback: () => void;
  turnstile: Turnstile;
};

export function injectScript(source: string, async = false, defer = false) {
  const script = document.createElement("script");
  script.src = source;
  script.async = async;
  script.defer = defer;
  document.head.appendChild(script);
}

export function injectStylesheet(source: string) {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = source;
  document.head.appendChild(stylesheet);
}

export default function main({ disableImplicitRendering = false }: TurnstilePluginOptions) {
  const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?" + [
    "onload=onloadTurnstileCallback",
    disableImplicitRendering ? "render=explicit" : "",
  ].join("&");
  (window as TurnstileWindow).turnstileReady = new Promise((resolve, _) => {
    (window as TurnstileWindow).onloadTurnstileCallback = () => {
      resolve((window as TurnstileWindow).turnstile);
    };
  });
  injectScript(scriptUrl, true, true);
}

export async function getTurnstileAsync() {
  if (IS_BROWSER) return await (window as TurnstileWindow).turnstileReady;
  return Promise.reject();
}

export interface TurnstileOptions {
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
  sitekey: string;
  callback?: (token: string) => void;
  expiredCallback?: () => void;
  errorCallback?: () => void;
  action?: string;
  cData?: Record<string, unknown>;
  theme?: string;
  tabIndex?: number;
}
export interface Turnstile {
  render: (widgetId: string, options: TurnstileOptions) => void;
  reset: (widgetId: string) => void;
  getResponse: (widgetId: string) => string | null;
}

export function useTurnstileEffect(callback: (turnstile: Turnstile) => void) {
  useEffect(() => {
    getTurnstileAsync().then(callback);
  });
}
