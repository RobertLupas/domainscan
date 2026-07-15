import { Cloudflare } from "cloudflare"
import { createServerFn } from "@tanstack/react-start"
import { getDomain } from "tldts"
import type { Domain } from "@/lib/shared/domainList"

const client = new Cloudflare({ apiToken: process.env["CLOUDFLARE_API_TOKEN"] })

export const checkDomains = createServerFn()
  .validator((data: { domains: Domain[] }) => data)
  .handler(async ({ data }) => {
    const validatedDomains: string[] = []

    for (const domain of data.domains.map((d) => d.name)) {
      const d = getDomain(domain)
      if (d != null) validatedDomains.push(d)
    }

    if (validatedDomains.length == 0) return

    const cfResponse = await client.registrar.check({
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
      domains: validatedDomains,
    })

    const domains: Domain[] = cfResponse.domains.map((domain) => ({
      name: domain.name,
      price: domain.pricing
        ? Number(domain.pricing.registration_cost)
        : undefined,
      available: domain.registrable,
    }))

    return domains
  })
