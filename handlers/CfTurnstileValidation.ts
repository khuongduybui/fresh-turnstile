import { HandlerContext } from "$fresh/server.ts";

export interface CfTurnstileValidationResult {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export const generatePostHandler =
  (secretKey?: string) => async (request: Request, ctx: HandlerContext<CfTurnstileValidationResult | null, Record<string, unknown>>) => {
    const body = await request.formData();
    // Turnstile injects a token in "cf-turnstile-response".
    const token = body.get("cf-turnstile-response");
    const ip = (ctx.remoteAddr as Deno.NetAddr).hostname;
    if (!token || !secretKey) return ctx.render();

    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json();
    return ctx.render(outcome as CfTurnstileValidationResult);
  };
