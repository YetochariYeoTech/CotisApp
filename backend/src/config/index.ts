export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cotis-app',
  },
  activationFee: process.env.ACTIVATION_FEE || 5000,
  wave: {
    apiKey: process.env.WAVE_API_KEY || 'your-wave-api-key',
    webhookSecret: process.env.WAVE_WEBHOOK_SECRET || 'your-wave-webhook-secret',
    apiUrl: process.env.WAVE_API_URL || 'https://api.wave.com/v1',
  },
};
