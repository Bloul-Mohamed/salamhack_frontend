import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

export default function TemplatesPage() {
  const templateCategories = [
    { id: "all", name: "All Templates" },
    { id: "minimal", name: "Minimal" },
    { id: "creative", name: "Creative" },
    { id: "corporate", name: "Corporate" },
    { id: "academic", name: "Academic" },
  ]

  const templates = [
    { id: 1, name: "Clean", category: "minimal", image: "/placeholder.svg?height=400&width=300" },
    { id: 2, name: "Simple", category: "minimal", image: "/placeholder.svg?height=400&width=300" },
    { id: 3, name: "Modern", category: "minimal", image: "/placeholder.svg?height=400&width=300" },
    { id: 4, name: "Bold", category: "creative", image: "/placeholder.svg?height=400&width=300" },
    { id: 5, name: "Vibrant", category: "creative", image: "/placeholder.svg?height=400&width=300" },
    { id: 6, name: "Artistic", category: "creative", image: "/placeholder.svg?height=400&width=300" },
    { id: 7, name: "Executive", category: "corporate", image: "/placeholder.svg?height=400&width=300" },
    { id: 8, name: "Professional", category: "corporate", image: "/placeholder.svg?height=400&width=300" },
    { id: 9, name: "Business", category: "corporate", image: "/placeholder.svg?height=400&width=300" },
    { id: 10, name: "Research", category: "academic", image: "/placeholder.svg?height=400&width=300" },
    { id: 11, name: "Scholar", category: "academic", image: "/placeholder.svg?height=400&width=300" },
    { id: 12, name: "Academic", category: "academic", image: "/placeholder.svg?height=400&width=300" },
  ]

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Templates</h1>
          <p className="text-muted-foreground">Choose from a variety of professionally designed templates</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search templates..." className="w-full pl-9" />
        </div>
        <Button variant="outline" size="sm" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex overflow-auto mb-6">
          {templateCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-1">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden shadow-sm">
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
                        <p className="text-white/80 text-sm mb-2">
                          {templateCategories.find((cat) => cat.id === template.category)?.name}
                        </p>
                        <Button size="sm" variant="secondary">
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

        {templateCategories.slice(1).map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .filter((template) => template.category === category.id)
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden shadow-sm">
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
                            <p className="text-white/80 text-sm mb-2">{category.name}</p>
                            <Button size="sm" variant="secondary">
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
  )
}

