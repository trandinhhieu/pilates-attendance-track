
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Smartphone, CheckCircle2, Circle } from "lucide-react";
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

  // Generate attendance progress icons
  const totalSessions = parseInt(studentData.sessions);
  const attendedSessions = studentData.attendedSessions || 0;
  const progressIcons = Array.from({ length: totalSessions }, (_, index) => (
    <div key={index} className="flex items-center justify-center">
      {index < attendedSessions ? (
        <CheckCircle2 className="h-3 w-3 text-green-500 fill-current" />
      ) : (
        <Circle className="h-3 w-3 text-gray-300" />
      )}
    </div>
  ));

  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 6);

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
              
              {/* Apple Wallet Style Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white shadow-lg max-w-sm mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Recharged</h3>
                    <p className="text-blue-100 text-sm">Training Center</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100">Student ID</p>
                    <p className="font-mono text-sm">{studentData.studentId}</p>
                  </div>
                </div>

                {/* Student Info */}
                <div className="mb-4">
                  <h4 className="text-xl font-bold">{studentData.fullName}</h4>
                  <p className="text-blue-100 text-sm">{studentData.email}</p>
                </div>

                {/* Sessions Info */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-blue-100">Sessions</p>
                    <p className="text-lg font-bold">{attendedSessions} / {totalSessions}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100">Expires</p>
                    <p className="text-sm">{expirationDate.toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Visual Attendance Tracker */}
                <div className="mb-4">
                  <p className="text-xs text-blue-100 mb-2">Attendance Progress</p>
                  <div className={`grid gap-1 ${totalSessions <= 10 ? 'grid-cols-10' : totalSessions <= 15 ? 'grid-cols-15' : 'grid-cols-20'}`}>
                    {progressIcons}
                  </div>
                </div>

                {/* Barcode Area */}
                <div className="bg-white rounded p-3 text-center">
                  <div className="bg-gray-900 h-16 rounded mb-2 flex items-center justify-center">
                    <div className="text-white text-xs font-mono">
                      ||||| |||| ||||| |||||| |||||
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs font-mono">{studentData.studentId}</p>
                  <p className="text-gray-500 text-xs">CODE128</p>
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

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
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
