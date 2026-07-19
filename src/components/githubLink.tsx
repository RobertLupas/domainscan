import { cn } from "@/lib/utils.ts"
import { buttonVariants } from "@/components/ui/button.tsx"
import { Github01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function GithubLink() {
  return (
    <a
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "icon",
        }),
        "group"
      )}
      href={"https://github.com/robertlupas/domainscan"}
      target="_blank"
      rel="noopener noreferrer"
      children={
        <HugeiconsIcon
          icon={Github01Icon}
          className="transition-transform duration-400 group-hover:scale-130"
        />
      }
    />
  )
}
