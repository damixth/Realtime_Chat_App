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

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id); //find user from array
  
    if (index !== -1) //if not found returns -1
    {
      return users.splice(index, 1)[0]; //[0] - return user without returning whole array
    }
  }

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
  }

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};