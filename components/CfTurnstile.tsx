import { JSX } from "preact";

export type CfTurnstileProps = JSX.HTMLAttributes<HTMLDivElement> & {
  // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
  sitekey: string;
  callback?: string;
};
export default function CfTurnstile(
  {
    sitekey: sitekey,
    callback: callback = "",
    class: extraClass = "",
    ...props
  }: CfTurnstileProps,
) {
  const commonClassNames = [
    "cf-turnstile",
  ];
  const classNames = commonClassNames.concat(extraClass);

  return (
    <div
      {...props}
      class={classNames.join(" ")}
      data-sitekey={sitekey}
      data-callback={callback}
    />
  );
}
