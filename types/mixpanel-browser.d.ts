declare module "mixpanel-browser" {
  type Value = string | number | boolean | null | undefined;
  type Properties = Record<string, Value | Value[] | Record<string, unknown>>;

  type MixpanelAPI = {
    init: (token: string, config?: Record<string, unknown>) => void;
    track: (eventName: string, properties?: Properties) => void;
    identify: (distinctId: string) => void;
    alias: (alias: string, original?: string) => void;
    get_distinct_id: () => string;
    register: (properties: Properties) => void;
    reset: () => void;
    people: {
      set: (properties: Properties) => void;
    };
  };

  const mixpanel: MixpanelAPI;
  export default mixpanel;
}
