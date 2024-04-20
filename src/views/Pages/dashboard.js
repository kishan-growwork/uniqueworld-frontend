import React, { useState, useEffect } from 'react'
import AdminDashboard from "../../components/Dashboard/adminDashBoard/Index"
import RecruiterDashboard from "../../components/Dashboard/RecruiterDashBoard/Index"
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(<AdminDashboard />)
  const role = useSelector(state => state?.auth?.user?.role)?.name
  useEffect(() => {
    if (role === "Recruiter") setDashboard(<RecruiterDashboard />)
  }, [role])
  return dashboard
}

export default Dashboard