import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { APIS } from './constants/api.constant';
import apiService from './lib/apiService';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await apiService.get(`${APIS.VISTORS_REPORT}/${id}`);
       
    //   const response = await axios.get('/api/analytics');
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  return (
    <div className="analytics-dashboard">
      <h2>Google Analytics Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pageviews" fill="#8884d8" />
          <Bar dataKey="uniquePageviews" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsDashboard;
