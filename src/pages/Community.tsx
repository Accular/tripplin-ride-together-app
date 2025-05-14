
import React, { useState } from 'react';
import { Search, Users, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const groups = [
    {
      id: 1,
      name: "Bangalore Riders Club",
      members: 245,
      image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZHNjYXBlJTIwcHVycGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60",
      description: "The largest motorcycle community in Bangalore"
    },
    {
      id: 2,
      name: "Royal Enfield Enthusiasts",
      members: 180,
      image: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm95YWwlMjBlbmZpZWxkfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60",
      description: "For all Royal Enfield riders and enthusiasts"
    },
    {
      id: 3,
      name: "Weekend Warriors",
      members: 120,
      image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZWtlbmQlMjByaWRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60",
      description: "Weekend rides and adventures around Bangalore"
    }
  ];

  const events = [
    {
      id: 1,
      name: "Saturday Dawn Ride",
      date: "May 17, 2025",
      time: "5:30 AM",
      location: "Cubbon Park",
      organizer: "Bangalore Riders Club",
      participants: 32,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      distance: "70 km"
    },
    {
      id: 2,
      name: "Sunday Breakfast Ride",
      date: "May 18, 2025",
      time: "7:00 AM",
      location: "Brigade Road",
      organizer: "Weekend Warriors",
      participants: 18,
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      distance: "45 km"
    },
    {
      id: 3,
      name: "Monsoon Ride to Coorg",
      date: "June 5, 2025",
      time: "6:00 AM",
      location: "Nice Road Exit",
      organizer: "Royal Enfield Enthusiasts",
      participants: 24,
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      distance: "280 km"
    }
  ];

  return (
    <div className="flex flex-col p-4 space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Community</h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search groups, events, or riders"
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs for Groups and Events */}
      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups" className="text-sm">
            <Users className="h-4 w-4 mr-2" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="events" className="text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        {/* Groups Tab Content */}
        <TabsContent value="groups" className="space-y-4 mt-4">
          <Button className="w-full" variant="outline">
            Create New Group
          </Button>
          
          <div className="space-y-3">
            {groups.map(group => (
              <Card key={group.id} className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-3 border">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-xs text-muted-foreground">{group.description}</p>
                      <div className="flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{group.members} members</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab Content */}
        <TabsContent value="events" className="space-y-4 mt-4">
          <Button className="w-full" variant="outline">
            Create New Event
          </Button>
          
          <div className="space-y-3">
            {events.map(event => (
              <Card key={event.id} className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-24 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW90b3JjeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60" 
                      alt={event.name} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                      <div>
                        <h3 className="font-medium text-white">{event.name}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs bg-background/20 text-white border-none">
                            {event.distance}
                          </Badge>
                        </div>
                      </div>
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={event.image} alt={event.organizer} />
                        <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{event.participants} joined</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs text-muted-foreground">Organized by {event.organizer}</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
