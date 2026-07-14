import { Card, CardHeader } from "@/components/ui/card.tsx"
import { cn } from "@/lib/utils.ts"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Spinner } from "@/components/ui/spinner.tsx"

export default function DomainCard({
  domain,
  available,
  loading = false,
  price,
}: {
  domain: string
  available: boolean
  loading?: boolean
  price?: number
}) {
  return (
    <Card size="sm" className="py-1">
      <CardHeader
        className={cn(
          "flex items-center justify-between px-3",
          !loading && !available && "text-red-400 line-through"
        )}
      >
        <span className="font-heading text-lg">{domain}</span>
        <span
          className={cn(
            "font-heading font-medium",
            available && price && "text-lg"
          )}
        >
          {loading ? (
            <Spinner />
          ) : available ? (
            price ? (
              price
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
