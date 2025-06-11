
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";

const WalletCardPreview = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    if (studentId) {
      const data = localStorage.getItem(`student_${studentId}`);
      if (data) {
        setStudentData(JSON.parse(data));
      }
    }
  }, [studentId]);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Register New Student
          </Link>
        </div>
      </div>
    );
  }

  const totalSessions = parseInt(studentData.sessions);
  const attendedSessions = studentData.attendedSessions || 0;

  // Custom SVG icon component for sessions
  const SessionIcon = ({ filled }: { filled: boolean }) => (
    <svg 
      fill={filled ? "#8B4513" : "#D3D3D3"} 
      height="24px" 
      width="24px" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="-351 153 256 256"
      className="transition-colors duration-300"
    >
      <circle cx="-222.3" cy="188.5" r="31.1"></circle>
      <path d="M-106.6,332.4c-0.4-0.6-0.9-1.1-1.4-1.6l-35.3-32.8l-22.8-49c-6.2-12.5-15.2-20.3-28.6-20.3h-57.5
               c-13.5,0-22.4,7.8-28.6,20.3l-22.8,49l-35.3,32.8c-0.5,0.5-1,1.1-1.4,1.6c-3.6,3.1-5.9,7.7-5.9,12.8c0,9.3,7.6,16.9,16.9,16.9
               c5.5,0,10.3-2.6,13.4-6.7c0.3-0.2,0.6-0.5,0.8-0.7l37.4-34.8c1.4-1.4,2.5-3,3.3-4.8l11.9-25.5l-0.6,45l-52.2,28.4
               c-9.5,5.2-14,16.4-10.6,26.7c3.4,10.3,13.6,16.7,24.3,15.2l78.1-20.2l78.1,20.2c10.7,1.5,21-4.9,24.3-15.2
               c3.4-10.3-1.1-21.5-10.6-26.7l-52.2-28.5l-0.6-45l11.9,25.5c0.8,1.8,2,3.4,3.3,4.8l37.4,34.8c0.3,0.3,0.5,0.5,0.8,0.7
               c3.1,4,7.9,6.7,13.4,6.7c9.3,0,16.9-7.6,16.9-16.9C-100.7,340-103,335.5-106.6,332.4z"></path>
    </svg>
  );

  // Generate attendance progress icons with responsive layout
  const generateProgressIcons = () => {
    const icons = [];
    for (let i = 0; i < totalSessions; i++) {
      icons.push(
        <div key={i} className="flex items-center justify-center p-1">
          <SessionIcon filled={i < attendedSessions} />
        </div>
      );
    }
    return icons;
  };

  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 6);
  const formattedExpirationDate = expirationDate.toLocaleDateString('en-GB');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-white p-4 rounded-full shadow-lg w-fit mx-auto mb-4">
              <Smartphone className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Digital Wallet Card</h1>
            <p className="text-xl text-gray-600">Add this card to your Apple or Google Wallet</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Wallet Card Preview */}
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Card Preview</h2>
              
              {/* Apple/Google Wallet Style Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg max-w-sm mx-auto border border-orange-200">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-amber-900">Pilates Studio By R...</h3>
                    <p className="text-amber-700 text-sm font-medium">Training Center</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600 font-semibold">VALID UNTIL</p>
                    <p className="text-sm font-bold text-amber-900">{formattedExpirationDate}</p>
                  </div>
                </div>

                {/* Student Info */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-amber-900">{studentData.fullName}</h4>
                  <p className="text-amber-700 text-sm">ID: {studentData.studentId}</p>
                </div>

                {/* Service Info */}
                <div className="mb-6">
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">SERVICE</p>
                  <p className="text-lg font-bold text-amber-900">Pilates Training</p>
                </div>

                {/* Attendance Progress Icons */}
                <div className="mb-6">
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide mb-3">
                    Sessions Progress ({attendedSessions}/{totalSessions})
                  </p>
                  <div className={`grid gap-1 justify-center ${
                    totalSessions <= 5 ? 'grid-cols-5' :
                    totalSessions <= 10 ? 'grid-cols-5' :
                    totalSessions <= 15 ? 'grid-cols-5' :
                    'grid-cols-5'
                  }`}>
                    {generateProgressIcons()}
                  </div>
                </div>

                {/* Barcode Section */}
                <div className="bg-white rounded-lg p-4 text-center border border-amber-200">
                  <div className="bg-gray-900 h-16 rounded mb-3 flex items-center justify-center">
                    <div className="text-white text-xs font-mono tracking-wider">
                      |||||| |||| ||||| |||||| |||||
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs font-mono mb-1">{studentData.studentId}</p>
                  <p className="text-gray-500 text-xs">Tap ••• for details</p>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Add to Wallet</h3>
                  
                  <div className="space-y-4">
                    <Button className="w-full h-14 bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-3">
                      <div className="bg-white rounded p-1">
                        <div className="w-6 h-6 bg-black rounded"></div>
                      </div>
                      <span className="text-lg">Add to Apple Wallet</span>
                    </Button>

                    <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-3">
                      <Download className="h-6 w-6" />
                      <span className="text-lg">Add to Google Wallet</span>
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">📱 How to use your card:</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Open your Wallet app to find your card</li>
                      <li>• Show the barcode at the reception desk</li>
                      <li>• Your attendance will be automatically tracked</li>
                      <li>• Progress updates in real-time on your card</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full Name:</span>
                      <span className="font-medium">{studentData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{studentData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{studentData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Sessions:</span>
                      <span className="font-medium">{studentData.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{studentData.studentId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCardPreview;
