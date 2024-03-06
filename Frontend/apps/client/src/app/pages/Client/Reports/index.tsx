import './reports.scss';
import { Card, Col, Form, Row } from 'react-bootstrap';
import chartImg from '../../../../assets/Chart.png';
import ReportAssetChart from '../../../components/Charts/ReportAssetChart';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PieChart from '../../../components/Charts/PieChart';
import ActivityReportComponent from '../../../components/Client/Reports/ActivityReportComponent';
import {
  fetchAllBudgetReport,
  useGlobalDispatch,
} from '@infralastic/global-state';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

const Reports = () => {
  const dispatch = useGlobalDispatch();
  const [purchaseData, setPurchaseData] = useState<any>([]);
  const [budgetData, setBudgetData] = useState<any>(null);

  function fetchPurchaseData() {
    const config: any = {};
    dispatch(fetchAllBudgetReport(config)).then((res: any) => {
      setPurchaseData(res?.payload?.budget_data);
    });
  }
  console.log(purchaseData);
  function handleFilter(value: any) {
    purchaseData
      .filter((res: any) => res.year === value)
      .map((item: any) => setBudgetData(item));
  }
  console.log(budgetData);
  function downloadCSV() {
    const csvData = purchaseData.map((item: any) =>
      Object.values(item).join(',')
    );
    const csvContent = csvData.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'purchase_report.csv');
  }

  useEffect(() => {
    fetchPurchaseData();
  }, []);
  return (
    <div className="h-100">
      <br />
      <Row>
        <Col md={8}>
          <Card className="w-100 p-2">
            <Card.Body>
              <div className="d-flex w-100">
                <div className="w-75">
                  <h5 className="theme-font">Assets Report</h5>
                  <div className="d-flex">
                    <ReportAssetChart
                      purchased={budgetData?.budget_purchased}
                      assigned={budgetData?.budget_assign}
                    />
                    <div className="vr"></div>
                  </div>
                </div>
                <div className="w-25">
                  <div className="d-flex align-items-center flex-column">
                    <div className="w-50">
                      <Form>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e: any) => handleFilter(e.target.value)}
                        >
                          <option value="">none</option>
                          {purchaseData?.map((item: any) => (
                            <option value={item.year}>{item?.year}</option>
                          ))}
                        </Form.Select>
                      </Form>
                    </div>
                    <div className="my-4">
                      <p className="theme-danger theme-font fs-3 mb-0 text-center">
                        ${budgetData?.consumed}
                      </p>
                      <p className="text-muted theme-font fs-7 text-center">
                        Budget: {budgetData?.budget}
                      </p>
                      <img src={chartImg} alt="" />
                    </div>
                    <button
                      onClick={downloadCSV}
                      type="button"
                      className="bg-theme-danger border-0 text-white rounded py-1 px-3 theme-font"
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-2">
            <Card.Body>
              <div className="d-flex w-100">
                <h5 className="w-75 theme-font">Devices by Categories</h5>
                <div className="w-25 d-flex justify-content-end">
                  <i>
                    <BiDotsVerticalRounded size={20} />
                  </i>
                </div>
              </div>
              <div className="d-flex justify-items-center w-100">
                <PieChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <ActivityReportComponent />
      </div>
    </div>
  );
};
export default Reports;
