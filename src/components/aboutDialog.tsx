import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"

export default function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="icon" variant="outline">
            ?
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
          <DialogDescription>
            <span className="block space-y-2 pt-2">
              <p>
                An app to check domain availability and prices for your next
                idea :)
              </p>
              <p>
                It can auto-add some prefixes to help you (hopefully) find an
                available domain for a popular name.
              </p>
              <p>
                I built this because I was tired of checking dozens of domain
                names (including variations) by hand every time I had a new
                idea.
              </p>
              <p>
                Created by{" "}
                <a
                  href="https://github.com/robertlupas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Robert Lupaș
                </a>
              </p>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}