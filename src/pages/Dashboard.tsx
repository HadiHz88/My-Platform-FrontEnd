
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from '@/components/forms/ProfileForm';
import Layout from '@/components/Layout';

// Define the ProfileData type from ProfilePage.tsx to ensure consistency
type ProfileData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatarUrl: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    description: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
};

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Call GET /api/profile or similar endpoint to fetch user profile data
const mockProfileData: ProfileData = {
  fullName: "Hadi Hijazi",
  title: "Full Stack Developer & CS Student",
  email: "hadi@example.com",
  phone: "+961 78 998 530",
  location: "Dahye, Beirut",
  bio: "I'm a passionate software developer and computer science student with a focus on web technologies and software engineering. I love building elegant solutions to complex problems.",
  avatarUrl: "/placeholder.svg",
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com"
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Lebanese University",
      startYear: "2020",
      endYear: "Present",
      description: "GPA: 3.8/4.0. Coursework includes data structures, algorithms, databases, and web development."
    },
    {
      degree: "Associate Degree in Programming",
      institution: "Community College",
      startYear: "2018",
      endYear: "2020",
      description: "Foundations of programming and computer science."
    }
  ],
  experience: [
    {
      position: "Junior Full Stack Developer",
      company: "Tech Solutions Inc.",
      startDate: "2022-01",
      endDate: "Present",
      description: "Working on web applications using React, Laravel, and PostgreSQL."
    },
    {
      position: "Web Development Intern",
      company: "Startup Hub",
      startDate: "2021-06",
      endDate: "2021-12",
      description: "Assisted in developing front-end components and integrating APIs."
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", 
    "PHP", "Laravel", "MySQL", "PostgreSQL", 
    "HTML/CSS", "Tailwind CSS", "Git", "Docker"
  ]
};

const Dashboard = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // FIXME: API INTEGRATION
  // TODO: Replace this mock data fetch with your API call
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      
      try {
        // TODO: Replace with actual API call
        // Example: const response = await fetch('/api/profile');
        // const data = await response.json();
        // setProfileData(data);
        
        // Delete this mock delay and data setting when integrating real API
        setTimeout(() => {
          setProfileData(mockProfileData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        // TODO: Handle API errors
        console.error('Failed to fetch profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again later.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock save with your API call
  const handleSave = (updatedProfile: ProfileData) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call to update profile
    // Example: 
    // const updateProfile = async () => {
    //   try {
    //     const response = await fetch('/api/profile', {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(updatedProfile)
    //     });
    //     const data = await response.json();
    //     setProfileData(data);
    //     toast({ title: "Profile updated", description: "Your profile has been updated successfully." });
    //   } catch (error) {
    //     console.error('Failed to update profile:', error);
    //     toast({ 
    //       title: "Error", 
    //       description: "Failed to update profile. Please try again later.",
    //       variant: "destructive"
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // updateProfile();

    // Delete this mock timeout when integrating real API
    setTimeout(() => {
      setProfileData(updatedProfile);
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 800);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your dashboard!
          </p>
        </div>

        <div className="border rounded-lg p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading profile...</p>
            </div>
          ) : (
            profileData && <ProfileForm data={profileData} onSubmit={handleSave} />
          )}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Dashboard;
