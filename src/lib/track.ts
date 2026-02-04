export interface TrackClickPayload {
  id: string;
  title: string;
  href: string;
}

export function trackClick(payload: TrackClickPayload): void {
  // Minimal tracking hook – can be replaced by real analytics later
  // eslint-disable-next-line no-console
  console.log({
    event: "link_click",
    ...payload,
  });
}


