import { Card, CardHeader } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { Bookmark02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Spinner } from "@/components/ui/spinner.tsx"
import type { Domain } from "@/lib/shared/domainList.ts"
import { Button } from "@/components/ui/button.tsx"

export default function DomainCard({
  domain,
  loading = false,
  onBookmark,
  bookmarked,
}: {
  domain: Domain
  loading?: boolean
  onBookmark?: () => void
  bookmarked?: boolean
}) {
  return (
    <Card size="sm" className="group py-1">
      <CardHeader
        className={cn(
          "flex items-center justify-between px-3",
          !loading && !domain.available && "text-red-400 line-through"
        )}
      >
        <div className="flex items-center">
          {onBookmark && (
            <div className="mr-0 w-0 -translate-x-2 scale-30 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mr-2 group-hover:w-6 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
              <Button
                size="icon-xs"
                variant="ghost"
                className="text-muted-foreground"
                onClick={onBookmark}
              >
                <HugeiconsIcon
                  icon={Bookmark02Icon}
                  fill={bookmarked ? "currentColor" : "none"}
                />
              </Button>
            </div>
          )}
          <span className="font-heading text-lg">{domain.name}</span>
        </div>
        <span
          className={cn(
            "font-heading font-medium",
            domain.available && domain.price && "text-lg"
          )}
        >
          {loading ? (
            <Spinner />
          ) : domain.available ? (
            domain.price ? (
              `$${domain.price}`
            ) : (
              "N/A"
            )
          ) : (
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={3} />
          )}
        </span>
      </CardHeader>
    </Card>
  )
}
