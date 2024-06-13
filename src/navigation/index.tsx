import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const Navigation: FC = () => {
  //ToDo: routing approach improve and apply token logic
  return (
    <Routes>
      <Route key="index" index element={<Dashboard />} />
    </Routes>
  );
};

export default Navigation;
