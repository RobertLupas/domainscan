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
import { Add01Icon, Settings01Icon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge.tsx"
import { Input } from "@/components/ui/input.tsx"
import { ButtonGroup } from "@/components/ui/button-group.tsx"
import { useIsMobile } from "@/hooks/use-mobile.ts"
import { ThemeToggle } from "@/components/theme-toggle.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import AboutDialog from "@/components/aboutDialog.tsx"
import GithubLink from "@/components/githubLink.tsx"

export default function SettingsDialog() {
  const prefixList = ["use", "join", "try", "my", "your"]
  const isMobile = useIsMobile()

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
                <h2 className="mb-2 text-base font-semibold">Prefix list</h2>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {prefixList.map((prefix) => (
                    <Badge
                      key={prefix}
                      variant="outline"
                      className="h-full cursor-pointer px-3 text-base hover:bg-background/60 hover:line-through"
                    >
                      {prefix}
                    </Badge>
                  ))}

                  <ButtonGroup>
                    <Input
                      className="h-7 w-24 text-center"
                      placeholder="Add word"
                    />
                    <Button variant="outline" className="h-7 p-2 pl-1.5">
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
