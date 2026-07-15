import { Cloudflare } from "cloudflare"
import { createServerFn } from "@tanstack/react-start"
import { getDomain } from "tldts"

const client = new Cloudflare({ apiToken: process.env["CLOUDFLARE_API_TOKEN"] })

export const checkDomains = createServerFn()
  .validator((data: { domains: string[] }) => data)
  .handler(async ({ data }) => {
    const validatedDomains: string[] = []

    for (const domain of data.domains) {
      const d = getDomain(domain)
      if (d != null) validatedDomains.push(d)
    }

    if (validatedDomains.length == 0) return

    return client.registrar.check({
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
      domains: validatedDomains,
    })
  })
