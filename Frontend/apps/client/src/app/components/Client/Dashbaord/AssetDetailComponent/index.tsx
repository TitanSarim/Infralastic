import './asset-detail-component.scss'
import AssetDetailChart from "../../../Charts/AssetDetailChart";
const AssetDetailComponent = () => {
  return(
      <>
          <div className="shadow d-flex flex-column bg-white rounded p-3 h-100">
              <h5 className='mb-1'>App Details</h5>
              <p className='fs-7 text-muted fw-light'>Spending on various categories</p>
              <AssetDetailChart />
          </div>
      </>
  )
}
export default AssetDetailComponent;