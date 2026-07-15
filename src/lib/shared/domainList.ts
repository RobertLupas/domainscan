import { getDomain } from "tldts"

const prefixes = ["use", "join", "try", "my", "your"]
const tlds = ["com", "app", "so"]

export function getDomainList(
  nameOrDomain: string,
  separateWithHyphen: boolean = false,
  addPrefixes: boolean = false
): string[] {
  nameOrDomain = nameOrDomain.trim().toLowerCase()
  if (nameOrDomain.length === 0) return []

  const domain = getDomain(nameOrDomain)

  if (domain != null) return [domain]

  const words = nameOrDomain.split(/[^A-Za-z0-9-]+/).filter(Boolean)
  const combined: string[] = []

  if (!separateWithHyphen) {
    if (!addPrefixes) combined.push(words.join(""))
    else
      for (const prefix of prefixes)
        if (!words[0].startsWith(prefix))
          combined.push(`${prefix}${words.join("")}`)
  } else {
    if (!addPrefixes) combined.push(words.join("-"))
    else {
      for (const prefix of prefixes)
        if (!words[0].startsWith(prefix))
          combined.push(`${prefix}-${words.join("-")}`)

      for (const prefix of prefixes)
        if (!words[0].startsWith(prefix))
          combined.push(`${prefix}-${words.join("")}`)
    }
  }

  const combinedWithTlds: string[] = []
  for (const tld of tlds)
    for (const combinedWords of combined)
      combinedWithTlds.push(`${combinedWords}.${tld}`)

  return combinedWithTlds
}
