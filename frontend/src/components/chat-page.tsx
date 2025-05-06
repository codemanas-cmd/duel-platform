import React from "react"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Badge } from "../components/ui/Badge"
import { Plus, ArrowLeft, Maximize2 } from "lucide-react"
import { Link } from "react-router-dom"

type Message = {
  id: string
  sender: string
  content: string
  timestamp: Date
  isProposal?: boolean
  problemDetails?: {
    rating: number
    tag: string
  }
}

type Problem = {
  id: string
  rating: number
  tags: string[]
}

export default function ChatPage() {
  const [minRating, setMinRating] = useState("")
  const [maxRating, setMaxRating] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [problems, setProblems] = useState<Problem[]>([])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Manas",
      content: "Hey whatsupp, let's have a quick 1200 problem!",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      sender: "Manas",
      content: "I'm proposing to add 1800 rated DP problem.",
      timestamp: new Date(),
      isProposal: true,
      problemDetails: {
        rating: 1800,
        tag: "DP",
      },
    },
  ])

  const handleAddProblem = () => {
    if (!minRating || !maxRating || !selectedTag) return

    const newProblem = {
      id: Date.now().toString(),
      rating: Number.parseInt(minRating),
      tags: [selectedTag],
    }

    setProblems([...problems, newProblem])

    // Add a message about the new problem
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: `Added a new ${selectedTag} problem with rating ${minRating}.`,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])

    // Reset form
    setMinRating("")
    setMaxRating("")
    setSelectedTag("")
  }

  const handleAcceptProposal = () => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: "I've accepted the 1800 rated DP problem.",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
  }

  const handleRejectProposal = () => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: "I've rejected the 1800 rated DP problem proposal.",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
  }

  const tags = ["DP", "Binary Search", "DSU", "Graphs", "Trees", "Greedy", "Math", "String", "Data Structures"]

  return (
    <main className="min-h-screen bg-black text-orange-400">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="p-6 border-r border-zinc-800">
          <div className="mb-6 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
            <h1 className="text-xl font-bold">Problem Selection</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Rating</h2>
              <div className="flex space-x-4">
                <div className="space-y-2 flex-1">
                  <label className="text-sm">Min</label>
                  <Input
                    type="number"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="bg-zinc-900 border-orange-400"
                    placeholder="800"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm">Max</label>
                  <Input
                    type="number"
                    value={maxRating}
                    onChange={(e) => setMaxRating(e.target.value)}
                    className="bg-zinc-900 border-orange-400"
                    placeholder="3500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">Tags</h2>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="bg-zinc-900 border-orange-400">
                <SelectValue className="text-sm text-zinc-300" placeholder="Select a tag">
                  {selectedTag || 'Select a tag'}  {/* Pass either the selectedTag or the placeholder text */}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-orange-400">
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleAddProblem}>
              Add Problem
            </Button>

            <div className="pt-4">
              <Button className="flex items-center text-orange-400 hover:text-orange-300">
                <Plus className="h-5 w-5 mr-2" />
                Add another problem
              </Button>
            </div>

            {problems.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">Added Problems</h2>
                <div className="space-y-2">
                  {problems.map((problem) => (
                    <div key={problem.id} className="bg-zinc-800 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span>Rating: {problem.rating}</span>
                        <Badge className="bg-orange-600">{problem.tags[0]}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-400">Chat</h2>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className="flex items-center">
                  <span className="font-medium text-blue-400">{message.sender}:</span>
                  <span className="text-xs text-zinc-500 ml-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-white">{message.content}</p>

                {message.isProposal && (
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAcceptProposal}>
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-400 hover:bg-red-900/20"
                      onClick={handleRejectProposal}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-800">
            <Input className="bg-zinc-900 border-zinc-700" placeholder="Type a message..." />
          </div>
        </div>
      </div>
    </main>
  )
}
