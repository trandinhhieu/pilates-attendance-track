
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/AdminLayout";
import { Search, Download, Calendar, Clock, User, CheckCircle2 } from "lucide-react";

const AttendanceLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm]);

  const loadLogs = () => {
    const attendanceLogs = JSON.parse(localStorage.getItem('attendanceLogs') || '[]');
    setLogs(attendanceLogs);
  };

  const filterLogs = () => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.receptionist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  const exportLogs = () => {
    const csvContent = [
      ['Date', 'Time', 'Student Name', 'Student ID', 'Session Number', 'Receptionist'],
      ...filteredLogs.map(log => [
        new Date(log.checkinTime).toLocaleDateString(),
        new Date(log.checkinTime).toLocaleTimeString(),
        log.studentName,
        log.studentId,
        log.sessionNumber,
        log.receptionist
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const checkIn = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - checkIn.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Logs</h1>
            <p className="text-gray-600 mt-2">Complete history of student check-ins</p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {logs.length} Total Check-ins
          </Badge>
        </div>

        {/* Filters and Export */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by student name, ID, or receptionist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Button onClick={exportLogs} variant="outline" className="h-12">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Check-in History</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredLogs.length > 0 ? (
              <div className="space-y-4">
                {filteredLogs.map((log, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{log.studentName}</h3>
                          <p className="text-gray-600">Student ID: {log.studentId}</p>
                          <p className="text-sm text-gray-500">Session #{log.sessionNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">Date</span>
                          </div>
                          <p className="font-medium text-gray-900">
                            {new Date(log.checkinTime).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">Time</span>
                          </div>
                          <p className="font-medium text-gray-900">
                            {new Date(log.checkinTime).toLocaleTimeString()}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="h-4 w-4 mr-1" />
                            <span className="text-sm">Staff</span>
                          </div>
                          <p className="font-medium text-gray-900">{log.receptionist}</p>
                        </div>

                        <div className="text-right">
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            {getTimeAgo(log.checkinTime)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance logs found</h3>
                <p>
                  {searchTerm 
                    ? "Try adjusting your search criteria"
                    : "Attendance logs will appear here as students check in"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {logs.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{logs.length}</div>
                <div className="text-gray-600">Total Check-ins</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {logs.filter(log => {
                    const today = new Date();
                    const logDate = new Date(log.checkinTime);
                    return logDate.toDateString() === today.toDateString();
                  }).length}
                </div>
                <div className="text-gray-600">Today's Check-ins</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {logs.filter(log => {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return new Date(log.checkinTime) > oneWeekAgo;
                  }).length}
                </div>
                <div className="text-gray-600">This Week</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(logs.map(log => log.studentId)).size}
                </div>
                <div className="text-gray-600">Unique Students</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AttendanceLogs;
