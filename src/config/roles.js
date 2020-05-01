const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getRecords', 'manageRecords']);

module.exports = {
  roles,
  roleRights,
};
