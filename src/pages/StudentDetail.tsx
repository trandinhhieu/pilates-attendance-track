
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/AdminLayout";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Smartphone,
  BarChart3
} from "lucide-react";

const StudentDetail = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  useEffect(() => {
    if (studentId) {
      loadStudentData();
    }
  }, [studentId]);

  const loadStudentData = () => {
    const studentData = localStorage.getItem(`student_${studentId}`);
    if (studentData) {
      setStudent(JSON.parse(studentData));
    }

    // Load attendance history
    const logs = JSON.parse(localStorage.getItem('attendanceLogs') || '[]');
    const studentLogs = logs.filter((log: any) => log.studentId === studentId);
    setAttendanceHistory(studentLogs);
  };

  if (!student) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Not Found</h1>
          <Link to="/admin/students" className="text-blue-600 hover:text-blue-700">
            ← Back to Students List
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const remainingSessions = parseInt(student.sessions) - (student.attendedSessions || 0);
  const attendanceRate = Math.round(((student.attendedSessions || 0) / parseInt(student.sessions)) * 100);
  const progressPercentage = Math.min(((student.attendedSessions || 0) / parseInt(student.sessions)) * 100, 100);

  const generateProgressIcons = () => {
    const totalSessions = parseInt(student.sessions);
    const attendedSessions = student.attendedSessions || 0;
    
    return Array.from({ length: totalSessions }, (_, index) => (
      <div key={index} className="flex items-center justify-center">
        {index < attendedSessions ? (
          <CheckCircle2 className="h-4 w-4 text-green-500 fill-current" />
        ) : (
          <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
        )}
      </div>
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/admin/students">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Students
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{student.fullName}</h1>
            <p className="text-gray-600">Student Details & Attendance History</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Student Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{student.fullName}</h2>
                  <Badge variant="outline" className="mt-2">
                    ID: {student.studentId}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">
                      Registered: {new Date(student.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                  {student.lastCheckin && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-900">
                        Last check-in: {new Date(student.lastCheckin).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Resend Wallet Card
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Overview & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{student.attendedSessions || 0}</div>
                  <div className="text-gray-600">Sessions Attended</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{remainingSessions}</div>
                  <div className="text-gray-600">Remaining Sessions</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{attendanceRate}%</div>
                  <div className="text-gray-600">Attendance Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Progress Tracker */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Attendance Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{student.attendedSessions || 0} of {student.sessions} sessions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">Session Tracker</p>
                  <div className={`grid gap-2 ${parseInt(student.sessions) <= 10 ? 'grid-cols-10' : parseInt(student.sessions) <= 15 ? 'grid-cols-15' : 'grid-cols-20'}`}>
                    {generateProgressIcons()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance History */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Attendance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {attendanceHistory.length > 0 ? (
                  <div className="space-y-3">
                    {attendanceHistory.map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Session #{log.sessionNumber}</h4>
                            <p className="text-sm text-gray-600">Checked in by {log.receptionist}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(log.checkinTime).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(log.checkinTime).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No attendance history found</p>
                    <p className="text-sm">Attendance records will appear here after check-ins</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentDetail;
