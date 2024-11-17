"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/constants";
import { AdminProfile } from "@/types";
import { ImageUpload } from "@/components/admin/image-upload";

export default function AdminOnboarding() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState<Partial<AdminProfile>>({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    idNumber: "",
    emailAddress: session?.user?.email || "",
    designation: "",
    supervisor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, make API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Profile created",
        description: "Your admin profile has been created successfully.",
      });
      
      router.push("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Complete Your Admin Profile</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Please provide your details to complete the setup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <ImageUpload
              value={profileImage}
              onChange={setProfileImage}
              className="w-32 h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={profile.middleName}
                onChange={(e) =>
                  setProfile({ ...profile, middleName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={profile.phoneNumber}
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={profile.country}
                onValueChange={(value) =>
                  setProfile({ ...profile, country: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNumber">ID/Passport Number</Label>
              <Input
                id="idNumber"
                value={profile.idNumber}
                onChange={(e) =>
                  setProfile({ ...profile, idNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                value={profile.emailAddress}
                onChange={(e) =>
                  setProfile({ ...profile, emailAddress: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={profile.designation}
                onChange={(e) =>
                  setProfile({ ...profile, designation: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="supervisor">Immediate Supervisor</Label>
              <Input
                id="supervisor"
                value={profile.supervisor}
                onChange={(e) =>
                  setProfile({ ...profile, supervisor: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Profile..." : "Complete Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}