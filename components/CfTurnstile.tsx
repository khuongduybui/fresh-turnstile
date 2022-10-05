import { JSX } from "preact";

import { TurnstileOptions } from "../plugin.ts";

export type CfTurnstileProps = JSX.HTMLAttributes<HTMLDivElement> & TurnstileOptions;
export default function CfTurnstile({ sitekey: sitekey, callback: callback = "", class: extraClass = "", ...props }: CfTurnstileProps) {
  const commonClassNames = [
    "cf-turnstile",
  ];
  const classNames = commonClassNames.concat([extraClass]);

  return <div {...props} class={classNames.join(" ")} data-sitekey={sitekey} data-callback={callback} />;
}
