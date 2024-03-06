import { Route, Routes } from 'react-router-dom';
import ProtectedRoute, { ProtectedRouteProps } from '../guard/authGuard';
import Login from '../pages/Authentication/Login';
import ResetPassword from '../pages/Authentication/ResetPassword';
import ChangePassword from '../pages/Authentication/ChangePassword';
import Dashboard from '../pages/Client/Dashboard';
import EmployeeDetail from '../pages/Client/Employees/EmployeeDetail';
import Employees from '../pages/Client/Employees';
import EmployeeView from '../pages/Client/Employees/EmployeeView';
import AddEmployee from '../pages/Client/Employees/AddEmployee';
import Department from '../pages/Client/Department';
import AddDepartment from '../pages/Client/Department/AddDepartment';
import DepartmentMember from '../pages/Client/Department/DepartmentMember';
import AssetDevices from '../pages/Client/AssetDevices';
import AssetDetail from '../pages/Client/AssetDevices/AssetDetail';
import AddAsset from '../pages/Client/AssetDevices/AddAsset';
import AssetView from '../pages/Client/AssetDevices/AssetView';
import AllAsset from '../pages/Client/AssetDevices/AllAsset';
import ConfirmAsset from '../pages/Client/AssetDevices/ConfirmAsset';
import AddAttachments from '../pages/Client/AssetDevices/AddAttachments';
import CheckIn from '../pages/Client/AssetDevices/CheckIn';
import CheckOut from '../pages/Client/AssetDevices/CheckOut';
import AppStore from '../pages/Client/ProductStore/AppStore';
import DeviceStore from '../pages/Client/ProductStore/DeviceStore';
import OrderTracking from '../pages/Client/ProductStore/OrderTracking';
import Admin from '../pages/Client/Admin';
import GlobalSetting from '../pages/Client/Admin/GlobalSetting';
import DeviceManagement from '../pages/Client/DeviceManagement';
import DeviceDetail from '../pages/Client/DeviceManagement/DeviceDetail';
import Reports from '../pages/Client/Reports';
import InventoryReport from '../pages/Client/Reports/InventoryReport';
import LicenseReport from '../pages/Client/Reports/LicenseReport';
import AuditLogReport from '../pages/Client/Reports/AuditLogReport';
import AccessoryReport from '../pages/Client/Reports/AccessoryReport';
import PurchaseReport from '../pages/Client/Reports/PurchaseReport';
import Alerts from '../pages/Client/Alerts';
import AssetChanges from '../pages/Client/AssetDevices/AssetChanges';
import AssetProof from '../pages/Client/AssetDevices/AssetProof';
import AssetNotification from '../pages/Client/AssetDevices/AssetNotification';
import CostingReport from '../pages/Client/Reports/CostingReport';
import EmployeeReport from '../pages/Client/Reports/EmployeeReport';
import UserTable from '../pages/Client/Admin/UserTable';
import RoleTable from '../pages/Client/Admin/RoleTable';
import AdminUserForm from '../components/Client/Admin/AdminUserForm';
import AdminRoleForm from '../components/Client/Admin/AdminRoleForm';
import CompanySettingTable from '../components/Client/Admin/CompanySettingTable';
import CompanySettingForm from '../components/Client/Admin/CompanySettingForm';
import AssetCheckinCheckoutTab from '../pages/Client/AssetDevices/CheckinCheckoutTab';
import IncomingServer from '../pages/Client/Admin/IncomingServer';
import OutputServer from '../pages/Client/Admin/OutputServer';
import UserProfile from '../pages/UserProfile';
import AppDetail from '../pages/Client/ProductStore/AppStore/AppDetail';
import DeviceResponse from '../pages/Client/DeviceManagement/DeviceResponse';
import EmailConfiguration from '../pages/Client/Admin/EmailConfiguration';
import AuditLog from '../pages/Client/Admin/AuditLog';
import PlansBillings from '../pages/Client/Admin/Plans-Billings';
import Ldap from '../pages/Client/Admin/Ldap';
import Saml from '../pages/Client/Admin/Saml';
import Oauth from '../pages/Client/Admin/Oauth';
import EditProfile from '../pages/UserProfile/EditProfile';
import DeviceCmd from '../pages/Client/DeviceManagement/DeviceCmd';
import DevicePowerShell from '../pages/Client/DeviceManagement/DevicePowerShell';
import SoftwareInstallation from '../pages/Client/DeviceManagement/SoftwareInstallation';
import SoftwareInventory from '../pages/Client/DeviceManagement/SoftwareInstallation';
import CheckOTP from '../pages/Authentication/CheckOTP';
import { useGlobalSelector } from '@infralastic/global-state';

