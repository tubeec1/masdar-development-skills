const getDefaultProfileImage = (gender) => {
  if (gender === "Female") {
    return "uploads/profileImages/default/female.png";
  }

  return "uploads/profileImages/default/male.png";
};

module.exports = getDefaultProfileImage;
