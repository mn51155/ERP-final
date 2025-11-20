import React from 'react'

import UserListSection from '../../components/UsersListSection/UserListSection'
export default function UsersListPage() {
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
    <UserListSection />
    </div>
    </>
  )
}