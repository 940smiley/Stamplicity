// Theme management system for swappable skins

export interface Theme {
  id: string;
  name: string;
  properties: Record<string, string>;
  isDark?: boolean;
}

export const availableThemes: Theme[] = [
  {
    id: "swan-theme",
    name: "Swan Theme",
    properties: {
      "--bg-color": "#f8f9fa",
      "--header-bg": "#ffffff",
      "--text-color": "#343a40",
      "--accent-color": "#4a90e2",
      "--border-color": "#dee2e6",
      "--shadow-color": "rgba(0, 0, 0, 0.05)",
      "--card-bg": "#ffffff",
      "--hover-bg": "#f1f3f4",
      "--error-bg": "#f8d7da",
      "--error-text": "#721c24",
      "--success-bg": "#d4edda",
      "--success-text": "#155724"
    },
    isDark: false
  },
  {
    id: "midnight-theme",
    name: "Midnight Theme",
    properties: {
      "--bg-color": "#121212",
      "--header-bg": "#1e1e1e",
      "--text-color": "#e0e0e0",
      "--accent-color": "#64b5f6",
      "--border-color": "#424242",
      "--shadow-color": "rgba(0, 0, 0, 0.3)",
      "--card-bg": "#1e1e1e",
      "--hover-bg": "#2d2d2d",
      "--error-bg": "#f5c6cb",
      "--error-text": "#d32f2f",
      "--success-bg": "#c3e6cb",
      "--success-text": "#1b5e20"
    },
    isDark: true
  },
  {
    id: "forest-theme",
    name: "Forest Theme",
    properties: {
      "--bg-color": "#f0f7f4",
      "--header-bg": "#e0f2e9",
      "--text-color": "#1a3636",
      "--accent-color": "#48bb78",
      "--border-color": "#b8e6d3",
      "--shadow-color": "rgba(26, 54, 54, 0.1)",
      "--card-bg": "#e0f2e9",
      "--hover-bg": "#c6f0e0",
      "--error-bg": "#fed7d7",
      "--error-text": "#c53030",
      "--success-bg": "#c6f6d5",
      "--success-text": "#2f855a"
    },
    isDark: false
  },
  {
    id: "sunset-theme",
    name: "Sunset Theme",
    properties: {
      "--bg-color": "#fff8f0",
      "--header-bg": "#ffe0bd",
      "--text-color": "#4a2c2a",
      "--accent-color": "#dd6b20",
      "--border-color": "#f7c3a1",
      "--shadow-color": "rgba(74, 44, 42, 0.1)",
      "--card-bg": "#ffe0bd",
      "--hover-bg": "#ffd1b3",
      "--error-bg": "#feb2b2",
      "--error-text": "#c53030",
      "--success-bg": "#c6f6d5",
      "--success-text": "#2f855a"
    },
    isDark: false
  }
];

const THEME_STORAGE_KEY = "stamplicity-theme";

export const getStoredTheme = (): string => {
  return localStorage.getItem(THEME_STORAGE_KEY) || "swan-theme";
};

export const storeTheme = (themeId: string): void => {
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
};

export const applyTheme = (themeId: string): void => {
  const theme = availableThemes.find(t => t.id === themeId) || availableThemes[0];
  const root = document.documentElement;
  
  // Clear all existing theme properties
  root.className = root.className.replace(/theme-\w+/g, '');
  root.classList.add(`theme-${theme.id.replace('-theme', '')}`);
  
  Object.entries(theme.properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Add/remove dark class to body for dark themes
  if (theme.isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  storeTheme(themeId);
};