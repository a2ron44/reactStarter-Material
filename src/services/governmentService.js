import http from "./http";

//super user only
function getGovernments() {
  return http.get(`admin/government`);
}

function getById(id) {
  return http.get(`admin/government/${id}`);
}

function addGovernment(govt) {
  return http.post(`admin/government`, govt);
}

function updateGovernment(id, govt) {
  return http.put(`admin/government/${id}`, govt);
}

function getAccessibleGovs() {
  return http.get(`user/government`);
}

//normal user
function getConfig(id) {
  return http.get(`government/config/${id}`);
}

//offices
function getGovernmentOffices() {
  return http.get(`government/office`);
}

function getGovernmentOfficeById(id) {
  return http.get(`government/office/${id}`);
}

function addGovernmentOffice(govOffice) {
  return http.post(`government/office/`, govOffice);
}

function updateGovernmentOffice(id, govOffice) {
  return http.put(`admin/government/office/${id}`, govOffice);
}

const funcs = {
  getById,
  getConfig,
  getGovernments,
  addGovernment,
  updateGovernment,
  getAccessibleGovs,
  getGovernmentOffices,
  getGovernmentOfficeById,
  addGovernmentOffice,
  updateGovernmentOffice,
};

export default funcs;
