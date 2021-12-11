const users = [];

//join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room}; //creating a user

    users.push(user); // add the user to the array

    return user;
}

//Get the current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser
};