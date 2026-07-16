/// <reference types="vite/client" />

declare module '*.PNG' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
