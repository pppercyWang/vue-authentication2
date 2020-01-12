const BASEURL = "api"
export default {
  AUTH: {
    login: `${BASEURL}/login`,
    loginOut: `${BASEURL}/loginOut`,
  },
  USER: {
    getUserList: `${BASEURL}/user/list`,
    delUser: `${BASEURL}/user/del`,
    saveUser: `${BASEURL}/user/save`,
  },
}