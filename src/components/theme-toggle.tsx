import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      className="group"
    >
      <HugeiconsIcon
        icon={Sun02Icon}
        className="absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-500 group-hover:scale-130 group-hover:rotate-90! dark:scale-0! dark:-rotate-90!"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-500 group-hover:rotate-45! dark:scale-100 dark:rotate-0 dark:group-hover:scale-130!"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
