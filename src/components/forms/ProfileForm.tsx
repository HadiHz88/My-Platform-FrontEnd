
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileData } from "@/pages/dashboard/ProfilePage";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(5, "Phone number must be at least 5 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  profileImageUrl: z.string().url("Please enter a valid URL."),
  githubUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  linkedinUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  twitterUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  websiteUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

interface ProfileFormProps {
  data: ProfileData;
  onSubmit: (values: any) => void;
}

const ProfileForm = ({ data, onSubmit }: ProfileFormProps) => {
  // Map ProfileData to form values
  const defaultValues = {
    name: data.fullName,
    title: data.title,
    bio: data.bio,
    email: data.email,
    phone: data.phone,
    location: data.location,
    profileImageUrl: data.avatarUrl,
    githubUrl: data.links.github,
    linkedinUrl: data.links.linkedin,
    twitterUrl: data.links.twitter,
    websiteUrl: data.links.website,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Map form values back to ProfileData structure
    const updatedProfile: ProfileData = {
      fullName: values.name,
      title: values.title,
      bio: values.bio,
      email: values.email,
      phone: values.phone,
      location: values.location,
      avatarUrl: values.profileImageUrl,
      links: {
        github: values.githubUrl || '',
        linkedin: values.linkedinUrl || '',
        twitter: values.twitterUrl || '',
        website: values.websiteUrl || '',
      },
      education: data.education,
      experience: data.experience,
      skills: data.skills,
    };
    
    onSubmit(updatedProfile);
    toast.success("Profile updated successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={form.watch("profileImageUrl")} alt="Profile" />
            <AvatarFallback>{form.watch("name").substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <FormField
            control={form.control}
            name="profileImageUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/avatar.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Links</h3>
          
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/yourusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/yourusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/yourusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
