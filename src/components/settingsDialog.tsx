import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Settings01Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge.tsx"
import { Input } from "@/components/ui/input.tsx"
import { ButtonGroup } from "@/components/ui/button-group.tsx"
import { useIsMobile } from "@/hooks/use-mobile.ts"
import { ThemeToggle } from "@/components/theme-toggle.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import AboutDialog from "@/components/aboutDialog.tsx"
import GithubLink from "@/components/githubLink.tsx"
import { defaultPrefixList, defaultTldList } from "@/lib/shared/data.ts"
import React from "react"
import type { TldToggles, TldToggleState } from "@/lib/client/tldToggles.ts"
import { Toggle } from "@/components/ui/toggle.tsx"
import { cn } from "@/lib/utils.ts"

export default function SettingsDialog({
  prefixList = defaultPrefixList,
  onPrefixListChange,
  tldToggles,
  onTldToggleChange,
}: {
  prefixList: string[]
  onPrefixListChange: React.Dispatch<React.SetStateAction<string[]>>
  tldToggles: TldToggleState
  onTldToggleChange: (key: TldToggles) => void
}) {
  const MAX_PREFIXES = 6

  const isMobile = useIsMobile()
  const [newPrefix, setNewPrefix] = React.useState("")

  const addPrefix = () => {
    const value = newPrefix.trim()
    if (!value) return
    onPrefixListChange((prev) =>
      prev.includes(value) || prev.length >= MAX_PREFIXES
        ? prev
        : [...prev, value]
    )
    setNewPrefix("")
  }

  const removePrefix = (prefix: string) => {
    onPrefixListChange((prev) => prev.filter((p) => p !== prefix))
  }

  const resetPrefixList = () => {
    onPrefixListChange([...defaultPrefixList])
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="icon" variant="outline" className="group">
            <HugeiconsIcon
              icon={Settings01Icon}
              className="transition-transform duration-400 group-hover:scale-130 group-hover:rotate-90 group-active:rotate-180"
            />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            <div className="space-y-2 pt-2">
              <div>
                <div className="flex items-center justify-between py-1">
                  <h2 className="mb-2 text-base font-semibold">Prefix list</h2>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => resetPrefixList()}
                  >
                    <HugeiconsIcon icon={Undo02Icon} />
                    Reset
                  </Button>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">
                  <span
                    className={cn(
                      prefixList.length >= MAX_PREFIXES && "text-red-200"
                    )}
                  >
                    {prefixList.length}/{MAX_PREFIXES}.
                  </span>
                  <span> </span>
                  <span>Click on an item to remove it.</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {prefixList.map((prefix) => (
                    <Badge
                      key={prefix}
                      variant="outline"
                      className="h-full cursor-pointer px-3 text-base hover:bg-background/60 hover:line-through"
                      onClick={() => removePrefix(prefix)}
                    >
                      {prefix}
                    </Badge>
                  ))}

                  <ButtonGroup>
                    <Input
                      className="h-7 w-24 text-center"
                      disabled={prefixList.length >= MAX_PREFIXES}
                      value={newPrefix}
                      onChange={(e) => setNewPrefix(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addPrefix()
                        }
                      }}
                      placeholder="Add word"
                    />
                    <Button
                      variant="outline"
                      className="h-7 p-2 pl-1.5"
                      disabled={prefixList.length >= MAX_PREFIXES}
                      onClick={addPrefix}
                    >
                      <HugeiconsIcon icon={Add01Icon} />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between py-1">
                  <h2 className="mb-2 text-base font-semibold">TLD list</h2>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">
                  Click to toggle. At least one must be enabled.
                </p>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {defaultTldList.map((key) => (
                    <Toggle
                      pressed={tldToggles[key]}
                      onPressedChange={() => onTldToggleChange(key)}
                      variant="outline"
                      size="sm"
                      key={key}
                    >
                      {key}
                    </Toggle>
                  ))}
                </div>
              </div>

              {isMobile && (
                <>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-center gap-2">
                    <ThemeToggle />
                    <AboutDialog />
                    <GithubLink />
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
