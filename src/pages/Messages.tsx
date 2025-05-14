
import React, { useState } from 'react';
import { Search, MoreVertical, Send, Phone, Video } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  // Mock data
  const conversations = [
    {
      id: 1,
      name: "Bangalore Riders Group",
      lastMessage: "Let's plan the Saturday ride route",
      time: "10:30 AM",
      unread: 3,
      isGroup: true,
      avatar: "https://images.unsplash.com/photo-1553249080-11bf6ec00323?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvdXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
      members: ["Raj", "Ankit", "Priya", "You", "+12 more"]
    },
    {
      id: 2,
      name: "Raj Kumar",
      lastMessage: "Are you joining tomorrow's ride?",
      time: "Yesterday",
      unread: 0,
      isGroup: false,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Priya Singh",
      lastMessage: "I found a great spot for our next ride",
      time: "2 days ago",
      unread: 0,
      isGroup: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Weekend Explorers",
      lastMessage: "Location shared",
      time: "2 days ago",
      unread: 0,
      isGroup: true,
      avatar: "https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JvdXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
      members: ["Vivek", "Sanjay", "Meera", "You", "+8 more"]
    }
  ];

  // Chat UI is simplified - in a real app, this would have proper message rendering and state management
  return (
    <div className="flex flex-col h-screen pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs for Chats */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
            <TabsTrigger value="direct" className="text-xs">Direct</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-2">
            {conversations.map(convo => (
              <div 
                key={convo.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedChat === convo.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                onClick={() => setSelectedChat(convo.id)}
              >
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{convo.name}</h3>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {convo.lastMessage}
                  </p>
                </div>
                {convo.unread > 0 && (
                  <div className="ml-2 flex-shrink-0 bg-tripplin-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {convo.unread}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="groups" className="mt-4 space-y-2">
            {conversations.filter(c => c.isGroup).map(convo => (
              <div 
                key={convo.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedChat === convo.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                onClick={() => setSelectedChat(convo.id)}
              >
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{convo.name}</h3>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {convo.lastMessage}
                  </p>
                </div>
                {convo.unread > 0 && (
                  <div className="ml-2 flex-shrink-0 bg-tripplin-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {convo.unread}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="direct" className="mt-4 space-y-2">
            {conversations.filter(c => !c.isGroup).map(convo => (
              <div 
                key={convo.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedChat === convo.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                onClick={() => setSelectedChat(convo.id)}
              >
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{convo.name}</h3>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {convo.lastMessage}
                  </p>
                </div>
                {convo.unread > 0 && (
                  <div className="ml-2 flex-shrink-0 bg-tripplin-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {convo.unread}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Selected Chat UI */}
      {selectedChat && (
        <div className="fixed inset-0 bg-background z-20 flex flex-col">
          {/* Chat Header */}
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2"
                onClick={() => setSelectedChat(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage 
                  src={conversations.find(c => c.id === selectedChat)?.avatar} 
                  alt={conversations.find(c => c.id === selectedChat)?.name} 
                />
                <AvatarFallback>
                  {conversations.find(c => c.id === selectedChat)?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{conversations.find(c => c.id === selectedChat)?.name}</h3>
                {conversations.find(c => c.id === selectedChat)?.isGroup && (
                  <p className="text-xs text-muted-foreground">
                    {conversations.find(c => c.id === selectedChat)?.members?.slice(0, 3).join(", ")}...
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat Messages Area - This would contain actual messages in a real implementation */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
            <div className="self-center text-xs text-muted-foreground py-1 px-2 rounded-full bg-muted">
              Today
            </div>
            
            {/* Sample Messages */}
            <div className="self-start max-w-[80%]">
              <div className="bg-secondary rounded-2xl rounded-tl-sm p-3">
                <p className="text-sm">Hey, are you joining the ride tomorrow?</p>
              </div>
              <span className="text-xs text-muted-foreground ml-1">10:23 AM</span>
            </div>
            
            <div className="self-end max-w-[80%]">
              <div className="bg-tripplin-purple text-white rounded-2xl rounded-tr-sm p-3">
                <p className="text-sm">Yes, I'll be there! Starting from the usual spot?</p>
              </div>
              <span className="text-xs text-muted-foreground mr-1 text-right block">10:25 AM</span>
            </div>
            
            <div className="self-start max-w-[80%]">
              <div className="bg-secondary rounded-2xl rounded-tl-sm p-3">
                <p className="text-sm">Great! Yes, meeting at Cubbon Park entrance at 6 AM. Don't forget to bring extra water, it's going to be hot.</p>
              </div>
              <span className="text-xs text-muted-foreground ml-1">10:28 AM</span>
            </div>
            
            <div className="self-end max-w-[80%]">
              <div className="bg-tripplin-purple text-white rounded-2xl rounded-tr-sm p-3">
                <p className="text-sm">Got it, thanks for the reminder! See you tomorrow.</p>
              </div>
              <span className="text-xs text-muted-foreground mr-1 text-right block">10:30 AM</span>
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t">
            <div className="flex items-center">
              <Input 
                placeholder="Type a message..." 
                className="rounded-full"
              />
              <Button className="ml-2 rounded-full h-10 w-10 p-0 bg-tripplin-purple">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
