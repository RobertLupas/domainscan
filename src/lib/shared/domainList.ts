import { getDomain } from "tldts"

const prefixes = ["use", "join", "try", "my", "your"]
const tlds = ["com", "app", "so"]

export function getDomainList(nameOrDomain: string): string[] {
  nameOrDomain = nameOrDomain.trim().toLowerCase()
  if (nameOrDomain.length === 0) return []

  const domain = getDomain(nameOrDomain)

  if (domain != null) return [domain]
  else {
    const words = nameOrDomain.split(/[^A-Za-z0-9-]+/).filter(Boolean)
    const combined: string[] = []
    const combinedWithTlds: string[] = []
    combined.push(words.join(""))

    for (const prefix of prefixes)
      if (!words[0].startsWith(prefix))
        combined.push(`${prefix}${words.join("")}`)

    if (words.length > 1) {
      combined.push(words.join("-"))
      for (const prefix of prefixes)
        if (!words[0].startsWith(prefix))
          combined.push(`${prefix}-${words.join("-")}`)
    }

    for (const prefix of prefixes)
      if (!words[0].startsWith(prefix))
        combined.push(`${prefix}-${words.join("")}`)

    for (const tld of tlds)
      for (const combinedWords of combined)
        combinedWithTlds.push(`${combinedWords}.${tld}`)

    return combinedWithTlds
  }
}
