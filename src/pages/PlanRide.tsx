
import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, ChevronDown, Cloud, Droplets } from 'lucide-react';
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

const PlanRide = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showWeather, setShowWeather] = useState(true);

  return (
    <div className="flex flex-col p-4 space-y-4 pb-20">
      <h1 className="text-2xl font-bold">Plan Your Ride</h1>

      {/* Map Placeholder - In a real implementation, this would be a Google Maps component */}
      <div className="relative rounded-lg overflow-hidden h-64 glass-card border border-tripplin-purple/30">
        <div className="absolute inset-0 flex items-center justify-center bg-tripplin-dark/10">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Map would be displayed here</p>
            <p className="text-xs text-muted-foreground mt-1">Using Google Maps API</p>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-3 right-3 space-y-2">
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
          <Card className="glass-card">
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Highway Dhaba</h3>
                <p className="text-xs text-muted-foreground">Food & Beverages • 30 min from start</p>
              </div>
              <Button variant="outline" size="sm" className="h-7">Add</Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Viewpoint Rest Area</h3>
                <p className="text-xs text-muted-foreground">Scenic View • 1h 15m from start</p>
              </div>
              <Button variant="outline" size="sm" className="h-7">Add</Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-3 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Petrol Pump</h3>
                <p className="text-xs text-muted-foreground">Refuel • 2h from start</p>
              </div>
              <Button variant="outline" size="sm" className="h-7">Add</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanRide;