const AppRoutes = () => {
  const { userInfo } = useGlobalSelector((state) => state.user);
  const is_logined = userInfo?.result?.is_logined;
  console.log(is_logined, 'login?');
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    authenticationPath: '/login',
    is_logined: is_logined,
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Dashboard />}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/check-otp" element={<CheckOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Employees />}
            />
          }
        />
        <Route
          path="/employee-view"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<EmployeeView />}
            />
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AddEmployee />}
            />
          }
        />
        <Route
          path="/employee-detail"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<EmployeeDetail />}
            />
          }
        />
        <Route
          path="/department"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Department />}
            />
          }
        />
        <Route
          path="/add-department"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AddDepartment />}
            />
          }
        />
        <Route
          path="/department-member"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DepartmentMember />}
            />
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetDevices />}
            />
          }
        />
        <Route
          path="/asset-detail"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetDetail />}
            />
          }
        />
        <Route
          path="/add-asset"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AddAsset />}
            />
          }
        />
        <Route
          path="/asset-view"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetView />}
            />
          }
        />
        <Route
          path="/asset-checkin-checkout-tab"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetCheckinCheckoutTab />}
            />
          }
        />
        <Route
          path="/check-in"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CheckIn />}
            />
          }
        />
        <Route
          path="/check-out"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CheckOut />}
            />
          }
        />
        <Route
          path="/all-assets"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AllAsset />}
            />
          }
        />
        <Route
          path="/confirm-assets"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<ConfirmAsset />}
            />
          }
        />
        <Route
          path="/asset-changes"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetChanges />}
            />
          }
        />
        <Route
          path="/asset-proof"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetProof />}
            />
          }
        />
        <Route
          path="/asset-notification"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AssetNotification />}
            />
          }
        />
        <Route
          path="/add-asset-attachment"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AddAttachments />}
            />
          }
        />
        <Route
          path="/app-store"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AppStore />}
            />
          }
        />
        <Route
          path="/app-detail"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AppDetail />}
            />
          }
        />
        <Route
          path="/device-store"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DeviceStore />}
            />
          }
        />
        <Route
          path="/order-tracking"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<OrderTracking />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Admin />}
            />
          }
        />
        <Route
          path="/company-table"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CompanySettingTable />}
            />
          }
        />
        <Route
          path="/global-setting"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<GlobalSetting />}
            />
          }
        />
        <Route
          path="/user-table"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserTable />}
            />
          }
        />
        <Route
          path="/user-form"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AdminUserForm />}
            />
          }
        />
        <Route
          path="/role-table"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<RoleTable />}
            />
          }
        />
        <Route
          path="/role-form"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AdminRoleForm />}
            />
          }
        />
        <Route
          path="/company-table"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CompanySettingTable />}
            />
          }
        />
        <Route
          path="/company-form"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CompanySettingForm />}
            />
          }
        />
        <Route
          path="/device-management"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DeviceManagement />}
            />
          }
        />
        <Route
          path="/device-detail"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DeviceDetail />}
            />
          }
        />
        <Route
          path="/device-response"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DeviceResponse />}
            />
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Reports />}
            />
          }
        />
        <Route
          path="/inventory-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<InventoryReport />}
            />
          }
        />
        <Route
          path="/employee-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<EmployeeReport />}
            />
          }
        />
        <Route
          path="/costing-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<CostingReport />}
            />
          }
        />
        <Route
          path="/license-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<LicenseReport />}
            />
          }
        />
        <Route
          path="/audit-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AuditLogReport />}
            />
          }
        />
        <Route
          path="/accessory-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AccessoryReport />}
            />
          }
        />
        <Route
          path="/purchase-reports"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<PurchaseReport />}
            />
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Alerts />}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserProfile />}
            />
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<EditProfile />}
            />
          }
        />
        <Route
          path="/output-server"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<OutputServer />}
            />
          }
        />
        <Route
          path="/incoming-server"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<IncomingServer />}
            />
          }
        />
        <Route
          path="/email-configuration"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<EmailConfiguration />}
            />
          }
        />
        <Route
          path="/audit-log"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<AuditLog />}
            />
          }
        />
        <Route
          path="/plans-billings"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<PlansBillings />}
            />
          }
        />
        <Route
          path="/ldap"
          element={
            <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Ldap />} />
          }
        />
        <Route
          path="/saml"
          element={
            <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Saml />} />
          }
        />
        <Route
          path="/0auth"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Oauth />}
            />
          }
        />
        <Route
          path="/0auth"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Oauth />}
            />
          }
        />
        <Route
          path="/software-inventory"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<SoftwareInventory />}
            />
          }
        />
        <Route
          path="/device-cmd"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DeviceCmd />}
            />
          }
        />
        <Route
          path="/device-powershell"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<DevicePowerShell />}
            />
          }
        />
      </Routes>
    </>
  );
};
export default AppRoutes;
