
import React from 'react';
import { Settings, Award, MapPin, Calendar, ChevronRight, LogOut, Edit, Bike } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Aditya Singh",
    username: "@adityarides",
    location: "Bangalore, India",
    joinDate: "March 2025",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bike: "Royal Enfield Classic 350",
    totalRides: 47,
    followers: 128,
    following: 95,
    level: 3,
    xp: 680,
    nextLevel: 1000
  };

  // Mock ride history data
  const rideHistory = [
    {
      id: 1,
      name: "Weekend Ride to Nandi Hills",
      date: "May 10, 2025",
      distance: "120 km",
      duration: "3h 20m",
      group: "Bangalore Riders Club"
    },
    {
      id: 2,
      name: "City Loop",
      date: "May 5, 2025",
      distance: "45 km",
      duration: "1h 15m",
      group: "Solo Ride"
    },
    {
      id: 3,
      name: "Coastal Highway Expedition",
      date: "Apr 28, 2025",
      distance: "280 km",
      duration: "5h 45m",
      group: "Weekend Warriors"
    }
  ];

  // Mock badges data
  const badges = [
    {
      id: 1,
      name: "Early Rider",
      description: "Completed 10 morning rides",
      icon: "🌅",
      acquired: true
    },
    {
      id: 2,
      name: "Distance Master",
      description: "Rode more than 1000 km total",
      icon: "🛣️",
      acquired: false,
      progress: 68
    },
    {
      id: 3,
      name: "Group Captain",
      description: "Led 5 group rides",
      icon: "👨‍✈️",
      acquired: true
    },
    {
      id: 4,
      name: "Explorer",
      description: "Visited 10 different cities",
      icon: "🧭",
      acquired: false,
      progress: 40
    },
    {
      id: 5,
      name: "Night Owl",
      description: "Completed 5 night rides",
      icon: "🦉",
      acquired: true
    }
  ];

  return (
    <div className="flex flex-col pb-20">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-tripplin-gradient"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-16 text-center px-4">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground">{user.username}</p>
        
        <div className="flex justify-center items-center space-x-2 mt-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{user.location}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-1 text-sm">
          <Bike className="h-3 w-3 mr-1 text-muted-foreground" />
          <span>{user.bike}</span>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.totalRides}</p>
            <p className="text-xs text-muted-foreground">Rides</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.following}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
        
        {/* Rider Level */}
        <div className="mt-6 px-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Level {user.level} Rider</span>
            <span className="text-xs text-muted-foreground">{user.xp}/{user.nextLevel} XP</span>
          </div>
          <Progress value={(user.xp / user.nextLevel) * 100} className="h-2" />
        </div>
      </div>

      {/* Tabs for Profile Content */}
      <div className="mt-6 px-4">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history" className="text-sm">Ride History</TabsTrigger>
            <TabsTrigger value="badges" className="text-sm">Badges</TabsTrigger>
          </TabsList>

          {/* Ride History Tab */}
          <TabsContent value="history" className="mt-4 space-y-3">
            {rideHistory.map(ride => (
              <Card key={ride.id} className="glass-card">
                <CardContent className="p-3">
                  <h3 className="font-medium">{ride.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-muted-foreground">
                      <span>{ride.date}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {ride.distance}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-muted-foreground">Duration: {ride.duration}</span>
                    <span className="text-muted-foreground">{ride.group}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">View All Rides</Button>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {badges.map(badge => (
                <Card 
                  key={badge.id} 
                  className={`${badge.acquired ? 'glass-card neon-border' : 'bg-muted/50'}`}
                >
                  <CardContent className="p-3 text-center">
                    <div className={`text-2xl mb-1 ${!badge.acquired && 'opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <h3 className={`font-medium text-sm ${!badge.acquired && 'text-muted-foreground'}`}>
                      {badge.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                    {!badge.acquired && badge.progress && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span>Progress</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-1" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings and Logout Buttons */}
      <div className="mt-8 px-4 space-y-2">
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" className="w-full justify-between text-destructive border-destructive/20">
          <div className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
