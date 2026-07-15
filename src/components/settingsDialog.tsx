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
import { defaultPrefixList } from "@/lib/shared/data.ts"
import React from "react"

export default function SettingsDialog({
  prefixList = defaultPrefixList,
  onPrefixListChange,
}: {
  prefixList: string[]
  onPrefixListChange: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const isMobile = useIsMobile()
  const [newPrefix, setNewPrefix] = React.useState("")

  const addPrefix = () => {
    const value = newPrefix.trim()
    if (!value) return
    onPrefixListChange((prev) =>
      prev.includes(value) ? prev : [...prev, value]
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
          <Button size="icon" variant="outline">
            <HugeiconsIcon icon={Settings01Icon} />
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
                      onClick={addPrefix}
                    >
                      <HugeiconsIcon icon={Add01Icon} />
                    </Button>
                  </ButtonGroup>
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
