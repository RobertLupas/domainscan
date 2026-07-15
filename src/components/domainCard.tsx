import { Card, CardHeader } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Spinner } from "@/components/ui/spinner.tsx"
import type { Domain } from "@/lib/shared/domainList.ts"

export default function DomainCard({
  domain,
  loading = false,
}: {
  domain: Domain
  loading?: boolean
}) {
  return (
    <Card size="sm" className="py-1">
      <CardHeader
        className={cn(
          "flex items-center justify-between px-3",
          !loading && !domain.available && "text-red-400 line-through"
        )}
      >
        <span className="font-heading text-lg">{domain.name}</span>
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
              domain.price
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
