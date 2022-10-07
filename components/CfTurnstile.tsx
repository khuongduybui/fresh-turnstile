import { JSX } from "preact";
import { useEffect, useId } from "preact/hooks";

import { TurnstileOptions } from "../plugin.ts";

export type CfTurnstileProps = JSX.HTMLAttributes<HTMLDivElement> & TurnstileOptions;
export default function CfTurnstile(
  { sitekey, callback, expiredCallback, errorCallback, action, cData, theme, tabIndex, class: extraClass = "", ...props }: CfTurnstileProps,
) {
  const commonClassNames = [
    "cf-turnstile",
  ];
  const classNames = commonClassNames.concat([extraClass]);

  const callbackId = useId();
  const expiredCallbackId = useId();
  const errorCallbackId = useId();

  type MyWindow = Window & typeof globalThis & {
    [key: string]: ((token: string) => void) | (() => void);
  };
  const myWindow = window as MyWindow;

  useEffect(() => {
    if (callback) myWindow[callbackId] = callback;
    if (expiredCallback) myWindow[expiredCallbackId] = expiredCallback;
    if (errorCallback) myWindow[errorCallbackId] = errorCallback;
    return () => {
      if (callback) delete myWindow[callbackId];
      if (expiredCallback) delete myWindow[expiredCallbackId];
      if (errorCallback) delete myWindow[errorCallbackId];
    };
  });

  return (
    <div
      {...props}
      class={classNames.join(" ")}
      data-sitekey={sitekey}
      data-callback={callbackId}
      data-expired-callback={expiredCallbackId}
      data-error-callback={errorCallbackId}
      data-action={action}
      data-cdata={cData}
      data-theme={theme}
      data-tabindex={tabIndex}
    />
  );
}
