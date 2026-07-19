import { parse } from "tldts"
import { defaultPrefixList, defaultTldList } from "@/lib/shared/data.ts"

export type Domain = {
  name: string
  available?: boolean
  price: number | undefined
}

export function getDomainList(
  nameOrDomain: string,
  separateWithHyphen: boolean = false,
  addPrefixes: boolean = false,
  prefixes: string[] = defaultPrefixList,
  tlds: string[] = defaultTldList
): Domain[] {
  nameOrDomain = nameOrDomain.trim().toLowerCase()
  if (nameOrDomain.length === 0) return []

  const combinedWithTlds: string[] = []

  const domain = parse(nameOrDomain)
  if (domain.domain != null) {
    combinedWithTlds.push(domain.domain)

    for (const tld of tlds)
      if (tld !== parse(domain.domain).publicSuffix)
        combinedWithTlds.push(`${domain.domainWithoutSuffix}.${tld}`)
  } else {
    const combined: string[] = []
    const words = nameOrDomain.split(/[^A-Za-z0-9-]+/).filter(Boolean)

    if (!separateWithHyphen) {
      if (!addPrefixes) combined.push(words.join(""))
      else
        for (const prefix of prefixes)
          if (!words[0].startsWith(prefix))
            combined.push(`${prefix}${words.join("")}`)
    } else {
      if (!addPrefixes) combined.push(words.join("-"))
      else
        for (const prefix of prefixes)
          if (!words[0].startsWith(prefix)) {
            combined.push(`${prefix}-${words.join("-")}`)
            // if (words.length > 1) combined.push(`${prefix}-${words.join("")}`)
          }
    }

    for (const tld of tlds)
      for (const combinedWords of combined)
        combinedWithTlds.push(`${combinedWords}.${tld}`)
  }

  return combinedWithTlds.map((name) => ({
    name,
    price: undefined,
  }))
}
