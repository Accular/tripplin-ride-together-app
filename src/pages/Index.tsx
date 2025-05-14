
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="flex flex-col p-4 space-y-6">
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
        asChild
      >
        <Link to="/plan">
          <span className="font-bold">Plan a Ride</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>

      {/* Suggested Routes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Suggested Routes</h2>
          <Link to="/plan" className="text-sm text-tripplin-purple">View all</Link>
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
    </div>
  );
};

export default Index;
