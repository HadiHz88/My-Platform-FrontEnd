
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowRight, Code, Layout as LayoutIcon, Database, Lightbulb, Server, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Service offerings data
const services = [
  {
    id: 1,
    title: "Web Development",
    icon: Code,
    description: "Custom website and web application development with modern frameworks and technologies.",
    features: [
      "Responsive design for all devices",
      "Frontend and backend development",
      "E-commerce solutions",
      "Performance optimization"
    ],
    price: "$1,500+",
    popular: true
  },
  {
    id: 2,
    title: "UI/UX Design",
    icon: LayoutIcon,
    description: "User-focused design services to create intuitive and engaging digital experiences.",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Usability testing"
    ],
    price: "$1,200+",
    popular: false
  },
  {
    id: 3,
    title: "Database Solutions",
    icon: Database,
    description: "Design and implementation of efficient database architectures for your applications.",
    features: [
      "Database design and modeling",
      "Performance optimization",
      "Data migration services",
      "Database maintenance"
    ],
    price: "$800+",
    popular: false
  },
  {
    id: 4,
    title: "Consulting",
    icon: Lightbulb,
    description: "Expert advice and strategies to help your digital projects succeed.",
    features: [
      "Technology stack recommendations",
      "Architecture planning",
      "Project scoping and planning",
      "Digital transformation guidance"
    ],
    price: "$120/hour",
    popular: false
  },
  {
    id: 5,
    title: "Backend Development",
    icon: Server,
    description: "Robust server-side solutions for your application needs.",
    features: [
      "API development",
      "Authentication & authorization",
      "Cloud deployment",
      "Serverless functions"
    ],
    price: "$1,300+",
    popular: false
  },
  {
    id: 6,
    title: "Training & Workshops",
    icon: Users,
    description: "Knowledge transfer and skill development for teams and individuals.",
    features: [
      "Custom training programs",
      "One-on-one mentoring",
      "Team workshops",
      "Code reviews and best practices"
    ],
    price: "$500+",
    popular: false
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "CEO, Tech Innovations",
    content: "Working with this team was a game-changer for our business. They delivered a sophisticated web application that exceeded our expectations and has significantly improved our operational efficiency."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Founder, StartupHub",
    content: "The consulting services provided valuable insights that helped us make critical technology decisions. Their expertise saved us time and resources by steering us in the right direction from the start."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Marketing Director, GrowthCo",
    content: "Our e-commerce site redesign resulted in a 45% increase in conversions. The attention to user experience and performance optimization made all the difference in our online sales."
  }
];

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert solutions for your digital needs with a focus on quality, innovation, and results.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className={`
                transition-all duration-500 hover:shadow-lg animate-fade-in
                ${service.popular ? 'border-primary shadow-md' : ''}
              `}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="text-2xl font-bold mb-4">{service.price}</div>
                <Button className="w-full group transition-all duration-300 hover:scale-105">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Process Section */}
        <div className="mb-16 animate-fade-in" style={{animationDelay: "0.5s"}}>
          <h2 className="text-3xl font-bold mb-8 text-center">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-muted-foreground">Understanding your requirements, goals, and constraints.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning</h3>
              <p className="text-muted-foreground">Creating a detailed roadmap and technical specifications.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Execution</h3>
              <p className="text-muted-foreground">Building your solution with regular updates and feedback.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground">Ongoing maintenance and assistance after delivery.</p>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-16 animate-fade-in" style={{animationDelay: "0.6s"}}>
          <h2 className="text-3xl font-bold mb-8 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 inline-block text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center animate-fade-in" style={{animationDelay: "0.7s"}}>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="transition-all duration-300 hover:scale-105">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
