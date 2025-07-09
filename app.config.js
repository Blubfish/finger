import 'dotenv/config';

export default {
  expo: {
    name: 'finger',
    slug: 'finger',
    extra: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY:process.env.SUPABASE_ANON_KEY,
    },
  },
};
