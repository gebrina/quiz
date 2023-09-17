"use client";

import UserForm, { User } from "./ProfileForm";

const UserProfile = () => {
  let user: any;
  return (
    <>
      <UserForm user={user} />
    </>
  );
};

export default UserProfile;
