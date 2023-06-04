import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import useGetSettings from 'hooks/settings/useSettings';
import { useUpdateDarkModeSetting } from 'hooks/settings/useUpdateDarkModeSetting';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSelector = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const updateDarkMode = useUpdateDarkModeSetting();

  const { data: settings } = useGetSettings();

  const updateDarkModeSetting = async (value: boolean) => {
    await updateDarkMode?.mutateAsync({
      //@ts-ignore
      id: settings[0].id,
      darkMode: value
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      {theme === 'light' || theme === 'system' || theme == undefined ? (
        <button
          className="p-2 bg-white rounded-lg hover:bg-gray-100 w-10"
          onClick={() => {
            setTheme('dark');
            updateDarkModeSetting(true);
          }}
        >
          <MoonIcon className="w-6 h-6 text-yellow-500" />
        </button>
      ) : (
        <button
          className="p-2 bg-[#1f242b] rounded-md hover:bg-gray-800 w-10"
          onClick={() => {
            setTheme('light');
            updateDarkModeSetting(false);
          }}
        >
          <SunIcon className="w-6 h-6 text-yellow-500" />
        </button>
      )}
    </>
  );
};
export default ThemeSelector;
