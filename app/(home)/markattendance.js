import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MarkAttendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/attendance`, {
          params: {
            date: currentDate.format("MMMM D, YYYY"),
          },
        });
        setAttendance(response.data);
      } catch (error) {
        console.log("Error fetching attendance data", error);
      }
    };
    fetchAttendanceData();
  }, [currentDate]);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const navigateToEmployeeDetails = (employee) => {
    router.push({
      pathname: "/[user]",
      params: {
        name: employee.employeeName,
        id: employee.employeeId,
        salary: employee?.salary,
        designation: employee?.designation,
      },
    });
  };

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "Not Marked",
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>{formatDate(currentDate)}</Text>
        <AntDesign name="arrowright" size={24} color="black" onPress={goToNextDay} />
      </View>

      <View style={styles.content}>
        {employeeWithAttendance.map((employee, index) => (
          <Pressable
            key={index}
            style={styles.employeeItem}
            onPress={() => navigateToEmployeeDetails(employee)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{employee?.employeeName?.charAt(0)}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.employeeName}>{employee?.employeeName}</Text>
              <Text style={styles.designation}>
                {employee?.designation} ({employee?.employeeId})
              </Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: employee.status === "Present" ? "#00FF00" : "#FF0000" },
              ]}
            >
              <Text style={styles.statusText}>{employee.status.charAt(0)}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  designation: {
    color: "gray",
  },
  statusIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default MarkAttendance;
