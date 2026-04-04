import React, { useEffect, useState } from 'react';
import { availableThemes, applyTheme, getStoredTheme } from '../themes/themeManager';

const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(getStoredTheme());

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setCurrentTheme(selectedTheme);
    applyTheme(selectedTheme); // Apply immediately when changed
  };

  return (
    <div className="mb-4">
      <label htmlFor="theme-select" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
        Select Theme:
      </label>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={handleThemeChange}
        className="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-color)'
        }}
      >
        {availableThemes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
