import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const getBrowserName = (userAgent: any) => {
  const browserRegex =
    /(edge|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
  const matches = userAgent.match(browserRegex) || [];

  const browserName = matches[1] || 'Unknown';
  return browserName.charAt(0).toUpperCase() + browserName.slice(1);
};

const UserRecentDeviceTableComponent = () => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const getUserData = async () => {
      const fetchedUserData = [];

      // Get the user's current browser
      const browser = getBrowserName(navigator.userAgent);

      // Fetch IP address from an external service
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        console.log(response);
        console.log(data);

        // Fetch country based on IP address
        const countryResponse = await fetch(
          `https://ipapi.co/${data.ip}/country_name/`
        );
        const countryData = await countryResponse.text();

        // Add the new user data to the existing fetchedUserData
        fetchedUserData.push({
          browser: browser,
          device: 'New Device', // You might want to replace this with actual device info
          location: countryData, // Use the fetched country data
          activity: new Date().toLocaleString(),
          ipAddress: data.ip,
        });

        setUserData(fetchedUserData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <div className="d-flex flex-column">
          <h5 className="theme-font py-4">Recent Devices</h5>
          <Table className="w-100 theme-font" striped bordered>
            <thead>
              <tr>
                <th>
                  <h5 className="ms-2">Browser</h5>
                </th>
                <th>
                  <h5 className="ms-2">Location</h5>
                </th>
                <th>
                  <h5 className="ms-2">Recent Activities</h5>
                </th>
                <th>
                  <h5 className="ms-2">IP Address</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any, index: any) => (
                <tr key={index}>
                  <td>{user.browser}</td>
                  <td>{user.location}</td>
                  <td>{user.activity}</td>
                  <td>{user.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserRecentDeviceTableComponent;
