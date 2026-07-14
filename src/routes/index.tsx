import { createFileRoute } from "@tanstack/react-router"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle.tsx"
import { Card, CardHeader } from "@/components/ui/card.tsx"
import { HugeiconsIcon } from "@hugeicons/react"
import { Github01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils.ts"
import { Input } from "@/components/ui/input.tsx"
import { ButtonGroup } from "@/components/ui/button-group.tsx"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex h-fit min-h-screen flex-col gap-4 p-2">
      <div className="sticky px-8 py-2">
        <Card size="sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-xl font-medium">DomainScan</h1>

              <div className="flex items-center gap-2">
                <a
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "icon",
                    })
                  )}
                  href={"https://github.com/robertlupas/domainscan"}
                  target="_blank"
                  rel="noopener noreferrer"
                  children={<HugeiconsIcon icon={Github01Icon} />}
                />
                <ThemeToggle />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <h2 className="font-heading text-lg font-medium">Search domain</h2>
            <ButtonGroup className="w-full">
              <Input
                id="input-button-group"
                placeholder="Enter a name or domain"
              />
              <Button variant="outline" size="icon">
                <HugeiconsIcon icon={Search01Icon} />
              </Button>
            </ButtonGroup>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
