import './employees.scss';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Papa from 'papaparse';
import {
  addEmployee,
  getCompanyByName,
  useGlobalDispatch,
  useGlobalSelector,
} from '@infralastic/global-state';
import { toast } from 'react-toastify';

const Employees = () => {
  const router = useNavigate();
  const [fileData, setFileData] = useState<any>(null);
  const dispatch = useGlobalDispatch();
  const [companyId, setCompanyId] = useState<any>(null);
  const { userInfo } = useGlobalSelector((state) => state.user);

  function handleRedirect() {
    router('/employee-view');
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      parseFile(file);
    }
  };
  // function fetchCompanybyName(name:any)
  // {
  //   getCompanyByName(formData).then((res:any)=> {
  //     setCompanyId(res?.data?.result?.company_id)
  //   })
  // }

  const parseFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { data } = Papa.parse(text, { header: true });
      setFileData(data);
      console.log(data);
      data?.map(async (item: any) => {
        getCompanyByName({
          company_name: item?.company,
        }).then((res: any) => {
          const formData: any = {
            first_name: item?.firstName,
            last_name: item?.lastName,
            email: item?.email,
            phone: item?.phone,
            image_url: '',
            job_title: item?.job,
            company_id: res?.data?.result?.company_id,
            manager_id: 0,
            department_id: 0,
            location_id: 0,
            employee_status: false,
            user_id: userInfo?.result?.user_id,
          };
          try {
            dispatch(addEmployee(formData)).then(async (res: any) => {
              if (res?.payload?.success === true) {
                toast.success(res?.payload?.msg);
                // setTimeout(() => {
                //   router('/employee-view')
                // }, 3000)
              } else {
                toast.error(res?.payload);
              }
            });
          } catch (err: any) {
            console.error(err);
            toast.error('Access Denied');
          }
        });
      });
    };

    reader.readAsText(file);
  };
  return (
    <>
      <div className="emp-h">
        <div className="d-flex justify-content-end p-4">
          <button
            className="bg-theme-danger border-0 rounded text-white theme-font px-3 py-1"
            onClick={() => document.getElementById('filePicker')!.click()}
          >
            Import Bulk Data From
          </button>
          <input
            type="file"
            id="filePicker"
            hidden
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className="d-flex w-100 h-100">
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <button
              onClick={() => router('/add-employee')}
              className="border-0 bg-theme-danger mb-2 add-emp-btn text-white py-2 px-3 theme-font fs-3 d-flex align-items-center justify-content-center m-0"
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                <AiOutlinePlusSquare size={42} />
              </div>
            </button>
            <button
              onClick={() => handleRedirect()}
              className="bg-transparent border-0 mb-3 theme-danger"
            >
              <BsEye className="me-2" size={20} />
              See All Companies Employees{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Employees;
