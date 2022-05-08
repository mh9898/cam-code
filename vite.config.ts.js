// vite.config.ts
import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
var vite_config_default = defineConfig({
  plugins: [mkcert(), react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve("C:\\Users\\alonb\\WebstormProjects\\cam-code", "src") }]
  },
  server: {
    https: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtta2NlcnQoKSwgcmVhY3QoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXGFsb25iXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcY2FtLWNvZGVcIiwgJ3NyYycpIH1dLFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBodHRwczogdHJ1ZVxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLEFBQUssYUFBUSxnREFBZ0QsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUN6RztBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
