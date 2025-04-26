import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, CheckCircle } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { contactApi } from "../services/api";

const ContactPage: React.FC = () => {
  const { agentUsername } = useParams<{ agentUsername: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    destination: "",
    travelDate: "",
    numberOfTravelers: "",
    budget: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agentExists, setAgentExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // For now, we'll assume the agent exists if there's a username
    // In a real app, you'd want to verify this with the backend
    if (!agentUsername) {
      setAgentExists(false);
      navigate("/");
    }
  }, [agentUsername, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.travelDate.trim()) {
      newErrors.travelDate = "Travel date is required";
    }

    if (!formData.numberOfTravelers.trim()) {
      newErrors.numberOfTravelers = "Number of travelers is required";
    }

    if (!formData.budget.trim()) {
      newErrors.budget = "Budget is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !agentUsername) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Submitting form data:', {
        ...formData,
        agentUsername,
        destination: formData.destination,
        travelDate: formData.travelDate,
        numberOfTravelers: formData.numberOfTravelers,
        budget: formData.budget
      });
      
      // Submit the contact form with the agent's username
      const response = await contactApi.submit({
        ...formData,
        agentUsername,
        destination: formData.destination,
        travelDate: formData.travelDate,
        numberOfTravelers: formData.numberOfTravelers,
        budget: formData.budget
      });
      
      console.log('Form submission response:', response);
      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        setErrors({ 
          form: error.message || "Failed to submit form. Please try again." 
        });
      } else {
        setErrors({ 
          form: "An unexpected error occurred. Please try again." 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!agentExists) {
    return (
      <MainLayout>
        <div className="min-h-screen py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Agent Not Found</h2>
              <p className="text-slate-600 mb-6">
                The agent you're looking for doesn't exist or isn't available.
              </p>
              <Button onClick={() => navigate("/")} variant="primary">
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isSubmitted) {
    return (
      <MainLayout>
        <div className="min-h-screen py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-green-100 p-6 rounded-full inline-block mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Thank You!</h2>
              <p className="text-slate-600 mb-6">
                Your contact information has been submitted successfully. Our admin and your referring agent will contact you shortly.
              </p>
              <Button onClick={() => navigate("/")} variant="primary">
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="relative">
        <div 
          className="h-[300px] relative bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center text-white p-4 h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-xl">
              Let us help you plan your perfect trip
            </p>
          </div>
        </div>

        <div className="relative z-20 py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-4 px-6">
                <div className="flex items-center justify-center text-white">
                  <MessageSquare className="h-6 w-6 mr-2" />
                  <h2 className="text-xl font-bold">Get in Touch</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="mb-6 text-slate-600">
                  You're being referred by our agent: <span className="font-semibold text-teal-700">{agentUsername}</span>
                </p>
                
                {errors.form && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.form}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.name}
                    required
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    error={errors.email}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    error={errors.phone}
                    required
                  />
                  
                  <Input
                    label="Destination"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Where would you like to go?"
                    error={errors.destination}
                    required
                  />

                  <Input
                    label="Travel Date"
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    error={errors.travelDate}
                    required
                  />

                  <Input
                    label="Number of Travelers"
                    type="number"
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleChange}
                    placeholder="How many people are traveling?"
                    error={errors.numberOfTravelers}
                    required
                  />

                  <Input
                    label="Budget"
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="What's your budget range?"
                    error={errors.budget}
                    required
                  />
                  
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans..."
                      className={`px-4 py-2.5 bg-white border ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-slate-300 focus:ring-teal-500 focus:border-teal-500"
                      } rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 w-full`}
                      required
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    className="mt-2"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;