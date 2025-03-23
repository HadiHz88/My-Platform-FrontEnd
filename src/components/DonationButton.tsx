
import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DonationButton = () => {
  const [amount, setAmount] = useState('5');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your donation!",
        description: `Your support of $${amount} is greatly appreciated.`,
      });
      setIsLoading(false);
    }, 1500);
    
    // Here you would normally process the actual payment
    // and record the donation in your backend
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Coffee className="w-4 h-4" />
          <span>Buy me a coffee</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support My Work</DialogTitle>
          <DialogDescription>
            Your donation helps me create more free educational content and maintain this platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDonate} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Your Name (Optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Keep up the good work!"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Donate"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Payments are securely processed. Your information is never stored.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationButton;
