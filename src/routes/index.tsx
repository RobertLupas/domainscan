import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input.tsx"
import { ButtonGroup } from "@/components/ui/button-group.tsx"
import type { Domain } from "@/lib/shared/domainList.ts"
import { getDomainList } from "@/lib/shared/domainList.ts"
import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import DomainCard from "@/components/domainCard.tsx"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { Toggle } from "@/components/ui/toggle.tsx"
import { checkDomains } from "@/lib/server/checkDomains.ts"
import SettingsDialog from "@/components/settingsDialog.tsx"
import AboutDialog from "@/components/aboutDialog.tsx"
import GithubLink from "@/components/githubLink.tsx"
import { useIsMobile } from "@/hooks/use-mobile.ts"
import { cn } from "@/lib/utils.ts"
import { defaultPrefixList } from "@/lib/shared/data.ts"
import { useLocalStorage } from "usehooks-ts"
import { defaultTldToggleState } from "@/lib/client/tldToggles.ts"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const isMobile = useIsMobile()
  const [search, setSearch] = React.useState("")
  const [lastSearch, setLastSearch] = React.useState("")
  const [currentDomainList, setCurrentDomainList] = React.useState<Domain[]>([])
  const [hyphenToggle, setHyphenToggle] = useLocalStorage<boolean>(
    "hyphenToggle",
    false,
    { initializeWithValue: false }
  )
  React.useEffect(() => {
    console.log("hyphenToggle", hyphenToggle)
  }, [hyphenToggle])
  const [lastHyphenToggle, setLastHyphenToggle] = React.useState(hyphenToggle)
  const [prefixToggle, setPrefixToggle] = useLocalStorage<boolean>(
    "prefixToggle",
    false,
    { initializeWithValue: false }
  )
  const [lastPrefixToggle, setLastPrefixToggle] = React.useState(prefixToggle)
  const [domainCheckError, setDomainCheckError] = React.useState<string | null>(
    null
  )
  const [prefixList, setPrefixList] = useLocalStorage<string[]>(
    "prefixList",
    defaultPrefixList
  )

  const [tldToggleList, setTldToggleList] = useLocalStorage(
    "tldToggleList",
    defaultTldToggleState
  )

  const tldList = Object.keys(tldToggleList).filter((key) => tldToggleList[key])

  const searchChanged = () =>
    search != lastSearch ||
    hyphenToggle != lastHyphenToggle ||
    prefixToggle != lastPrefixToggle
  const isSearchCancelable = () =>
    !searchChanged() && currentDomainList.length > 0

  const isSearchable = () => search.length > 0

  const queryClient = useQueryClient()
  const [loading, setLoading] = React.useState(false)
  const handleSearch = async () => {
    if (isSearchable() && searchChanged()) {
      const domains = getDomainList(
        search,
        hyphenToggle,
        prefixToggle,
        prefixList,
        tldList
      )

      setLastSearch(search)
      setLastHyphenToggle(hyphenToggle)
      setLastPrefixToggle(prefixToggle)
      setDomainCheckError(null)
      setCurrentDomainList(domains)

      try {
        setLoading(true)
        const data = await queryClient.fetchQuery({
          queryKey: ["domain-check", domains],
          queryFn: () =>
            checkDomains({
              data: { domains },
            }),
          staleTime: 1000 * 60 * 10,
        })

        setCurrentDomainList(data ?? [])
        setLoading(false)
      } catch (err) {
        setCurrentDomainList([])
        setDomainCheckError(
          err instanceof Error
            ? `Error checking domains ${err.message}`
            : "Error checking domains."
        )
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
    <div className="flex h-fit min-h-screen flex-col p-2">
      <header className={cn("sticky py-2", isMobile ? "px-4" : "px-8")}>
        <Card size="sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-xl font-medium">DomainScan</h1>

              <div className="flex items-center gap-2">
                {!isMobile && (
                  <>
                    <AboutDialog />
                    <GithubLink />
                  </>
                )}
                <SettingsDialog
                  prefixList={prefixList}
                  onPrefixListChange={setPrefixList}
                  tldToggles={tldToggleList}
                  onTldToggleChange={(key) =>
                    setTldToggleList((prev) => {
                      const enabledCount =
                        Object.values(prev).filter(Boolean).length

                      if (prev[key] && enabledCount === 1) return prev

                      return {
                        ...prev,
                        [key]: !prev[key],
                      }
                    })
                  }
                />
                {!isMobile && <ThemeToggle />}
              </div>
            </div>
          </CardHeader>
        </Card>
      </header>

      <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-4 px-4">
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
