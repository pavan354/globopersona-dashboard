/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURATION: Development Indicators
  // We disable these to keep the UI clean for screenshots and demos.
  devIndicators: {
    buildActivity: false, // Hides the "compiling" indicator
    appIsrStatus: false,  // Hides the static route indicator (the black "N" circle)
  },
};

export default nextConfig;