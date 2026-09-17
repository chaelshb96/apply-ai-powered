import { TRACKS, type TrackKey } from "./constants";
import { weeklyCopy, type GamePlanResult } from "./score-engine";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buttonCell(href: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        <td style="border-radius:6px;background:#2d2d2d;">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

function leanRows(result: GamePlanResult) {
  const total = result.tallies.reduce((sum, row) => sum + row.points, 0);
  return (["a", "b", "c"] as TrackKey[])
    .map((key) => {
      const points = result.tallies.find((row) => row.key === key)?.points ?? 0;
      const pct = total > 0 ? Math.round((points / total) * 100) : 0;
      const winner = result.track === key;
      const fill = winner ? "#2d2d2d" : "#7a8fa6";
      const width = Math.max(pct, 0);
      return `
        <tr>
          <td style="padding:0 0 4px;font-size:14px;font-weight:500;color:#2d2d2d;">${escapeHtml(TRACKS[key].title)}</td>
          <td align="right" style="padding:0 0 4px;font-size:13px;color:#8a8a8a;">${width}%</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:0 0 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8eef4;">
              <tr>
                <td width="${width}%" style="height:6px;background:${fill};font-size:0;line-height:0;">&nbsp;</td>
                <td style="height:6px;font-size:0;line-height:0;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");
}

function factRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 14px;">
        <div style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a8a;">${escapeHtml(label)}</div>
        <div style="margin-top:4px;font-size:16px;font-weight:500;color:#2d2d2d;">${escapeHtml(value)}</div>
      </td>
    </tr>
  `;
}

export function gamePlanEmailSubject(result: GamePlanResult) {
  return `Your Game Plan — ${result.trackTitle}`;
}

export function gamePlanEmailText(name: string, result: GamePlanResult) {
  const greeting = `${name}, ${result.who.charAt(0).toLowerCase()}${result.who.slice(1)}`;
  const vision = result.vision.length ? `\nSix months:\n${result.vision.map((item) => `- ${item}`).join("\n")}` : "";
  const facts = [
    result.goal ? `90 days: ${result.goal}` : null,
    result.hours ? `Hours a machine could take: ${result.hours}` : null,
    result.weeklyTime ? `Time you can give: ${result.weeklyTime}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    `Hi ${name}.`,
    "",
    "Your Game Plan",
    `${result.trackBadge}: ${result.trackTitle}`,
    "This is your track.",
    "",
    "The reading",
    `Why ${result.trackTitle}`,
    greeting,
    result.explanation,
    facts,
    vision,
    "",
    "Programme",
    result.programme,
    weeklyCopy(result.weeklyTime),
    result.programmeHref,
    "",
    "Book a discovery call",
    result.ctaHref,
    "",
    "If you didn't request this, you can ignore this email.",
    "AI Powered",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function gamePlanEmailHtml(name: string, result: GamePlanResult) {
  const safeName = escapeHtml(name);
  const greeting = escapeHtml(
    `${name}, ${result.who.charAt(0).toLowerCase()}${result.who.slice(1)}`,
  );
  const facts = [
    result.goal ? factRow("90 days", result.goal) : "",
    result.hours ? factRow("Hours a machine could take", result.hours) : "",
    result.weeklyTime ? factRow("Time you can give", result.weeklyTime) : "",
  ].join("");
  const vision =
    result.vision.length > 0
      ? `
        <div style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a8a;margin-top:8px;">Six months</div>
        <ul style="margin:8px 0 0;padding:0 0 0 18px;color:#2d2d2d;font-size:16px;line-height:1.5;">
          ${result.vision.map((item) => `<li style="margin:0 0 4px;">${escapeHtml(item)}</li>`).join("")}
        </ul>
      `
      : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(gamePlanEmailSubject(result))}</title>
  </head>
  <body style="margin:0;padding:0;background:#e8eef4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8eef4;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #c8d0d8;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#1c2834;padding:40px 32px 36px;text-align:center;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#c8d0d8;">${escapeHtml(result.trackBadge)}</div>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.03em;color:#f4f6f8;font-weight:600;">${escapeHtml(result.trackTitle)}</h1>
                <p style="margin:12px 0 0;font-size:16px;line-height:1.5;color:#d5dde4;">Hi ${safeName}. This is your track.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;">The reading</div>
                <h2 style="margin:10px 0 0;font-size:22px;letter-spacing:-0.02em;color:#2d2d2d;font-weight:600;">Why ${escapeHtml(result.trackTitle)}</h2>
                <p style="margin:14px 0 0;font-size:16px;line-height:1.6;color:#464646;">${greeting}</p>
                <p style="margin:10px 0 0;font-size:16px;line-height:1.6;color:#464646;">${escapeHtml(result.explanation)}</p>
              </td>
            </tr>
            ${
              facts
                ? `<tr><td style="padding:20px 32px 8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${facts}</table></td></tr>`
                : ""
            }
            ${vision ? `<tr><td style="padding:4px 32px 8px;">${vision}</td></tr>` : ""}
            <tr>
              <td style="padding:20px 32px 8px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;">How your answers leaned</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                  ${leanRows(result)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 36px;text-align:center;border-top:1px solid #c8d0d8;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;margin-top:28px;">Programme</div>
                <h2 style="margin:10px 0 0;font-size:24px;letter-spacing:-0.03em;color:#2d2d2d;font-weight:600;">${escapeHtml(result.programme)}</h2>
                <p style="margin:12px auto 0;max-width:36em;font-size:16px;line-height:1.6;color:#464646;">${escapeHtml(weeklyCopy(result.weeklyTime))}</p>
                <div style="margin-top:24px;">${buttonCell(result.programmeHref, result.programmeCta)}</div>
                <div style="margin-top:12px;">${buttonCell(result.ctaHref, result.ctaLabel)}</div>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#8a8a8a;text-align:center;">
            If you didn't request this, you can ignore this email.<br />
            © ${new Date().getFullYear()} AI Powered
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
