import React, { useState } from 'react';
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

  // UI states
  const [showOptions, setShowOptions] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [rideSource, setRideSource] = useState('');
  const [rideDestination, setRideDestination] = useState('');
  
  // Suggested stops
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
  
  // Traffic and weather information (mock data)
  const trafficInfo = showTraffic ? [
    { id: 1, type: 'heavy', location: 'MG Road', delay: '15 min' },
    { id: 2, type: 'medium', location: 'Ring Road', delay: '8 min' }
  ] : [];
  
  const weatherInfo = showWeather ? {
    current: 'Partly Cloudy',
    temperature: '28°C',
    precipitation: '20%'
  } : null;

  return (
    <div className="flex flex-col relative h-[calc(100vh-64px)]">
      {/* Full-screen Map Background */}
      <div className="absolute inset-0 z-0 bg-gray-100">
        <div className="relative h-full w-full">
          {/* Map Placeholder - In a real implementation, this would be a Google Maps component */}
          <div className="absolute inset-0 bg-tripplin-dark/5">
            {/* This is a placeholder for the map - would be replaced with actual Google Maps */}
            <div className="grid grid-cols-6 grid-rows-6 h-full w-full opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-gray-300/20"></div>
              ))}
            </div>
            
            {/* Traffic Overlay - Only show if traffic is enabled */}
            {showTraffic && (
              <div className="absolute inset-0 z-5">
                {/* Visual representation of traffic would be here */}
                <div className="absolute top-24 left-5 bg-red-500/30 h-12 w-24 rounded-full"></div>
                <div className="absolute top-48 left-36 bg-yellow-500/30 h-12 w-32 rounded-full"></div>
              </div>
            )}
            
            {/* Weather Overlay - Only show if weather is enabled */}
            {showWeather && (
              <div className="absolute top-4 left-4 z-5">
                {/* Weather information would be displayed here */}
                <div className="bg-background/70 p-2 rounded-lg shadow-sm text-xs flex items-center">
                  <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                  <span>28°C | Partly Cloudy</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Box - Waze-like top search bar */}
      <div className="relative z-10 p-4 pt-12">
        <Card className="glass-card shadow-lg">
          <CardContent className="p-2">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-tripplin-purple" />
                <Input 
                  placeholder="Where to ride?" 
                  className="pl-8 pr-2 py-1 h-9"
                  value={rideDestination}
                  onChange={(e) => setRideDestination(e.target.value)}
                  onFocus={() => setBottomSheetOpen(true)}
                />
              </div>
              <Button className="h-9 bg-tripplin-gradient" size="sm" onClick={() => setBottomSheetOpen(!bottomSheetOpen)}>
                {bottomSheetOpen ? "Close" : "Ride"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Waze-like Map Controls - Moved below the search bar */}
      <div className="relative z-10 px-4">
        <div className="flex justify-end">
          <div className="space-y-2 p-2 rounded-lg bg-background/80 shadow-md">
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

      {/* Bottom Sheet - Waze-like slide-up panel */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 bg-background rounded-t-xl shadow-lg transition-transform duration-300 transform ${bottomSheetOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'}`}
           style={{ maxHeight: 'calc(80vh - 60px)' }}>
        
        {/* Drag Handle */}
        <div className="h-6 flex items-center justify-center cursor-pointer" 
             onClick={() => setBottomSheetOpen(!bottomSheetOpen)}>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Bottom Sheet Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 66px)' }}>
          {/* Ride Planning Form */}
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold">Plan Your Ride</h2>
            
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tripplin-purple" />
                <Input 
                  placeholder="Starting point" 
                  className="pl-9"
                  value={rideSource}
                  onChange={(e) => setRideSource(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tripplin-orange" />
                <Input 
                  placeholder="Destination" 
                  className="pl-9"
                  value={rideDestination}
                  onChange={(e) => setRideDestination(e.target.value)}
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
          </div>
          
          {/* Suggested Routes */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Suggested Routes</h2>
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
          <div className="mb-16"> {/* Added bottom margin to prevent overlap with nav bar */}
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
        </div>
      </div>
    </div>
  );
};

export default Index;
