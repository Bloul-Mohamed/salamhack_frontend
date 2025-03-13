import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Edit, Save, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Change avatar</span>
                </Button>
              </div>
              <h2 className="mt-4 text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Marketing Manager</p>
              <Badge variant="outline" className="mt-2">
                Free Plan
              </Badge>

              <div className="mt-6 w-full space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>New York, NY</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="w-full space-y-4">
                <h3 className="text-sm font-medium">Account</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" /> Account Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Award className="mr-2 h-4 w-4" /> Upgrade Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="New York, NY" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Marketing professional with 5+ years of experience in digital marketing, content strategy, and campaign management."
                    className="min-h-[100px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue="Marketing Manager" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Marketing & Advertising" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"].map(
                      (skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button className="ml-1 rounded-full hover:bg-muted">×</button>
                        </Badge>
                      ),
                    )}
                    <Button variant="outline" size="sm" className="h-7">
                      <Plus className="h-3 w-3 mr-1" /> Add Skill
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    {[
                      { id: "resume-tips", label: "Resume Tips & Suggestions" },
                      { id: "job-matches", label: "Job Match Recommendations" },
                      { id: "product-updates", label: "Product Updates" },
                      { id: "marketing", label: "Marketing Communications" },
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={notification.id}
                          defaultChecked={notification.id !== "marketing"}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={notification.id} className="text-sm font-medium">
                          {notification.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Theme Preferences</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      Light
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Dark
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-primary text-primary-foreground">
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="justify-start bg-primary text-primary-foreground">
                      English
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Spanish
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      French
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Education & Experience</CardTitle>
          <CardDescription>Add your educational background and work experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Work Experience
              </h3>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Manager</h4>
                    <p className="text-sm text-muted-foreground">Acme Inc.</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Jan 2020 - Present</div>
                <p className="mt-2 text-sm">
                  Led digital marketing campaigns across multiple channels, managed social media presence, and analyzed
                  campaign performance.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Specialist</h4>
                    <p className="text-sm text-muted-foreground">XYZ Company</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Jun 2017 - Dec 2019</div>
                <p className="mt-2 text-sm">
                  Assisted in developing marketing strategies, created content for social media, and supported email
                  marketing campaigns.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <GraduationCap className="mr-2 h-5 w-5 text-primary" /> Education
              </h3>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Bachelor of Science in Marketing</h4>
                    <p className="text-sm text-muted-foreground">University of California</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Sep 2013 - Jun 2017</div>
                <p className="mt-2 text-sm">
                  GPA: 3.8/4.0, Marketing Club President, Relevant coursework: Digital Marketing, Consumer Behavior
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

