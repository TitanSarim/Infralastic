import {Card, Form, InputGroup} from "react-bootstrap";
import './department-member.scss'
import {BiSearch} from "react-icons/bi";
import {BsPlus} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import DepartmentTableMemberComponent from "../../../../components/Client/Department/DepartmentTableMemberComponent";
import {useState} from "react";

const DepartmentMember = () => {
    const router = useNavigate();
    const [search, setSearch] = useState<any>('')
    return(
        <>
            <Card className='rounded mt-4'>
                <Card.Body>
                    <div className='d-flex w-100 align-items-center py-2'>
                        <div className="w-100">
                            <h5 className='theme-font m-0'>DEPARTMENT MEMBERS</h5>
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <div className='w-100 d-flex justify-content-end'>
                                <InputGroup className="p-1 bg-white rounded border">
                                    <InputGroup.Text
                                        className='bg-white border-0'
                                        id="basic-addon1">
                                        <BiSearch size={22} />
                                    </InputGroup.Text>
                                    <input
                                        type='text'
                                        className='fs-7 border-0'
                                        placeholder="Search"
                                        aria-label="Username"
                                        onChange={(e: any) => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                            <div className='d-flex w-100 align-items-center justify-content-end'>
                                <h6 className='m-0 theme-font px-3'>Export</h6>
                                <button
                                    className='border-0 bg-theme-danger text-white py-2 px-3 theme-font rounded d-flex'
                                    onClick={() => router('/add-employee')}
                                ><BsPlus size={24} className='me-2' /> Add&nbsp;New&nbsp;Member</button>
                            </div>
                        </div>
                    </div>
                    <hr className='mb-0'/>
                    <DepartmentTableMemberComponent searchFilter={search} />
                </Card.Body>
            </Card>
        </>
    )
}
export default DepartmentMember;
