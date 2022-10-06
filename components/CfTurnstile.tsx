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
  useEffect(() => {
    window[callbackId] = callback;
    window[expiredCallbackId] = expiredCallback;
    window[errorCallbackId] = errorCallback;
    return () => {
      delete window[callbackId];
      delete window[expiredCallbackId];
      delete window[errorCallbackId];
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
