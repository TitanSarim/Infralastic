var config = require("../../config");

const axios = require('axios');

//List Fleet Installer
exports.getFleetInstallers = async (req, res) => {
  
  try {

    const data = {
      windows   : `${config.baseURL}/public/installers/fleet/windows-installer.msi`,
      mac       : `${config.baseURL}/public/installers/fleet/mac-installer.pkg`,
      linux_rpm : `${config.baseURL}/public/installers/fleet/linux-rpm.rpm`,
      linux_deb : `${config.baseURL}/public/installers/fleet/linux-deb.deb`,
    };
    return res.status(200).json({ status: true, message: "Success!!", data});

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//List Salt Installer
exports.getSaltInstallers = async (req, res) => {
  
  try {

    const data = {
      windows   : `${config.baseURL}/public/installers/salt/salt-windows-installer.exe`,
      mac       : ``,
      linux_rpm : ``,
      linux_deb : ``,
      instructions:`During installation use this ${config.saltIP} address in the master hotname/ip. `
    };
    return res.status(200).json({ status: true, message: "Success!!", data});

   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};


