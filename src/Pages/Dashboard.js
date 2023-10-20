import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ManageSkill from './ManageSkill.js';
import ManageProject from './ManageProject.js';
import AdminSideBar from '../Components/Admin/AdminSideBar.js';
import ManageAbout from './ManageAbout.js';
import ManageMsgs from './ManageMsgs.js';
import ManageExp from './ManageExp.js';
import ManageEdu from './ManageEdu.js';
const Dashboard = () => {
  return (
    <div>
    <AdminSideBar >
    <Routes>
      <Route element={<ManageProject />} path="manageprojects" />
      <Route element={<ManageSkill />} path="manageskills" />
      <Route element={<ManageAbout />} path="manageabout" />
      <Route element={<ManageMsgs />} path="managecontacts" />
      <Route element={<ManageEdu />} path="manageedu" />
      <Route element={<ManageExp />} path="manageexp" />
    </Routes>
    </AdminSideBar>
  </div>
  )
}

export default Dashboard
