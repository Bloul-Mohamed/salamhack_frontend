import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TemplateShowcase() {
  const templateCategories = [
    { id: "minimal", name: "Minimal" },
    { id: "creative", name: "Creative" },
    { id: "corporate", name: "Corporate" },
    { id: "academic", name: "Academic" },
  ]

  const templates = {
    minimal: [
      { id: 1, name: "Clean", image: "/placeholder.svg?height=400&width=300" },
      { id: 2, name: "Simple", image: "/placeholder.svg?height=400&width=300" },
      { id: 3, name: "Modern", image: "/placeholder.svg?height=400&width=300" },
    ],
    creative: [
      { id: 4, name: "Bold", image: "/placeholder.svg?height=400&width=300" },
      { id: 5, name: "Vibrant", image: "/placeholder.svg?height=400&width=300" },
      { id: 6, name: "Artistic", image: "/placeholder.svg?height=400&width=300" },
    ],
    corporate: [
      { id: 7, name: "Executive", image: "/placeholder.svg?height=400&width=300" },
      { id: 8, name: "Professional", image: "/placeholder.svg?height=400&width=300" },
      { id: 9, name: "Business", image: "/placeholder.svg?height=400&width=300" },
    ],
    academic: [
      { id: 10, name: "Research", image: "/placeholder.svg?height=400&width=300" },
      { id: 11, name: "Scholar", image: "/placeholder.svg?height=400&width=300" },
      { id: 12, name: "Academic", image: "/placeholder.svg?height=400&width=300" },
    ],
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Professional Templates</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose from a variety of professionally designed templates for any industry
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="minimal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {templateCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(templates).map(([category, categoryTemplates]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden border shadow-sm">
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="object-cover w-full h-full transition-all hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                            <div className="p-4 w-full">
                              <h3 className="text-white font-medium text-lg">{template.name}</h3>
                              <Button size="sm" variant="secondary" className="mt-2">
                                Use Template
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

