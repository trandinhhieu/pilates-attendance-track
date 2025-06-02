
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, ScanLine, Shield, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <GraduationCap className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            EduTrack
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern attendance tracking system with Apple & Google Wallet integration. 
            Streamline student check-ins and track attendance effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Student Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Register and get your digital wallet card
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/register">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                  Register Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-4">
                <ScanLine className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Reception Desk</CardTitle>
              <CardDescription className="text-gray-600">
                Scan student cards for check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/checkin">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg">
                  Check-in System
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Admin Panel</CardTitle>
              <CardDescription className="text-gray-600">
                Manage students and track attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/admin">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                  Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-md w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Register</h3>
              <p className="text-gray-600 text-sm">Students sign up with their details</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-md w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Wallet Card</h3>
              <p className="text-gray-600 text-sm">Download digital card to Apple/Google Wallet</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-md w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Scan & Check-in</h3>
              <p className="text-gray-600 text-sm">Show card barcode for quick attendance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-md w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">Monitor attendance and remaining sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
