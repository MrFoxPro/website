import { Meta } from "@solidjs/meta"
import { ParentProps, createContext, createMemo, createSignal, useContext } from "solid-js"
import { BlokiCookieKey, BlokiCookies } from "./cookies"

export const Theme = Object.freeze({
   light: "light",
   dark: "dark",
})

type Theme = typeof Theme[keyof typeof Theme]

function isSupportedTheme(theme: string): theme is Theme {
   return Object.values(Theme).includes(theme as Theme)
}

const switchThemeClass = css`
   *:not(img, video) {
      transition: background-color 100ms ease, color 100ms ease;
   }
`
function createThemeContext() {
   let actualTheme: Theme | null = null
   const preferDark = matchMedia("(prefers-color-scheme: dark)")
   const root = document.documentElement
   function getInitialTheme() {
      let theme = BlokiCookies.get(BlokiCookieKey.Theme) as Theme
      if (!isSupportedTheme(theme)) {
         theme = preferDark.matches ? Theme.dark : Theme.light
      }
      return theme
   }
   const getCSSColor = (colorName: string, el = root) => getComputedStyle(el).getPropertyValue(colorName)
   const [theme, setTheme] = createSignal(getInitialTheme())
   const [themeColor, setThemeColor] = createSignal(getCSSColor("--color-bg-main"))

   const createCSSColorMemo = (colorName: string, el = root) =>
      createMemo(() => {
         theme()
         return getCSSColor(colorName, el)
      })

   applyTheme(theme())

   function transitTheme(to: Theme) {
      root.classList.add(switchThemeClass)
      applyTheme(to)
      queueMicrotask(() => {
         root.classList.remove(switchThemeClass)
         setTheme(to)
      })
   }

   function applyTheme(theme: Theme) {
      if (actualTheme) {
         root.classList.replace(actualTheme, theme)
      } else root.classList.add(theme)
      setThemeColor(getCSSColor("--color-bg-main"))
      if (actualTheme) {
         BlokiCookies.set(BlokiCookieKey.Theme, theme)
      }
      actualTheme = theme
   }

   preferDark.onchange = (event) => {
      const theme = event.matches ? Theme.dark : Theme.light
      setTheme(theme)
   }

   return { theme, setTheme, transitTheme, createCSSColorMemo, themeColor }
}
const ThemeContext = createContext<ReturnType<typeof createThemeContext>>()
export function ThemeContextProvider(props: ParentProps) {
   const context = createThemeContext()
   return (
      <ThemeContext.Provider value={context}>
         <Meta name="theme-color" content={context.themeColor()} />
         {props.children}
      </ThemeContext.Provider>
   )
}
export const useThemeContext = () => useContext(ThemeContext)
