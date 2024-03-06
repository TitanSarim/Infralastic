import React, {useEffect} from 'react';
import './app.module.scss';
import AppRoutes from "./routes/route";
import Layout from "./components/layout";
import { Loader } from "@infralastic/loader";
import {useGlobalSelector} from "@infralastic/global-state";

function App() {
  const userLoading = useGlobalSelector((state) => state.user.loading);
  const employeeLoading = useGlobalSelector((state) => state.employee.loading);
  const companyLoading = useGlobalSelector((state) => state.company.loading);
  const departmentLoading = useGlobalSelector((state) => state.department.loading);
  const assetLoading = useGlobalSelector((state) => state.asset.loading);
  const reportLoading = useGlobalSelector((state) => state.report.loading);
  useEffect(() => {
    document.title = 'Infralastic';
  }, []);
  return (
    <div className="App">
      <Loader visible={userLoading || employeeLoading || companyLoading || departmentLoading || assetLoading || reportLoading} />
      <Layout children={<AppRoutes />} />
    </div>
  );
}

export default App;
