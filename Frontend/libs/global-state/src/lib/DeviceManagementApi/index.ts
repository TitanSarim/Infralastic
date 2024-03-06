import axios from "axios";

const API = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'key': 'U2FsdGVkX1+8sut0u1BvDE5mJAvJ1L2E78kiwVPtMMo='
  },
  baseURL: 'https://flt01.infralastic.com'
});

export const getHosts = async () => await API.get('/host/getHosts')

export const getHostDetail = (config: any) =>
  API.get(`/host/getHostDetail/${config}`)

export const getFleetInstaller = async (config?: any) => await API.get(`/installer/fleet`, config)

export const getSaltInstaller = async (config?: any) => await API.get(`/installer/salt`, config)

export const getAntivirus = (formData: any) =>
  API.post(`/host/checkWindowsAntivirus`, formData)

export const getSaltMinion = async (config?: any) => await API.get(`/salt/getMinionIds`, config)

export const getRmmClient = async (config?: any) => await API.get(`/tactical/getClients`, config)

export const generateRmmInstaller = async (config: any) => await API.post(`/tactical/generateInstaller`, config)

export const getChocInstaller = async (formData: any) => await API.post('/salt/installChocolatey', formData)

// ?page=${formData.page}?per_page=${formData.per_page || 10}
export const getChocsSoftware = async (formData: any) => await API.get(`/tactical/getChocosSoftwares`)

export const acceptSaltMinion = async (formData: any) => await API.post(`/salt/acceptMinion`, formData)

export const executeSaltCommands = (formData: any) =>
  API.post(`/salt/executeCmd`, formData)

export const executeSaltCommandsPowerShell = (formData: any) =>
  API.post(`/salt/executePowershell`, formData)

export const getIpAddress = (config: any) =>
  axios.get('https://ipgeolocation.abstractapi.com/v1/', config)

export const getSpecificAgent = async (agentId: any) => await API.get(`/tactical/getSpecificAgent?agentId=${agentId}`);

export const getSpecificAgentControl = async (agentId: any, type: string) => await API.get(`/tactical/getControl?agentId=${agentId}&type=${type}`);

export const deleteHost = async (hostId: number) => await API.post("/host/deleteHost", { hostId })

export const getPatches = async (agentId: any) => await API.get(`/tactical/getPatches?agentId=${agentId}`)

export const installPatches = async (agentId: any) => await API.post("/tactical/installPatch", { agentId })

// installSoftware => formData = { agentId, name }
export const installSoftware = async (formData: any) => await API.post("/tactical/installSoftware", formData)