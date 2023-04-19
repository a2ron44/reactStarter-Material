import http from "./http";

function refreshToken(authObject) {
  return http.post(`user/refreshtoken`, {
    token: authObject.token,
    refreshToken: authObject.refreshToken,
  });
}
function verifyAuth() {
  return http.get(`user/verify`);
}

function switchGov(newGovId) {
  return http.post(`user/switchgov/${newGovId}`);
}

function switchCandidate(candidateId) {
  return http.post(`user/switchcandidate/${candidateId}`);
}

function getGovernmentUsers() {
  return http.get(`user`);
}

function getGovernmentUserById(id) {
  return http.get(`user/${id}`);
}

function addGovernmentUser(govUser) {
  return http.post(`user/`, govUser);
}

function updateGovernmentUser(id, govUser) {
  return http.put(`user/${id}`, govUser);
}

function getUserProfile(id) {
  return http.get(`user/profile/${id}`);
}

function updateMyProfileName(govUser) {
  return http.put(`user/profile/`, govUser);
}

function getCandidateById(id) {
  return http.get(`candidate/${id}`);
}

function getCandidateRecordsForUser() {
  return http.get(`candidate/candidates`);
}

function addCandidateRecord(candidate) {
  return http.post(`candidate/`, candidate);
}

function updateCandidateRecord(id, candidate) {
  return http.put(`candidate/${id}`, candidate);
}

const funcs = {
  refreshToken,
  verifyAuth,
  switchGov,
  switchCandidate,
  getGovernmentUsers,
  getGovernmentUserById,
  getUserProfile,
  updateMyProfileName,
  addGovernmentUser,
  updateGovernmentUser,
  getCandidateById,
  getCandidateRecordsForUser,
  addCandidateRecord,
  updateCandidateRecord,
};

export default funcs;
