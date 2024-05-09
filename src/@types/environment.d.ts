declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      REACT_APP_BASE_URL: string;
      REACT_APP_GOOGLE_MAPS_KEY: string;
    }
  }
}

export {};
