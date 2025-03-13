"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Mail, Share2, Gift, Users, Award, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ReferralsPage() {
  const referrals = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      date: "May 15, 2023",
      status: "Signed Up",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      date: "May 10, 2023",
      status: "Upgraded to Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      date: "May 5, 2023",
      status: "Invited",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
  ]

  const rewards = [
    {
      id: 1,
      title: "Free Month of Pro",
      description: "Get a free month of Pro when a friend upgrades",
      icon: <Gift className="h-8 w-8 text-primary" />,
      progress: 1,
      target: 3,
      unlocked: false,
    },
    {
      id: 2,
      title: "Resume Template Pack",
      description: "Unlock exclusive templates with 5 referrals",
      icon: <Award className="h-8 w-8 text-primary" />,
      progress: 2,
      target: 5,
      unlocked: false,
    },
    {
      id: 3,
      title: "1-on-1 Resume Review",
      description: "Get a professional review with 10 referrals",
      icon: <Users className="h-8 w-8 text-primary" />,
      progress: 2,
      target: 10,
      unlocked: false,
    },
  ]

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Referrals</h1>
          <p className="text-muted-foreground">Invite friends and earn rewards</p>
        </div>
      </div>

      <Card className="shadow-sm blue-gradient-subtle">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-bold">Share ResumeAI with friends</h2>
              <p className="text-muted-foreground mt-1">
                For each friend who signs up, you'll both get 7 days of Pro access for free
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Input value="https://resumeai.com/r/johndoe123" readOnly className="pr-10" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => navigator.clipboard.writeText("https://resumeai.com/r/johndoe123")}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
                <Button className="blue-gradient">
                  <Mail className="mr-2 h-4 w-4" /> Invite via Email
                </Button>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Tweet
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Share2 className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>Track the status of your referrals</CardDescription>
          </CardHeader>
          <CardContent>
            {referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={referral.avatar} alt={referral.name} />
                        <AvatarFallback>{referral.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-muted-foreground">{referral.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          referral.status === "Upgraded to Pro"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0"
                            : referral.status === "Signed Up"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-0"
                        }
                      >
                        {referral.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{referral.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No referrals yet</p>
                <Button size="sm" className="mt-2">
                  Invite Friends
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Earn rewards by referring friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">{reward.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {reward.progress} of {reward.target} referrals
                          </span>
                          <span>{Math.round((reward.progress / reward.target) * 100)}%</span>
                        </div>
                        <Progress
                          value={(reward.progress / reward.target) * 100}
                          className="h-2 bg-blue-100 dark:bg-blue-950"
                        >
                          <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button size="sm" className="blue-gradient">
                View All Rewards <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Learn how to earn rewards through referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="mx-auto rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-medium">Share Your Link</h3>
              <p className="text-sm text-muted-foreground">
                Share your unique referral link with friends via email or social media
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="mx-auto rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="font-medium">Friends Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                When your friends sign up using your link, they get 7 days of Pro access
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="mx-auto rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="font-medium">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                You earn rewards for each friend who signs up and even more when they upgrade
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

