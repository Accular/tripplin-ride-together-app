
import React, { useState } from 'react';
import { Calendar, Clock, Group } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data for groups - In a real app, this would come from an API
const userGroups = [
  { id: '1', name: 'Weekend Riders' },
  { id: '2', name: 'City Explorers' },
  { id: '3', name: 'Mountain Bikers' },
];

const rideFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  startLocation: z.string().min(3, "Start location is required"),
  endLocation: z.string().min(3, "End location is required"),
  isPlannedRide: z.boolean().default(false),
  startDate: z.date().optional(),
  startTime: z.string().optional(),
  endDate: z.date().optional(),
  endTime: z.string().optional(),
  groupId: z.string().optional(),
  isGroupRide: z.boolean().default(false),
});

type RideFormValues = z.infer<typeof rideFormSchema>;

const RideCreationForm = () => {
  const [isPlannedRide, setIsPlannedRide] = useState(false);
  const [isGroupRide, setIsGroupRide] = useState(false);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RideFormValues>({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      title: "",
      startLocation: "",
      endLocation: "",
      isPlannedRide: false,
      isGroupRide: false,
    }
  });

  const onSubmit = (data: RideFormValues) => {
    console.log("Ride data:", data);
    // Here you would typically send this data to an API
    toast.success(`${isPlannedRide ? 'Planned ride' : 'Ride now'} created successfully!`);
    navigate('/');
  };

  const handleRideTypeToggle = (checked: boolean) => {
    setIsPlannedRide(checked);
    form.setValue("isPlannedRide", checked);
    
    if (!checked) {
      // Reset date and time fields when switching to "Ride Now"
      form.setValue("startDate", undefined);
      form.setValue("endDate", undefined);
      form.setValue("startTime", undefined);
      form.setValue("endTime", undefined);
    }
  };

  const handleGroupRideToggle = (checked: boolean) => {
    setIsGroupRide(checked);
    form.setValue("isGroupRide", checked);
    
    if (!checked) {
      // Reset group selection when toggling off group ride
      form.setValue("groupId", undefined);
    }
  };

  const handleCreateNewGroup = () => {
    setShowCreateGroupDialog(false);
    // In a real app, you would navigate to the group creation page
    navigate('/community');
    toast.info('Redirecting to create a new group');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Ride</h1>
      
      <div className="flex items-center space-x-2 mb-6">
        <Switch 
          id="ride-type" 
          checked={isPlannedRide} 
          onCheckedChange={handleRideTypeToggle} 
        />
        <Label htmlFor="ride-type" className="text-sm font-medium">
          {isPlannedRide ? "Planned Ride" : "Ride Now"}
        </Label>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ride Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ride title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter starting location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPlannedRide && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select start date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="Select start time"
                            {...field}
                          />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select end date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="Select end time"
                            {...field}
                          />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {/* Group Ride Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="group-ride" 
                checked={isGroupRide} 
                onCheckedChange={handleGroupRideToggle} 
              />
              <Label htmlFor="group-ride" className="text-sm font-medium">
                Group Ride
              </Label>
            </div>

            {isGroupRide && (
              <div className="space-y-4">
                {userGroups.length > 0 ? (
                  <FormField
                    control={form.control}
                    name="groupId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Group</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {userGroups.map(group => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="bg-muted p-4 rounded-md text-center">
                    <p className="mb-2">You aren't part of any groups yet</p>
                    <Button 
                      variant="outline" 
                      onClick={handleCreateNewGroup}
                      className="flex items-center"
                    >
                      <Group className="mr-2 h-4 w-4" />
                      Create New Group
                    </Button>
                  </div>
                )}

                <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Group className="mr-2 h-4 w-4" />
                      Create New Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Group</DialogTitle>
                    </DialogHeader>
                    <div className="pt-4">
                      <p className="text-muted-foreground">
                        Creating a new group will redirect you to the community page.
                      </p>
                      <Button 
                        className="mt-4 w-full" 
                        onClick={handleCreateNewGroup}
                      >
                        Continue to Group Creation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full mt-6 bg-tripplin-gradient">
            {isPlannedRide ? "Schedule Ride" : "Start Ride Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RideCreationForm;
