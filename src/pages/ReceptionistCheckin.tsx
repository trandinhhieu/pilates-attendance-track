
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, ScanLine, User, Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReceptionistCheckin = () => {
  const [scanInput, setScanInput] = useState("");
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!scanInput.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a student ID or scan a barcode.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);

    // Simulate scanning delay
    setTimeout(() => {
      const studentData = localStorage.getItem(`student_${scanInput.toUpperCase()}`);
      
      if (studentData) {
        const student = JSON.parse(studentData);
        setStudentInfo(student);
      } else {
        toast({
          title: "Student Not Found",
          description: "No student found with this ID. Please check and try again.",
          variant: "destructive"
        });
        setStudentInfo(null);
      }
      
      setIsScanning(false);
    }, 1000);
  };

  const handleCheckin = () => {
    if (!studentInfo) return;

    const updatedStudent = {
      ...studentInfo,
      attendedSessions: (studentInfo.attendedSessions || 0) + 1,
      lastCheckin: new Date().toISOString()
    };

    // Save updated student data
    localStorage.setItem(`student_${studentInfo.studentId}`, JSON.stringify(updatedStudent));
    
    // Save attendance log
    const attendanceLog = {
      studentId: studentInfo.studentId,
      studentName: studentInfo.fullName,
      checkinTime: new Date().toISOString(),
      receptionist: "Reception Staff",
      sessionNumber: updatedStudent.attendedSessions
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('attendanceLogs') || '[]');
    existingLogs.unshift(attendanceLog);
    localStorage.setItem('attendanceLogs', JSON.stringify(existingLogs.slice(0, 100))); // Keep last 100 logs

    setStudentInfo(updatedStudent);
    
    toast({
      title: "Check-in Successful! ✅",
      description: `${studentInfo.fullName} has been checked in for session ${updatedStudent.attendedSessions}.`,
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setScanInput("");
      setStudentInfo(null);
    }, 3000);
  };

  const getRemainingSession = () => {
    if (!studentInfo) return 0;
    return parseInt(studentInfo.sessions) - (studentInfo.attendedSessions || 0);
  };

  const getAttendancePercentage = () => {
    if (!studentInfo) return 0;
    return Math.round(((studentInfo.attendedSessions || 0) / parseInt(studentInfo.sessions)) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="text-center bg-orange-600 text-white rounded-t-lg">
              <div className="mx-auto bg-white p-3 rounded-full w-fit mb-4">
                <ScanLine className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Student Check-in System</CardTitle>
              <p className="text-orange-100">Scan student wallet cards for attendance tracking</p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="scanInput" className="text-gray-700 font-medium">
                    Student ID or Barcode
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      id="scanInput"
                      type="text"
                      placeholder="Enter student ID or scan barcode..."
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      className="h-12 text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    />
                    <Button 
                      onClick={handleScan} 
                      disabled={isScanning}
                      className="h-12 px-8 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      {isScanning ? "Scanning..." : "Scan"}
                    </Button>
                  </div>
                </div>

                {/* Student Information Display */}
                {studentInfo && (
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-600 p-3 rounded-full">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{studentInfo.fullName}</h3>
                            <p className="text-gray-600">{studentInfo.email}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          ID: {studentInfo.studentId}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {studentInfo.attendedSessions || 0}
                          </div>
                          <div className="text-gray-600">Sessions Attended</div>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {getRemainingSession()}
                          </div>
                          <div className="text-gray-600">Sessions Remaining</div>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {getAttendancePercentage()}%
                          </div>
                          <div className="text-gray-600">Attendance Rate</div>
                        </div>
                      </div>

                      {studentInfo.lastCheckin && (
                        <div className="flex items-center gap-2 text-gray-600 mb-6">
                          <Clock className="h-4 w-4" />
                          <span>Last check-in: {new Date(studentInfo.lastCheckin).toLocaleString()}</span>
                        </div>
                      )}

                      <Button 
                        onClick={handleCheckin}
                        className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
                        disabled={getRemainingSession() <= 0}
                      >
                        {getRemainingSession() <= 0 ? 'No Sessions Remaining' : 'Confirm Check-in'}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {!studentInfo && !isScanning && (
                  <div className="text-center py-12 text-gray-500">
                    <ScanLine className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Enter a student ID or scan their wallet card to begin</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Instructions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Check-in Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">For Manual Entry:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ask student for their Student ID</li>
                    <li>• Type the ID in the input field</li>
                    <li>• Click "Scan" to lookup student</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">For Barcode Scan:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Student shows wallet card barcode</li>
                    <li>• Scan barcode with scanner device</li>
                    <li>• System auto-fills student ID</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistCheckin;
