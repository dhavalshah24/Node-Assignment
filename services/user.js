var bcrypt = require('bcryptjs');
let allUsers = [
    {
        id: 1,
        name: "Dhaval",
        email: "abc@gmail.com",
        mobile: 1234567890,
        password: "$2a$10$XTaKNv1FfvWAjnjGX8Z1ieImEmgVQfegSAleQQMohcpSzbKiVFD7y",
        profilePicture: "1628524759177.png"
    },
    {
        id: 2,
        name: "Shah",
        email: "xyz@gmail.com",
        mobile: 9876543210,
        password: "$2a$10$ZhU0qtjhI5NZTPSQBhWW3eIkEnZhr.J.5SNtqG2i6n96.wE0ZybG2",
        profilePicture: "1628524945026.png"
    }
];

const getAllUsers = () => {
    return allUsers;
};

const getOtherUser = (id) => {
    let user = allUsers.filter((eachUser) => eachUser.id == id);
    const result = user.map(({name, email, mobile, profilePicture}) => ({name, email, mobile, profilePicture}));
    return result;
};

const insertUser = (name, email, mobile, password, profilePicture) => {
    const id = allUsers.length + 1;
    let newUser = {
        id: id,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        profilePicture: profilePicture
    };
    allUsers.push(newUser);
    return;
};

const getUserByEmail = (email) => {
    let user = allUsers.filter((eachUser) => eachUser.email == email);
    return user;
}

const login = (email) => {
    let user = allUsers.filter((eachUser) => eachUser.email == email);
    return user;
}

const changePassword = (email, password) => {
    let user = allUsers.filter((eachUser) => eachUser.email == email);
    user[0].password = password;
}

const updateInfo = (email, name, mobile, profilePicture) => {
    let user = allUsers.filter((eachUser) => eachUser.email == email);
    user[0].mobile = mobile ;
    user[0].name = name;
    user[0].profilePicture = profilePicture;
}

module.exports = {
    getAllUsers,
    getOtherUser,
    insertUser,
    login,
    changePassword,
    getUserByEmail,
    updateInfo
};