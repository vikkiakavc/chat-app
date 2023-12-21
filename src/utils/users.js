const { use } = require("express/lib/application");

const users = []

// adding username
const addUser = ({id, username, room}) => {
    // clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // validate
    if (!username || !room){
        return {
            error: 'Username and room are required!'
        }
    }

    // check for duplicate
    const existingUser = users.find((user) => {
        return user.username === username && user.room === room
    })
    if (existingUser) {
        return {
            error: 'Usernmae is in use!'
        }
    }

    // add the data
    const user = {id, username, room}
    users.push(user);
    return {user} 
}

// remove User
const removeUser = (id) =>{
    const index = users.findIndex((user) => user.id === id)

    if (index!==-1){
        return users.splice(index, 1)[0]
    }
}

// get user
const getUser = (id) => {
    return users.find((user) => user.id === id)
}

// get users list 
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}


module.exports = {
    addUser,
    removeUser, 
    getUser,
    getUsersInRoom
}
