import { Cloudflare } from "cloudflare"
import { createServerFn } from "@tanstack/react-start"
import { getDomain } from "tldts"
import type { Domain } from "@/lib/shared/domainList"

const client = new Cloudflare({ apiToken: process.env["CLOUDFLARE_API_TOKEN"] })

export const checkDomains = createServerFn()
  .validator((data: { domains: Domain[] }) => data)
  .handler(async ({ data }) => {
    try {
      const validatedDomains = data.domains
        .map((d) => getDomain(d.name))
        .filter((d): d is string => d != null)

      if (validatedDomains.length == 0) return

      const cfResponse = await client.registrar.check({
        account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
        domains: validatedDomains,
      })

      return cfResponse.domains.map((domain) => ({
        name: domain.name,
        price: domain.pricing
          ? Number(domain.pricing.registration_cost)
          : undefined,
        available: domain.registrable,
      }))
    } catch (error) {
      throw new Error("Failed to check domains: " + (error as Error).message)
    }
  })
