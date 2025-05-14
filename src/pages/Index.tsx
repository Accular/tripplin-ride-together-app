
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Cloud, Droplets, Clock, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  // Mock data - in a real app these would come from APIs/backend
  const suggestedRoutes = [
    {
      id: 1,
      name: "Bangalore to Nandi Hills",
      distance: "60 km",
      time: "1.5 hours",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Coastal Route to Pondicherry",
      distance: "170 km",
      time: "3 hours",
      difficulty: "Hard"
    },
    {
      id: 3,
      name: "City Loop - Cubbon Park",
      distance: "15 km",
      time: "45 min",
      difficulty: "Easy"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Weekend Group Ride",
      date: "Sat, May 17",
      location: "MG Road, Bangalore",
      participants: 24
    },
    {
      id: 2,
      name: "Scrambler Meetup",
      date: "Sun, May 18",
      location: "Electronic City",
      participants: 15
    }
  ];

  // PlanRide states
  const [showOptions, setShowOptions] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [showPlanRide, setShowPlanRide] = useState(false);
  
  // Suggested stops from PlanRide
  const suggestedStops = [
    {
      id: 1,
      name: "Highway Dhaba",
      description: "Food & Beverages • 30 min from start"
    },
    {
      id: 2,
      name: "Viewpoint Rest Area",
      description: "Scenic View • 1h 15m from start"
    },
    {
      id: 3,
      name: "Petrol Pump",
      description: "Refuel • 2h from start"
    }
  ];

  return (
    <div className="flex flex-col relative min-h-[calc(100vh-64px)]">
      {/* Map Background - In a real implementation, this would be a Google Maps component */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full glass-card border border-tripplin-purple/30">
          <div className="absolute inset-0 flex items-center justify-center bg-tripplin-dark/10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Map would be displayed here</p>
              <p className="text-xs text-muted-foreground mt-1">Using Google Maps API</p>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-3 right-3 space-y-2 z-10">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
              <MapPin className="h-4 w-4" />
            </Button>
            
            <div className="space-y-2 p-2 rounded-lg bg-background/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} />
                <Label htmlFor="traffic" className="text-xs flex items-center">
                  <Cloud className="h-3 w-3 mr-1" /> Traffic
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="weather" checked={showWeather} onCheckedChange={setShowWeather} />
                <Label htmlFor="weather" className="text-xs flex items-center">
                  <Droplets className="h-3 w-3 mr-1" /> Weather
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container with glass effect */}
      <div className="relative z-10 p-4 space-y-6 pt-2">
        {/* Conditional Rendering - Show either Home or Plan Ride */}
        {!showPlanRide ? (
          <>
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden h-48 mb-4">
              <div className="absolute inset-0 bg-tripplin-dark opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-tripplin-purple/50 to-tripplin-orange/50"></div>
              <img 
                src="https://images.unsplash.com/photo-1512203492609-972c16baa28b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Motorcyclist on road" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h1 className="text-2xl font-bold">Welcome to Tripplin</h1>
                <p className="text-sm opacity-90">Plan your next motorcycle adventure</p>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full bg-tripplin-gradient hover:opacity-90 transition-opacity animate-pulse-glow" 
              size="lg"
              onClick={() => setShowPlanRide(true)}
            >
              <span className="font-bold">Plan a Ride</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Suggested Routes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Suggested Routes</h2>
                <button onClick={() => setShowPlanRide(true)} className="text-sm text-tripplin-purple">View all</button>
              </div>
              <div className="space-y-3">
                {suggestedRoutes.map(route => (
                  <Card key={route.id} className="glass-card relative overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{route.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{route.distance}</span>
                          <span className="mx-1">•</span>
                          <span>{route.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`
                          px-2 py-1 rounded-full text-xs
                          ${route.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                            route.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {route.difficulty}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <Link to="/community" className="text-sm text-tripplin-purple">View all</Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <Card key={event.id} className="glass-card neon-border">
                    <CardContent className="p-3">
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{event.participants} riders joined</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-tripplin-purple hover:text-tripplin-purple">
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Plan Ride View */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Plan Your Ride</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPlanRide(false)}
                className="text-tripplin-purple"
              >
                Back to Home
              </Button>
            </div>

            {/* Route Input */}
            <Card className="glass-card">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tripplin-purple" />
                    <Input 
                      placeholder="Starting point" 
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tripplin-orange" />
                    <Input 
                      placeholder="Destination" 
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <Button variant="outline" 
                  className="w-full flex items-center justify-between"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <span>More Options</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                </Button>
                
                {showOptions && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="date" className="text-xs flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Date
                        </Label>
                        <Input 
                          id="date"
                          type="date" 
                          className="h-9"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="time" className="text-xs flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Time
                        </Label>
                        <Input 
                          id="time"
                          type="time" 
                          className="h-9"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="group-size" className="text-xs flex items-center">
                        <Users className="h-3 w-3 mr-1" /> Group Size
                      </Label>
                      <Select>
                        <SelectTrigger id="group-size" className="h-9">
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="solo">Solo Ride</SelectItem>
                            <SelectItem value="small">Small (2-5 riders)</SelectItem>
                            <SelectItem value="medium">Medium (6-15 riders)</SelectItem>
                            <SelectItem value="large">Large (15+ riders)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <Button className="w-full bg-tripplin-gradient">
                  Calculate Route
                </Button>
              </CardContent>
            </Card>

            {/* Suggested Stops */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Suggested Stops</h2>
              <div className="space-y-3">
                {suggestedStops.map(stop => (
                  <Card key={stop.id} className="glass-card">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{stop.name}</h3>
                        <p className="text-xs text-muted-foreground">{stop.description}</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7">Add</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
