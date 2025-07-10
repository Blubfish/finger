import Constants from "expo-constants";

export const config = Constants.expoConfig.extra as {
  supabase: {
    url: string;
    key: string;
  };
};
