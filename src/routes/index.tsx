import { createFileRoute } from "@tanstack/react-router"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Github01Icon, Search01Icon, } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils.ts"
import { Input } from "@/components/ui/input.tsx"
import { ButtonGroup } from "@/components/ui/button-group.tsx"
import type { Domain } from "@/lib/shared/domainList.ts"
import { getDomainList } from "@/lib/shared/domainList.ts"
import React from "react"
import DomainCard from "@/components/domainCard.tsx"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { Toggle } from "@/components/ui/toggle.tsx"
import { checkDomains } from "@/lib/server/checkDomains.ts"
import AboutDialog from "@/components/aboutDialog.tsx"
import GithubLink from "@/components/githubLink.tsx"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [search, setSearch] = React.useState("")
  const [lastSearch, setLastSearch] = React.useState("")
  const [currentDomainList, setCurrentDomainList] = React.useState<Domain[]>([])
  const [hyphenToggle, setHyphenToggle] = React.useState(false)
  const [lastHyphenToggle, setLastHyphenToggle] = React.useState(false)
  const [prefixToggle, setPrefixToggle] = React.useState(false)
  const [lastPrefixToggle, setLastPrefixToggle] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [domainCheckError, setDomainCheckError] = React.useState<string | null>(
    null
  )

  const searchChanged = () =>
    search != lastSearch ||
    hyphenToggle != lastHyphenToggle ||
    prefixToggle != lastPrefixToggle
  const isSearchCancelable = () =>
    !searchChanged() && currentDomainList.length > 0

  const isSearchable = () => search.length > 0

  const handleSearch = async () => {
    if (isSearchable() && searchChanged()) {
      const domains = getDomainList(search, hyphenToggle, prefixToggle)

      setLastSearch(search)
      setLastHyphenToggle(hyphenToggle)
      setLastPrefixToggle(prefixToggle)
      setCurrentDomainList(domains)

      setLoading(true)
      setDomainCheckError(null)

      try {
        const res = await checkDomains({
          data: { domains },
        })

        setCurrentDomainList(res ?? [])
      } catch (err) {
        setCurrentDomainList([])
        setDomainCheckError(
          err instanceof Error
            ? `Error checking domains ${err.message}`
            : "Error checking domains."
        )
      } finally {
        setLoading(false)
      }
    }
  }

  const cancelSearch = () => {
    setSearch("")
    setLastSearch("")
    setCurrentDomainList([])
    setDomainCheckError(null)
  }

  return (
    <div className="flex h-fit min-h-screen flex-col gap-4 p-2">
      <div className="sticky px-8 py-2">
        <Card size="sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-xl font-medium">DomainScan</h1>

              <div className="flex items-center gap-2">
                <AboutDialog />
                <GithubLink />
                <ThemeToggle />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="font-heading text-lg font-medium">Search domain</h2>
            <ButtonGroup className="w-full">
              <Input
                autoFocus
                placeholder="Enter a name or domain"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch()
                }}
              />
              <Button
                variant={isSearchCancelable() ? "destructive" : "outline"}
                size="icon"
                onClick={() =>
                  isSearchCancelable() ? cancelSearch() : handleSearch()
                }
              >
                <HugeiconsIcon
                  icon={isSearchCancelable() ? Cancel01Icon : Search01Icon}
                />
              </Button>
            </ButtonGroup>

            <div className="mt-2 grid gap-2 min-[400px]:grid-cols-[1fr_auto]">
              <Tabs
                value={hyphenToggle ? "hyphen" : "no-separator"}
                onValueChange={(value) => setHyphenToggle(value === "hyphen")}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="no-separator">No separator</TabsTrigger>
                  <TabsTrigger value="hyphen">Hyphen</TabsTrigger>
                </TabsList>
              </Tabs>

              <Toggle
                variant="outline"
                pressed={prefixToggle}
                onPressedChange={setPrefixToggle}
              >
                Add Prefixes
              </Toggle>
            </div>

            {domainCheckError && (
              <span className="mt-4 text-center text-red-500">
                {domainCheckError}
              </span>
            )}
          </CardHeader>
        </Card>

        {domainCheckError === null && currentDomainList.length > 0 && (
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1 text-xs">
                <span>Domain</span>
                <span>Price/Availability</span>
              </div>
              {currentDomainList.map((domain: Domain) => (
                <DomainCard
                  domain={domain}
                  loading={loading}
                  key={domain.name}
                />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
