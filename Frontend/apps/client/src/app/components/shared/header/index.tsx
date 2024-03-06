import React from 'react';
import { InputGroup, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { BiBell, BiSearch } from 'react-icons/bi';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { CiHeadphones } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useGlobalSelector } from '@infralastic/global-state';

const HeaderComponent = () => {
  const router = useNavigate();
  const { userInfo } = useGlobalSelector((state) => state.user);

  const logout = async () => {
    localStorage.clear();
    await router('/login');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const hours = now.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return (
      <span>
        <span className="">{dayOfWeek},</span>{' '}
        <span className="theme-danger">
          {month}{' '}
          <span className="theme-danger">
            {date}
            {date === 1 || date === 21 || date === 31
              ? 'st'
              : date === 2 || date === 22
              ? 'nd'
              : date === 3 || date === 23
              ? 'rd'
              : 'th'}
          </span>
        </span>{' '}
        .{' '}
        <span className="theme-danger">
          {formattedHours}:{minutes} {amPm}
        </span>
      </span>
    );
  };

  return (
    <div>
      <div className="d-flex w-100">
        <div className="w-100 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <h4 className=" header-color bolder-text">
              {getCurrentDateTime()}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-end w-100">
          <div className="ps-5 custon-width">
            <InputGroup className="shadow p-2 bg-white rounded">
              <InputGroup.Text className="bg-white border-0" id="basic-addon1">
                <BiSearch size={22} />
              </InputGroup.Text>
              <Form.Control
                className="header-input border-0"
                placeholder="Search your assets"
                aria-label="Username"
              />
            </InputGroup>
          </div>
          <div className="px-3">
            <div className="shadow d-flex bg-white rounded p-2">
              <AiOutlineAppstoreAdd className="my-1 mx-2" size={26} />
            </div>
          </div>
          <div className="px-2">
            <div className="shadow d-flex bg-white rounded p-2">
              <CiHeadphones className="my-1 mx-2" size={26} />
              <BiBell className="my-1 mx-2" size={26} />
              <DropdownButton
                className="bg-transparent custom-btn"
                id="dropdown-item-button"
                title={
                  <img
                    className="mx-2 rounded-circle bg-theme-danger"
                    src={
                      userInfo?.result?.image_url
                        ? userInfo?.result?.image_url
                        : userInfo?.image_url
                    }
                    width={32}
                    height={32}
                    alt=""
                  />
                }
              >
                <Dropdown.Item
                  className="theme-font"
                  as="button"
                  onClick={() => router('/user-profile')}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item className="theme-font" as="button">
                  Setting
                </Dropdown.Item>
                <hr className="m-1" />

                <Dropdown.Item
                  onClick={() => logout()}
                  className="theme-danger theme-font fw-semibold"
                  as="button"
                >
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
