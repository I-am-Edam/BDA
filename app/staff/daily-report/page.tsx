"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Upload, Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  representativeName: z.string().min(2, "Representative name is required"),
  contactNumber: z.string().min(10, "Valid contact number is required"),
  email: z.string().email("Valid email is required"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  visitSummary: z.string().min(50, "Please provide a detailed summary"),
  storeType: z.string().min(2, "Store type is required"),
});

export default function DailyReport() {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      ownerName: "",
      representativeName: "",
      contactNumber: "",
      email: "",
      visitSummary: "",
      storeType: "",
    },
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, use a geocoding service to get the address
        setLocation({
          lat: latitude,
          lng: longitude,
          address: "Location captured successfully",
        });
        toast({
          title: "Location captured",
          description: "Your current location has been recorded.",
        });
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocuments(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // In a real app, make API call to save report
      console.log({ ...data, images, documents, location });
      toast({
        title: "Report submitted",
        description: "Your daily report has been submitted successfully.",
      });
      form.reset();
      setImages([]);
      setDocuments([]);
      setLocation(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Daily Store Visit Report</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter store name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Retail, Wholesale" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter owner's name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="representativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter representative's name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="Enter contact number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div>
                <FormLabel>Location</FormLabel>
                <div className="flex gap-4 items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Capture Location
                  </Button>
                  {location && (
                    <span className="text-sm text-muted-foreground">
                      Location captured successfully
                    </span>
                  )}
                </div>
              </div>

              <div>
                <FormLabel>Store Photos</FormLabel>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("store-photos")?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photos
                    </Button>
                    <input
                      id="store-photos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Store photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <FormLabel>Signed Documents</FormLabel>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("signed-docs")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                    <input
                      id="signed-docs"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      onChange={handleDocumentUpload}
                    />
                  </div>
                  {documents.length > 0 && (
                    <div className="flex gap-2">
                      {documents.map((_, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-secondary rounded-full text-sm"
                        >
                          Document {index + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="visitSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visit Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Provide a detailed summary of your visit..."
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}