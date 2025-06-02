
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { Search, Filter, Eye, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterStatus]);

  const loadStudents = () => {
    const studentsList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('student_')) {
        const studentData = JSON.parse(localStorage.getItem(key) || '{}');
        studentsList.push(studentData);
      }
    }
    setStudents(studentsList);
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(student => {
        const remainingSessions = parseInt(student.sessions) - (student.attendedSessions || 0);
        const attendanceRate = ((student.attendedSessions || 0) / parseInt(student.sessions)) * 100;
        
        switch (filterStatus) {
          case "active":
            return remainingSessions > 0 && attendanceRate >= 50;
          case "at-risk":
            return remainingSessions > 0 && attendanceRate < 50;
          case "completed":
            return remainingSessions <= 0;
          default:
            return true;
        }
      });
    }

    setFilteredStudents(filtered);
  };

  const getStudentStatus = (student: any) => {
    const remainingSessions = parseInt(student.sessions) - (student.attendedSessions || 0);
    const attendanceRate = ((student.attendedSessions || 0) / parseInt(student.sessions)) * 100;

    if (remainingSessions <= 0) {
      return { status: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle2 };
    } else if (attendanceRate < 50) {
      return { status: "At Risk", color: "bg-red-100 text-red-800", icon: AlertTriangle };
    } else {
      return { status: "Active", color: "bg-blue-100 text-blue-800", icon: Users };
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-600 mt-2">Manage and track all registered students</p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {students.length} Total Students
          </Badge>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or student ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Students Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length > 0 ? (
              <div className="space-y-4">
                {filteredStudents.map((student) => {
                  const studentStatus = getStudentStatus(student);
                  const StatusIcon = studentStatus.icon;
                  const remainingSessions = parseInt(student.sessions) - (student.attendedSessions || 0);
                  const attendanceRate = Math.round(((student.attendedSessions || 0) / parseInt(student.sessions)) * 100);

                  return (
                    <div key={student.studentId} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <Users className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{student.fullName}</h3>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-sm text-gray-500">ID: {student.studentId}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{student.attendedSessions || 0}</p>
                            <p className="text-sm text-gray-600">Attended</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{student.sessions}</p>
                            <p className="text-sm text-gray-600">Total</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{remainingSessions}</p>
                            <p className="text-sm text-gray-600">Remaining</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{attendanceRate}%</p>
                            <p className="text-sm text-gray-600">Rate</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={studentStatus.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {studentStatus.status}
                          </Badge>
                          <Link to={`/admin/students/${student.studentId}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {student.lastCheckin && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            Last check-in: {new Date(student.lastCheckin).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p>
                  {searchTerm || filterStatus !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "No students have registered yet"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default StudentsList;
