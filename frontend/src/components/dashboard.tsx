
import React from "react"
import { useState } from "react"
import { useAppSelector } from "../store/store"
import { Button } from "../components/ui/Button"
import { Avatar, AvatarFallback } from "../components/ui/Avatar"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/Dropdown-menu"
import { User, LogOut, Settings, Code, Search } from "lucide-react"
import { Link } from "react-router-dom"


export default function Dashboard() {
  const [users, myState] = useAppSelector((state) => [state.usersReducer, state.myStateReducer])
  const [isSearching, setIsSearching] = useState(false)
  console.log("users",users);
  const handleFindMatch = () => {
    setIsSearching(true)
    // Here you would implement your match-finding logic using sockets
    // For demo purposes, we'll just toggle the state after 3 seconds
    setTimeout(() => {
      setIsSearching(false)
    }, 3000)
  }

  const activeUsers = users.filter((user) => user.id !== "" && user.id !== myState.id)
  console.log("active users",activeUsers)
  console.log("total users",users)
  return (
    <main className="min-h-screen bg-black text-orange-400 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Code className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">CodeMatch</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-orange-400">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-orange-400">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                See Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-400">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-zinc-900 border-orange-400 md:col-span-1">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-orange-400">Active Users ({activeUsers.length})</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {activeUsers.length > 0 ? (
                  activeUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between bg-zinc-800 p-3 rounded-md">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 bg-orange-500">
                          <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-medium">{user.name || "User-" + user.id.substring(0, 4)}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          user.available ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-500">No active users at the moment</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-orange-400 md:col-span-2 flex items-center justify-center">
            <CardContent className="p-8 w-full text-center">
              <h2 className="text-2xl font-bold mb-6 text-orange-400">Find a Coding Match</h2>
              <p className="mb-8 text-zinc-400">
                Get matched with another coder to solve problems together or compete against each other.
              </p>
              <Button
                size="lg"
                className={`w-full max-w-md h-16 text-lg ${
                  isSearching ? "bg-orange-700 hover:bg-orange-800" : "bg-orange-600 hover:bg-orange-700"
                }`}
                onClick={handleFindMatch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2">
                      <Search className="h-5 w-5" />
                    </div>
                    Searching for match...
                  </div>
                ) : (
                  "Find Match"
                )}
              </Button>
              <div className="mt-6">
              <Link to="/chat" className="text-orange-400 hover:text-orange-300 underline">
                Or go to chat page
              </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}