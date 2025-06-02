
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    sessions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.sessions) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate a mock student ID
    const studentId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Store student data in localStorage for demo
    const studentData = {
      ...formData,
      studentId,
      attendedSessions: 0,
      registrationDate: new Date().toISOString(),
      lastCheckin: null
    };
    
    localStorage.setItem(`student_${studentId}`, JSON.stringify(studentData));
    
    toast({
      title: "Registration Successful!",
      description: "Redirecting to your wallet card...",
    });

    setTimeout(() => {
      navigate(`/wallet-preview/${studentId}`);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center bg-green-600 text-white rounded-t-lg">
              <div className="mx-auto bg-white p-3 rounded-full w-fit mb-4">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Student Registration</CardTitle>
              <p className="text-green-100">Sign up to get your digital wallet card</p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessions" className="text-gray-700 font-medium">
                    Number of Sessions *
                  </Label>
                  <Select value={formData.sessions} onValueChange={(value) => handleChange("sessions", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select session package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Sessions - $150</SelectItem>
                      <SelectItem value="10">10 Sessions - $280</SelectItem>
                      <SelectItem value="15">15 Sessions - $400</SelectItem>
                      <SelectItem value="20">20 Sessions - $500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-lg">
                  Register & Get Wallet Card
                </Button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-700 mb-2">
                  <Smartphone className="h-5 w-5 mr-2" />
                  <span className="font-medium">What happens next?</span>
                </div>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• You'll get a digital wallet card</li>
                  <li>• Add it to Apple or Google Wallet</li>
                  <li>• Use the barcode to check-in at classes</li>
                  <li>• Track your attendance progress visually</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
