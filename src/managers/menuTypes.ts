export type LokiMenuRoot = LokiSubmenu[];
export type LokiMenuItem = {
  text: string;
  action: () => unknown;
  icon?: unknown;
};
export type LokiSubmenu = { text: string; items: LokiMenuItem[] };
