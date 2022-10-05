import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

import { TurnstilePluginOptions } from "./index.ts";

export type TurnstileWindow = Window & typeof globalThis & {
  turnstileReady: Promise<Turnstile>;
  onloadTurnstileCallback: () => void;
  turnstile: Turnstile;
};
export default function main(_state: TurnstilePluginOptions) {
  if (IS_BROWSER) {
    const injectScript = (source: string, async = false, defer = false) => {
      const script = document.createElement("script");
      script.src = source;
      script.async = async;
      script.defer = defer;
      document.head.appendChild(script);
    };
    const _injectStylesheet = (source: string) => {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = source;
      document.head.appendChild(stylesheet);
    };
    (window as TurnstileWindow).turnstileReady = new Promise((resolve, _) => {
      (window as TurnstileWindow).onloadTurnstileCallback = () => {
        resolve((window as TurnstileWindow).turnstile);
      };
    });
    injectScript(
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
      true,
      true,
    );
  }
}

export async function getTurnstileAsync() {
  if (IS_BROWSER) return await (window as TurnstileWindow).turnstileReady;
  return Promise.reject();
}

export interface TurnstileOptions {
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
  sitekey: string;
  callback?: string;
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
